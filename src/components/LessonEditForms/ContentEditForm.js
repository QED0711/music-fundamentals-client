import React from 'react';
import ImageContentOptions from './ContentOptions/ImageContentOptions';
import ListOptions from './ContentOptions/ListOptions';
import DefaultContentOptions from './ContentOptions/DefaultContentOptions';

const ContentEditForm = ({content}) => {

    return(
        <form className="content-edit-form">
            {content.type === 'image' && <ImageContentOptions content={content}/>}
            {content.type === 'bulletList' && <ListOptions content={content} />}
            {content.type === 'numberedList' && <ListOptions content={content} />}
            {content.type === 'paragraph' && <DefaultContentOptions content={content} />}
            {content.type === 'heading2' && <DefaultContentOptions content={content} />}
            {content.type === 'heading3' && <DefaultContentOptions content={content} />}


            <input type="submit" value="Save Changes" />
        </form>
    )

}

export default ContentEditForm;