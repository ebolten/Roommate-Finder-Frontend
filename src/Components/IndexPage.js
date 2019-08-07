import React from 'react';

class IndexPage extends React.Component {

    //get users data based on the route
    componentDidMount(){
        fetch(`http://localhost:3000${this.props.user}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    render() {
        return(
            <div>
            </div>
        )
    }
}

export default IndexPage;