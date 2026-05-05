export interface SceneDefinition {
  id: number;
  duration: number; // seconds
  title: string;
  group: string;
}

// 9 scenes mapped 1:1 to the demo moments. Total ≈ 110s.
export const SCENES: SceneDefinition[] = [
  { id: 1, duration: 5,  title: 'Welcome',          group: 'intro' },
  { id: 2, duration: 21, title: 'Vendor Onboarding', group: 'setup' },
  { id: 3, duration: 14, title: 'Invoice Intake',   group: 'invoice' },
  { id: 4, duration: 17, title: 'Validate & Match', group: 'invoice' },
  { id: 6, duration: 14, title: 'Approval',         group: 'approval' },
  { id: 7, duration: 18, title: 'Payment & PDC',    group: 'pay' },
  { id: 8, duration: 24, title: 'Sync & Reconcile', group: 'sync' },
  { id: 9, duration: 6,  title: 'The Result',       group: 'end' },
];

export const NAV_GROUPS = ['intro', 'setup', 'invoice', 'approval', 'pay', 'sync', 'end'];
