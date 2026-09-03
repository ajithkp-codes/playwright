import { CurrentsConfig } from '@currents/playwright';

const config: CurrentsConfig = {
  projectId: 'LBuyQE',
  recordKey: process.env.CURRENTS_RECORD_KEY!,
};

export default config;
