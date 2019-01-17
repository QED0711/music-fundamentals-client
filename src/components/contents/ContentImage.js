import React from 'react';

const ContentImage = (props) => {

    return(
        <div className="content-box content-image">
            <img src={props.content[0]} alt={props.content[1]}/>
        </div>
    )

}

export default ContentImage;