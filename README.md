# SickBot

Discord Bot to handle Italian covid data provided by Protezione civile. This bot use Python and matplotlib to dynamically generate stackedbar and radar charts images of the data.

* Code is provided as an example, without an .env file you cant run this project.


pm2 install typescript

Start Bot interface:
pm2 start ecosystem.config.js --env production --name sickBot

Start Bot Backend:
pm2 start start.js --name sickBot_backend

Create a new forder images in backend/charts/


# SickBot Command Help:

Last data about Italy:
!!covid

Last data about picked Italian Region:
!!covid r <region>
  
Last data about picked Italian Province:
!!covid p <province>
  
Stacked Bar Chart with Region data between two dates:
!!covid rc sbars 2020-03-01 - 2020-03-20 <region>
  
Radar Chart with Region data between two dates
!!covid rc radar 2020-03-01 - 2020-03-20 <region>
  
Stacked Bar Chart with Province data between two dates:
!!covid pc sbars 2020-03-01 - 2020-03-20 <province>
