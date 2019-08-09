import React from 'react';
import Listing from './Listings.js'
import Header from './Header.js'
import ProfilePageBtn from './ProfilePageBtn.js'

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
            <div>
                <Header />
                    
                <ProfilePageBtn btn={'profile'} user={this.props.user}/>

                <Listing listings={this.state.listings}/>

            </div>
        )
    }
}

export default IndexPage;