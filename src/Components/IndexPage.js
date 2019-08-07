import React from 'react';

class IndexPage extends React.Component {

    constructor() {
        super()
        this.state={
            user:null
        }
    }

    //get users data based on the route
    componentDidMount(){
        if(this.parseUser() !== null) {
            fetch(`http://localhost:3000/users/${this.parseUser()}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    user:data
                })
            })
        }
    }

    //parse window.location.pathname to get the username only
    parseUser() {
        let user = this.props.user;
        let NewUser = user.split('/')

        if(NewUser[2] === undefined) {
            return null
        } else {
            return NewUser[2];
        }
    }

    render() {
        return(
            <div>
                {console.log(this.state.user)}
            </div>
        )
    }
}

export default IndexPage;