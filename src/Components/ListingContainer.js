import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class ListingContainer extends React.Component {

    constructor(){
        super()
        this.state={
            user:null,
            area:null
        }
    }

    getDate = () => {

        let date = this.props.listing.created_at.split('-')
        let month = date[1]
        let day = date[2].split('T')[0]
        let year = date[0]

        switch (month){
            case '01':
                month = 'January'
                break
            case '02':
                month = 'February'
                break
            case '03':
                month = 'March'
                break
            case '04':
                month = 'April'
                break
            case '05':
                month = 'May'
                break
            case '06':
                month = 'June'
                break
            case '07':
                month = 'July'
                break
            case '08':
                month = 'August'
                break
            case '09':
                month = 'September'
                break
            case '10':
                month = 'October'
                break
            case '11':
                month = 'November'
                break
            case '12':
                month = 'December'
                break
        }
        return `${month} ${day}, ${year}`;
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/users') //find user
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

        fetch('http://localhost:3000/areas') //find area
        .then(resp => resp.json())
        .then(data => {
            for (var i = 0; i < data.length; i++){
                if (data[i].id === this.props.listing.area_id){
                    this.setState({ area:data[i] })
                }
            }
        })
    }

    render() {
        return(
            <div>
            
                <div className='cardListing'>
                
                   <Image className='containerImage' src={this.props.listing.img_url} /> 

                   <h3 className='containerText'>Posted By: {this.state.user !== null ? this.state.user.username : 'Unknown User'} </h3>
                   <h3 className='containerText'> Posted In: {this.state.area !== null ? `${this.state.area.cityname}, ${this.state.area.zipcode}` : 'Unknown Area'} </h3>
                   <h3 className='containerText'> Room Description: {this.props.listing.desc} </h3>
                
                   <h5 className='container'> Posted On: {this.getDate()} </h5>


                    <button onClick={() => { this.props.setListing(null) }}> Back to All Listings </button>

                </div>


                <form>
                
                    {/* this form is for sending a message */}
                
                </form>
            
            </div>
        )
    }
}

export default ListingContainer;