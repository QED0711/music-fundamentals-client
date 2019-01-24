import React from 'react';

const NoteflightPlayerOptions = ({content}) => {

    return(
        <div id="content-options">
            <label>Noteflight Score Url</label><br/>
            <input className={content ? "edit-content-data" : "new-content-data"} type="text" required defaultValue={content && content.data[0]} />
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

export default NoteflightPlayerOptions;