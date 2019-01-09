import React from 'react';

import {Route, Link} from 'react-router-dom';


const Navigation = (props) => {

    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/lessons">Lessons</Link>
            <Link to="/instructors/login">Instructor Portal</Link>
        </nav>
    )
}

export default Navigation;