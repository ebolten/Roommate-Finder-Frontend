import React from 'react';
import { Route,withRouter,Redirect } from 'react-router-dom'
import ProfilePage from './ProfilePage';
import { Link } from 'react-router-dom'


class Login extends React.Component {

    constructor(){
        super()
        this.state={
            username:null,
            user:null
        }
    }

    userChange = (newUsername) => {

        fetch(`http://localhost:3000/users/${newUsername}`)
        .then(resp => resp.json())
        .then(data => {  
            this.setState({ user:data, username:newUsername })
        })

    }

    render(){
        return(
            <div>

                <h2>Login:</h2>
                
                <form onSubmit={ (event) => { this.handleSubmit( event.target.children[1].value ) } } >
                    <label> Username: </label>
                    <input type='text' onChange={(e) => { this.userChange( e.target.value ) }} />
                    <label> Password </label>
                    <input type='password'/>

                    { this.state.user !== null ? <Link to={`/profile/${this.state.user.username}`} >

                        <input value='Login' type='submit'/>

                    </Link> : 'Login'}


                </form>

                <h1> Or </h1>

                <h2> Create a New Account </h2>
                <button> Here: </button>

            </div>
        )
    }

}
export default Login;