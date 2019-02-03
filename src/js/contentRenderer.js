
import React from 'react';

import ContentParagraph from '../components/contents/contentParagraph';
import ContentHeading2 from '../components/contents/ContentHeading2';
import ContentHeading3 from '../components/contents/ContentHeading3';
import ContentList from '../components/contents/ContentList';
import ContentImage from '../components/contents/ContentImage';
import ContentNFPlayer from '../components/contents/ContentNFPlayer';
import ContentNFInteractive from '../components/contents/ContentNFInteractive';
import ContentLink from '../components/contents/ContentLink';

const contentRenderer = (content, stateMethods, options = {}) => {
    switch(content.type){
        case("paragraph"):
            return(<ContentParagraph key={content.id} content={content.data} />);
        case("heading2"):
            return(<ContentHeading2 key={content.id} content={content.data} />);
        case("heading3"):
            return(<ContentHeading3 key={content.id} content={content.data} />);
        case("link"):
            return(<ContentLink key={content.id} content={content.data} />);
        case("list"):
            return(<ContentList key={content.id} content={content.data} />);
        case("image"):
            return(<ContentImage key={content.id} content={content.data} options={options}/>);
        case("nfPlayer"):
            return(<ContentNFPlayer key={content.id} content={content} stateMethods={stateMethods} options={options}/>);
        case("nfInteractive"):
            return(<ContentNFInteractive key={content.id} content={content} stateMethods={stateMethods} options={options}/>)
        
    }
}

export default contentRenderer;