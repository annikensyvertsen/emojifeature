# EMOJIFEATURE
This is an early prototype for a feature that is being tested for a potential streaming platform. The purpose is to test whether or not the audience is interested in using their phone as a personal aid during a concert. If you type the same IP-address on severel browsers (phones), multiple people can try the feature out at the same time to get an increased effect of a community and a visualize the energi level. 

## Setting up the project

Start by cloning the project.
Navigate into the folder on your computer where you want to have the project.

`git clone github.com/annikensyvertsen/emojifeature` 

Make sure you have npm installed 

Navigate into the the root folder.

`cd emojifeature` 

## Set up backend
`cd api` 

`npm install` 

`npm start` 

Runs the app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

## Set up frontend
`cd frontend` 

`npm install` 

`npm start` 

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

To use the platform with web and phone, check the ip-address at your machine and change "IPAdress" and "ENDPOINT" in all files to your IP-adress. To use it on you phone, type the IP-adress + :3000 (example: http://192.168.1.191:3000') in your browser. If you click the emoji, the emojis should pop up at the site at your computer.

What the platform looks like at the computer screen:

![Screenshot](public/screenshot1.png)

What the platform looks like at the phone screen:

![Screenshot](public/screenshot2.png)


