import React from 'react'

import {Mutation} from 'react-apollo';

const NewContentForm = (props) => {
    
    const lesson = props.lesson

    const getUserContent = (e) => {
        e.preventDefault()

        const type = document.getElementById("new-content-type").value
        const data = document.getElementById("new-content-data").value
        let position = lesson.contents.length
        console.log({type, data, lessonId: lesson.id, position});
    }

    return(

        <form id="new-content-form" onSubmit={getUserContent}>
            <h3>Create New Content</h3>
            <label>Content Type</label><br/>
            <select id="new-content-type">
                <option value="paragraph">Paragraph</option>
                <option value="heading2">Section Heading</option>
                <option value="heading3">Sub-Section Heading</option>
                <option value="image">Image</option>
                <option value="nfPlayer">Noteflight Score</option>
                <option value="nfInteractive">Noteflight Interactive Score</option>
                <option value="iframe">Embeded iframe</option>
                <option value="bulletList">Bullet Point List</option>
                <option value="numberedList">Numbered List</option>
            </select><br/>

            <label>Content</label><br/>
            <textarea id="new-content-data"></textarea>
            <br/>
            <input type="submit" value="Save Changes"/>
        </form>

    )
}

export default NewContentForm;
