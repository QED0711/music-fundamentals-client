import React from 'react';

import {Query} from 'react-apollo';
import {GET_LESSON_CONTENTS} from "../../queries/queries";

import contentRenderer from '../../js/contentRenderer';

import LessonEditBanner from './LessonEditBanner';

const LessonContainer = (props) => {
    let lesson = props.state.currentLesson
    let lessonID = props.match.params.id
    
    const contentMapper = (contents) => {
        return contents.map(c => {
            return contentRenderer(c)
        })
    }

    return(
        <div id="lesson-display-box">
            <h2>{lesson.title}</h2>
            <h4>{lesson.description}</h4>

            <Query query={GET_LESSON_CONTENTS} variables={{id: lessonID}}>
            {
                ({data, error, loading, variables}) => {
                    if(loading) return <h4>loading...</h4>
                    let contents = data.lesson.contents
                    console.log(contents)
                    return(
                        <div>
                            {
                                props.state.currentUser.id === lesson.instructorId 
                                && 
                                <LessonEditBanner lesson={lesson} state={props.state}/>
                            }
                            {contentMapper(contents)}
                        </div>
                    )
                }
            }
            </Query>

        </div>
    )

}

export default LessonContainer;
