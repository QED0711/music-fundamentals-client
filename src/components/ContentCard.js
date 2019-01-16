import React from 'react';

import contentRenderer from '../js/contentRenderer';

const ContentCard = (props) => {
    let content = props.content;
    return(
        <div className="content-card">
            {contentRenderer(content)}
        </div>
    )

}

export default ContentCard;