import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import Messages from './Messages.js'

class ListingContainer extends React.Component {

    constructor(){
        super()
        this.state={
            user:null,
            area:null,
            myMessages:[]
        }
    }
    //render specific messages to this listing
    renderMessages = (messages) => {
        for(var i = 0; i < messages.length; i++){
            if(messages[i].listing_id === this.props.listing.id){
                this.setState({ myMessages:[...this.state.myMessages,messages[i]] })
            }
        }
    }
    //get the date as a string
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
    //find which user posted bookmark
    componentDidMount = () => {
        //find user who posted listing
        fetch('http://localhost:3000/api/v1/users')
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
        //render the messages of this listing
        fetch('http://localhost:3000/messages')
        .then(resp => resp.json())
        .then(data => {
            this.renderMessages(data)
        })
        //find area of the bookmark
        fetch('http://localhost:3000/areas')
        .then(resp => resp.json())
        .then(data => {
            for (var i = 0; i < data.length; i++){
                if (data[i].id === this.props.listing.area_id){
                    this.setState({ area:data[i] })
                }
            }
        })
    }
    //send a message to another user about their bookmark
    sendMessage = (event) => {
        event.preventDefault();
        let newContent = event.target.children[0].value;
        event.target.children[0].value = '';

        fetch('http://localhost:3000/messages',{
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({
                listing_id: this.props.listing.id,
                user_id: this.props.user.id,
                content:newContent
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({ myMessages:[...this.state.myMessages,data]})
        })
        event.target.children[1].value = '';
    }

    render() {
        return(
            <div>
                <div className='cardListing'>

                   <Image className='containerImage' src={this.props.listing.img_url} /> 

                   <h2 className='containerText'> Price per Month: ${this.props.listing.price} </h2>
                   <h2 className='containerText'> Posted In: {this.state.area !== null ? `${this.state.area.cityname}, ${this.state.area.zipcode}` : 'Unknown Area'} </h2>
                   <h4 className='containerText'> Room Description: {this.props.listing.desc} </h4>
                   <h4 className='containerText'> Preferences: { this.props.listing.preferences } </h4>

                     {/* display messages for this listing */}
                     <div id='messages'>
                        <h3> Messages </h3>

                        { this.state.myMessages.map(m => {
                            return <Messages listing={this.props.listing} message={m} />
                        })}
                        {/* form to send message */}
                        <form id='sendMessage' onSubmit={(event) => { this.sendMessage(event) }}>
                            <textarea type='text' />
                            <input value='send' type='submit'/>
                        </form>
                    </div>
                    {/* display contact info for user */}
                    <div className='cardListingText'>
                        <h5> Contact {this.state.user !== null ? this.state.user.username : 'Unknown User'}: </h5>
                        <h5> Phone Number: {this.state.user !== null ? this.state.user.tel_num : ''} </h5>

                        <h5> Email: {this.state.user !== null ? this.state.user.email : ''} </h5>
                    </div>
                    {/* display when posted and back to listings btn */}
                    <div className='underPhoto'>
                        <h5> Posted On: {this.getDate()} </h5>
                        <button onClick={() => { this.props.setListing(null) }}> Back to Listings </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListingContainer;