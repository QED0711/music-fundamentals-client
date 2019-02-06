import React from 'react';

import {Link} from 'react-router-dom';


const Navigation = ({stateMethods, state}) => {

    const handleClick = () => {
        stateMethods.setCurrentLessonNull()
    }

    return(
        <nav onClick={handleClick}>
            <Link to="/">Home</Link>
            <Link to="/lessons">Lessons</Link>
            <Link to="/instructors/login">Instructor Portal</Link>
            <Link to="/token-verification">Verify Token</Link>
        </nav>
    )
}

export default Navigation;