import React from 'react';

import {Mutation} from 'react-apollo'
import {DELETE_CONTENT} from '../../queries/mutations';

const DeleteContentButton = (props) => {
    let {content, stateMethods} = props
    return(
        <Mutation mutation={DELETE_CONTENT}>
            {
                (deleteContent, {data}) => {
                    return(
                        <button onClick={ e => {
                            deleteContent({variables: {id: content.id}})
                            stateMethods.removeDeletedContent(content.id)
                        }
                        }>Delete</button>
                    )
                }
            }
        </Mutation>
    )
}

export default DeleteContentButton