import React from "react";

class SignUp extends React.Component {

    render() {
        return (
        <div className='signup-main'>
            <div className='signup-first-div'>
              <p className='signup-top-text'> Start Understanding Your Web History</p>
              <div>
                <div>
                  <p>1.</p>
                  Create an Account
                </div>
                <div>Create account modal</div>
              </div>
            </div>
            <div className='signup-second-div'>
              2. Download our Google Chrome Extension from the Google
              Chrome Store
            </div>
            <div className='signup-third-div'>3. Click record to create session.</div>
            <div className='signup-fourth-div'>
              4. Click 'Stop' when you're done exploring the web. Come back to see your explored session. 
            </div>
        </div>
        );
    }
}

export default SignUp;