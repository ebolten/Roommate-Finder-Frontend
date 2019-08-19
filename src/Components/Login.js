import React from 'react';
import { Route,withRouter,Redirect } from 'react-router-dom'
import ProfilePage from './ProfilePage';
import { Link } from 'react-router-dom'
import PlainHeader from './PlainHeader.js'

class Login extends React.Component {

    constructor(){
        super()
        this.state={
            loginUsername:'',
            loginPassword:'',
            username:null,
            user:null,
            createAcc:false,
            userName:null,
            password:null,
            img:null,
            desc:null,
            tel:null,
            email:null,
            area:null,
            firstname:null,
            lastname:null
        }
    }
    //set the state of username
    handleUsername = (event) => {
        let value = event.target.value
        this.setState({ loginUsername: value })
    }
    //set the state of pasword
    handlePassword = (event) => {
    let value = event.target.value
    this.setState({ loginPassword: value })
    }
    //update the user in App
    updateCurrentUser = (newUser) => {
    this.setState({ user:newUser })
    }

    //user logs in, find the user
    handleLoginSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/api/v1/login', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                username: this.state.loginUsername,
                password: this.state.loginPassword
            })
        }).then(res => res.json())
        .then(data => {

            if(data.authenticated){
            console.log(data)
            //update state
            this.props.updateCurrentUser(data.user)
            //store the token in localStorage
            localStorage.setItem("jwt", data.token)

            } else{
            alert("incorrect username or password")
            }
        })
    };

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
                firstname:this.state.firstname,
                lastname:this.state.lastname,
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
            if (data.id !== null && data.id !== undefined){
                window.alert('Account Created!')
                this.setState({ user:data })
                this.toggleCreateAcc()
            } else {
                if(data.error.username !== undefined){
                    window.alert(`Failed to Create Account: Username ${data.error.username[0]}`)
                } else if(data.error.password !== undefined){
                    window.alert(`Failed to Create Account: Password ${data.error.password[0]}`)
                } else{
                    window.alert(`Failed to Create Account`)
                }
            }
            console.log(data)
        })
    }
    //update the state for user attributes on create
    onSubmit = (event) => {
        event.preventDefault()
        let username = event.target.children[2].value
        let firstName = event.target.children[6].value
        let lastName = event.target.children[10].value
        let userPassword = event.target.children[14].value
        let userImg = event.target.children[18].value
        let userDesc = event.target.children[22].value
        let userTel = event.target.children[26].value
        let userEmail = event.target.children[30].value
        let userArea = event.target.children[34].value

        this.setState({
            userName:username,
            firstname:firstName,
            lastname:lastName,
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

            <div>
                <PlainHeader />
                {
                this.state.createAcc === false ?
                <div id='loginPage'>
                    <div id='loginText'>
                        <br /><br />
                        <h2>Login:</h2>
                        
                        <form onSubmit={ (event) => this.handleLoginSubmit(event) } >
                            <label> Username: </label>
                            <input type='text' onChange={(event) => { this.handleUsername(event) }} />
                            <label> Password </label>
                            <input type='password' onChange={(event) => { this.handlePassword(event) }} />

                            <input value='Login' type='submit'/>

                            {/* creates a button for login */}
                            {/* this.state.user !== null ? */}
                            {/*<Link to={`/profile/${this.state.user.username}`} >*/}
                                
                            {/*</Link> : <button onClick={(event) => this.popUp(event,'login') }> Login </button>}*/}
                        </form>

                        <h1> Or </h1>

                        <h2> Sign Up &#8594; <button id='hereBtn' onClick={() => this.toggleCreateAcc()} >Here</button></h2>

                    </div>

                </div>

                :    
                
                <div className='cardListing'>
                    <form className='containerAcc' onSubmit={(e) => this.onSubmit(e)}>
                        <br />
                        <label> Username: </label>
                        <input type='text' />
                        <br /><br />
                        <label> First Name: </label>
                        <input type='text'/>
                        <br /><br />
                        <label> Last Name: </label>
                        <input type='text'/>
                        <br /><br />
                        <label> Password: </label>
                        <input type='password' />
                        <br /><br />
                        <label> Image URL: (profile photo) </label>
                        <input type='text' />
                        <br /><br />
                        <label> Your Bio: </label>
                        <input type='text' />
                        <br /><br />
                        <label> Telephone Number: </label>
                        <input type='text' />
                        <br /><br />
                        <label> Email: </label>
                        <input type='email' />
                        <br /><br />
                        <label> Your Current Zip Code: </label>
                        <input type='text' />
                        <br /><br />
                       
                        
                        {/* creates a button for account creation */}
                        <input value='Create Account' type='submit'/>
                    </form>

                    <div id='floaat'>
                        <button onClick={ () => this.toggleCreateAcc() }>Back to Login</button>
                    </div>

                </div>
                }
            </div>
        )
    }

}
export default Login;