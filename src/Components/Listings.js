import React from 'react';
import ListingCard from './ListingCard.js'

class Listings extends React.Component {

    render() {
        return(
            <div id='listingsComponent'>

                {this.props.listings.map(l => {
                    return <ListingCard setListing={this.props.setListing} user={this.props.user} listing={l} />
                })}
            </div>
        )
    }
}

export default Listings;
