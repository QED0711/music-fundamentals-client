import React from 'react';

import {Link} from 'react-router-dom';


const Navigation = (props) => {

    const handleClick = () => {
        props.stateMethods.setCurrentLessonNull()
    }

    return(
        <nav onClick={handleClick}>
            <Link to="/">Home</Link>
            <Link to="/lessons">Lessons</Link>
            <Link to="/instructors/login">Instructor Portal</Link>
        </nav>
    )
}

export default Navigation;