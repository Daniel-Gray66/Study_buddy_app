# StudyGroupApp

A React Native application for finding and joining study groups, built with Expo, React Navigation, and Firebase.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v20.19.4 or later recommended)
   - Download: [Node.js Official Website](https://nodejs.org/)

2. **npm** (comes with Node.js) or **Yarn**
   - Yarn can be installed via: `npm install -g yarn`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Android Studio** (for Android development)
   - Download: [Android Studio](https://developer.android.com/studio)
   - Install the Android SDK and create a virtual device

5. **Git** (for version control)
   - Download: [Git](https://git-scm.com/)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StudyGroupApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your Firebase configuration (ask a team member for the .env template)

4. **Install Expo Go**
   - On your mobile device, install Expo Go from the [App Store](https://apps.apple.com/app/apple-store/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Running the App

### For Development

1. **Start the development server**
   ```bash
   npx expo start
   ```

2. **Run on Android Emulator**
   - Press `a` in the terminal after starting the development server
   - Make sure you have an Android emulator running or a physical device connected



### For Production

1. **Build the app**
   ```bash
   # For Android
   npx expo prebuild
   npx expo run:android

   # For iOS (Mac only)
   npx expo prebuild
   npx expo run:ios
   ```

## Project Structure

```
StudyGroupApp/
├── assets/            # Images and other static files
├── src/
│   ├── components/    # Reusable components
│   ├── screens/       # App screens
│   ├── navigation/    # Navigation configuration
│   ├── config/        # Configuration files
│   └── context/       # React Context providers
├── App.tsx           # Main application component
└── app.json          # Expo configuration
```

## Dependencies

- React Native
- Expo
- React Navigation
- Firebase (Authentication, Firestore)
- React Native Maps
- React Native Paper (UI Components)
- AsyncStorage






