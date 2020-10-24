# SickBot

Discord Bot handle Italian covid data provided by Protezione civile. This bot use Python and matplotlib to dynamically generate stackedbar and radar charts images of the data.

* Code is provided as an example, without an .env file you cant run this project. *

pm2 install typescript

Start Bot interface
pm2 start ecosystem.config.js --env production --name sickBot

Start Bot Backend:
pm2 start start.js --name sickBot_backend

Create a new forder images in backend/charts/
