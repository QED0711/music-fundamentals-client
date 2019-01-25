import React from 'react';
import {Redirect, Link} from 'react-router-dom';

import {Query} from 'react-apollo';
import {GET_LESSONS_BY_INSTRUCTOR} from '../../queries/queries';

import LessonCard from '../LessonCard';
import redirectToCurrentLesson from '../../js/redirectToCurrentLesson';

const InstructorLessons = (props) => {
    const currentUser = props.state.currentUser
    
    if(!currentUser.signedIn){    
        return(
            <Redirect to="/instructor/login" />
        )
    }
   
    // if the instructor's id is currently prepended with STUDENT-VIEW-, remove it, and redirect to the normal instructor lesson page
    if(currentUser.id.match("STUDENT-VIEW-")){
        props.stateMethods.toggleStudentView();
        return <Redirect to={`/instructors/${currentUser.id.split("STUDENT-VIEW-")[1]}/lessons`} />
    }


    return(
        <Query query={GET_LESSONS_BY_INSTRUCTOR} variables={{instructorId: currentUser.id}}>
            {
                ({data, loading, refetch}) => {
                    if(loading) return <h2>Loading...</h2>
                    if(props.state.currentLesson.id) return redirectToCurrentLesson(props.state.currentLesson)
                    refetch() // this will refetch the data on every load of this component
                    return(
                        <div className="page-body">
                            <h2>Your Lessons</h2>
                            <Link to={`/instructor/${currentUser.id}/lessons/new`}>Create New Lesson</Link>
                            {console.log("INSTRUCTOR LESSONS: ", data)}
                            {
                                data.lessonsByInstructor.map(lesson => {
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