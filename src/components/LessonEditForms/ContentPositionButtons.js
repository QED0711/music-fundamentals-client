import React from "react";

import {Mutation} from 'react-apollo'
import {REORDER_CONTENTS} from '../../queries/mutations';

const ContentPositionButtons = ({content, lesson, stateMethods}) => {
    let {setCurrentLessonContents} = stateMethods;

    const handleClick = (reorderContents) => {
        return async (e) => {
            let position;
            if(e.target.innerText === "Move Up"){
                position = content.position - 1 >= 0 ? content.position - 1 : 0;
            } else {
                position = content.position + 1;
            }
            let {data} = await reorderContents(
                {
                    variables: {
                        lessonId: lesson.id,
                        id: content.id,
                        position
                    }
                }
            )
            setCurrentLessonContents(data.reorderContents);
        }
    }

    return(
        <Mutation mutation={REORDER_CONTENTS}>
            {
                (reorderContents) => {
                    return(
                        <div className="content-position-buttons">
                            <button onClick={handleClick(reorderContents)}>Move Up</button>
                            <button onClick={handleClick(reorderContents)}>Move Down</button>
                        </div>
                    ) 
                }
            }
        </Mutation>
    )

}


export default ContentPositionButtons