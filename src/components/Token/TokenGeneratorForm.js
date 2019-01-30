import React from 'react';

import {Mutation} from 'react-apollo'
import {GENERATE_TOKEN} from '../../queries/mutations';

import EncryptedTokenDisplay from './EncryptedTokenDisplay'

const TokenGeneratorForm = ({lesson}) => {

    const getUserSignature = () => {
        let name = document.getElementById("token-generator-name").value;
        let signatureData = `name:${name},lesson:${lesson.title}`

        return signatureData
    }

    const displayToken = (data) => {
        if(data){
            return(
                <div id="token-display-box">
                    <h3>The token below is varification that you have completed this assignment</h3>
                    <p id="encrypted-token">{data.generateToken.encrypted}</p>
                </div>
            )
        }
    }

    return(
        <Mutation mutation={GENERATE_TOKEN}>

            {
                (generateToken, {data}) => {
                    
                    return(
                        <div>
                            <form id="token-generator-form" onSubmit={ e => {
                                e.preventDefault();

                                let decrypted = getUserSignature();
                                document.getElementById("token-generator-form").remove()
                                generateToken({variables: {decrypted}})
                            }}>
                                <h2>Congratulations! You passed all assignments for this lesson!</h2>
                                <label>Your Name</label><br/>
                                <input type="text" id="token-generator-name" required /><br/>

                                <input type="submit" value="Sign & Submit" id="token-generator-submit"/>

                            </form>
                            {displayToken(data)}
                        </div>
                    )
                }

            }

        </Mutation>
    )

}

export default TokenGeneratorForm;

