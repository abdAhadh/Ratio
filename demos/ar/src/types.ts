export interface SceneDefinition {
  id: number;
  duration: number; // seconds
  title: string;
  group: string;
  skipTo?: number;  // if set, auto-advance jumps to this scene number instead of id+1
}

export const SCENES: SceneDefinition[] = [
  { id: 1,  duration: 4.3,  title: 'Welcome',              group: 'intro' },
  { id: 2,  duration: 8.7,  title: 'Sync',                 group: 'sync' },
  { id: 3,  duration: 5.9,  title: 'Customer Buckets',     group: 'collections' },
  { id: 4,  duration: 6.2,  title: 'Communication Journey', group: 'collections' },
  { id: 5,  duration: 32.0, title: 'Collections: Live',    group: 'collections', skipTo: 8 },
  { id: 6,  duration: 1,    title: 'Collections: Call',    group: 'collections' },
  { id: 7,  duration: 1,    title: 'Collections: Email',   group: 'collections' },
  { id: 8,  duration: 10.8, title: 'AR Table',             group: 'ar' },
  { id: 9,  duration: 14.0, title: 'Credit Profile',       group: 'credit' },
  { id: 10, duration: 17.8, title: 'Cash Application',     group: 'cash' },
  { id: 11, duration: 4.9,  title: 'AR Overview',          group: 'overview' },
  { id: 12, duration: 7.0,  title: 'The Result',           group: 'end' },
];

export const NAV_GROUPS = ['intro', 'sync', 'collections', 'ar', 'credit', 'cash', 'overview', 'end'];
