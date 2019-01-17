import React from 'react';

const NoteflightInteractiveOptions = (props) => {

    return(
        <div id="content-edit-options">
            <label>Noteflight Score Url (Assignment)</label><br/>
            <input className="new-content-data" type="text" required />
            <br/>
            <label>Noteflight Score Url (Answer Key)</label><br/>
            <input className="new-content-data" type="text" required />
            <br/>
            <label>Position (optional)</label><br/>
            <input id="new-content-position" type="number"/>
        </div>
    )

}

export default NoteflightInteractiveOptions;