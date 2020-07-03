![SenecaHackathonLogo](/images/logo.jpg)
# ASAP Bookings
A platform that allows users to schedule appointments with their favourite restaurants and minimize waiting time by increasing the efficiency of the process. We aim to minimize the scope of spreading COVID-19 by decreasing the gathering of people in lineups for both Dine-In and Takeout orders.

Supported devices:
* Android
* iOS

## Table of contents
- [How it works](#how-it-works)
- [Installing the development build](#installing-the-development-build)
- [Running the development build](#running-the-development-build)
- [Dependencies](#dependencies)
- [Authors](#authors)

## How it works
![0](/images/0.png)<br />
Login with Facebook or Google<br /><br />
![1](/images/1.png)<br />
Make a reservation or opt for a takeout order.<br /><br />
![2](/images/2.png)<br />
When making a reservation, pick a day and the number of guests attending.<br /><br />
![3](/images/3.png)<br />
Pick an available time for your reservation.<br /><br />
![4](/images/4.png)<br />
Confirm your booking.<br /><br />
![5](/images/5.png)<br />
Get a notification reminder 30 minutes before the reservation.<br /><br />
![6](/images/6.png)<br />
See a list of all your bookings.<br /><br />
![7](/images/7.png)<br />
Easily reschedule or cancel appointments.<br /><br />

## Installing the development build
```
git clone https://github.com/pavelsinelnikov/ASAP-Bookings.git
```
* Set up environment.js with environment variables
* Set up Firebase for Facebook and Google authentication
* Download google-services.json and place in root directory
## Running the development build
```
expo start
```

## Dependencies
List of the main dependencies used for this project:
* react-native
* react-navigation
* expo
* firebase
* moment

## Authors
* **Stephen Park** - [spark0843](https://github.com/spark0843)
* **Pavel Sinelnikov** - [pavelsinelnikov](https://github.com/pavelsinelnikov)

[Back to top](#asap-bookings)
