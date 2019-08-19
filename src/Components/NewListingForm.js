import React from 'react';
import { Link } from 'react-router-dom'

class NewListingForm extends React.Component {

    constructor(){
        super()
        this.state={
            img_url:null,
            desc:null,
            preferences:null,
            areaCode:null,
            price:null,
            listing:null
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
                    this.postListing(data[i].id)
                }
            }
        })
    }

    //create a post request to create new listing
    postListing = (areaId) => {
        if (areaId === null || areaId === undefined){
            alert('Invalid Zip Code');
        } else{
            fetch('http://localhost:3000/listings',{
                method:'POST',
                headers:{'Content-Type':'application/json',
            Accept:'application/json'},
                body:JSON.stringify({
                    img_url: this.state.img_url,
                    desc: this.state.desc,
                    preferences: this.state.preferences,
                    user_id: this.props.user.id,
                    area_id: areaId,
                    price:this.state.price
                })
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({ listing:data })
            })}
    }

    //handle the submit of the form
    handleSubmit = (event) => {
        event.preventDefault();
        const img = event.target.children[1].value
        const desc = event.target.children[5].value
        const pref = event.target.children[9].value
        const area = event.target.children[13].value
        const newPrice = event.target.children[17].value
                
        this.setState({
            img_url:img,
            desc:desc,
            preferences:pref,
            areaCode:area,
            price:newPrice
        })
        this.findArea(area); //find the area based on the zip code
    }

  render(){
      return(
          <div>

          <h5> Post a New Listing </h5>
          
            <form onSubmit={ event => this.handleSubmit(event) } >
                <label> Image URL: </label>
                <textarea type='text'  />
                <br /><br />
                <label> Description: </label>
                <textarea type='text'  />
                <br /><br />
                <label> Your Preferences: </label>
                <textarea type='text'  />
                <br /><br />
                <label> Zip Code: </label>
                <input type='text'  />
                <br /><br />
                <label> Price per Month: </label>
                <input type='text' />
                <br /><br />
                
                <input value='Post Listing' type='submit'/>
            </form >

            { this.state.listing !== null ? 
                <Link to={`/mylistings/${this.props.user.username}`} >
                    <button> See my Listing </button>
                </Link> 
                : '' }


            <br />
          </div>
      )
  }

}
export default NewListingForm;