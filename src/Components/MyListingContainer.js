import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import Messages from './Messages.js'

class MyListingContainer extends React.Component {

    constructor(){
        super()
        this.state={
            user:null,
            area:null,
            myMessages:[]
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
        fetch('http://localhost:3000/api/v1/users') //find user
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
        //get all messages
        fetch('http://localhost:3000/messages')
        .then(resp => resp.json())
        .then(data => {
            this.renderMessages(data)
        })
    }
    //send a message to another user about their bookmark
    sendMessage = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/messages',{
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({
                listing_id: this.props.listing.id,
                user_id: this.state.user.id,
                content:event.target.children[0].value
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })    
    }
    //render specific messages to this user
    renderMessages = (messages) => {
        for(var i = 0; i < messages.length; i++){
            if(messages[i].listing_id === this.props.listing.id){
                this.setState({ myMessages:[...this.state.myMessages,messages[i]] })
            }
        }
    }
    render() {
        return(
            <div>
            
                <div className='myCardListing'>

                   <Image className='containerImage' src={this.props.listing.img_url} /> 

                   <h3 className='myContainerText'> Price per Month: { this.props.listing.price !== null ? `$${this.props.listing.price}` : 'Message User for Price'} </h3>
                   <h3 className='myContainerText'>Posted By: {this.state.user !== null ? this.state.user.username : 'Unknown User'} </h3>
                   <h3 className='myContainerText'> Posted In: {this.state.area !== null ? `${this.state.area.cityname}, ${this.state.area.zipcode}` : 'Unknown Area'} </h3>
                   <h3 className='myContainerText'> Room Description: {this.props.listing.desc} </h3>

                   <div id='messages'>
                        <h3> My Messages </h3>

                        { this.state.myMessages.map(m => {
                            return <Messages listing={this.props.listing} message={m} />
                        })}

                        <br /><br />
                        
                        <form  onSubmit={(event) => { this.sendMessage(event) }}>
                            <textarea type='text' />
                            <input value='send' type='submit'/>
                        </form>
                    </div>

                    <h5 className='container'> Posted On: {this.getDate()} </h5>
                    <button onClick={() => { this.props.setListing(null) }}> Back to Listings </button>
                </div>
            </div>
        )
    }
}

export default MyListingContainer;