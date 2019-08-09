import React from 'react'
import Header from './Header.js'
import Listing from './Listings.js'

class ProfilePage extends React.Component {
    render(){
        return(
            <div>
                <Header />
                <h2> {this.props.user !== null ? this.props.user.username : 'Failed to Load User'} </h2>
                <h3> {this.props.user !== null ? this.props.user.desc : 'Failed to Load User'} </h3>
            </div>
        )
    }
}

export default ProfilePage;