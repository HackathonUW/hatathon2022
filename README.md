<div align="center">

# Crowd Code
_crowdsourced, collaborative integration testing_
  
</div>

A web app designed to help CS students work together towards better code via end to end integration testing. The idea is that for programming assignments where everyone's code must comply with a standard interface, anyone can upload a test to the project site and everyone can run all of the tests against their implementation.

Created in 24 hours with ❤️ and 🍕 by [Geoffrey Xue](https://github.com/GeoffreyXue), [Aiden Cohen](https://github.com/AidenCohen31), [Akshay Joshi](https://github.com/akjoshi2), and [Michael Noguera](https://github.com/michaelnoguera).

🥉 Won third place at the 2022 [UPL](https://upl.cs.wisc.edu) [Hatathon](https://hatathon.devpost.com).

## Demo

In this example, the sample tests are:
1. checking if `expr` will output 2 when asked to calculate 1+1
2. checking if `echo` will output "hello world" when given "hello world" as input
3. checking if `echo "hello world"` outputs "yeet", demonstrating what a failed test case looks like

In reality, you would not use this program to test built-in system utilities, but rather invoke your own program to check its output.

https://user-images.githubusercontent.com/44954999/154121739-b9603474-f5e6-4cfc-b7d1-fd2ca25063a6.mp4

### Live Project Site
You can access our web app at [https://hatathon.web.app/](https://hatathon.web.app/). At the time of this writing, it is online and working.

## Design
![Diagram showing interactions between various parts of the project.](https://user-images.githubusercontent.com/44954999/154122457-4988763a-43f0-4757-895f-391e5aa64650.jpg)

The project is built with a React frontend that communicates via a Flask backend to the local test runner program. Tests and state data are stored in a MySQL database managed by the Flask server. This diagram illustrates how important this communication is to making everything work.

### Backend
![repo-2](https://user-images.githubusercontent.com/44954999/154114177-310541d1-17ce-41f9-9676-40c60123b2aa.svg) **[HackathonUW/HatathonBackend](https://github.com/HackathonUW/HatathonBackend)**

### Client Script
![repo-2](https://user-images.githubusercontent.com/44954999/154114177-310541d1-17ce-41f9-9676-40c60123b2aa.svg) **[HackathonUW/hatathon-client](https://github.com/HackathonUW/hatathon-client)**

This script is needed to use the application. Please be careful when running it, because it will execute whatever code internet people have entered in the web app on your system. You should probably try this in a VM if you have important files on your computer. (Ideally, the project would be built to run within Docker, but that feature wasn't realized during the 24-hour period.)

## Developed using:
- [React](https://reactjs.org/) (Frontend)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) (Backend)
- [Firebase](http://firebase.google.com/) (Firebase Hosting)
- [Heroku](https://www.heroku.com/) (Backend Hosting)
- [Google Auth](https://console.cloud.google.com/) (Login and User Management)
- [Python](https://www.python.org) and the [requests library](https://docs.python-requests.org/en/latest/) (Platform-independent Test Runner)

### React primary dependencies:
- [Chakra](https://chakra-ui.com/) (React component library for styling, icons, responsive design, positioning)
- [React Router](https://reactrouter.com/) (react-router-dom for switching between tabs)
- [React Fade In](https://www.npmjs.com/package/react-fade-in) (Basic fade in animations)
- [React Typewriter Effect](https://www.npmjs.com/package/typewriter-effect) (Typewriting effect)
