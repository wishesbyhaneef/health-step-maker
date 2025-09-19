import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e3c41ccdfe384870a7f04bd78dcf24e9',
  appName: 'Health Steps Tracker',
  webDir: 'dist',
  server: {
    url: 'https://e3c41ccd-fe38-4870-a7f0-4bd78dcf24e9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHealthKit: {
      readPermissions: ['HKQuantityTypeIdentifierStepCount'],
      writePermissions: ['HKQuantityTypeIdentifierStepCount']
    }
  }
};

export default config;