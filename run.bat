@ECHO OFF
REM BFCPEOPTIONSTART
REM Advanced BAT to EXE Converter www.BatToExeConverter.com
REM BFCPEEXE=
REM BFCPEICON=
REM BFCPEICONINDEX=-1
REM BFCPEEMBEDDISPLAY=0
REM BFCPEEMBEDDELETE=1
REM BFCPEADMINEXE=0
REM BFCPEINVISEXE=0
REM BFCPEVERINCLUDE=0
REM BFCPEVERVERSION=1.0.0.0
REM BFCPEVERPRODUCT=Product Name
REM BFCPEVERDESC=Product Description
REM BFCPEVERCOMPANY=Your Company
REM BFCPEVERCOPYRIGHT=Copyright Info
REM BFCPEOPTIONEND
@ECHO ON
ECHO OFF
CLS
:MENU
color a
ECHO.
ECHO ...............................................
ECHO PRESS 1, 2, 3, 4 or 5 to select your task.
ECHO ...............................................
ECHO By Aurelian! *NO EDIT THE NAME OF FILES*
ECHO ...............................................
ECHO.
ECHO 1 - Turn on the bot (With Node, Simple)
ECHO 2 - Turn on the bot (With Nodemon)
ECHO 3 - Install NodeApp
ECHO 4 - Install Nodemon
ECHO 5 - Info Developer
ECHO.
SET /P M=Type 1, 2, 3, 4 or 5 then press ENTER:
IF %M%==1 GOTO BOT
IF %M%==2 GOTO BOTN
IF %M%==3 GOTO NODE
IF %M%==4 GOTO NODEM
IF %M%==5 GOTO INFO
:BOT
cls
ECHO By Aurelian
ECHO.
ECHO.
node index.js
pause
GOTO MENU
:BOTN
cls
ECHO By Aurelian
ECHO.
ECHO.
nodemon index.js
pause
GOTO MENU
:NODE
CLS
ECHO By Aurelian
ECHO.
ECHO.
explorer "https://nodejs.org/en/download/"
ECHO Finished!
pause
GOTO MENU
:NODEM
CLS
ECHO By Aurelian
ECHO.
ECHO.
npm i nodemon -g
pause
GOTO MENU
:INFO
CLS
ECHO By Aurelian
ECHO.
ECHO.
ECHO .......................................
ECHO .
ECHO A - Github
ECHO B - Discord
ECHO C - Twitch
ECHO D - Steam
ECHO F - PayPal
ECHO G - Email
ECHO ...............................................
ECHO By Aurelian! *NO EDIT THE NAME OF FILES*
ECHO ...............................................
ECHO.
ECHO.
ECHO.
SET /P M=Type A, B, C, D, E, F, or G then press ENTER:
IF %M%==A GOTO GITHUB
IF %M%==B GOTO DISCORD
IF %M%==C GOTO TWITCH
IF %M%==D GOTO STEAM
IF %M%==E GOTO MBOT
IF %M%==F GOTO PAYPAL
IF %M%==G GOTO EMAIL
:GITHUB
CLS
ECHO By Aurelian
ECHO.
ECHO.
ECHO Open your browser... in 3..
ECHO 2..
ECHO 1..
explorer "https://github.com/aurelian123"
ECHO Finished!
pause
GOTO MENU
:DISCORD
CLS
ECHO By Aurelian
ECHO.
ECHO.
ECHO My discord is
ECHO Aurelian#0845
pause
GOTO MENU
:TWITCH
CLS
ECHO By Aurelian
ECHO.
ECHO.
ECHO Open your browser... in 3..
ECHO 2..
ECHO 1..
explorer "twitch.tv/aurelian1"
ECHO Finished!
pause
GOTO MENU
:STEAM
CLS
ECHO By Aurelian
ECHO.
ECHO.
ECHO Open your browser... in 3..
ECHO 2..
ECHO 1..
explorer "https://steamcommunity.com/id/aurelianu/"
ECHO Finished
pause
GOTO MENU
:PAYPAL
CLS
ECHO By Aurelian
ECHO.
ECHO.
ECHO Open your browser... in 3..
ECHO 2..
ECHO 1..
explorer "paypal.me/aurelianu"
ECHO Finished
pause
GOTO MENU
:EMAIL
CLS
ECHO By Aurelian
ECHO.
ECHO.
ECHO My Email is:
ECHO aaurelianu@gmail.com
pause
GOTO MENU
