import React from 'react';

import {Query} from 'react-apollo';
import {GET_LESSON_CONTENTS} from "../../queries/queries";

import contentRenderer from '../../js/contentRenderer';

import LessonEditBanner from './LessonEditBanner';
import NewContentForm from '../LessonEditForms/NewContentForm';

const LessonContainer = (props) => {
    let lesson = props.state.currentLesson
    let lessonID = props.match.params.id
    let {setCurrentLessonContents} = props.stateMethods
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
                ({data, refetch, loading}) => {
                    if(loading) return <h4>loading...</h4>
                    let contents = data.lesson.contents
                    refetch()
                    {
                        !props.state.currentLesson.contents 
                        &&
                        setCurrentLessonContents(contents)
                    }
                    return(
                        <div>
                            {
                                props.state.currentUser.id === lesson.instructorId 
                                && 
                                <div>
                                    <LessonEditBanner lesson={lesson} state={props.state}/>
                                    <NewContentForm lesson={lesson} state={props.state} stateMethods={props.stateMethods} />
                                </div>
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
