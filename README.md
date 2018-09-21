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

The Chrome extension makes use of Google's Chrome API's to gather browsing data, in particular the `chrome.storage`, `chrome.history`, `chrome.tabs`, and `chrome.webNavigation` API's. 

### Web application 


#### MERN Stack 

The web app employs a typical MERN Stack (MongoDB, Express.js, React.js, and Node.js). Utilizing the MERN stack allowed us to use Javascript on both the front and back end, and allowed the application to communicate with the Chrome extension, also written in Javascript, using the same conventions. The user's information and recorded history is stored as NoSQL objects in the MongoDB. The Node.js scripts post and fetch this data and it is displayed using the React frontend. 

#### D3.js 

D3.js is used to display the stored browser sessions in an attractive, easy-to-read tree diagram format.

KAVIAN: rewrite this paragraph as you see fit. Here it's an intro; down below, write it up in more detail.

## Implementation details 

### Chrome Extension

The Chrome extension, once installed, is activated by clicking on its icon in the toolbar. A popup appears, and the user clicks on a button to be taken to the signup or login page. Once logged in, the user can click the record button, and have a session's browsing history saved. The recording stops when the user clicks the stop button.

#### Popup (`popup.js`)

![A web page with the popup superimposed](https://github.com/Kyle01/rabbit_hole_rescue/blob/master/screenshots/popup_screenshot.png)

Before the user logs in, most of the popup's buttons are disabled. 

![Web page with logged-in popup superimposed](https://github.com/Kyle01/rabbit_hole_rescue/blob/master/screenshots/popup_screenshot_logged_in.png)

Once the user logs in, more buttons are enabled.

This is done in the start button's event listener: 

```javascript
if (xhr.status === 200) {
    chrome.runtime.sendMessage({sender: "login", username: username});
    if (start.classList.contains('disabled')) {
        start.classList.remove('disabled');
    }
    if (visualization.classList.contains('disabled')) {
        visualization.classList.remove('disabled');
    }
    if (logout.classList.contains('disabled')) {
        logout.classList.remove('disabled');
    }
    loggedIn = "true";
    window.localStorage.setItem("loggedIn", "true");
} 
```

The display of the buttons is changed by adding or removing the class 'disabled', while their functioning depends on the flag variables `loggedIn` and `recording`. These variables are set and stored in `localStorage` when the relevant buttons are clicked, and 
they are reset upon logout. 

#### Background script 

NICK: when you're ready, write up a couple paragraphs about what background.js does. You probably won't need screenshots, but definitely highlight a couple of code snippets. Below is older version of what it does. Edit and expand as necessary.


The extension's `background.js` script contains the code that does the tracking. The extension, on loading, installs a listener for the start and stop buttons. When the start button in the popup is clicked, listeners are added to Chrome's `onUpdated` and `onActivated` actions, and all open tabs are logged in a visit structure.

Information is sent from the chrome extension to the database through XML Http Requests and stored with the current user's `username`.



### Web application

Here is the place for more detail about the MERN implementation and the visualization.

#### Backend ####
The MongoDB has three schemas: `user`, `window`, and `visit`. Below  is our `visit` Schema. A `visit` represents a viewed tab in the user's history. The visits are stored as a tree, with a parent and child relationship. 

```javascript
const VisitSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  chromeTabId: {
    type: Number,
    required: true
  },
  chromeWindowId: {
    type: Number,
    required: true
  },
  parent: {
    type: String,
    required: false
  },
  children: [
    {
      type: String,
      required: false
    }
  ],
  username: {
    type: Schema.Types.String,
    ref: "users"
  },
  timeCreated: {
    type: Date,
    default: new Date()
  }
});
```

#### Frontend ####
Below is a representation of our `root` directory illustrating the paths that were used for this project. Paths were appropriately restricted based on the `user` login status.

```javascript
const Root = () => (
  <div>
    <header>
      <NavbarFeatures />
    </header>
    <Switch>
      <AuthRoute exact path="/signin" component={LoginContainer} />
      <Route exact path="/signup" component={SignUp} />
      <ProtectedRoute exact path="/history" component={ShowContainer} />
      <Route exact path="/" component={Splash} />
      <Route path="/*" component={NotFound} />
    </Switch>
    <div className="splash-bottom-bar">
      <div className="splash-bottom-cr">
        <p>2018 ©</p>
      </div>
    </div>
  </div>
);
```

KAVIAN: A couple paragraphs about how the data is being turned into the visualizations. 1-2 screenshots, 1-2 code snippets.


## Design documents

  [Proposal README.md](https://github.com/Kyle01/rabbit_hole_rescue/tree/master/misc_docs/README.md)

## Projected features 

 EVERYONE: how does below list look? Do we need to add/remove anything? 
 
  - Add popups to visualization that display URL's and titles
  - Let users add notes to entries
  - Add search capability to Web site and extension
  - Folder tree structure visualization in Chrome extension
