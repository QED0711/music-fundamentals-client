import React from 'react';

import DefaultContentOptions from '../components/LessonEditForms/ContentOptions/DefaultContentOptions'
import ImageContentOptions from '../components/LessonEditForms/ContentOptions/ImageContentOptions'

const contentEditOptions = (type) => {
    switch(type){
        case("image"):
            return <ImageContentOptions />
        default:
            return <DefaultContentOptions />
            
    }

}

export default contentEditOptions;