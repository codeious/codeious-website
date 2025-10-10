import * as migration_20251005_185702 from './20251005_185702';

export const migrations = [
  {
    up: migration_20251005_185702.up,
    down: migration_20251005_185702.down,
    name: '20251005_185702'
  },
];
