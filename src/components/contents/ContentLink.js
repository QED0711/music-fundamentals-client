import React from 'react';

const ContentLink = ({content}) => {

    return(
        <div className="content-box content-link">
            <a href={content[1]} target="_blank"><p>{content[0]}</p></a>
        </div>
    )

} 

export default ContentLink