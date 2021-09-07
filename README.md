# Security Disclaimer
This project, and notably its package list, has not been updated since January 2021, and there are no plans to update or maintain it going forward. As such, the packages upon which this project depends are severely outdated and almost certainly vulnerable, and they should be updated before using this code.

# borderhacks-wavedirect
Created for the WaveDirect Challenge at BorderHacks 2020

## Setup
This project is a cross-platform React Native app built on the Expo platform. To run the project, you must follow the steps at Expo's [Getting Started](https://expo.io/learn) page. The gist of it is this:
1. Install [Node.js](https://nodejs.org/en/)
2. Install the Expo CLI with `npm install expo-cli --global`
3. Install the Expo app on whatever device or emulator you plan to test with. ([App Store](https://itunes.apple.com/app/apple-store/id982107779)) ([Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www))

## Features
* Major app sections are accessible using bottom tabs
  * The My Account page provides access to personal and product information, as well as providing buttons to call or email WaveDirect sales
  * The Outage Map page displays a live coverage/outage map and textual information on the status of the user's current access point
  * The Live Support page provides a live chat function to communicate with support staff (Replies in this prototype are randomly generated)
* Other features are accessible in a side drawer
  * Links to useful pages on the WaveDirect website
  * A page to refer a friend to WaveDirect
  * Light and dark themes
  * The log out button
* A login page with hard-coded user credentials (any email in the test data will work, and the password is always "password")
* Simulated API to interact with hard-coded test data

## Disclaimer
I do not have access to an Apple device, so this project has not been tested on iOS. It should work, but I can't be certain.
