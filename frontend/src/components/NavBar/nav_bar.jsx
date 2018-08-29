import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

const NavbarFeatures = props => {
    if(props.currentUser){
        return(
            <div>
                Signed In
            </div>
        );
    } else {
        return(
            <div className='nav-main'>
                <div className='nav-left'>
                    <Link to="/" className='nav-logo'>Rabbit Hole Rescue</Link>
                </div>
                <div className='nav-right'>
                    <Link to="/signin" className='nav-signin'>Sign In</Link>
                    <Link to="/signup" className='nav-login'>Get Started</Link>
                </div>
            </div>
        );
    }
};

export default withRouter(NavbarFeatures);