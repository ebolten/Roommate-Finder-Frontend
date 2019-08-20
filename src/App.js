import React,{Component,Fragment} from 'react';
import './App.css';
import { Route,withRouter } from 'react-router-dom'
import Header from './Components/Header.js'
import Listing from './Components/Listings.js'
import ListingCard from './Components/ListingCard.js'
import ListingContainer from './Components/ListingContainer.js'
import IndexPage from './Components/IndexPage.js'
import ProfilePage from './Components/ProfilePage';
import NewListingForm from './Components/NewListingForm';
import Login from './Components/Login';
import MyListings from './Components/MyListings';
import FirstPage from './Components/FirstPage';

class App extends Component {

  constructor(){
    super()
    this.state={
      user:null,
      user_id:null,
      listing:null
    }
  }

  updateCurrentUser = (user) => {
    this.setState({user:user})
  }

  //parse window.location.pathname to get the username only
  parseUser() {
    let user = window.location.pathname;
    let NewUser = user.split('/')
    if(NewUser[2] === undefined) {
        return null
    } else {
        return NewUser[2];
    }
  }

  //get users data based on the route
  componentDidMount(){
    // if(this.parseUser() !== null && this.parseUser() != undefined) {
    //     fetch(`http://localhost:3000/users/${this.parseUser()}`)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         this.setState({
    //             user:data,
    //             user_id:data.id
    //         })
    //     })
    // }

    //   check to see if there is a jwt?
    // if there is, fetch to get the user and update the user state
    let token = localStorage.getItem("jwt")
    if(token){
      fetch("http://localhost:3000/api/v1/profile", {
        headers: {"Authentication": `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => {
        this.updateCurrentUser(data)
      })
    }

    //if not, let them log in
  }

  render() {
    return (
    
      <div className="App">

        {/* render home page with a user */}
        <Route path={`/home/`} render={() => {
          return(
            <IndexPage id={this.state.user_id} user={this.state.user} />
          )
        }} />

        {/* render first page user sees */}
        <Route exact path={`/`} render={() => {
          return(
            <FirstPage />
          )
        }} />

        {/* render the user's listings */}
        <Route path={`/mylistings/`} render={() => {
          return(
            <MyListings id={this.state.user_id} user={this.state.user} />
          )
        }} />

        {/* render profile page with a user */}
        <Route path={`/profile/`} render={() => {
          return(
            <ProfilePage id={this.state.user_id} user={this.state.user} />
          )
        }} />

        {/* form to create new listing */}
        <Route path={`/newlisting/`} render={() => {
          return(
            <NewListingForm id={this.state.user_id} user={this.state.user} />
          )
        }} />

        <Route exact path={'/login'} render={() => {
          return(
            <Login updateCurrentUser={this.updateCurrentUser} />
          )
        }} />

        <Route path={'/listing/'} render={() => {
          return(
            <ListingContainer listing={this.state.listing} />
          )
        }} />

      </div>
    );
  }
}
export default withRouter(App);
