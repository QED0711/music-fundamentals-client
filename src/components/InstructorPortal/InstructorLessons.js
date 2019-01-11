import React from 'react';
import {Redirect} from 'react-router-dom';

import {Query} from 'react-apollo';
import {GET_INSTRUCTOR_LESSONS} from '../../queries/queries';

import LessonCard from '../LessonCard';

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
                    return(
                        <div className="page-body">
                            <h2>Your Lessons</h2>
                            {
                                data.instructor.lessons.map(lesson => {
                                    return <LessonCard key={lesson.id} lesson={lesson} />
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