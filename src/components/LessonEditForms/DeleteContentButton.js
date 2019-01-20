import React from 'react';

import {Mutation} from 'react-apollo'
import {DELETE_CONTENT, REMOVE_AND_REORDER_CONTENTS} from '../../queries/mutations';

const DeleteContentButton = (props) => {
    let {content, stateMethods, lesson} = props
    return(
        <Mutation mutation={REMOVE_AND_REORDER_CONTENTS}>
            {
                (removeAndReorderContents, {data}) => {
                    return(
                        <button onClick={ e => {
                            debugger
                            removeAndReorderContents({
                                variables: {
                                    id: content.id,
                                    lessonId: lesson.id,
                                    position: content.position
                                }
                            })
                            // stateMethods.removeDeletedContent(content.id)
                        }
                        }>Delete</button>
                    )
                }
            }
        </Mutation>
    )
}

export default DeleteContentButton