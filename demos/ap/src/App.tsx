import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SCENES } from './types';

import TopBar from './components/TopBar';

import Scene01Intro from './scenes/Scene01Intro';
import Scene02VendorMaster from './scenes/Scene02VendorMaster';
import Scene03InvoiceIntake from './scenes/Scene03InvoiceIntake';
import Scene04Match from './scenes/Scene04Match';
import Scene06Approval from './scenes/Scene06Approval';
import Scene07PaymentPDC from './scenes/Scene07PaymentPDC';
import Scene08SyncReconcile from './scenes/Scene08SyncReconcile';
import Scene09Result from './scenes/Scene09Result';

// Scene transitions feel like SPA route changes (no big "fade up from below"
// reload feel). The transition from the bill-detail (Scene 3+4) to the
// approval list (Scene 6) is treated as BACK navigation — Scene 4 slides off
// to the right as if the bill detail is closing, revealing the list.
const SCENE_VARIANTS = {
  enter:  (dir: 'forward' | 'back') => dir === 'back' ? { opacity: 0, x: -12 } : { opacity: 0, y: 8 },
  center: { opacity: 1, x: 0, y: 0 },
  exit:   (dir: 'forward' | 'back') => dir === 'back' ? { opacity: 0, x: 80 }  : { opacity: 0, y: -8 },
};

const isEmbedded = typeof window !== 'undefined' && window.self !== window.top;

// ── Timeline ─────────────────────────────────────────────────────────────────
const SCENE_TIMELINE = (() => {
  let t = 0;
  return SCENES.map(s => {
    const entry = { id: s.id, start: t, end: t + s.duration };
    t += s.duration;
    return entry;
  });
})();

const TOTAL_DURATION = SCENE_TIMELINE[SCENE_TIMELINE.length - 1].end;

function sceneAtTime(t: number): number {
  for (const e of SCENE_TIMELINE) {
    if (t < e.end) return e.id;
  }
  return SCENE_TIMELINE[SCENE_TIMELINE.length - 1].id;
}

// ── Subtitles - keyed to synthetic clock ─────────────────────────────────────
const SUBTITLE_CUES: { start: number; end: number; text: string }[] = [
  // Scene 1 - Intro (0-5)
  { start: 0.4,  end: 4.5,   text: 'This is Ratio. Your AI Accounts Payable Agent, built for the UAE.' },

  // Scene 2 - Vendor Onboarding via WhatsApp (5-26)
  { start: 5.0,  end: 8.5,   text: 'Add a new vendor with just their WhatsApp number.' },
  { start: 8.7,  end: 12.0,  text: "Ratio's AI agent reaches out, collects the trade licence and IBAN certificate." },
  { start: 12.2, end: 15.5,  text: 'The moment they land. TRN verified, IBAN matched, sanctions screened.' },
  { start: 15.7, end: 19.0,  text: 'Reviewed and accepted. Live in seconds, continuously monitored after.' },
  { start: 19.5, end: 22.0,  text: 'Onboarding complete. The vendor is verified.' },
  { start: 22.5, end: 25.5,  text: 'And right on cue, the first invoice arrives.' },

  // Scene 3 - Invoice Intake (26-40)
  { start: 26.4, end: 30.5,  text: 'Ratio reads the invoice. Bilingual extraction in English and Arabic.' },
  { start: 30.7, end: 35.0,  text: 'Every line item, the TRN, the AED amount, the VAT.' },
  { start: 35.2, end: 39.7,  text: 'PDF on the right. Clean structured data on the left. Accuracy that beats OCR.' },

  // Scene 4 - Validate, Match & Surface Insights (40-57)
  { start: 40.4, end: 44.0,  text: 'Tax-invoice format checked against FTA rules. Duplicates flagged.' },
  { start: 44.2, end: 48.6,  text: 'Ratio fetches the matching purchase order and goods-received note straight from your ERP.' },
  { start: 48.8, end: 52.0,  text: 'Then surfaces what your team would have missed.' },
  { start: 52.2, end: 56.5,  text: 'Pricing drift. Possible duplicate. Vendor risk. Caught before approval.' },

  // Scene 6 - Approval (57-71)
  { start: 57.3, end: 61.5,  text: 'Routed via your Delegation of Authority matrix to the right approver.' },
  { start: 61.7, end: 66.0,  text: 'They open it on their phone. In Singapore, between flights.' },
  { start: 66.2, end: 70.7,  text: 'Full context. Audit trail. One tap. Approved.' },

  // Scene 7 - Payment & PDC (71-89)
  { start: 71.4, end: 76.0,  text: 'Pay via UAEFTS, IPP for instant transfers, or SWIFT for cross-border.' },
  { start: 76.2, end: 81.5,  text: 'Or issue a post-dated cheque. Ratio tracks the full lifecycle.' },
  { start: 81.7, end: 88.7,  text: 'Issued. Deposited. Cleared. All visible. All on time. Bounce-handling built in.' },

  // Scene 8 - Sync & Reconcile (89-113)
  { start: 89.4,  end: 98.0,  text: 'Sync reconciled entries with one click — to the ERP your team already uses.' },
  { start: 98.3,  end: 106.5, text: 'Every entry already has its bank match, journal lines, and the right Chart of Accounts.' },
  { start: 106.8, end: 112.5, text: 'Select all, sync — and your ledger is up to date in seconds.' },

  // Scene 9 - Closing (113-119)
  { start: 113.3, end: 118.5, text: 'Every invoice handled. Every record reconciled. Built for the UAE.' },
];

