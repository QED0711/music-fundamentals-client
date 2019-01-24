import React from 'react';

import contentRender from '../../js/contentRenderer'

const ContentPreview = ({content, stateMethods}) => {
    return(
        <div id="content-preview">
            <h5>Preview</h5>
            {contentRender(content, stateMethods)}
        </div>
    )

}

export default ContentPreview;