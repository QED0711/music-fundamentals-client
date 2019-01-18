import React from 'react';

import ContentEditButtons from './LessonEditForms/ContentEditButtons'

import contentRenderer from '../js/contentRenderer';

const ContentCard = (props) => {
    let {content, lesson, state, stateMethods} = props;
    return(
        <div className="content-card">
            {
                (lesson.instructorId === state.currentUser.id)
                &&
                <ContentEditButtons content={content} stateMethods={stateMethods} lesson={lesson}/>
            }
            {contentRenderer(content)}
        </div>
    )

}

export default ContentCard;