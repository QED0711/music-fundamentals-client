import React from 'react';

import contentRender from '../../js/contentRenderer'

const ContentPreview = ({content, stateMethods}) => {
    console.log("CONTENT: ", content)
    return(
        <div id="content-preview">
            {contentRender(content, stateMethods)}
        </div>
    )

}

export default ContentPreview;