function SubtitleOverlay({ time }: { time: number }) {
  const cue = SUBTITLE_CUES.find(c => time >= c.start && time < c.end);
  return (
    <AnimatePresence mode="wait">
      {cue && (
        <motion.div
          key={cue.start}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-10 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none"
        >
          <div className="bg-black/65 text-white text-[15px] font-medium px-4 py-2 rounded-lg leading-relaxed backdrop-blur-sm text-center max-w-2xl">
            {cue.text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProgressBar({
  time,
  hovered,
  onSeek,
}: {
  time: number;
  hovered: boolean;
  onSeek: (t: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const progress = Math.min(time / TOTAL_DURATION, 1);

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(ratio * TOTAL_DURATION);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 select-none">
      <div
        ref={barRef}
        onClick={handleBarClick}
        className="w-full bg-[#E5E0D8] cursor-pointer relative"
        style={{ height: hovered ? 6 : 2, transition: 'height 0.15s ease' }}
      >
        <div className="h-full bg-[#1A1A2E] transition-none" style={{ width: `${progress * 100}%` }} />
        {hovered && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#1A1A2E] border-2 border-white shadow-md pointer-events-none"
            style={{ left: `${progress * 100}%`, marginLeft: -6 }}
          />
        )}
      </div>
    </div>
  );
}

function SceneRenderer({ scene, time }: { scene: number; time: number }) {
  // Scenes 3 & 4 share the same UI - render the merged component so there's no remount.
  if (scene === 3 || scene === 4) {
    const scene3Start = SCENE_TIMELINE.find(e => e.id === 3)!.start;
    const mergedT = Math.max(0, (time - scene3Start) * 1000);
    return <Scene04Match t={mergedT} />;
  }

  // Convert global time (seconds) into scene-local time (ms) so seeking lands correctly.
  const entry = SCENE_TIMELINE.find(e => e.id === scene);
  const localT = entry ? Math.max(0, (time - entry.start) * 1000) : 0;

  switch (scene) {
    case 1: return <Scene01Intro />;
    case 2: return <Scene02VendorMaster t={localT} />;
    case 6: return <Scene06Approval t={localT} />;
    case 7: return <Scene07PaymentPDC t={localT} />;
    case 8: return <Scene08SyncReconcile t={localT} />;
    case 9: return <Scene09Result />;
    default: return <Scene01Intro />;
  }
}

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [hovered, setHovered] = useState(false);
  const lastTickRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track previous scene group so we can render the transition from Scene 4
  // (bill detail) to Scene 6 (approval list) as a BACK navigation.
  const prevSceneGroupRef = useRef<string | number>('1');
  const sceneGroupKey: string | number = (currentScene === 3 || currentScene === 4) ? 'group-3-4' : currentScene;
  // Back nav happens when the bill detail (3/4) closes back into Approval (6).
  const isBackNav = prevSceneGroupRef.current === 'group-3-4' && sceneGroupKey === 6;
  useEffect(() => { prevSceneGroupRef.current = sceneGroupKey; }, [sceneGroupKey]);

  // Contain-scale (always render at 1280×768)
  const [viewScale, setViewScale] = useState({ scale: 1, offsetX: 0, offsetY: 0 });
  useEffect(() => {
    const CANVAS_W = 1280;
    const CANVAS_H = 768;
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / CANVAS_W, vh / CANVAS_H);
      const offsetX = (vw - CANVAS_W * scale) / 2;
      const offsetY = (vh - CANVAS_H * scale) / 2;
      setViewScale({ scale, offsetX, offsetY });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const bgmRef = useRef<HTMLAudioElement>(null);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setHasStarted(false);
    setCurrentScene(1);
    setTime(0);
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
  }, []);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    setIsPlaying(true);
  }, [hasStarted]);

  // Auto-start when embedded
  useEffect(() => {
    if (isEmbedded && !hasStarted) {
      const t = setTimeout(() => start(), 500);
      return () => clearTimeout(t);
    }
  }, [hasStarted, start]);

  // Synthetic clock - drives time forward when playing
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTickRef.current = 0;
      return;
    }
    const tick = (now: number) => {
      if (lastTickRef.current === 0) lastTickRef.current = now;
      const dt = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      setTime(t => {
        const next = t + dt;
        if (next >= TOTAL_DURATION) {
          // Loop or stop; we stop and reset cleanly
          setTimeout(() => reset(), 200);
          return TOTAL_DURATION;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, reset]);

  // Drive currentScene from time
  useEffect(() => {
    if (!hasStarted) return;
    const next = sceneAtTime(time);
    setCurrentScene(prev => (prev !== next ? next : prev));
  }, [time, hasStarted]);

  // BGM control
  useEffect(() => {
    const bgm = bgmRef.current;
    if (!bgm) return;
    if (isPlaying) bgm.play().catch(() => {});
    else bgm.pause();
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    setIsPlaying(p => {
      const next = !p;
      if (!next) {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        setHovered(true);
      }
      return next;
    });
  }, []);

  const handleSeek = useCallback((t: number) => {
    setTime(t);
    setCurrentScene(sceneAtTime(t));
    if (!isPlaying && hasStarted) setIsPlaying(true);
  }, [isPlaying, hasStarted]);

  // Space → play/pause
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' && hasStarted) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasStarted, togglePlay]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#FBF7F1]">
      <div
        style={{
          width: 1280,
          height: 768,
          transformOrigin: 'top left',
          transform: `translate(${viewScale.offsetX}px, ${viewScale.offsetY}px) scale(${viewScale.scale})`,
        }}
        className="flex flex-col font-sans bg-[#FBF7F1] relative"
        onMouseMove={() => {
          setHovered(true);
          if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
          if (isPlaying) {
            hoverTimerRef.current = setTimeout(() => setHovered(false), 2000);
          }
        }}
        onMouseLeave={() => {
          if (isPlaying) setHovered(false);
          if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        }}
      >
        <audio ref={bgmRef} src="/bgm.mp3" preload="auto" loop
          onCanPlay={() => { if (bgmRef.current) bgmRef.current.volume = 0.14; }} />

        <TopBar currentScene={currentScene} />

        <div className="flex-1 mt-12 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait" custom={isBackNav ? 'back' : 'forward'}>
            <motion.div
              key={sceneGroupKey}
              custom={isBackNav ? 'back' : 'forward'}
              variants={SCENE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: isBackNav ? 0.45 : 0.22,
                ease: isBackNav ? [0.32, 0.72, 0.26, 1] : [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 flex flex-col"
            >
              <SceneRenderer scene={currentScene} time={time} />
            </motion.div>
          </AnimatePresence>
        </div>

        <SubtitleOverlay time={time} />

        {hasStarted && (
          <ProgressBar time={time} hovered={hovered} onSeek={handleSeek} />
        )}

        <AnimatePresence>
          {hasStarted && hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-[55] flex items-center justify-center pointer-events-none"
            >
              <button
                className="w-24 h-24 rounded-full bg-[#1A1A2E] flex items-center justify-center shadow-xl pointer-events-auto"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                    <rect x="1" y="1" width="7" height="24" rx="2" fill="white" />
                    <rect x="13" y="1" width="7" height="24" rx="2" fill="white" />
                  </svg>
                ) : (
                  <svg width="24" height="28" viewBox="0 0 20 24" fill="none">
                    <path d="M2 2L18 12L2 22V2Z" fill="white" />
                  </svg>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!hasStarted && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-[60] flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(251,247,241,0.78)' }}
              onClick={start}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-24 h-24 rounded-full bg-[#1A1A2E] flex items-center justify-center shadow-xl">
                  <svg width="28" height="34" viewBox="0 0 20 24" fill="none">
                    <path d="M2 2L18 12L2 22V2Z" fill="white" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
