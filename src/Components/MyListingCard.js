import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class MyListingCard extends React.Component {
    render(){
        return(
            <div id='cardObj' className='card'>

                <Image className='container' src={this.props.listing.img_url} alt='room' />
                <h3 className='container'> Posted By: {this.props.user !== null ? this.props.user.username : 'Unknown User'} </h3>
                <h4 className='container'> Price per Month: { this.props.listing.price !== null ? `$${this.props.listing.price}` : 'No Listed Price' } </h4>

                <button onClick={() => { this.props.setListing(this.props.listing)}} > More Info </button>

            </div>
        )
    }
}
export default MyListingCard;