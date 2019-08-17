import React from 'react';

class Messages extends React.Component {

    constructor(){
        super()
        this.state={
            messages:[]
        }
    }

    componentDidMount(){
        this.setState({ messages:this.props.messages })
    }

    render(){
        return(
            <div>
            
                { this.state.messages.length !== 0 ? console.log(this.state.messages) : '' }
            
            </div>
        )
    }
}
export default Messages