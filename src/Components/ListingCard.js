import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class ListingCard extends React.Component {

    constructor(){
        super()
        this.state={
            user:null,
            area:null,
            isBookmarked:false,
            bookmarkText:'Bookmark this Listing'
        }
    }

    //find the user and area that posted the card
    componentDidMount = () => {
        fetch('http://localhost:3000/api/v1/users') //find user
        .then(resp => resp.json())
        .then(data => {
            if (this.props.listing.user_id !== undefined){
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === this.props.listing.user_id) {
                        this.setState({
                            user:data[i]
                        })
                    }
                }
            }
            //get whether listing is bookmarked or not
            fetch('http://localhost:3000/bookmark_listings')
            .then(resp => resp.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    if ((data[i].user_id === this.props.user.id) && data[i].listing_id === this.props.listing.id) {
                        this.setState({ isBookmarked:true, bookmarkText:'Delete Bookmark' })
                    }
                }            
            })
        })
        //find the area of this listing
        fetch('http://localhost:3000/areas')
        .then(resp => resp.json())
        .then(data => {
            for (var i = 0; i < data.length; i++){
                if (data[i].id === this.props.listing.area_id){
                    this.setState({ area:data[i] })
                }
            }
        })
    }
    //allow user to be able to bookmark a listing
    bookmarkListing = () => {
    fetch('http://localhost:3000/bookmark_listings',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                listing_id:this.props.listing.id,
                user_id:this.props.user.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({ isBookmarked:true, bookmarkText:'Delete Bookmark' })})
    }
    //allow a user to be able to delete an existing bookmark
    unbookmarkListing = () => {
        fetch('http://localhost:3000/bookmark_listings')
        .then(resp => resp.json())
        .then(data => {
            for(var i = 0; i < data.length; i++){
                if(data[i].listing_id === this.props.listing.id){
                    fetch(`http://localhost:3000/bookmark_listings/${data[i].id}`,{
                        method:'DELETE',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({
                            id:data[i].id
                        })
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        this.setState({ isBookmarked:false, bookmarkText:'Bookmark this Listing' })
                    })
                }
            }
        })
    }

    render() {
        return(
            <div id='cardObj' className='card'>

                <Image id='cardImg' className='container' src={this.props.listing.img_url} alt='room' />
                <h3 className='container'> Posted By: {this.state.user !== null ? this.state.user.username : 'Unknown User'} </h3>
                <h4 className='container'> Price per Month: { this.props.listing.price !== null ? `$${this.props.listing.price}` : 'Contact User for Price' } </h4>

                <h3> Posted in: { this.state.area !== null ? this.state.area.cityname : 'Unknown Location' } </h3>

                { this.state.isBookmarked !== true ?
                    <button onClick={() => this.state.user !== null ? this.bookmarkListing() : 'null'} > {this.state.bookmarkText} </button>
                    :
                    <button onClick={() => this.state.user !== null ? this.unbookmarkListing() : 'null'} > {this.state.bookmarkText} </button>
                }

                { this.state.isBookmarked !== false ? <div class="bookmark"></div> : <div class="bookmarkEmpty"></div> }

                <button onClick={() => { this.props.setListing(this.props.listing)}} > More Info </button>

            </div>
        )
    }
}

export default ListingCard;