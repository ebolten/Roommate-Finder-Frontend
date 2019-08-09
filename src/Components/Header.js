import React from 'react';
import MenuBar from './MenuBar.js'

class Header extends React.Component {

    render() {
        return(
            <div>
            
            <div id='headerComponent'>
                <h2 id='roomTitle'>Roommate Finder</h2>
            </div>
                <MenuBar user={this.props.user} newListing={this.props.createListing} btn={this.props.btn} />
            </div>

        )
    }
}

export default Header;