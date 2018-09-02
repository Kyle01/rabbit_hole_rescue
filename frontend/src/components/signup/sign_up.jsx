import React from "react";
import { Link } from 'react-router-dom';

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
              <div className='signup-second-left'>
                <p className="signup-number">3</p>
                <p className='signup-third-text'>Use the extension to start and stop recording a session</p>
              </div>
              <div className="signup-third-modal" >
              </div>
            </div>
            <div className="signup-fourth-div">
                <p className='signup-fourth-text'>Come back to see your explored session</p>
                <Link to='history' className='signup-fourth-link'>Here!</Link>
            </div>
          </div>;
    }
}

export default SignUp;