import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";


class Splash extends React.Component{

    render(){
        return(
            <div className='splash-main'>
                <div className='splash-top'>
                    <p className='splash-top-text'>Your Web History as Nature Intended</p>
                    <img></img>
                </div>
                <div className='splash-features-box'>
                    <div>
                        <ul>
                            <li>Create history trees on demand</li>
                            <li>Add notes and review them later</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Chrome extension for ease and accessibility</li>
                            <li>All stored locally</li>
                        </ul>
                    </div>
                </div>
                <div className='splash-bottom-bar'>
                    <div className='splash-bottom-about'>
                        <p>About</p>
                    </div>
                    <div className='splash-bottom-cr'>
                        <p>2018 ©</p>
                    </div>
                </div>
            </div>
        );      
    }
}

export default withRouter(Splash);