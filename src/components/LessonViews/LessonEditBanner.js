import React from 'react';

import {Link, Redirect} from 'react-router-dom'

import {Mutation} from 'react-apollo';
import {CHANGE_LESSON_PUBLISH_STATE} from '../../queries/mutations';

import DeleteLessonButton from './DeleteLessonButton'
import EditLessonButton from './EditLessonButton'

const LessonEditBanner = (props) => {
    const lesson = props.lesson
    const currentUser = props.state.currentUser;

    if(!currentUser.signedIn || (lesson.instructorId !== currentUser.id && lesson.instructorId !== currentUser.id.split("STUDENT-VIEW-")[1])){
        return <Redirect to="/"/>
    }

    return(
        <Mutation mutation={CHANGE_LESSON_PUBLISH_STATE} variables={{id: lesson.id}}>
            {
                (toggleLessonPublish, {data}) => {
                    if(data){
                        // if mutation is successful and data is returned,
                        // change the publish button text and class
                        let publishState = data.toggleLessonPublish.published
                        const publishButton = document.getElementById('lesson-publish-button')
                        publishButton.innerText = publishState ? "Unpublish" : "Publish";
                        publishButton.className = publishState ? "button-published" : "button-unpublished";
                    } 
                    return(
                        <div id="lesson-edit-banner">

                            {/* <Link to={`/lessons/${lesson.id}/edit`}>Edit</Link><br/> */}
                            <button id="lesson-publish-button" className={lesson.published ? "button-published" : "button-unpublished" } 
                                onClick={
                                (e) => {
                                    toggleLessonPublish({variables: {id: lesson.id}})                               
                                }
                            }>{lesson.published ? "Unpublish" : "Publish"}</button>
                            
                            <EditLessonButton lesson={lesson} stateMethods={props.stateMethods}/>
                            
                            <DeleteLessonButton lesson={lesson} stateMethods={props.stateMethods}/>
                            
                            <button onClick={ e => {
                                let text = e.target.innerText;
                                e.target.innerText = text === "Student View" ? "Instructor View" : "Student View"
                                props.stateMethods.toggleStudentView();
                            }}
                            >Student View</button>

                        </div>
                    )
                }

            }
        </Mutation>
    )

}

export default LessonEditBanner;