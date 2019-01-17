import React from 'react';

import DeleteContent from './DeleteContentButton';

const ContentEditButtons = (props) => {
    let {content} = props;
    
    return(
        <div className="content-edit-buttons">
            <button>Edit</button>
            <DeleteContent content={content} stateMethods={props.stateMethods}/>
            <button>Move Up</button>
            <button>Move Down</button>
        </div>
    )

}

export default ContentEditButtons;