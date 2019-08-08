import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class ListingCard extends React.Component {

    constructor(){
        super()
        this.state={
            user:null
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/users')
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
    }

    render() {
        return(
            <div className='card'>
                <h2 className='container'> {this.props.listing.desc} </h2>
                <Image className='container' src='https://upload.wikimedia.org/wikipedia/commons/0/07/Hotel-suite-living-room.jpg' alt='room' />
                <h2 className='container'> Posted By: {this.state.user !== null ? this.state.user.username : 'Unknown User'} </h2>
            </div>
        )
    }
}

export default ListingCard;