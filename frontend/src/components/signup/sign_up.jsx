import React from "react";
import { Link } from 'react-router-dom';

class SignUp extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      password2: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInput(type) {
    return (e => {
      this.setState({ [type]: e.target.value });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.registerUser(this.state);
  }

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
                  Create an account using the right panel
                </p>
              </div>
              <div className="signup-first-modal">
                <form className="signin-form">
                  <input className="signup-field-form" type="text" placeholder="email" value={this.state.email} onChange={this.handleInput("email")} />
                  <input className="signup-field-form" type="text" placeholder="username" value={this.state.username} onChange={this.handleInput("username")} />
                  <input className="signup-field-form" type="password" placeholder="password" value={this.state.password} onChange={this.handleInput("password")} />
                  <input className="signup-field-form" type="password" placeholder="confirm password" value={this.state.password2} onChange={this.handleInput("password2")} />
                  <button className="signup-field-button" onClick={this.handleSubmit}>
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="signup-second-div">
            <div className="signup-second-left">
              <p className="signup-number">2</p>
              <p className="signup-second-text">
                Download our Google Chrome Extension from the Google
                Chrome Store
              </p>
            </div>
            <div className="signup-second-modal">
              <a href="https://chrome.google.com/webstore/detail/rabbit-hole-rescue/lhcoogckbmpeijhnnniaohgcplmgfmie">
                <img src="../../../images/extension.png" className="signup-second-picture" />
              </a>
            </div>
          </div>
          <div className="signup-third-div">
            <div className="signup-third-left">
              <p className="signup-number">3</p>
              <p className="signup-third-text">
                Use the extension to start and stop recording a session
              </p>
            </div>
            <div className="signup-third-modal">
            <img src="../../../images/popup.png" className="signup-third-picture" />
            </div>
          </div>
          <div className="signup-fourth-div">
            <p className="signup-fourth-text">
              Come back to see your explored session
            </p>
            <Link to="history" className="signup-fourth-link">
              Here!
            </Link>
          </div>
        </div>;
  }
}

export default SignUp;