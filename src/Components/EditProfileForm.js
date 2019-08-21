import React from 'react'

class EditProfileForm extends React.Component {

    render(){
        return(
            <div> 
            
                <form>
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

                    <input type='submit' value='Edit Profile' />
                </form>
            
            </div>
        )
    }

}
export default EditProfileForm