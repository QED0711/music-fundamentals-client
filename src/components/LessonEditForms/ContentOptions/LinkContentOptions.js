import React from 'react';

const LinkContentOptions = ({content}) => {

    return(
        <div id="content-options">
            <label>Link Text</label><br/>
            <textarea className={content ? "edit-content-data" : "new-content-data"} required defaultValue={content && content.data[0]}></textarea>
            <br/>

            <label>URL</label><br/>
            <textarea className={content ? "edit-content-data" : "new-content-data"} required defaultValue={content && content.data[1]}></textarea>
            <br/>

            {
                !content && 
                <div className="content-position">
                    <label>Position (optional)</label>
                    <br/>
                    <input id={content ? "edit-content-position" : "new-content-position"} type="number"/>
                </div>
            }
        </div>
    )

}

export default LinkContentOptions;