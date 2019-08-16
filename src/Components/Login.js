import React from 'react';
import { Route,withRouter,Redirect } from 'react-router-dom'
import ProfilePage from './ProfilePage';
import { Link } from 'react-router-dom'
import PlainHeader from './PlainHeader.js'

class Login extends React.Component {

    constructor(){
        super()
        this.state={
            username:null,
            user:null,
            createAcc:false,
            userName:null,
            password:null,
            img:null,
            desc:null,
            tel:null,
            email:null,
            area:null
        }
    }
    //change the state of the username entered to login
    userChange = (newUsername) => {
        fetch(`http://localhost:3000/users/${newUsername}`)
        .then(resp => resp.json())
        .then(data => {  
            this.setState({ user:data, username:newUsername })
        })
    }
    //click a button to render create account form
    toggleCreateAcc = () => {
        if(this.state.createAcc === false) {
            this.setState({ createAcc:true })
        } else {
            this.setState({ createAcc:false })
        }
    }
    //find the area with the area code
    findArea = (area) => {
        fetch('http://localhost:3000/areas')
        .then(resp => resp.json())
        .then(data => {
            let id = 0
            for(var i = 0; i < data.length; i++) {
                if(data[i].zipcode == Number(area)){
                    this.postUser(data[i].id)
                }
            }
        })
    }
    //post a new user to database
    postUser = (id) => {
        fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({
                username:this.state.userName,
                password_digest:this.state.password,
                img_url:this.state.img,
                desc:this.state.desc,
                tel_num:this.state.tel,
                email:this.state.email,
                area_id:id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({ user:data })
        })
    }
    //update the state for user attributes on create
    onSubmit = (event) => {
        event.preventDefault()
        let username = event.target.children[2].value
        let userPassword = event.target.children[6].value
        let userImg = event.target.children[10].value
        let userDesc = event.target.children[14].value
        let userTel = event.target.children[18].value
        let userEmail = event.target.children[22].value
        let userArea = event.target.children[26].value

        this.setState({
            userName:username,
            password:userPassword,
            img:userImg,
            desc:userDesc,
            tel:userTel,
            email:userEmail
        })
        this.findArea(userArea)
    }
    //create a pop up that says failed to login
    popUp = (event,type) => {
        event.preventDefault()
        if (type === 'login') { window.alert('Failed to Login: Username or Password is Invalid') }
        else if (type === 'create') { window.alert('Failed to Create Account') }
    }

    render(){
        return(
            <div id='loginPage'>
                <PlainHeader />
                <div id='loginText'>
                    <br /><br />
                    <h2>Login:</h2>
                    
                    <form onSubmit={ (event) => { this.handleSubmit( event.target.children[1].value ) } } >
                        <label> Username: </label>
                        <input type='text' onChange={(e) => { this.userChange( e.target.value ) }} />
                        <label> Password </label>
                        <input type='password'/>

                        {/* creates a button for login */}
                        { this.state.user !== null ? <Link to={`/profile/${this.state.user.username}`} >
                            <input value='Login' type='submit'/>
                        </Link> : <button onClick={(event) => this.popUp(event,'login') }> Login </button>}

                    </form>

                    <h2> Or Create a New Account -> <button onClick={() => this.toggleCreateAcc()} >Here</button></h2>

                    {/* if user wants to create an account, create a pop-up card */}
                    { this.state.createAcc !== false ? 
                        <div className='card'>
                            <form className='container' onSubmit={(e) => this.onSubmit(e)}>
                                <br />
                                <label> Username: </label>
                                <input type='text' />
                                <br /><br />
                                <label> Password (5 words) </label>
                                <input type='password' />
                                <br /><br />
                                <label> Image URL (profile photo) </label>
                                <input type='text' />
                                <br /><br />
                                <label> Your Bio </label>
                                <input type='text' />
                                <br /><br />
                                <label> Telephone Number </label>
                                <input type='text' />
                                <br /><br />
                                <label> Email </label>
                                <input type='email' />
                                <br /><br />
                                <label> Your Current Zip Code </label>
                                <input type='text' />
                                <br /><br />
                                
                                {/* creates a button for account creation */}
                                <input value='Create Account' type='submit'/>
                            </form>
                        </div>
                        : ''
                    }
                    
                </div>

            </div>
        )
    }

}
export default Login;