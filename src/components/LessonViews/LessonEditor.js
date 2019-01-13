import React from 'react';

import {Redirect} from 'react-router-dom'

const LessonEditor = (props) => {

    if(!props.state.currentUser.signedIn) return <Redirect to="/" />

    return(
        <h3>This is the lesson edit page</h3>
    )

}

export default LessonEditor;