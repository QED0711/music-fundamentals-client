import React from 'react';

const NoteflightInteractiveOptions = ({content}) => {

    return(
        <div id="content-edit-options">
            <label>Noteflight Score Url (Assignment)</label><br/>
            <input className={content ? "edit-content-data" : "new-content-data"} type="text" required defaultValue={content && content.data[0]} />
            <br/>
            <label>Noteflight Score Url (Answer Key)</label><br/>
            <input className={content ? "edit-content-data" : "new-content-data"} type="text" required defaultValue={content && content.data[1]} />
            <br/>

            {
                !content && 
                <div className="content-position">
                    <label>Position (optional)</label>}
                    <br/>
                    <input id={content ? "edit-content-position" : "new-content-position"} type="number"/>
                </div>
            }
        </div>
    )

}

export default NoteflightInteractiveOptions;