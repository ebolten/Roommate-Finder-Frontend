import React from 'react'
import Header from './Header.js'
import Listing from './Listings.js'
import NewListingForm from './NewListingForm.js'
import ListingContainer from './ListingContainer.js'

class ProfilePage extends React.Component {

    constructor(){
        super()
        this.state={
            createListing:false,
            bookmarks:[],
            user:null,
            listings:[],
            btnText:'Post a Listing',
            messages:[],
            singleListing:null
        }
    }

    componentDidMount(){
        this.setState({
            user:this.props.user
        })
    }
    //fetch the user's messages
    fetchMessages = (userID,listings) => {
    }

    //render the listing form
    updateListing = () => {
        this.setState({ btnText:'Close Form' })
        if (this.state.createListing){
            return( <NewListingForm user={this.props.user}/> )
        } else {
            //render nothing
        }
    }
    //set the listing to be shown
    setListing = (listing) => {
        this.setState({
            singleListing:listing
        })
    }
    //render the user's bookmarked rooms
    fetchBookmarks = () => {
        if (this.state.bookmarks.length === 0){
            fetch('http://localhost:3000/bookmark_listings')
            .then(resp => resp.json())
            .then(data => {
                for(var i = 0; i < data.length; i++){
                    if(data[i].user_id === this.props.id){ //render listing objects
                        fetch(`http://localhost:3000/listings/${data[i].listing_id}`)
                        .then(resp => resp.json())
                        .then(listData => {
                            this.setState({
                             bookmarks:[ ...this.state.bookmarks,listData ]
                            })
                        })
                    }
                }
            })
        }
    }

    render(){
        return(
            <div>

                <Header user={this.props.user} createListing={ this.updateListing } btn={'home'} />
                <h2> {this.props.user !== null ? this.props.user.username : 'Failed to Load User'} </h2>
                <h3> {this.props.user !== null ? this.props.user.desc : 'Failed to Load User'} </h3>

                { this.state.createListing !== false ? <NewListingForm user={this.props.user}/> : '' }

                {/* <NewListingForm user={this.props.user}/> */}

                {<button id='formBtn'
                onClick={() => {this.state.createListing === false ? this.setState({ createListing:true }) : this.setState({ createListing:false })}} >
                    {this.state.btnText}
                </button>}

                <h2> My Bookmarks: </h2>
                { this.props.id !== null ? this.fetchBookmarks() : 'Failed to Load Bookmarks' }
                {/* using callback to render single listing if necessary */}
                { this.state.singleListing !== null ? <ListingContainer setListing={this.setListing} listing={this.state.singleListing} />
                  : <Listing user={this.props.user} setListing={this.setListing} listings={this.state.bookmarks}/>
                }

                {/* messages will go here */}
                
            </div>
        )
    }
}

export default ProfilePage;