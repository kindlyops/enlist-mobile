## enlist

This repository contains enlist's iOS and Android apps, written using React Native.

### iOS builds

### Android builds

react-native start

react-native bundle --platform android --entry-file=index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

react-native run-android

#### lower level build tasks

    ./gradlew assembleDebug
		./gradlew assembleRelease
