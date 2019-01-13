import React from 'react';

const ContentImage = (props) => {

    return(
        <div className="content-box content-image">
            <img src={props.content} />
        </div>
    )

}

export default ContentImage;