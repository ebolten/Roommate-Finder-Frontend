import React from 'react'
import Header from './Header.js'
import Listing from './Listings.js'
import NewListingForm from './NewListingForm.js'
import ProfilePageBtn from './ProfilePageBtn.js'

class ProfilePage extends React.Component {
    render(){
        return(
            <div>
                <Header />
                <h2> {this.props.user !== null ? this.props.user.username : 'Failed to Load User'} </h2>
                <h3> {this.props.user !== null ? this.props.user.desc : 'Failed to Load User'} </h3>

                <h6> Create a New Listing </h6>
                <NewListingForm user={this.props.user}/>

                <ProfilePageBtn user={this.props.user} btn={'home'} />


            </div>
        )
    }
}

export default ProfilePage;