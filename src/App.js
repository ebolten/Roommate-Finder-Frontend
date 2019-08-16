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

class App extends Component {

  constructor(){
    super()
    this.state={
      user:null,
      user_id:null,
      listing:null
    }
  }

  //parse window.location.pathname to get the username only
  parseUser() {
    let user = window.location.pathname;

    console.log(user)

    let NewUser = user.split('/')

    if(NewUser[2] === undefined) {
        return null
    } else {
        return NewUser[2];
    }
  }

  //get users data based on the route
  componentDidMount(){
    if(this.parseUser() !== null && this.parseUser() != undefined) {
        fetch(`http://localhost:3000/users/${this.parseUser()}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                user:data,
                user_id:data.id
            })
        })
    }
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

        {/* render the user's listings */}
        <Route path={`/mylistings/`} render={() => {
          return(
            <MyListings id={this.state.user_id} user={this.state.user} />
          )
        }} />

        {/* render profile page with a user */}
        <Route path={`/profile/:username`} render={() => {
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
            <Login />
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

export default App;
