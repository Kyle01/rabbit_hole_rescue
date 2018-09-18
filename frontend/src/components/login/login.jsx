import React from "react";

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemoUser = this.handleDemoUser.bind(this);
    }

    handleDemoUser(e){
        e.preventDefault();
        this.props.login({username:"Kyle", password:"KylePassword"});
    }

    handleInput(type) {
        return (e => {
            this.setState({ [type]: e.target.value });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);    
    }

    getErrors(){
        if(this.props.errors.constructor !== Array){
            return (<div>
                <p className='signin-errors-text'>Something went wrong, try again</p>
            </div>)
        }
    }


    render() {
        return (
        <div className="signin-main">
            <div className="signin-container">
            <div>
                <img src="../../../images/transparent_logo.png" className="signin-logo" />
                <p className='signin-welcome'>Welcome Back</p>
            </div>
            <div>
              <form className='signin-form'>
                <input className='signin-form-field' type="text" placeholder="username" value={this.state.username} onChange={this.handleInput("username")} />
                <input className='signin-form-field' type="password" placeholder="password" value={this.state.password} onChange={this.handleInput("password")} />
                <button className="signin-button" onClick={this.handleSubmit}>
                  Sign in
                </button>
                <button className='signin-demo-button' onClick={this.handleDemoUser}>
                  Checkout a demo account
                </button>
              </form>
            </div>
            {this.getErrors()}
            </div>
          </div>
        );
    }
}

export default Login; 