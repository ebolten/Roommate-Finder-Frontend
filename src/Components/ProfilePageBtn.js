import React from 'react';
import { Link } from 'react-router-dom'

class ProfilePageBtn extends React.Component {

    //link the users profile
    linkProfile = (user) => {

        if (this.props.btn === 'profile'){
            return(
                <Link to={`/profile/${this.props.user.username}`}> {this.props.btn} </Link>
            )
        } else if (this.props.btn === 'home'){
            return(
                <Link to={`/home/${this.props.user.username}`}> {this.props.btn} </Link>
            )
        }

    }

    render(){
        return(
            <div id='profileBtn'>
                <button>{this.props.user !== null ? this.linkProfile() : 'Could not Load'}</button>
            </div>
        )
    }
}
export default ProfilePageBtn;