import React from 'react';

const LessonCard = (props) => {
    let lesson = props.lesson
    return(
        <div className="lesson-card">
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            <h6>tags: {lesson.tags.join(", ")}</h6>
            <hr/>
        </div>
    )
}

export default LessonCard;