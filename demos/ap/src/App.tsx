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

// Pure opacity crossfade between scenes. Position-based variants used to
// conflict with each scene's own internal entry animations (right panel
// slide, list-row staggers, cursor moves) and read as a "shake" while the
// layout settled.
const SCENE_VARIANTS = {
  enter:  { opacity: 0 },
  center: { opacity: 1 },
  exit:   { opacity: 0 },
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

// ── Subtitles - cues map to spoken VO timestamps in /public/vo.mp3 ───────────
const SUBTITLE_CUES: { start: number; end: number; text: string }[] = [
  // Scene 1 - Intro
  { start: 0.6,   end: 7.4,   text: 'This is Ratio. Your AI Agent for Accounts Payable — purpose-built for companies in the UAE.' },

  // Scene 2 - Vendor Onboarding
  { start: 7.5,   end: 12.0,  text: 'You can onboard a new vendor with just their WhatsApp number or email address.' },
  { start: 12.1,  end: 20.1,  text: "Ratio's AI agent reaches out and collects the trade licence and IBAN certificate." },
  { start: 20.2,  end: 30.2,  text: 'It verifies and validates the documents, schedules continuous monitoring, and completes the onboarding.' },

  // Scene 3 - Invoice Intake
  { start: 30.3,  end: 33.7,  text: 'Vendors send the invoice to Ratio on WhatsApp.' },
  { start: 34.2,  end: 41.5,  text: "Ratio's extraction model is trained on thousands of UAE invoices — both in English and Arabic." },
  { start: 41.9,  end: 51.9,  text: 'It beats legacy OCR — extracting every line item, TRN, AED amount, and VAT.' },

  // Scene 4 - Validate, Match & Surface Insights
  { start: 52.1,  end: 58.4,  text: 'Tax-invoice format checked against FTA rules. Duplicates flagged.' },
  { start: 58.5,  end: 64.6,  text: "Ratio's AI also fetches the matching purchase order and GRN from your ERP." },
  { start: 64.7,  end: 69.5,  text: 'For every invoice, it surfaces smart insights your team would have missed.' },
  { start: 69.6,  end: 77.7,  text: 'Pricing drift. Possible duplicate. Vendor risk. Caught before approval.' },

  // Scene 6 - Approval
  { start: 77.8,  end: 85.2,  text: 'Approval workflow routes the right invoice to the right approver — payments made on time.' },
  { start: 85.3,  end: 93.4,  text: "The approver can approve in one click — in Ratio's mobile app or WhatsApp." },
  { start: 93.8,  end: 96.1,  text: 'Full context of the invoice, with the audit trail.' },

  // Scene 7 - Payment & PDC
  { start: 96.2,  end: 105.1, text: 'Pay via UAEFTS, IPP for instant transfers, or SWIFT for cross-border.' },
  { start: 105.2, end: 110.6, text: 'Or issue a post-dated cheque. Ratio tracks the full lifecycle.' },

  // Scene 8 - Sync & Reconcile
  { start: 110.7, end: 116.0, text: 'Ratio integrates with your ERP — sync reconciled entries with one click.' },
  { start: 116.6, end: 126.3, text: 'Bank match, journal lines, and the right Chart of Accounts — your ledger always up to date.' },

  // Scene 9 - Closing
  { start: 126.4, end: 131.8, text: 'Every invoice handled. Every payment reconciled. Built for the UAE.' },
];

function SubtitleOverlay({ time }: { time: number }) {
  const cue = SUBTITLE_CUES.find(c => time >= c.start && time < c.end);
  if (!cue) return null;
  return (
    <div className="absolute bottom-10 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none">
      <div
        key={cue.start}
        className="bg-black/65 text-white text-[15px] font-medium px-4 py-2 rounded-lg leading-relaxed backdrop-blur-sm text-center max-w-2xl"
      >
        {cue.text}
      </div>
    </div>
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
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scenes 3 and 4 share a single mounted component so the bill-detail
  // doesn't remount when we move from intake to validate.
  const sceneGroupKey: string | number = (currentScene === 3 || currentScene === 4) ? 'group-3-4' : currentScene;

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
  const voRef = useRef<HTMLAudioElement>(null);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setHasStarted(false);
    setCurrentScene(1);
    setTime(0);
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
    if (voRef.current) {
      voRef.current.pause();
      voRef.current.currentTime = 0;
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

  // Audio-driven clock - VO playback drives `time`. Subtitles and scene
  // keyframes therefore stay locked to the recorded voiceover.
  useEffect(() => {
    const vo = voRef.current;
    if (!vo) return;
    const onTime = () => setTime(vo.currentTime);
    const onEnded = () => { setTimeout(() => reset(), 200); };
    vo.addEventListener('timeupdate', onTime);
    vo.addEventListener('ended', onEnded);
    return () => {
      vo.removeEventListener('timeupdate', onTime);
      vo.removeEventListener('ended', onEnded);
    };
  }, [reset]);

  // Drive currentScene from time
  useEffect(() => {
    if (!hasStarted) return;
    const next = sceneAtTime(time);
    setCurrentScene(prev => (prev !== next ? next : prev));
  }, [time, hasStarted]);

  // BGM + VO playback control
  useEffect(() => {
    const bgm = bgmRef.current;
    const vo = voRef.current;
    if (isPlaying) {
      bgm?.play().catch(() => {});
      vo?.play().catch(() => {});
    } else {
      bgm?.pause();
      vo?.pause();
    }
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
    if (voRef.current) voRef.current.currentTime = t;
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
          onCanPlay={() => { if (bgmRef.current) bgmRef.current.volume = 0.06; }} />
        <audio ref={voRef} src="/vo.mp3" preload="auto"
          onCanPlay={() => { if (voRef.current) voRef.current.volume = 1.0; }} />

        <TopBar currentScene={currentScene} />

        <div className="flex-1 mt-12 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={sceneGroupKey}
              variants={SCENE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
