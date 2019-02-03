import React from 'react';

import {Redirect} from 'react-router-dom';

import {Query} from 'react-apollo';
import {GET_LESSON} from '../../queries/queries'


const SetLesson = ({match, stateMethods}) => {
    const lessonId = match.params.id;
    return(
        <Query query={GET_LESSON} variables={{id: lessonId}}>
            {
                ({data, loading}) => {
                    if(loading) return (<h3>Loading Lesson...</h3>)
                    if(data){
                        console.log("DATA: ", data)
                        stateMethods.setCurrentLesson(data.lesson);
                        return <Redirect to={`/lessons/${data.lesson.id}`} />
                        // set the returned lesson to the current state
                        // redirect to the lesson container
                    }
                }
            }
        </Query>
    )

}

export default SetLesson;