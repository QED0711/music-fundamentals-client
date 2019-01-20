
import React from 'react';

import ContentParagraph from '../components/contents/contentParagraph';
import ContentHeading2 from '../components/contents/ContentHeading2';
import ContentHeading3 from '../components/contents/ContentHeading3';
import ContentBulletList from '../components/contents/ContentBulletList';
import ContentNumberedList from '../components/contents/ContentNumberedList';
import ContentImage from '../components/contents/ContentImage';
import ContentNFPlayer from '../components/contents/ContentNFPlayer';

const contentRenderer = (content, options = {}) => {
    switch(content.type){
        case("paragraph"):
            return(<ContentParagraph key={content.id} content={content.data} />);
        case("heading2"):
            return(<ContentHeading2 key={content.id} content={content.data} />);
        case("heading3"):
            return(<ContentHeading3 key={content.id} content={content.data} />);
        case("bulletList"):
            return(<ContentBulletList key={content.id} content={content.data} />);
        case("numberedList"):
            return(<ContentNumberedList key={content.id} content={content.data} />);
        case("image"):
            return(<ContentImage key={content.id} content={content.data} options={options}/>);
        case("nfPlayer"):
            return(<ContentNFPlayer key={content.id} content={content.data} options={options}/>);
        
    }
}

export default contentRenderer;