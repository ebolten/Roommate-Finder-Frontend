import React from 'react';

class SearchBar extends React.Component {

    render(){
        return(
            <div>
            
                <input onChange={(event) => { this.props.change(event) }} type='text' />
            
            </div>
        )
    }

}
export default SearchBar