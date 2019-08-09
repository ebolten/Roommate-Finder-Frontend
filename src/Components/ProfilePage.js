import React from 'react'
import Header from './Header.js'
import Listing from './Listings.js'
import NewListingForm from './NewListingForm.js'

class ProfilePage extends React.Component {

    constructor(){
        super()
        this.state={
            createListing:false,
            bookmarks:[],
            user:null
        }
    }

    componentDidMount(){
        this.setState({
            user:this.props.user
        })
    }

    //render the listing form
    updateListing = () => {
        if (this.state.createListing){
            return( <NewListingForm user={this.props.user}/> )
        } else {
            //render nothing
        }
    }

    //render the user's bookmarked rooms
    fetchBookmarks = () => {
        if (this.state.bookmarks.length === 0){
            fetch('http://localhost:3000/bookmark_listings')
            .then(resp => resp.json())
            .then(data => {

                for(var i = 0; i < data.length; i++){
                    if(data[i].user_id === this.props.id){
                        this.setState({
                            bookmarks:[ ...this.state.bookmarks,data[i] ]
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

                {/*
                    this.state.createListing !== false ? <NewListingForm user={this.props.user}/> : ''
                */}

                <NewListingForm user={this.props.user}/>

                {/*<button 
                onClick={() => {this.state.createListing === false ? this.setState({ createListing:true }) : this.setState({ createListing:false })}} >
                    Create a Listing?
                </button>*/}

                <h2> My Bookmarks: </h2>
                { this.props.id !== null ? this.fetchBookmarks() : 'Failed to Load Bookmarks' }
                {console.log(this.state.bookmarks)}

            </div>
        )
    }
}

export default ProfilePage;