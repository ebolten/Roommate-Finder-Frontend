import React from 'react';
import ListingCard from './ListingCard.js'

class Listings extends React.Component {

    constructor(){
        super()
        this.state={ uniqListing:[] }
    }

    // countList = (data) => {

    //     data.reduce(function(p, c){
    //         p[c.name] = (p[c.name] || 0) + 1;
    //         return p;

    // }, {});

    //remove duplicate elements in an array of objects
    removeDuplicates = (array) => {
        return array.filter((item,index) => array.indexOf(item) === index)
    }

    render() {
        return(
            <div id='listingsComponent'>

                { this.removeDuplicates(this.props.listings).map(l => {
                    return <ListingCard setListing={this.props.setListing} user={this.props.user} listing={l} />
                })}
            </div>
        )
    }
}

export default Listings;
