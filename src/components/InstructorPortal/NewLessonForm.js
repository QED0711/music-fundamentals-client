import React from 'react'

import {Redirect} from 'react-router-dom';

import {Mutation} from 'react-apollo'
import {CREATE_NEW_LESSON} from '../../queries/mutations'

const NewLessonForm = (props) => {
    const instructorId = props.match.params.id
    const getLessonData = () => {
        let title = document.getElementById("new-lesson-title").value
        let description = document.getElementById("new-lesson-description").value
        let type = document.getElementById("new-lesson-type").value
        let tags = document.getElementById("new-lesson-tags").value.split(",").map(x => x.trim())
        
        return{
            instructorId,
            title,
            description,
            type,
            tags
        }
    }

    return(
        <Mutation mutation={CREATE_NEW_LESSON}>
            {
                (createLesson, {data}) => {
                    if(data){
                        // if the mutation was successful, set the current lesson to the newly created lesson
                        // redirect to the newley created lesson edit page
                        props.stateMethods.setCurrentLesson(data.createLesson)
                        return <Redirect to={`/lessons/${data.createLesson.id}`} />
                    }
                    return(
                        <div id="new-lesson-form">
                        <h2>Create a new lesson</h2>
                        
                        <form onSubmit={e => {
                            e.preventDefault();
                            const lessonData = getLessonData()
                            createLesson({variables: lessonData})
                        }}>
                            
                            <label>Type</label><br/>
                            <select id="new-lesson-type">
                                <option value="reading">Reading</option>
                                <option value="assignment">Interactive Assignment</option>
                                <option value="dictation">Dictation</option>
                            </select><br/>
    
                            <label>Title</label><br/>
                            <input id="new-lesson-title" type="text" /><br/>
                            
                            <label>Description</label><br/>
                            <textarea id="new-lesson-description"/><br/>
                            
                            
                            <label>Tags</label><br/>
                            <textarea id="new-lesson-tags"/><br/>
    
                            <input type="submit" value="Create Lesson"/>
                        </form>
    
                    </div>
                    )
                }
            }



        </Mutation>


    )

}

export default NewLessonForm;