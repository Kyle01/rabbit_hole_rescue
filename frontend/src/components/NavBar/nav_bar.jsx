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
            <div>
                Signed out
            </div>
        );
    }
};

export default withRouter(NavbarFeatures);