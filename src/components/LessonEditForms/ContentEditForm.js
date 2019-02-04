import React from 'react';

import ImageContentOptions from './ContentOptions/ImageContentOptions';
import ListOptions from './ContentOptions/ListOptions';
import DefaultContentOptions from './ContentOptions/DefaultContentOptions';
import NoteflightInteractiveOptions from './ContentOptions/NoteflightInteractiveOptions';
import NoteflightPlayerOptions from './ContentOptions/NoteflightPlayerOptions';

import {Mutation} from 'react-apollo';
import {UPDATE_CONTENT} from '../../queries/mutations'
import LinkContentOptions from './ContentOptions/LinkContentOptions';

const ContentEditForm = ({content, stateMethods}) => {

    const {setCurrentLessonContents} = stateMethods;

    const getEditedData = () => {
        let editedData =  [...document.getElementsByClassName("edit-content-data")].map(x => x.value)
        let editedOptions = [...document.getElementsByClassName("edit-content-options")].map(x => {
            return x.name + ":" + x.value;
        }).join(",")
        editedData.push(editedOptions)
        // put further validations here as needed
        return editedData
    }

    return(
        <Mutation mutation={UPDATE_CONTENT}>

            {
                (updateContent, {data}) => {
                    // if(data){
                    // }
                    return(
                        <form className="content-edit-form" onSubmit={async (e) => {
                            e.preventDefault();
                            let id = content.id;
                            let formData = getEditedData();
                            let {data} = await updateContent({variables: {id, data: formData}})    
                            setCurrentLessonContents(data.updateContent)

                        }}>
                            {content.type === 'paragraph' && <DefaultContentOptions content={content} />}
                            {content.type === 'heading2' && <DefaultContentOptions content={content} />}
                            {content.type === 'heading3' && <DefaultContentOptions content={content} />}
                            
                            {content.type === 'nfPlayer' && <NoteflightPlayerOptions content={content} />}
                            {content.type === 'nfInteractive' && <NoteflightInteractiveOptions content={content} />}

                            {content.type === 'image' && <ImageContentOptions content={content}/>}
                            
                            {content.type === 'list' && <ListOptions content={content} />}
                            {content.type === 'link' && <LinkContentOptions content={content} />}

                            <input type="submit" value="Save Changes" />
                        </form>
                    )
                }
            }
        </Mutation>
    )

}

export default ContentEditForm;