import React, {Component} from 'react';
import {graphql, Query} from 'react-apollo';


// QUERIES
import {GET_LESSONS} from '../queries/queries';

// CoMPONENTS
import LessonCard from './LessonCard';

const LessonsList = (props) =>{
    let lessons = props.state.lessons
    let data = props.data
    
    function renderLessonCards(){
        if(lessons){
            return lessons.map(lesson => {
                return <LessonCard lesson={lesson} key={lesson.id}/>
            })
        }
    }

    function updateLessonsState(data){
        if(!lessons){
            props.stateMethods.fetchLessons(data.lessons)
        }
    }

    return(
        <div className="page-container">

            <Query query={GET_LESSONS} onCompleted={updateLessonsState}>
                {
                    ({loading, error, data}) => {
                        if(lessons){
                            return(
                                <div>
                                    {lessons && renderLessonCards()}
                                </div>
                            )
                        }
                        if(loading) return <h3>Loading...</h3>
                        if(error) return `Error! ${error.message}`;
                        return null;
                    }
                }
            </Query>
        </div>
    )
    
}

// export default graphql(GET_LESSONS)(LessonsList);
export default LessonsList;