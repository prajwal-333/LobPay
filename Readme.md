# LobPay

## Introduction
LobPay is a mobile app where the customers can pay to small merchants at their shops on the merchant's mobile using just a Pin. Customers can subscribe to different merchants based on and their number of subscribers and distance of the shop. Customers can also view their bills on their app and merchants can manage their Inventory.


## Technology Stack
Frontend -> React Native<br/>
Backend -> Django Rest framework<br/>
Database -> sqlite3

## Setup

```bash
# Setup for django server
python3 -m pip install djangorestframework

# setup for react-native
npm install -g expo-cli
expo install
```

## Usage

```bash
# Set the url in settings.py file
python3 manage.py runserver

# Set the url to variable apiHost
expo start            # Starts Metro Bundler (Scan QR with Expo App to run it on the device (Android, IOS)
expo start --android  # Run on Android Emulator
```
