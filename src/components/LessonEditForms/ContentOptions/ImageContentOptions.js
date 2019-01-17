import React from 'react';

const ImageContentOptions = (props) => {

    return(
        <div id="content-edit-options">
            <label>Image Url</label><br/>
            <input className="new-content-data" type="text" required/>
            <br/>
            <label>Image Descriptions</label><br/>
            <textarea className="new-content-data" required></textarea>
            <br/>
            <label>Position (optional)</label><br/>
            <input id="new-content-position" type="number"/>
        </div>
    )

}

export default ImageContentOptions;