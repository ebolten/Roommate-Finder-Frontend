import React from 'react';
import ListingCard from './ListingCard.js'

class Listings extends React.Component {

    render() {
        return(
            <div id='listingsComponent'>
                {this.props.listings.map(l => {
                    return <ListingCard listing={l} />
                })}
            </div>
        )
    }
}

export default Listings;
