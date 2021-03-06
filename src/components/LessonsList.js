import React from 'react';
import {Query} from 'react-apollo';


// QUERIES
import {GET_LESSONS} from '../queries/queries';

// COMPONENTS
import LessonCard from './LessonCard';

// JS
import redirectToCurrentLesson from '../js/redirectToCurrentLesson';

    const LessonsList = (props) => {

    function renderLessonCards(lessons){
        return lessons.map(lesson => {
            if(lesson.published){
                return (
                    <LessonCard lesson={lesson} key={lesson.id} stateMethods={props.stateMethods}/>
                )
            }
        })
    }
    
    return(
        <div className="page-container">

            <form>
                <input id="lesson-tags" type="text" />
            </form>
            <Query query={GET_LESSONS}>
                {
                    ({loading, error, data}) => {
                        if(loading) return <h3>Loading...</h3>
                        if(error) return `Error! ${error.message}`;
                        if(props.state.currentLesson.id) return redirectToCurrentLesson(props.state.currentLesson)
                        
                        return(
                            <div id="lessons">
                                {renderLessonCards(data.lessons)}
                            </div>
                        )

                    }
                }
            </Query>
        </div>
    )
    
}

// export default graphql(GET_LESSONS)(LessonsList);
export default LessonsList;