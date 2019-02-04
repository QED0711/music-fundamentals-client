import React from 'react';

import {Redirect} from 'react-router-dom';
import redirectToCurrentLesson from '../js/redirectToCurrentLesson'
// import {Query} from 'react-apollo';

const LessonCard = ({lesson, stateMethods, state}) => {

    
    // if(state && state.currentLesson.id){
    //     return redirectToCurrentLesson(state.currentLesson)
    // }

    const handleClick = (e) => {
        stateMethods.setCurrentLesson(lesson)
    }
    return(
        <div className="lesson-card" data-id={lesson.id} onClick={handleClick}>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            
            <h6>tags: {lesson.tags.join(", ")}</h6>
            <h6>type: {lesson.type}</h6>
            <h6>published: {`${lesson.published}`}</h6>
            <hr/>
        </div>
    )
}

export default LessonCard;