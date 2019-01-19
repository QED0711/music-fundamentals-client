import React, {Component} from 'react';

import DeleteContent from './DeleteContentButton';
import ContentPositionButtons from './ContentPositionButtons';
import ContentEditForm from './ContentEditForm';

class ContentEditButtons extends Component {
    constructor(props){
        super(props);
        this.content = this.props.content
        this.lesson = this.props.lesson

        this.state={
            editMode: false
        }

        this.enterEditMode = this.enterEditMode.bind(this)
    }

    enterEditMode(){
        this.setState({
            editMode: true
        })
    }

    render(){
        return(
            <div className="content-edit-buttons">
                {
                    this.state.editMode ? <ContentEditForm content={this.content} stateMethods={this.props.stateMethods}/> : <button onClick={this.enterEditMode}>Edit</button>
                }
                <DeleteContent content={this.content} stateMethods={this.props.stateMethods}/>
                <ContentPositionButtons content={this.content} lesson={this.lesson} stateMethods={this.props.stateMethods} />
            </div>
        )
    }

}

export default ContentEditButtons;