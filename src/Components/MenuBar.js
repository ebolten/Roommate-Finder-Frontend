import { Menu } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router-dom'

class MenuBar extends React.Component {

    //send user to home page
    handleHome = () => {
        if (this.props.user !== null && this.props.user !== undefined) {
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

    //send user to login screen
    handleLogin = () => {
        return(
            <Link to={`/login`}> Logout </Link>
        )
    }

    handleMyListings = () => {
        return (
            <Link to={`/mylistings/${this.props.user.username}`}> My Listings </Link>
        )
    }

    render(){
        return(
            <div id='menubar'>
            
            <ul>
                <li> {this.props.user !== null ? this.handleHome() : 'Could not Load'} </li>
                <li> {this.props.user !== null ? this.handleProfile() : 'Could not Load'} </li>
                <li> {this.props.user !== null ? this.handleLogin() : 'Could not Load'} </li>
                <li> {this.props.user !== null ? this.handleMyListings() : 'Could not Load'} </li>
            </ul>
            
            </div>

        )
    }
}
export default MenuBar