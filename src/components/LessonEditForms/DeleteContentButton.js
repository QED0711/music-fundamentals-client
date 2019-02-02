import React from 'react';

import {Mutation} from 'react-apollo'
import {REMOVE_AND_REORDER_CONTENTS} from '../../queries/mutations';

const DeleteContentButton = (props) => {
    let {content, stateMethods, lesson} = props
    return(
        <Mutation mutation={REMOVE_AND_REORDER_CONTENTS}>
            {
                (removeAndReorderContents, {data}) => {
                    if(data){
                        stateMethods.setCurrentLessonContents(data.removeAndReorderContents)
                    }
                    return(
                        <button onClick={ e => {
                            const deleteContentConfirmation = window.confirm("Are you shure you want to delete this content? This action cannot be undone.")
                            if(deleteContentConfirmation){
                                removeAndReorderContents({
                                    variables: {
                                        id: content.id,
                                        lessonId: lesson.id,
                                        position: content.position
                                    }
                                })
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