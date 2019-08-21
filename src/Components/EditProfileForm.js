import React from 'react'

class EditProfileForm extends React.Component {

    updateUser = (event) => {
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.username}`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json',
                Accept:'application/json'},
                body:JSON.stringify({
                    firstname:event.target.children[1].value === '' ? event.target.children[1].placeholder : event.target.children[1].value,
                    lastname:event.target.children[4].value === '' ? event.target.children[4].placeholder : event.target.children[4].value,
                    desc:event.target.children[7].value === '' ? event.target.children[7].placeholder : event.target.children[7].value,
                    img_url:event.target.children[10].value === '' ? event.target.children[10].placeholder : event.target.children[10].value,
                    email:event.target.children[13].value === '' ? event.target.children[13].placeholder : event.target.children[13].value,
                    tel_num:event.target.children[16].value === '' ? event.target.children[16].placeholder : event.target.children[16].value
                })
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
    }

    render(){
        return(
            <div> 
            
                <form onSubmit={(event) => this.updateUser(event)}>
                    <label>First Name: </label>
                    <input placeholder={this.props.user.firstname} type='text' />
                    <br />
                    <label>Last Name: </label>
                    <input placeholder={this.props.user.lastname} type='text' />
                    <br />
                    <label>Bio: </label>
                    <textarea placeholder={this.props.user.desc} type='text' />
                    <br />
                    <label>Profile Photo (URL): </label>
                    <input placeholder={this.props.user.img_url} type='text' />
                    <br />
                    <label>Email: </label>
                    <input placeholder={this.props.user.email} type='text' />
                    <br />
                    <label>Telephone Number: </label>
                    <input placeholder={this.props.user.tel_num} type='text' />
                    <br />
                    <input type='submit' value='Edit Profile' />
                </form>
            
            </div>
        )
    }

}
export default EditProfileForm