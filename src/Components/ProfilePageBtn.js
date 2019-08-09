import React from 'react';
import { Link } from 'react-router-dom'

class ProfilePageBtn extends React.Component {

    //link the users profile
    linkProfile = (user) => {
        return(
            <Link to={`/profile/${this.props.user.username}`}> Profile </Link>
        )
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