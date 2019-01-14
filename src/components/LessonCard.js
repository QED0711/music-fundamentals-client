import React from 'react';

// import {Query} from 'react-apollo';

const LessonCard = (props) => {
    let lesson = props.lesson
    
    const handleClick = (e) => {
        props.stateMethods.setCurrentLesson(lesson)
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