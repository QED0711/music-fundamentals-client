import React, {Component} from 'react';

import {Query} from 'react-apollo';
import {GET_LESSON_CONTENTS} from "../../queries/queries";

import {Redirect} from 'react-router-dom';

import contentRenderer from '../../js/contentRenderer';

import LessonEditBanner from './LessonEditBanner';
import NewContentForm from '../LessonEditForms/NewContentForm';
import ContentCard from '../ContentCard';
import ContentPreview from '../LessonEditForms/ContentPreview';

class LessonContainer extends Component {

    constructor(props){
        super(props);

        this.lesson = this.props.state.currentLesson
        this.lessonID = this.props.match.params.id
        this.setCurrentLessonContents = this.props.stateMethods.setCurrentLessonContents;

        this.state = {
            contentPreview : null
        }

        this.setContentPreview = this.setContentPreview.bind(this);
        this.clearContentPreview = this.clearContentPreview.bind(this);

    }

    setContentPreview(content){
        this.setState({
            contentPreview : content
        })
    }
   
    clearContentPreview(){
        this.setState({contentPreview : null});
    }

    contentMapper(contents){
        contents = contents.sort((c1,c2) => c1.position - c2.position);
        return contents.map((content, index) => {
            return <ContentCard key={index} content={content} lesson={this.lesson} state={this.props.state} stateMethods={this.props.stateMethods}/>
        })
    }

    render(){
        if(!this.lesson.id){
            return <Redirect to="/lessons"/>
        }
        return(
            <div id="lesson-display-box">
                <h2>{this.props.state.currentLesson.title}</h2>
                <h4>{this.props.state.currentLesson.description}</h4>
    
                <Query query={GET_LESSON_CONTENTS} variables={{id: this.lessonID}}>
                {
                    ({data, refetch, loading}) => {
                        if(loading) return <h4>loading...</h4>
                        let contents = data.lesson.contents
                        // bug with refetch: 
                        // triggered if contentPreview updated too often.
                        // therefore, now only triggers if content preview does not exist
                        // e.g. the user submited the content, therefore clearing the preview
                        if(!this.state.contentPreview){
                            refetch()
                        }
                        {
                            !this.props.state.currentLesson.contents 
                            &&
                            this.setCurrentLessonContents(contents)
                        }
                        return(
                            <div>
                                {
                                    // check to see if this lessons is structor is the current signed in user
                                    (this.props.state.currentUser.id === this.lesson.instructorId  
                                    || 
                                    // check to see if student view is active, and allow if id matches
                                    (this.props.state.currentUser.id && this.props.state.currentUser.id.split("STUDENT-VIEW-")[1] === this.lesson.instructorId)) 
                                    && 
                                    <LessonEditBanner lesson={this.lesson} state={this.props.state} stateMethods={this.props.stateMethods}/>
                                }
                                {
                                    this.props.state.currentUser.id === this.lesson.instructorId  
                                    &&
                                    <NewContentForm 
                                        lesson={this.lesson} 
                                        contents={contents}
                                        state={this.props.state} 
                                        stateMethods={this.props.stateMethods} 
                                        setContentPreview={this.setContentPreview}
                                        clearContentPreview={this.clearContentPreview} 
                                    />
                                }
                                {
                                    (this.state.contentPreview && this.state.contentPreview.data[0] !== "") 
                                    && 
                                    <ContentPreview content={this.state.contentPreview} stateMethods={this.props.stateMethods}/> 
                                }
                                {this.contentMapper(contents)}
                            </div>
                        )
                    }
                }
                </Query>
    
            </div>
        )
    }


}

export default LessonContainer;
