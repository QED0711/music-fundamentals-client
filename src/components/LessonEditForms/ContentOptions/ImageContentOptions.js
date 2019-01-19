import React from 'react';

const ImageContentOptions = ({content}) => {

    return(
        <div id="content-edit-options">
            <label>Image Url</label><br/>
            <input className={content ? "edit-content-data" : "new-content-data"} type="text" required defaultValue={content && (content.data[0] || "")}/>
            <br/>
            <label>Image Descriptions</label><br/>
            <textarea className={content ? "edit-content-data" : "new-content-data"} required defaultValue={content && (content.data[1] || "")}></textarea>
            <br/>
            <label>Position (optional)</label><br/>
            <input id={content ? "edit-content-position" : "new-content-position"} type="number" defaultValue={content && content.position + 1}/>
        </div>
    )

}

export default ImageContentOptions;