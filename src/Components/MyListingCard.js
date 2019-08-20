import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class MyListingCard extends React.Component {

    constructor(){
        super()
        this.state={ updateListing:false,area:null }
    }

    toggleUpdate = () => {
        this.setState({updateListing:true })
    }
    //find the area this listing was posted in
    findArea = () => {
        let code = this.props.listing.area_id

        fetch(`http://localhost:3000/areas/${code}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ area:data })
        })
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
                    user_id: this.props.listing.user_id,
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

                {/* find the area if necessary */}
                { this.props.listing !== null && this.state.area === null ? this.findArea() : ''}
                <h4> Posted In: { this.state.area !== null ? this.state.area.cityname : ''}</h4>

                <h4 className='container'> Listed Price per Month: { this.props.listing.price !== null ? `$${this.props.listing.price}` : 'No Listed Price' } </h4>

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