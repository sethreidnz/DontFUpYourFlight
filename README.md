## Quick Start

>**Note**: You will need to be setup to run React Native on your system. See their guide [here](https://facebook.github.io/react-native/docs/getting-started.html#content)
> For a guide on some common install issue troubleshooting see [React Native Install Troubleshooting](/Docs/react-native-install-troubleshooting.md)

**Clone the repo**

```bash
git clone http://github.com/justsayno/GroundUp-Mobile
cd GroundUp-Mobile
```

**Install the dependencies**

```bash
npm install -g react-native-cli
```

**Run the Android app**

1. Open Android Studio (into any project)

1. Click on Tools > Android > AVD Manager

1. On the right hand side next to the emulator you want to run click on the **play icon**

1. Run a command line **as administrator**:

  ```bash
  cd GroundUp
  react-native run-android
  ```
  >**NOTE:** If you see errors you may need to cd into the **android** folder and run `gradlew clean` (as administrator)

The app should now be running in the emulator.

**Run the IoS app**

[Follow the docs](https://facebook.github.io/react-native/docs/running-on-simulator-ios.html)

**The developer menu on the app**

Once the app is running you can press CTRL + M and see the developer menu.

**Hot Module Reloading**

Enable this from your developer menu for live reload
