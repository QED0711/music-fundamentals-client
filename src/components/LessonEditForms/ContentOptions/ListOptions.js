import React from 'react';

import parseOptionsString from '../../../js/parseOptionsString'

const ListOptions = ({content}) => {
    
    return(
        <div id="content-options">
            <label>text</label><br/>
            <textarea className={content ? "edit-content-data" : "new-content-data"} required defaultValue={content ? content.data[0] : ""}></textarea>
            <br/>

            <label>List Type</label><br/>
            <select 
                className={content ? "edit-content-options" : "new-content-options"} 
                name="listType"
                defaultValue={content && parseOptionsString(content.data[content.data.length - 1]).listType}>                
                >
                <option value="bullet">Bullet Point</option>
                <option value="numbered">Numbered</option>
            </select>
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





export default ListOptions;