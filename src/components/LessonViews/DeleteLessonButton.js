import React from 'react';

import {Redirect} from 'react-router-dom';

import {Mutation} from 'react-apollo';
import {DELETE_LESSON} from '../../queries/mutations';

const DeleteLessonButton = ({lesson, stateMethods}) => {
    
    return(
        <Mutation mutation={DELETE_LESSON}>
        {
            (deleteLesson, {data}) => {
                if(data){
                    stateMethods.setCurrentLessonNull()
                    return <Redirect to={`/instructors/${data.deleteLesson.instructorId}/lessons`} />
                }
                return(
                    <button onClick={ e => {
                        const deleteConfirmation = window.confirm("Are you sure you want to delete this lesson and all its contents? This action cannot be undone.");
                        if(deleteConfirmation){
                            deleteLesson({variables: {id: lesson.id}})
                        }
                    }
                    }>Delete Lesson</button>
                )
            }
        }
        </Mutation>
        
    )

}

export default DeleteLessonButton;