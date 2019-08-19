import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class MyListingCard extends React.Component {

    constructor(){
        super()
        this.state={ updateListing:false }
    }

    toggleUpdate = () => {
        this.setState({updateListing:true })
    }

    updateListing = (event) => {

        fetch(`http://localhost:3000/listings/${this.props.listing.id}`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json',
            Accept:'application/json'},
                body:JSON.stringify({
                    img_url: event.target.children[3].value === '' ? event.target.children[3].placeholder : event.target.children[3].value,
                    desc: event.target.children[7].value === '' ? event.target.children[7].placeholder : event.target.children[7].value,
                    preferences: event.target.children[11].value === '' ? event.target.children[11].placeholder : event.target.children[11].value,
                    user_id: this.props.listing.user.id,
                    area_id: this.props.listing.area_id,
                    price: event.target.children[15].value === '' ? event.target.children[15].placeholder : event.target.children[15].value
                })
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
    }

    render(){
        return(
            <div id='cardObj' className='card'>

                <Image className='container' src={this.props.listing.img_url} alt='room' />
                <h3 className='container'> Posted By: {this.props.user !== null ? this.props.user.username : 'Unknown User'} </h3>
                <h4 className='container'> Price per Month: { this.props.listing.price !== null ? `$${this.props.listing.price}` : 'No Listed Price' } </h4>

                <button onClick={() => { this.props.setListing(this.props.listing)}} > More Info </button>

                { this.props.listing !== null ?
                    <button onClick={() => this.toggleUpdate()}> Update Listing </button> 
                    : '' }

                { this.state.updateListing !== false ?
                     
                    <form onSubmit={(event) => this.updateListing(event)} >
                        <br /><br />
                        <label> Image URL: </label>
                        <textarea placeholder={this.props.listing.img_url} type='text'/>
                        <br /><br />

                        <label> Description: </label>
                        <textarea placeholder={this.props.listing.desc} type='text'/>
                        <br /><br />

                        <label> Preferences: </label>
                        <textarea placeholder={this.props.listing.preferences} type='text'/>
                        <br /><br />

                        <label> Price: </label>
                        <input placeholder={this.props.listing.price} type='text'/>
                        <br /><br />
                        <input type='submit' value='Update' />
                    </form>
                     
                     
                     :
                      ''}

            </div>
        )
    }
}
export default MyListingCard;