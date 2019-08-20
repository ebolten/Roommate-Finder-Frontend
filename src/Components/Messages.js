import React from 'react';

class Messages extends React.Component {

    constructor(){
        super()
        this.state={
            user:null,
            currentUser:null
        }
    }

    //get the user who posted the message
    componentDidMount(){
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(data => {
            for(var i = 0; i < data.length; i++){
                if(this.props.message.user_id === data[i].id){
                    this.setState({ user:data[i] })
                    console.log(data[i])
                }
            }
        })
    }

    render(){
        return(
            <div id='message'>
                < hr />
                <p>{ this.props.message !== null ? this.props.message.content : ''}{ this.state.user !== null ? ` - ${this.state.user.username}` : ''}</p>
                < hr />
            </div>
        )
    }
}
export default Messages