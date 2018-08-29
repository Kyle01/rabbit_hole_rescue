import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";


class Splash extends React.Component{

    render(){
        return(
            <div>
                <div>
                    Example image
                </div>
                <div>
                    Features 
                </div>
                <div>
                    About
                </div>
                <div>
                    2018 ©
                </div>
            </div>
        );      
    }
}

export default withRouter(Splash);