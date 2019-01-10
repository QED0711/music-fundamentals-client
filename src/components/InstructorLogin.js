import React from 'react';
import Redirect from 'react-router-dom'
import {Query} from 'react-apollo'

import {GET_INSTRUCTOR_BY_EMAIL} from '../queries/queries';

const InstructorLogin = (props) => {
    let {userLogin} = props.state

    let handleLoginChange = props.stateMethods.handleLoginChange;
    console.log(userLogin)
    return(
        <Query query={GET_INSTRUCTOR_BY_EMAIL} variables={{email: props.state.userLogin.email}}>
            {
                ({loading, error, data}) => {
                    // if(loading) return "LOADING!!!"
                    // if(error) return "ERROR"
                    console.log(data)
                    
                    return(
                    <div className="page-container">
                        <h2>Instructor Login</h2>

                        <form id="instructor-login" onChange={handleLoginChange}>
                            <label>Email</label><br/>
                            <input id="email-input" type="text"/><br/>
                            <label>Password</label><br/>
                            <input id="password-input" type="password"/><br/>
                        </form>
                        </div>
                    )

                }
            }
        </Query>

    )


}

export default InstructorLogin;