import React from "react";

class SignUp extends React.Component {

    render() {
        return <div className="signup-main">
            <div className="signup-first-div">
              <p className="signup-top-text">
                Start Understanding Your Web History
              </p>
              <div className="signup-first-summary">
                <div className="signup-first-left">
                  <p className="signup-number">1</p>
                  <p className="signup-first-text">
                    Create an Account using the right panel
                  </p>
                </div>
                <div className="signup-first-modal" />
              </div>
            </div>
            <div className="signup-second-div">
              <div className='signup-second-left'>
                <p className="signup-number">2</p>
                <p className='signup-second-text'>Download our Google Chrome Extension from the Google Chrome Store</p>
              </div>
              <div className="signup-second-modal" >
              </div>
            </div>
            <div className="signup-third-div">
              3. Click record to create session.
            </div>
            <div className="signup-fourth-div">
              4. Click 'Stop' when you're done exploring the web. Come
              back to see your explored session.
            </div>
          </div>;
    }
}

export default SignUp;