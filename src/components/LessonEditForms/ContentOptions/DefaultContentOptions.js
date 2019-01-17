import React from 'react';

const DefaultContentOptions = (props) => {

    return(
        <div id="content-edit-options">
            <label>Text</label><br/>
            <textarea className="new-content-data" required></textarea>
            <br/>
            <label>Position (optional)</label><br/>
            <input id="new-content-position" type="number"/>
        </div>
    )

}

export default DefaultContentOptions;