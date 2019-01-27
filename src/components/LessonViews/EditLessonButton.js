import React, {Component} from 'react';

import EditLessonForm from './EditLessonForm';

class EditLessonButton extends Component {

    constructor(props){
        super(props);

        this.lesson = props.lesson;
        this.stateMethods = props.stateMethods;

        this.state = {
            editMode: false
        }

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode(){
        let editMode = !this.state.editMode
        this.setState({
            editMode
        })
    }

    render(){
        return(
            <div id="edit-lesson-button">
                <button onClick={this.toggleEditMode}>Edit Lesson Info</button>
                {
                    this.state.editMode 
                    &&
                    <EditLessonForm lesson={this.lesson} stateMethods={this.stateMethods} toggleEditMode={this.toggleEditMode}/>
                }
            </div>
        )
    }

}

export default EditLessonButton;