import React from 'react';

import {Query} from 'react-apollo';
import {GET_LESSON_CONTENTS} from "../../queries/queries";

const LessonContainer = (props) => {
    let lesson = props.state.currentLesson
    let lessonID = props.match.params.id
    return(
        <div id="lesson-diplsay-box">
            <h2>{lesson.title}</h2>
            <h4>{lesson.description}</h4>

            <Query query={GET_LESSON_CONTENTS} variables={{id: lessonID}}>
            {
                ({data, error, loading, variables}) => {
                    console.log(variables)
                    if(loading) return <h4>loading...</h4>
                    console.log(data)
                    let contents = data.lesson.contents
                    return(
                        <p>{contents.length && contents[0].data}</p>
                    )
                }
            }
            </Query>

        </div>
    )

}

export default LessonContainer;
