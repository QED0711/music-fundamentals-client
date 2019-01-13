import React from 'react';
import {Redirect, Link} from 'react-router-dom';

import {Query} from 'react-apollo';
import {GET_INSTRUCTOR_LESSONS} from '../../queries/queries';

import LessonCard from '../LessonCard';
import redirectToCurrentLesson from '../../js/redirectToCurrentLesson';

const InstructorLessons = (props) => {
    const currentUser = props.state.currentUser
    console.log("CURRENT USER: ", currentUser)
    
    if(!currentUser.signedIn){    
        return(
            <Redirect to="/instructor/login" />
        )
    }



    return(
        <Query query={GET_INSTRUCTOR_LESSONS} variables={{id: currentUser.id}}>
            {
                ({data, loading}) => {
                    if(loading) return <h2>Loading...</h2>
                    console.log(data.instructor.lessons)
                    if(props.state.currentLesson.id) return redirectToCurrentLesson(props.state.currentLesson)
                    return(
                        <div className="page-body">
                            <h2>Your Lessons</h2>
                            <Link to={`/instructor/${currentUser.id}/lessons/new`}>Create New Lesson</Link>
                            {
                                data.instructor.lessons.map(lesson => {
                                    return <LessonCard key={lesson.id} lesson={lesson} stateMethods={props.stateMethods} />
                                })
                            }

                        </div>
                    )

                }
            }
        </Query>
    )

}

export default InstructorLessons;