import React from 'react'
import Header from './Header.js'
import Listing from './Listings.js'
import NewListingForm from './NewListingForm.js'

class ProfilePage extends React.Component {

    constructor(){
        super()
        this.state={
            createListing:false
        }
    }

    updateListing = () => {
        if (this.state.createListing){
            return( <NewListingForm user={this.props.user}/> )
        } else {
            //render nothing
        }
    }

    render(){
        return(
            <div>

                <Header user={this.props.user} createListing={ this.updateListing } btn={'home'} />
                <h2> {this.props.user !== null ? this.props.user.username : 'Failed to Load User'} </h2>
                <h3> {this.props.user !== null ? this.props.user.desc : 'Failed to Load User'} </h3>

                {/*
                    this.state.createListing !== false ? <NewListingForm user={this.props.user}/> : ''
                */}


                <NewListingForm user={this.props.user}/>

                {/*<button 
                onClick={() => {this.state.createListing === false ? this.setState({ createListing:true }) : this.setState({ createListing:false })}} >
                    Create a Listing?
                </button>*/}

            </div>
        )
    }
}

export default ProfilePage;