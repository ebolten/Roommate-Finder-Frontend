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
            user:null,
            areas:[],
            singleListing:null
        }
    }

    //finding an area given its id
    findAreas = () => {

        fetch(`http://localhost:3000/areas`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ areas:[ ...this.state.areas,data] })
        })
    }

    //searching the listings by cityname
    changeSearch = (event) => {

        console.log(this.state.areas)




    }

    //getting the listings
    componentDidMount(){
        this.setState({user:this.props.user})
        fetch('http://localhost:3000/listings')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                listings:data
            })
        })
        this.findAreas()
    }

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

                <br />

                <h2> Suggested Rooms For You </h2>

                { this.state.singleListing !== null ? <ListingContainer setListing={this.setListing} listing={this.state.singleListing} />

                  : <Listing user={this.props.user} setListing={this.setListing} listings={this.state.listings}/>

                }

            </div>
        )
    }
}

export default IndexPage;