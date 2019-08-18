import React from 'react';
import PlainHeader from './PlainHeader.js'
import { Link } from 'react-router-dom'

class FirstPage extends React.Component{

    render(){
        return(
            <div>
                <PlainHeader />

                <h1> Welcome to Roommate Finder </h1>
                <br />
                
                <div id='firstPage'>
                    <h2> About This App: </h2>
                    <h4>
                        With Roommate Finder you can find a roommate easily by meeting other users
                        and viewing
                    </h4>
                    <h4>  a series of listings posted by users who are also looking
                        for a roommate. </h4>

                    <br />
                    <h4> &#8595; Go to Login Page Here &#8595; </h4>
                    <Link to={'/login'} >
                        <button> Login Page </button>
                    </Link>
                    
                </div>

            </div>
        )
    }

}
export default FirstPage;