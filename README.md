# E'DAY Reminder App

### [Live Site](https://edayreminders.netlify.app)

## Screens

![home](https://res.cloudinary.com/ignitegaming/image/upload/v1621243243/projects/Reminder%20App/edayreminders.netlify.app_dashboard_5_zzfnxu.png)

![login](https://res.cloudinary.com/ignitegaming/image/upload/v1621243247/projects/Reminder%20App/edayreminders.netlify.app_dashboard_1_itmwhd.png)

![dashboard](https://res.cloudinary.com/ignitegaming/image/upload/v1621243248/projects/Reminder%20App/edayreminders.netlify.app_dashboard_zizmst.png)

![newreminder](https://res.cloudinary.com/ignitegaming/image/upload/v1621243248/projects/Reminder%20App/edayreminders.netlify.app_dashboard_3_vxrvb2.png)

![allreminder](https://res.cloudinary.com/ignitegaming/image/upload/v1621243244/projects/Reminder%20App/edayreminders.netlify.app_dashboard_4_vdhxvc.png)

## Introduction

It's an easy to use fullstack app that lets users create reminder's for any time in future and notifies users with the reminder at that time ,depending on where they wish to receive the reminder notification on, i.e, on Email or Mobile No.

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:sanyams0007/reminder-app.git
$ cd reminder-app
```

### 2. Setup:

- Create .env file in root folder and set below
  -DB_CONNECTION_URL=YOUR_MONGODB_URL
  -JWT_SECRET=YOUR_SECRET
  -OUTLOOK_USER=YOUR_OUTLOOK_MAIL
  -OUTLOOK_PASS=YOUR_OUTLOOK_PASS
  -F2S_AUTH_KEY=YOUR_F2S_API_KEYS

- run `npm i && npm start` for both client and server folder to start the app

## TechStack used:

MongoDB, Express.js, React.js, Node.js (MERN)

## Learning

This was a great experience for me as I learnt building basic CRUD RestAPI from Scratch, implementing a job scheduler in real time, creating and updating database in real time using React, fetching data from backend and to present it properly in frontend on react app.
