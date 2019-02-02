import React, {Component} from 'react';

import ContentEditButtons from './LessonEditForms/ContentEditButtons'

import contentRenderer from '../js/contentRenderer';

class ContentCard extends Component {

    constructor(props){
        super(props);
        console.log("THIS: ", this)
        this.state = {

        }
    }

    returnMouseEnterHandler(content){
        return () => {
            console.log(content)
        } 
    }

    render(){
        let {content, lesson, state, stateMethods} = this.props;
        return(
            <div className="content-card" onMouseEnter={this.returnMouseEnterHandler(content)}>
                {
                    (lesson.instructorId === state.currentUser.id)
                    &&
                    <ContentEditButtons content={content} stateMethods={stateMethods} lesson={lesson}/>
                }
                {contentRenderer(content, stateMethods)}
            </div>
        )
    }


}

export default ContentCard;