import React from 'react';

import ImageContentOptions from './ContentOptions/ImageContentOptions';
import ListOptions from './ContentOptions/ListOptions';
import DefaultContentOptions from './ContentOptions/DefaultContentOptions';
import NoteflightInteractiveOptions from './ContentOptions/NoteflightInteractiveOptions';
import NoteflightPlayerOptions from './ContentOptions/NoteflightPlayerOptions';



const ContentEditForm = ({content}) => {

    return(
        <form className="content-edit-form">
            {content.type === 'paragraph' && <DefaultContentOptions content={content} />}
            {content.type === 'heading2' && <DefaultContentOptions content={content} />}
            {content.type === 'heading3' && <DefaultContentOptions content={content} />}
            
            {content.type === 'nfPlayer' && <NoteflightPlayerOptions content={content} />}
            {content.type === 'nfInteractive' && <NoteflightInteractiveOptions content={content} />}

            {content.type === 'image' && <ImageContentOptions content={content}/>}
            
            {content.type === 'bulletList' && <ListOptions content={content} />}
            {content.type === 'numberedList' && <ListOptions content={content} />}


            <input type="submit" value="Save Changes" />
        </form>
    )

}

export default ContentEditForm;