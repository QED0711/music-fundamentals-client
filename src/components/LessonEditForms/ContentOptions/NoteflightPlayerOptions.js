import React from 'react';

const NoteflightPlayerOptions = (props) => {

    return(
        <div id="content-edit-options">
            <label>Noteflight Score Url</label><br/>
            <input className="new-content-data" type="text" required />
            <br/>
            <label>Position (optional)</label><br/>
            <input id="new-content-position" type="number"/>
        </div>
    )

}

export default NoteflightPlayerOptions;