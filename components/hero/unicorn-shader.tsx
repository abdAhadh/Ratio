"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Unicorn Studio shader background.
 *
 * Loads /unicornStudio.umd.js once per page, installs request-redirects so
 * the library's hard-coded storage.googleapis.com URLs resolve to local
 * scene JSON + texture files, then initialises the embed for the given
 * project ID. Reference scene runs at the same DPI/scale/FPS as 8098.
 */
type Props = {
  project: string;
  className?: string;
  /** When true, skip the IntersectionObserver gate and initialise the
   *  scene immediately on mount. Use on always-visible shaders (e.g.
   *  the hero) so back-navigation doesn't show the static poster
   *  while we wait for the IO to fire. */
  eager?: boolean;
};

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      destroy?: () => void;
    };
    __ratioUsLocalized?: boolean;
  }
}

const TEXTURE_REWRITES: Record<string, string> = {
  "https://assets.unicorn.studio/images/cEDZWLW7jwc0UwOOcEynYlHJ2N82/remix_download%20(83).jfif":
    "/us-textures/remix_download__83_-7f61c2.jfif",
  "https://assets.unicorn.studio/media/blue_noise_med.png":
    "/us-textures/blue_noise_med-3e976e.png",
};

function installLocalizer() {
  if (typeof window === "undefined") return;
  if (window.__ratioUsLocalized) return;
  window.__ratioUsLocalized = true;

  /* BFCache (back/forward cache) recovery — when the user navigates
   * away (e.g. clicks the Get Started CTA which goes to a separate
   * origin) and then hits the browser back button, the browser may
   * restore this page from its back/forward cache. Restored pages
   * keep their DOM and JS state, but WebGL contexts created before
   * the navigation are commonly suspended or lost, leaving the
   * shader's <canvas> blank. Detect the BFCache restore via the
   * `persisted` flag on the pageshow event and rebuild every scene
   * from scratch by calling UnicornStudio.destroy() + init().
   */
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    if (!window.UnicornStudio) return;
    try {
      window.UnicornStudio.destroy?.();
    } catch (err) {
      console.warn("[unicorn-studio] BFCache destroy warning:", err);
    }
    // Strip data-us-initialized so init() will pick the elements back
    // up (UnicornStudio's init filters out elements already marked
    // initialized; destroy() doesn't clear that flag).
    document
      .querySelectorAll("[data-us-initialized]")
      .forEach((el) => el.removeAttribute("data-us-initialized"));
    // Allow a tick for DOM teardown to settle before re-init.
    setTimeout(() => {
      try {
        window.UnicornStudio?.init?.();
      } catch (err) {
        console.warn("[unicorn-studio] BFCache reinit warning:", err);
      }
    }, 50);
  });

  const redirect = (url: string): string | null => {
    const u = String(url);
    const m = u.match(
      /storage\.googleapis\.com\/unicornstudio-production\/embeds\/([A-Za-z0-9_-]+)/
    );
    if (m) return `/us-scenes/${m[1]}.json`;
    const base = u.split("?")[0];
    if (TEXTURE_REWRITES[u]) return TEXTURE_REWRITES[u];
    if (TEXTURE_REWRITES[base]) return TEXTURE_REWRITES[base];
    if (
      u.indexOf("cdn.jsdelivr.net") !== -1 &&
      u.indexOf("unicornstudio") !== -1
    ) {
      return "/unicornStudio.umd.js";
    }
    return null;
  };

  // fetch
  const origFetch = window.fetch.bind(window);
  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;
    const r = redirect(url);
    return r ? origFetch(r, init) : origFetch(input, init);
  }) as typeof window.fetch;

  // XHR
  const origXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string | URL,
    ...rest: unknown[]
  ) {
    const r = redirect(String(url));
    // eslint-disable-next-line prefer-rest-params
    const args = Array.from(arguments) as unknown[];
    if (r) args[1] = r;
    // @ts-expect-error variadic XHR.open
    return origXhrOpen.apply(this, args);
  } as typeof XMLHttpRequest.prototype.open;

  // <img>.src
  const imgDesc = Object.getOwnPropertyDescriptor(
    HTMLImageElement.prototype,
    "src"
  );
  if (imgDesc && imgDesc.set && imgDesc.get) {
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      configurable: true,
      get() {
        return imgDesc.get!.call(this);
      },
      set(v: string) {
        const r = redirect(v);
        imgDesc.set!.call(this, r ?? v);
      },
    });
  }
}

function loadUnicornStudio(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.UnicornStudio) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-ratio-unicorn="1"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("UnicornStudio script failed")),
        { once: true }
      );
      return;
    }
    const s = document.createElement("script");
    s.src = "/unicornStudio.umd.js";
    s.async = true;
    s.dataset.ratioUnicorn = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("UnicornStudio script failed"));
    document.head.appendChild(s);
  });
}

export function UnicornShader({ project, className, eager = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // When `eager` is true (e.g. the hero), start initialised so the scene
  // begins loading on first paint. Otherwise gate behind the
  // IntersectionObserver below so below-the-fold shaders defer their
  // WebGL context creation until the user scrolls toward them.
  const [inView, setInView] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    installLocalizer();
    loadUnicornStudio()
      .then(() => {
        if (cancelled) return;
        try {
          window.UnicornStudio?.init?.();
        } catch (e) {
          console.warn("[unicorn-studio] init warning:", e);
        }
      })
      .catch((e) => {
        console.error("[unicorn-studio] failed to load:", e);
      });
    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      data-us-project={inView ? project : undefined}
      /* DPI 1 (was 1.5) — at 2000-wide viewports DPI 1.5 means rendering at
         3000 effective pixels per shader, ×4 shaders ≈ 36M pixels per frame.
         DPI 1 cuts that to ~16M and removes most of the scroll jitter. */
      data-us-dpi="1"
      data-us-scale="1"
      /* FPS 30 — half the work at imperceptibly lower smoothness for a slow
         background gradient. */
      data-us-fps="30"
      data-us-alttext=""
      data-us-arialabel=""
      data-us-lazyload="true"
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
