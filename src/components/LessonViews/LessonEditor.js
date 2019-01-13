import React from 'react';

import {Redirect} from 'react-router-dom'

import {Query} from 'react-apollo';
import {GET_LESSON_CONTENTS} from '../../queries/queries';

const LessonEditor = (props) => {

    if(!props.state.currentUser.signedIn) return <Redirect to="/" />
    console.log(props)
    let lessonId = props.match.params.id
    return(
        <Query query={GET_LESSON_CONTENTS} variables={{id: lessonId}}>
            {
                ({data, loading}) => {
                    if(loading) return <h3>Loading...</h3>
                    console.log(data)
                    let lesson = data.lesson
                    return(
                        <div className="lesson">
                            <h1>{lesson.title}</h1>
                            <h5>{lesson.description}</h5>
                        </div>
                    )
                }
            }
        </Query>
    )

}

export default LessonEditor;