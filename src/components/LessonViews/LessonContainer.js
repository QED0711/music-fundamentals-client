import React from 'react';

const LessonContainer = (props) => {
    let lesson = props.state.currentLesson

    return(
        <div id="lesson-diplsay-box">
            <h2>{lesson.title}</h2>
            <h4>{lesson.description}</h4>
        </div>
    )

}

export default LessonContainer;
