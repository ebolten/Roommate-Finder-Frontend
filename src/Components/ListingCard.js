import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class ListingCard extends React.Component {

    constructor(){
        super()
        this.state={
            user:null,
            area:null
        }
    }

    //find the user and area that posted the card
    componentDidMount = () => {
        fetch('http://localhost:3000/users') //find user
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
        })

        fetch('http://localhost:3000/areas') //find area
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
        .then(data => {console.log(data)})
    }

    render() {
        return(
            <div id='cardObj' className='card'>

                <Image className='container' src={this.props.listing.img_url} alt='room' />
                <h2 className='container'> Posted By: {this.state.user !== null ? this.state.user.username : 'Unknown User'} </h2>
                <h2 className='container'> {this.props.listing.desc} </h2>


                <h2> Posted in: { this.state.area !== null ? this.state.area.cityname : 'Unknown Location' } </h2>

                
                <button onClick={() => this.state.user !== null ? this.bookmarkListing() : 'null'} > button </button>
            </div>
        )
    }
}

export default ListingCard;