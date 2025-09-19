# iOS Health Steps Tracker - Mobile Setup

This React app can be packaged as an iOS app using Capacitor to add steps directly to the iOS Health app.

## 🏃‍♀️ Features

- Clean iOS-style interface matching your design
- Add custom step counts with date/time
- Integration with iOS HealthKit
- Responsive design for all iOS devices

## 📱 Running on iOS Device

### Prerequisites
- Mac with Xcode installed
- iOS Developer account (for physical device testing)
- Node.js and npm

### Setup Steps

1. **Export to GitHub**
   - Use the "Export to Github" button in Lovable
   - Clone your repository locally

2. **Install Dependencies**
   ```bash
   cd your-project-name
   npm install
   ```

3. **Initialize Capacitor** (if not already done)
   ```bash
   npx cap init
   ```

4. **Add iOS Platform**
   ```bash
   npx cap add ios
   ```

5. **Build the Web App**
   ```bash
   npm run build
   ```

6. **Sync with iOS**
   ```bash
   npx cap sync ios
   ```

7. **Open in Xcode**
   ```bash
   npx cap open ios
   ```

8. **Configure HealthKit in Xcode**
   - In Xcode, select your project
   - Go to "Signing & Capabilities"
   - Click "+ Capability" and add "HealthKit"
   - In `Info.plist`, add HealthKit usage descriptions:
   ```xml
   <key>NSHealthShareUsageDescription</key>
   <string>This app needs access to read step data from Health app</string>
   <key>NSHealthUpdateUsageDescription</key>
   <string>This app needs access to write step data to Health app</string>
   ```

9. **Run on Device/Simulator**
   - Select your target device in Xcode
   - Click the "Run" button

## 🔧 HealthKit Integration

The app includes a HealthKit service that handles:
- Permission requests for step data
- Adding step counts to Health app
- Reading existing step data

For production use, you'll need to install the HealthKit plugin:
```bash
npm install @perfood/capacitor-healthkit --legacy-peer-deps
```

**Note**: Due to Capacitor version compatibility, use the `--legacy-peer-deps` flag. The app includes fallback handling for development and testing.

## 🔄 Development Workflow

After making changes:
1. Git pull from your repository
2. Run `npx cap sync` to sync changes
3. The app will hot-reload in simulator/device

## 📝 Notes

- The app now uses the maintained `@perfood/capacitor-healthkit` plugin
- For full HealthKit functionality, run `npx cap sync` after deployment
- Test on physical device for full HealthKit experience
- Ensure proper code signing for device deployment

## 🔗 Useful Links

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [HealthKit Documentation](https://developer.apple.com/healthkit/)
- [Capacitor Health Plugin](https://github.com/capacitor-community/health)

---

For more mobile development tips and troubleshooting, visit: https://lovable.dev/blogs/TODO