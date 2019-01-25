import React from 'react';

import DefaultContentOptions from '../components/LessonEditForms/ContentOptions/DefaultContentOptions'
import ImageContentOptions from '../components/LessonEditForms/ContentOptions/ImageContentOptions'
import NoteflightPlayerOptions from '../components/LessonEditForms/ContentOptions/NoteflightPlayerOptions'
import NoteflightInteractiveOptions from '../components/LessonEditForms/ContentOptions/NoteflightInteractiveOptions'
import ListOptions from '../components/LessonEditForms/ContentOptions/ListOptions'

const contentEditOptions = (type) => {
    switch(type){
        case("image"):
            return <ImageContentOptions />
        case("nfPlayer"):
            return <NoteflightPlayerOptions />
        case("nfInteractive"):
            return <NoteflightInteractiveOptions />
        // case("bulletList"):
        //     return <ListOptions />
        // case("numberedList"):
        //     return <ListOptions />
        case("list"):
            return <ListOptions />
        default:
            return <DefaultContentOptions />
            
    }

}

export default contentEditOptions;