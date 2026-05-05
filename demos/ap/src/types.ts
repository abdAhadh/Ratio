export interface SceneDefinition {
  id: number;
  duration: number; // seconds
  title: string;
  group: string;
}

// 9 scenes mapped to the demo moments. Total ≈ 132s, matched to vo.mp3.
export const SCENES: SceneDefinition[] = [
  { id: 1, duration: 7.5,  title: 'Welcome',          group: 'intro' },
  { id: 2, duration: 22.8, title: 'Vendor Onboarding', group: 'setup' },
  { id: 3, duration: 17.5, title: 'Invoice Intake',   group: 'invoice' },
  { id: 4, duration: 30.0, title: 'Validate & Match', group: 'invoice' },
  { id: 6, duration: 18.4, title: 'Approval',         group: 'approval' },
  { id: 7, duration: 14.5, title: 'Payment & PDC',    group: 'pay' },
  { id: 8, duration: 15.7, title: 'Sync & Reconcile', group: 'sync' },
  { id: 9, duration: 5.8,  title: 'The Result',       group: 'end' },
];

export const NAV_GROUPS = ['intro', 'setup', 'invoice', 'approval', 'pay', 'sync', 'end'];
