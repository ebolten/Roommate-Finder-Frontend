import React from 'react';
import Header from './Header.js'
import MyListingsRender from './MyListingsRender.js'
import MyListingCard from './MyListingCard.js'
import ListingContainer from './ListingContainer.js'

class MyListings extends React.Component {

    constructor(){
        super()
        this.state={
            listings:[],
            singleListing:null
        }
    }
    //set the listing to be shown
    setListing = (listing) => {
        this.setState({
            singleListing:listing
        })
    }
    //find a listing
    findListings = (newUser) => {
        if (this.state.listings.length === 0) {
            fetch('http://localhost:3000/listings')
            .then(resp => resp.json())
            .then(data => {            
                for(var i = 0; i < data.length; i++){
                    if(data[i].user_id === this.props.user.id){
                        this.setState({ listings:[...this.state.listings,data[i]], enterListings:false })
                    }
                }
            })
        }
    }

    render(){
        return(
            <div>
                <Header user={this.props.user} />

                {/* finding the listings */}
                { this.props.user !== null ? this.findListings() : '' }

                {/* displaying user's listings */}
                { this.props.user !== null ? <h1> {this.props.user.username}'s Listings </h1> : ''}

                {/*  */}
                { this.state.listings.length !== 0 ? <MyListingsRender setListing={this.setListing} user={this.props.user} listings={this.state.listings} /> : 'Failed to Load' }

            </div>
        )
    }
}
export default MyListings;