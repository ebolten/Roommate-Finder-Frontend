import React from 'react';

class NewListingForm extends React.Component {

    constructor(){
        super()
        this.state={
            img_url:null,
            desc:null,
            preferences:null,
            areaCode:null,
            area_id:null,
            submit:false
        }
    }

    findArea = (area) => {

        //find the area with area code
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

    postListing = (areaId) => {
        //create a post request to create new listing
        fetch('http://localhost:3000/listings',{
            method:'POST',
            headers:{'Content-Type':'application/json',
        Accept:'application/json'},
            body:JSON.stringify({

                img_url: this.state.img,
                desc: this.state.desc,
                preferences: this.state.preferences,
                user_id: 1,
                area_id: areaId

            })
        })
        .then(resp => resp.json())
        .then(data => {console.log(data)})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const img = event.target.children[1].value
        const desc = event.target.children[4].value
        const pref = event.target.children[7].value
        const area = event.target.children[10].value
        
        this.setState({
            img_url:img,
            desc:desc,
            preferences:pref,
            areaCode:area
        })

        this.findArea(area);    
    }

  render(){
      return(
          <div>
          
            <form onSubmit={ event => this.handleSubmit(event) } >
            
                <label> Image URL: </label>
                <input type='text'  />
                <br />
                <label> Description: </label>
                <input type='text'  />
                <br />
                <label> Your Preferences: </label>
                <input type='text'  />
                <br />
                <label> Area Code </label>
                <input type='text'  />

                <input type='submit'/>

            </form >

            {/* this.state.areaCode !== null ? 
                this.postListing( 
                this.state.img,this.state.desc,this.state.preferences,this.state.areaCode,1 ) 
                : 'null' */}

          </div>
      )
  }

}
export default NewListingForm;