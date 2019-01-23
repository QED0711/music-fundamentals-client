import React from 'react';

import parseOptionsString from '../../../js/parseOptionsString';

const NoteflightInteractiveOptions = ({content}) => {

    return(
        <div id="content-edit-options">
            <label>Noteflight Score Url (Assignment)</label><br/>
            <input className={content ? "edit-content-data" : "new-content-data"} type="text" required defaultValue={content && content.data[0]} />
            <br/>
            <label>Noteflight Score Url (Answer Key)</label><br/>
            <input className={content ? "edit-content-data" : "new-content-data"} type="text" required defaultValue={content && content.data[1]} />
            <br/>
            <h5>Grading Method</h5>
            <label>Grading Method</label><br/>
            <select 
                className={content ? "edit-content-options" : "new-content-options"} 
                name="gradingMethod" 
                defaultValue={content && parseOptionsString(content.data[2]).gradingMethod}>
                    <option value="simple">Simple</option>
                    <option value="detailed">Detailed</option>
            </select>
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