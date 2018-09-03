# Rabbit Hole Rescue 

[Link to Chrome Store](https://chrome.google.com/webstore/detail/rabbit-hole-rescue/lhcoogckbmpeijhnnniaohgcplmgfmie)

[Link to Website splash/demo page](rabbit-hole-rescue.herokuapp.com/)

## Overview 

Rabbit Hole Rescue is an extension that lets you record your Web browsing sessions at the click of a button. When you're logged in to your account, you can save these sessions, and view them on a Web page in the form of a tree diagram. This way, you can see the paths your browsing took, and how you ended up at any given page.

### How does it work?
 
This extension installs a simple button and popup. First, click the signup button (or the login button, once you have created an account) to be taken to the signup page. Once you have done this, you can begin saving sessions.

Click the start button to begin recording, and all open Chrome tabs will be saved. Each new address you navigate to will be added to the session until you click the stop button.

Click the visualization button to be taken to your visualizations page, where you can view eye-catching diagrams of your saved browsing sessions. 

### Who is it for?

Anyone who does research on the Web, or anyone who has ever clicked on a page, and then wondered how their browsing led them down that Rabbit Hole. 

## Technologies Used 

Rabbit Hole Rescue has two parts: a Chrome extension and a MERN-stack Web application. The first does the tracking, and the second does the user authorization, storage, and visualization.

### Chrome Extension 

The Chrome extension makes use of Google's Chrome API's to gather browsing data, in particular the chrome.storage, chrome.history, chrome.tabs, and chrome.webNavigation API's. 

### Web application 


#### MERN Stack 

The Web application is built using the MERN stack: MongoDB, Express, React, and Node.js. User authorization information and browser session data is stored in a MongoDB database, and the Web site is composed of React pages.

#### D3.js 

D3.js is used to display the stored browser sessions in an attractive, easy-to-read tree diagram format.

## Implementation details 

### Chrome Extension

The Chrome extension, once installed, is activated by clicking on its icon in the toolbar. A popup appears, and the user clicks on a button to be taken to the signup or login page. Once logged in, the user can click the record button, and have a session's browsing history saved. The recording stops when the user clicks the stop button.

#### Popup

![A web page with the popup superimposed](https://github.com/Kyle01/rabbit_hole_rescue/blob/master/screenshots/popup_screenshot.png)

#### Background script 

The extension's background.js script contains the code that does the tracking. The extension, on loading, installs a listener for the start and stop buttons. When the start button in the popup is clicked, listeners are added to Chrome's onUpdated and onActivated actions, and all open tabs are logged in a visit structure.

Information is sent from the chrome extension to the database through XML Http Requests and stored with the current user's username.


### Web application



## Design documents

  [Proposal README.md](https://github.com/Kyle01/rabbit_hole_rescue/tree/master/misc_docs/README.md)

## Projected features 
  - Add popups to visualization that display URL's and titles
  - Let users add notes to entries
  - Add search capability to Web site and extension
  - Folder tree structure visualization in Chrome extension