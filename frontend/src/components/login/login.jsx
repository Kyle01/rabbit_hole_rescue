import React from "react";

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    handleInput(type) {
        return (e => {
            this.setState({ [type]: e.target.value });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state).then(() => this.props.history.push("/dashboard"));
    }


    render() {
        return <div className="signin-main">
            <div className="signin-container">
                <img src="../../../images/transparent_logo.png" className="signin-logo" />
              <form className='signin-form'>
                <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleInput("username")} />
                <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleInput("password")} />
                <button className="signin-button" onClick={this.handleSubmit}>
                  Sign in
                </button>
              </form>
            </div>
          </div>;
    }
}

export default Login; 