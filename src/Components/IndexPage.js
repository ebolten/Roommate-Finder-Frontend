import React from 'react';
import Listing from './Listings.js'
import Header from './Header.js'

class IndexPage extends React.Component {

    constructor(){
        super()
        this.state={
            listings:[],
            user:null,
            area:[]
        }
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
    }

    render() {
        return(
            <div id='indexDiv'>
                <Header user={this.props.user} btn={'home'} />

                <h2> Suggested Rooms For You </h2>

                <Listing user={this.props.user} listings={this.state.listings}/>

            </div>
        )
    }
}

export default IndexPage;