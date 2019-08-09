import { Menu } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router-dom'

class MenuBar extends React.Component {

    //send user to home page
    handleHome = () => {
        if (this.props.user !== null) {
            return (
                <Link to={`/home/${this.props.user.username}`}> Home </Link>
            )}       
    }

    //send user to profile page
    handleProfile = () => {
        return (
            <Link to={`/profile/${this.props.user.username}`}> Profile </Link>
            )
    }

    render(){
        return(
            <div id='menubar'>
            
            <ul>
                <li> {this.props.user !== null ? this.handleHome() : 'Could not Load'} </li>
                <li> {this.props.user !== null ? this.handleProfile() : 'Could not Load'} </li>
            </ul>
            
            </div>

        )
    }
}
export default MenuBar