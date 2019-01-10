import React from 'react';
import {Redirect} from 'react-router-dom'
import {Query} from 'react-apollo'

import {GET_INSTRUCTOR_BY_CREDENTIALS} from '../queries/queries';

const InstructorLogin = (props) => {
    const userLogin = props.state.userLogin
    const {handleLoginChange, loginUser} = props.stateMethods

    if(props.state.currentUser.signedIn){
        return(
            <Redirect to="/" />
        )
    }

    function submitWrapper(data){
        return (e) => {
            e.preventDefault();
            let instructor
            if(data){
                instructor = data.instructorByEmail
            }
            if(instructor && !props.state.currentUser.signedIn){
                loginUser(data.instructorByEmail[0]);
            } else {
                alert("User email or Password incorrect")
            }
        }

    }

    return(
        <Query query={GET_INSTRUCTOR_BY_CREDENTIALS} variables={{email: userLogin.email, password: userLogin.password}}>
            {
                ({data}) => {
                    
                    return(
                    <div className="page-container">
                        <h2>Instructor Login</h2>

                        <form id="instructor-login" onChange={handleLoginChange} onSubmit={submitWrapper(data)}>
                            <label>Email</label><br/>
                            <input id="email-input" type="text"/><br/>
                            <label>Password</label><br/>
                            <input id="password-input" type="password"/><br/>
                            <input type="submit" />
                        </form>
                        </div>
                    )

                }
            }
        </Query>

    )


}

export default InstructorLogin;