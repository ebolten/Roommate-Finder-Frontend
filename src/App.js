import React,{Component,Fragment} from 'react';
import './App.css';
import { Route,withRouter } from 'react-router-dom'

import Header from './Components/Header.js'
import Listing from './Components/Listings.js'
import ListingCard from './Components/ListingCard.js'
import ListingContainer from './Components/ListingContainer.js'
import IndexPage from './Components/IndexPage.js'

class App extends Component {

  render() {
    return (
    
      <div className="App">

        {/* render home page with a user */}
        <Route path={`/home/`} render={() => {
          return(
            <IndexPage user={window.location.pathname} />
          )
        }} />

      </div>
    
    );
  }
}

export default App;