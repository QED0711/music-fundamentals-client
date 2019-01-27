import React from 'react';

import {Redirect} from 'react-router-dom';

import {Mutation} from 'react-apollo';
import {EDIT_LESSON_INFO} from '../../queries/mutations'

const EditLessonForm = ({lesson, stateMethods, toggleEditMode}) => {

    const getLessonInfo = () => {
        const type = document.getElementById("edit-lesson-type").value;
        const title = document.getElementById("edit-lesson-title").value;
        const description = document.getElementById("edit-lesson-description").value;
        const tags = document.getElementById("edit-lesson-tags").value.split(",").map(x => x.trim())

        return{
            id: lesson.id,
            type,
            title,
            description,
            tags
        }

    }

    return(
        <Mutation mutation={EDIT_LESSON_INFO} >
            {
                (editLesson, {data}) => {
                    if(data){

                        stateMethods.updateAfterLessonEdits(data.editLesson)
                        return <Redirect to={`/`}/>
                        // toggleEditMode();
                    }

                    return(
                        <form id="edit-lesson-form" onSubmit={ e => {
                            e.preventDefault();
                            // get the changes made to the lesson info
                            let lessonInfo = getLessonInfo();
                            console.log("LESSON INFO: ", lessonInfo);
                            // send changes to server
                            editLesson({variables: lessonInfo});
                            // turn editMode off so form is removed from DOM 
                        }}>

                            <label>Lesson Type</label><br/>
                            <select id="edit-lesson-type" defaultValue={lesson.type}>
                                <option value="reading">Reading</option>
                                <option value="assignment">Interactive Assignment</option>
                                <option value="dictation">Dictation</option>
                            </select><br/>

                            <label>Title</label><br/>
                            <input type="text" id="edit-lesson-title" defaultValue={lesson.title}/><br/>

                            <label>Description</label><br/>
                            <textarea id="edit-lesson-description" defaultValue={lesson.description}></textarea><br/>
                            
                            <label>Tags</label><br/>
                            <textarea id="edit-lesson-tags" defaultValue={lesson.tags.join(", ")}></textarea><br/>

                            <input type="submit" value="Save Changes" />

                        </form>

                    )
                }
            }
        </Mutation>
    )

}

export default EditLessonForm;