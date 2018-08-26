# Rabbithole

### Rabbithole 

Rabbithole is a Chrome Extension that lets you analyze your browsing habits. 

## Background and Overview

Sometimes, when you’re doing research, you don’t just want to save a page; you want to save a whole group of tabs. If you get somewhere interesting, you may ask yourself, “How did I get here?” Rabbithole will tell you how, and let you save those paths.

Rabbithole will be accompanied by a Web application which lets a user visualize and interact with these saved paths. Potentially add a favorites feature -- favorite an entire tree/subtree: a RABBITHOLE! 

We will need to: 
  * Make a Chrome extension that collects data 
  * Build a database to store user and browsing data
  * Construct a Web application for visualization of and interaction with the collected browser data
  * Decide how to handle privacy issues: ideally, store data on user machines and give them options to delete unwanted data

## Functionality & MVP

   - [ ] Chrome extension with landing page in new tab for login 
   - [ ] User authorization: sign up and log in
   - [ ] Saving of user browsing data to database
   - [ ] Interactive web page with data visualization of user browsing history
   - [ ] Display popups with capsule information about links when clicking on a node in the visualization
   - [ ] Search functionality of web page nodes
   - [ ] Production README


#### Bonus Features
   - [ ] Note functionality within data visualization feature
   - [ ] Chrome Extension that visualizes data as a folder tree structure
   - [ ] Hosted on Chrome marketplace

## WireFrames
User Auth Modal
![alt text](https://github.com/Kyle01/rabbit_hole_rescue/blob/master/images/user_auth_modal.jpg)

Chrome Extension View
![alt text](https://github.com/Kyle01/rabbit_hole_rescue/blob/master/images/chrome_extension.jpg)

History View Page
![alt text](https://github.com/Kyle01/rabbit_hole_rescue/blob/master/images/view_page.png)


## Technologies & Technical Challenges

Rabbithole’s core application is a Chrome extension, with a back end built on MongoDB to save user auth and browsing data. The extension will populate the database. The data will be collected using methods from various Chrome API’s: Tabs, History, Sessions, Windows and Storage are the most likely candidates. 

  ##### Google Chrome Extension
  ##### Backend: MongoDB/Express
  ##### Frontend: React/Node.js and D3 visualization library

#### Google Chrome Extension 
 
The Chrome extension will be a basic landing page where the user will log in and authorize the extension to collect data. It will be implemented as a home page, like the App Academy Chrome extension. Using the Chrome API’s, the extension will collect and organize browsing data.

Technical challenges: 

Collecting all url’s of open tabs in all open windows and storing in our database 
Collecting other information (e.g., time and date tab opened) from the objects returned by API methods
Handling changes to the structure of the tree when a user moves or closes a tab. The chrome.tabs API has methods that can listen for such moves. 
Testing the window type before putting a url in the database. The default setting should be to ignore popups; a user may be able to change this setting.

##### Backend: MongoDB/Express 

The browser data will be stored as nodes in a tree structure. Each node object will contain the following properties: 

time accessed 
URL 
parent_node 
array of children nodes 
base_domain_name
webpage_label 
note (string for description)

The trees will belong to tabs, which will belong to windows, which will belong to a date.

Technical challenges: 

Connecting the Chrome extension’s data collection to the MongoDB database 

##### Frontend: React/Node.js 

The data will be visualized in a Web application using the D3 library. The visualization will take the form of linked circles. The Web app will also provide search capability

Technical challenges: 
  - Reading data from MongoDB database and organizing for display 
  - Constructing visualization using D3 
  - Fetching data to build a popup for each node
  - Implementing effective search 


## Accomplished over the Weekend

  - All members of the team read the Chrome and MERN tutorials
  - Set up database
  - Wrote proposal Readme and planned work for the week
  - Implement user authorization on database backend - **Kyle** and **Nick** (completed on Sunday)


## Group Members & Work Breakdown

**Nick Bielak**,
**Kyle McVeigh**,
**Kavian Mojabe**,
**Jeremiah Steele**

### August 26 - August 27
  - Build skeleton React site -  **Kyle**
  - Build the skeleton Chrome extension - **Nick**
  - Investigate Google API methods and test collection of data - **Jeremiah** 
  - Begin setting up D3 visualization - **Kavian** 

### August 27 
  - Continue and complete the basic work from Sunday - **All**
  - Build login view on Chrome extension - **Nick/Jeremiah**
  - Decide which data to save in database, and how to structure it **All will discuss**
  - Write and test methods to save browser data to database - **Jeremiah/Nick**

### Day 2

  - Connect user authorization database to Chrome front end - **Kyle**
  - Connect React-based Web application to database - **Kyle/Kavian**
  - Meet to decide duties for next three days

### Day 3
  - Continue implementation of visualization on Web application using D3 library 
  - Add methods to fetch data for popups in visualization
  - Run tests of completed Chrome extension

### Day 4
  - Complete visualization of data on Web application 
  - Add popups to visualization
  - Make seed/demo data and visualizations for guest user

### Day 5
  - Add search capability to Web application
  - Add search capability to Chrome extension 
  - Make demo page (required for Chrome extensions -- may not be required since this project has a live page too)

### Day 6
  - Complete Production README.md - **Jeremiah** 
  - Refine design/CSS 
  - Finish testing and debugging - **All team members** 


