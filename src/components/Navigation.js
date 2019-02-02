import React from 'react';

import {Link} from 'react-router-dom';


const Navigation = ({stateMethods, state}) => {

    console.log("NAV: ", state)

    const handleClick = () => {
        stateMethods.setCurrentLessonNull()
    }

    return(
        <nav onClick={handleClick}>
            <Link to="/">Home</Link>
            <Link to="/lessons">Lessons</Link>
            <Link to="/instructors/login">Instructor Portal</Link>
            {
                state.currentUser.signedIn 
                &&
                <Link to="/instructors/token-validation">Varify Student Token</Link>
            }
        </nav>
    )
}

export default Navigation;