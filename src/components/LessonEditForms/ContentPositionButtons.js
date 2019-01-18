import React from "react";

import {Mutation} from 'react-apollo'
import {REORDER_CONTENTS} from '../../queries/mutations';

const ContentPositionButtons = ({content, lesson, stateMethods}) => {
    let {setCurrentLessonContents} = stateMethods;
    return(
        <Mutation mutation={REORDER_CONTENTS}>
            {
                (reorderContents, {data}) => {
                    if(data && data.reorderContents.length){
                        setCurrentLessonContents(data.reorderContents)
                    }
                    return(
                        <div className="content-position-buttons">
                            <button onClick={e => {
                                let position = content.position - 1 >= 0 ? content.position - 1 : 0;
                                reorderContents(
                                    {
                                        variables: {
                                            lessonId: lesson.id,
                                            id: content.id,
                                            position
                                        }
                                    }
                                )
                            }}>
                                Move Up
                            </button>

                            <button onClick={e => {
                                let position = content.position + 1 
                                reorderContents(
                                    {
                                        variables: {
                                            lessonId: lesson.id,
                                            id: content.id,
                                            position
                                        }
                                    }
                                )
                            }}>
                                Move Down
                            </button>

                        </div>
                    ) 
                }
            }
        </Mutation>
    )

}


export default ContentPositionButtons