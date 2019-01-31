import React from 'react'
import parseOptionsString from '../../js/parseOptionsString';
import {Link} from 'react-router-dom';

import {Query} from 'react-apollo';

import LessonCard from '../LessonCard';
import { GET_LESSON } from '../../queries/queries';

const VarifiedTokenDisplay = ({decrypted, stateMethods}) => {
    const tokenInfo = parseOptionsString(decrypted);
    return(
        <Query query={GET_LESSON} variables={{id: tokenInfo.lessonId}}>
            {
                ({data, loading}) => {
                    if(data){
                        console.log(data)
                    }
                    return(
                        <div id="varified-toke-display">
                            <h2>Varified:</h2>
                            <h3>Student: {tokenInfo.name}</h3>
                            {
                                data.lesson ?
                                <LessonCard lesson={data.lesson} stateMethods={stateMethods}/>
                                :
                                <h3>Loading Lesson...</h3>
                            }
                            
                            <h3>Date Completed: {tokenInfo.date}</h3>
                        </div>
                    )
                }
            }

        </Query>
    )

}

export default VarifiedTokenDisplay

