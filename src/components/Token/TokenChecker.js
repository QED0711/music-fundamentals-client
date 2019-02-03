import React from 'react';

import {Mutation} from "react-apollo";
import {DECRYPT_TOKEN} from '../../queries/mutations';

import {Redirect} from 'react-router-dom';

import VarifiedTokenDisplay from './VarifiedTokenDisplay'

const TokenChecker = ({stateMethods, state}) => {

    let submitted = false;

    if(state.currentLesson.id){
        return <Redirect to={`/lessons/${state.currentLesson.id}`} />
    }

    return(
        <Mutation mutation={DECRYPT_TOKEN}>
            {
                (decryptToken, {data}) => {
                    if(data){
                        
                    }
                    return(
                        <div id="token-checker">

                            <form id="token-validation-form" onSubmit={ e => {
                                e.preventDefault()
                                let encrypted = document.getElementById("encrypted-token").value
                                submitted = true
                                decryptToken({variables: {encrypted}});
                            }}>
                                <label><h3>Token</h3></label><br/>
                                <textarea id="encrypted-token" required></textarea>

                                <br/>

                                <input type="submit" value="Varify Token" />
                            </form>

                            {
                                data
                                &&
                                <VarifiedTokenDisplay decrypted={data.decryptToken.decrypted} stateMethods={stateMethods} /> 
                            }
                            {
                                (submitted && !data)
                                &&
                                <h3>Token is Invalid</h3>
                            }
                        </div>



                    )
                }

            }
        </Mutation>
    )

}

export default TokenChecker;