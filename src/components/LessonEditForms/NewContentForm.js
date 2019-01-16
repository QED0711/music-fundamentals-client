import React from 'react'

import {Mutation} from 'react-apollo';
import {CREATE_NEW_CONTENT} from '../../queries/mutations';

import contentEditOptions from '../../js/contentEditOptions'

const NewContentForm = (props) => {
    
    const lesson = props.lesson
    const {appendContent} = props.stateMethods

    const getContentInfo = () => {
        const type = document.getElementById("new-content-type").value
        const data = document.getElementById("new-content-data").value
        let position = lesson.contents.length
        return{
            type,
            data: [data],
            position,
            lessonId: lesson.id
        }
    }

    return(
        <Mutation mutation={CREATE_NEW_CONTENT}>
            {
                (createContent, {data}) => {
                    if(data){
                        appendContent(data.createContent)
                    }
                    return(
        
                        <form id="new-content-form" onSubmit={ e => {
                            e.preventDefault();    
                            const contentInfo = getContentInfo();
                            createContent({variables: contentInfo});
                            }
                        }
                        >
                            <h3>Create New Content</h3>
                            <label>Content Type</label><br/>
                            <select id="new-content-type" onChange={contentEditOptions}>
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

                            <div id="content-edit-options"></div>
                            <br/>
                            <input type="submit" value="Save Changes"/>
                            
                        </form>

                    ) 
                }
            }
        </Mutation>

    )
}

export default NewContentForm;
