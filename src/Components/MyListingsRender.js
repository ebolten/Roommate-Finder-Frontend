import React from 'react';
import MyListingCard from './MyListingCard.js'

class MyListingsRender extends React.Component {

    render() {
        return(
            <div id='listingsComponent'>

                { this.props.listings.map(l => {
                    return <MyListingCard setListing={this.props.setListing} setListing={this.props.setListing} user={this.props.user} listing={l} />
                })}
            </div>
        )
    }
}

export default MyListingsRender;