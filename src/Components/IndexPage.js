import React from 'react';
import Listing from './Listings.js'
import Header from './Header.js'
import ListingContainer from './ListingContainer.js'
import SearchBar from './SearchBar.js'

class IndexPage extends React.Component {

    constructor(){
        super()
        this.state={
            listings:[],
            validListings:[],
            user:null,
            areas:[],
            singleListing:null,
        }
    }

    //searching the listings by cityname
    changeSearch = (event) => {
        let searchWord = event.currentTarget.value
        let validlistings = []

        for (var i = 0; i < this.state.listings.length; i++){
            for (var j = 0; j < this.state.areas.length; j++) {
                if (this.state.listings[i].area_id === this.state.areas[j].id) {
                    if (this.state.areas[j].cityname.includes(searchWord)){
                        validlistings.push(this.state.listings[i])
                        this.setState({ validListings:validlistings })
                    }
                }
            }
        }
        //if word is empty, valid listings is empty
        if (searchWord.length === 0){
            this.setState({ validListings:[] })
            
        }
    }
    //getting the listings
    componentDidMount(){
        this.setState({user:this.props.user})
        fetch('http://localhost:3000/listings')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                listings:data,
                listingsTwo:data
            })
        })
        fetch(`http://localhost:3000/areas`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ areas:data })
        })
    }
    //set the listing to be shown
    setListing = (listing) => {
        this.setState({
            singleListing:listing
        })
    }

    render() {
        return(
            <div id='indexDiv'>
                <Header user={this.props.user} btn={'home'} />

                <h4> Search Rooms by City: </h4>
                <SearchBar change={this.changeSearch} />

                {/* if there are validListings (searched), render those */}
                { this.state.validListings !== [] ? 
                    <Listing user={this.props.user} setListing={this.setListing} listings={this.state.validListings}/> :
                    ''}
                
                {/* if there is a single listing, render the listing container */ }
                { this.state.singleListing !== null ? <ListingContainer setListing={this.setListing} listing={this.state.singleListing} />
                  : <Listing user={this.props.user} setListing={this.setListing} listings={this.state.listings}/>
                }

            </div>
        )
    }
}

export default IndexPage;