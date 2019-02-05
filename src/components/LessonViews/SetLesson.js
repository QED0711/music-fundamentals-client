import React, {PureComponent} from 'react';

import {Redirect} from 'react-router-dom';

import {Query} from 'react-apollo';
import {GET_LESSON} from '../../queries/queries'

import LessonCard from '../LessonCard';
import redirectToCurrentLesson from '../../js/redirectToCurrentLesson';

const SetLesson = ({state, stateMethods, match}) => {
    
    return(
        <Query query={GET_LESSON} variables={{id: match.params.id}} displayName="GET_LESSON">
            {
                ({data, loading}) => {
                    if(loading) return (<h3>Loading Lesson...</h3>)
                    // stateMethods.setCurrentLesson(data.lesson)
                    // if(state.setCurrentLesson) return redirectToCurrentLesson(state.currentLesson)
                    stateMethods.setCurrentLesson(data.lesson);
                    // return <LessonCard lesson={data.lesson} stateMethods={stateMethods} state={state}/>
                    return redirectToCurrentLesson(data.lesson)
                }
            }
        </Query>
    )


        
        
    

}

export default SetLesson;