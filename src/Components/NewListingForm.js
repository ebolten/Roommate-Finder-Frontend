import React from 'react';

class NewListingForm extends React.Component {

    constructor(){
        super()
        this.state={
            img_url:null,
            desc:null,
            preferences:null,
            areaCode:null,
            price:null
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
        console.log(this.state.price);

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
            .then(data => {console.log(data)})}
    }

    //handle the submit of the form
    handleSubmit = (event) => {
        event.preventDefault();
        const img = event.target.children[1].value
        const desc = event.target.children[5].value
        const pref = event.target.children[9].value
        const area = event.target.children[13].value
        const newPrice = event.target.children[17].value

        console.log(newPrice)
        
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
                <label> Area Code: </label>
                <input type='text'  />
                <br /><br />
                <label> Price per Month: </label>
                <input type='text' />
                <input type='submit'/>

            </form >
            <br />
          </div>
      )
  }

}
export default NewListingForm;