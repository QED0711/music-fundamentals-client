import React from 'react';

import {Mutation} from 'react-apollo'
import {REMOVE_AND_REORDER_CONTENTS} from '../../queries/mutations';

const DeleteContentButton = (props) => {
    let {content, stateMethods, lesson, scheduleRefetch} = props
    return(
        <Mutation mutation={REMOVE_AND_REORDER_CONTENTS}>
            {
                (removeAndReorderContents) => {
                    // if(data){
                    // }
                    return(
                        <button onClick={ async (e) => {
                            const deleteContentConfirmation = window.confirm("Are you shure you want to delete this content? This action cannot be undone.")
                            if(deleteContentConfirmation){
                                // scheduleRefetch();

                                // we wait for data to be returned from our mutation
                                // we then take that data and update the application state directly
                                // we then let that state change propogate down until it changes the current lesson contents rendered
                                let {data} = await removeAndReorderContents({
                                    variables: {
                                        id: content.id,
                                        lessonId: lesson.id,
                                        position: content.position
                                    }
                                })
                                stateMethods.setCurrentLessonContents(data.removeAndReorderContents)
                            }
                        }
                        }>Delete</button>
                    )
                }
            }
        </Mutation>
    )
}

export default DeleteContentButton