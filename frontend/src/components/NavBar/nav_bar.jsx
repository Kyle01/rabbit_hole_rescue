import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

const NavbarFeatures = props => {
    if(props.currentUser){
        return(
            <div className='nav-main'>
              <div className="nav-left">
                <img className="nav-logo-image" src="../../../images/transparent_logo.png" />
                <Link to="/" className="nav-logo">
                  Rabbit Hole Rescue
                </Link>
              </div>
              <div className="nav-right">
                <button className='nav-signout-link' onClick={props.logout}>Sign out</button>
                <Link to='/history' className='nav-history-link'>History</Link>                
            </div>
          </div>
        );
    } else {
        return <div className="nav-main">
            <div className="nav-left">
              <img className="nav-logo-image" src="../../../images/transparent_logo.png" />
              <Link to="/" className="nav-logo">
                Rabbit Hole Rescue
              </Link>
            </div>
            <div className="nav-right">
              <Link to="/signin" className="nav-signin">
                Sign In
              </Link>
              <Link to="/signup" className="nav-login">
                Get Started
              </Link>
            </div>
          </div>;
    }
};

export default withRouter(NavbarFeatures);