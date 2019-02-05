import React, {Component} from 'react';

import ContentEditButtons from './LessonEditForms/ContentEditButtons'

import contentRenderer from '../js/contentRenderer';

class ContentCard extends Component {

    constructor(props){
        super(props);
        
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.setEditMode = this.setEditMode.bind(this)

        this.state = {
            editMode: false
        }
    }

    setEditMode(bool){
        this.setState({editMode: bool})
    }

    handleMouseEnter(){        
        this.setEditMode(true)
    }

    handleMouseLeave(){
        let editFormActive = document.getElementsByClassName("content-edit-form").length
        if(!editFormActive) this.setEditMode(false)
    }

    render(){
        let {content, lesson, state, stateMethods} = this.props;
        let instructorPrivileges = (lesson.instructorId === state.currentUser.id)
        return(
            <div className={instructorPrivileges ? "content-card content-card-editable" : "content-card"} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {
                    (instructorPrivileges && this.state.editMode)
                    &&
                    <ContentEditButtons content={content} stateMethods={stateMethods} lesson={lesson} scheduleRefetch={this.props.scheduleRefetch}/>
                }
                {contentRenderer(content, stateMethods)}
            </div>
        )
    }


}

export default ContentCard;