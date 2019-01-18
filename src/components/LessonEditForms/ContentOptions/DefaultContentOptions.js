import React from 'react';

const DefaultContentOptions = ({content}) => {

    return(
        <div id="content-edit-options">
            <label>Text</label><br/>
            <textarea className={content ? "edit-content-data" : "new-content-data"} required defaultValue={content && content.data[0]}></textarea>
            <br/>
            <label>Position (optional)</label><br/>
            <input id={content ? "edit-content-position" : "new-content-position"} type="number"/>
        </div>
    )

}

export default DefaultContentOptions;