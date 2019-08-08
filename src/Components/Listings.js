import React from 'react';
import ListingCard from './ListingCard.js'

class Listings extends React.Component {

    constructor(){
        super()
        this.state={
            listings:[],
            user:null,
            area:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/listings')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                listings:data
            })
        })
    }

    

    render() {
        return(
            <div>
               
                {this.state.listings.map(l => {
                    return <ListingCard user={null} listing={l} />
                })}
                

            </div>
        )
    }
}

export default Listings;
