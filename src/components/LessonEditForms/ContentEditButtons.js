import React from 'react';

import DeleteContent from './DeleteContentButton';
import ContentPositionButtons from './ContentPositionButtons';

const ContentEditButtons = (props) => {
    let {content, lesson} = props;
    
    return(
        <div className="content-edit-buttons">
            <button>Edit</button>
            <DeleteContent content={content} stateMethods={props.stateMethods}/>
            <ContentPositionButtons content={content} lesson={lesson} stateMethods={props.stateMethods} />
        </div>
    )

}

export default ContentEditButtons;