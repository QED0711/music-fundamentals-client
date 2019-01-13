import React from 'react';

import {Link} from 'react-router-dom'

const LessonEditBanner = (props) => {
    const lesson = props.lesson
    return(
        <div id="lesson-edit-banner">
            <Link to={`/lessons/${lesson.id}/edit`}>Edit</Link><br/>
            <button>{lesson.published ? "Unpublish" : "Publish"}</button>
        </div>
    )

}

export default LessonEditBanner;