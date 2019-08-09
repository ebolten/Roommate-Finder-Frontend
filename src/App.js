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

class App extends Component {

  constructor(){
    super()
    this.state={
      user:null,
      user_id:null
    }
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
    if(this.parseUser() !== null) {
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

      </div>
    );
  }
}

export default App;
