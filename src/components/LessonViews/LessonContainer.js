import React, {Component} from 'react';

import {Query} from 'react-apollo';
import {GET_LESSON, GET_LESSON_CONTENTS} from "../../queries/queries";

import {Redirect} from 'react-router-dom';

import LessonEditBanner from './LessonEditBanner';
import NewContentForm from '../LessonEditForms/NewContentForm';
import ContentCard from '../ContentCard';
import ContentPreview from '../LessonEditForms/ContentPreview';

import TokenGeneratorForm from '../Token/TokenGeneratorForm';

class LessonContainer extends Component {

    constructor(props){
        super(props);

        this.lesson = this.props.state.currentLesson
        this.lessonID = this.props.match.params.id
        this.setCurrentLessonContents = this.props.stateMethods.setCurrentLessonContents;
        
        // on load of a new lesson, resets the interactive count to 0 so we start from a clean slate
        this.props.stateMethods.resetInteractiveCount()

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

    countInteractiveAssignments(contents){
        // find all contents with type "nfInteractive" and set that as the application state interactiveCount
        this.props.stateMethods.setInteractiveCount(contents.filter(content => content.type === "nfInteractive").length)
    }

    displayTokenGenerator(){
        let {interactiveCount, passedInteractiveCount} = this.props.state
        if(passedInteractiveCount !== 0 && passedInteractiveCount === interactiveCount){
            return(
                <TokenGeneratorForm lesson={this.props.state.currentLesson} />
            )
        }
    }



    render(){
        console.log("LESSON CONTAINER CALLED")
        // If the current lesson is not set in the state:
        if(!this.props.state.currentLesson.id){
            // if a lesson id is defined in the url string
            return <Redirect to={`/set-lesson/${this.props.match.params.id}`} />
        }
        let {contentPreview} = this.state
        let {currentUser} = this.props.state
        return(
            <div id="lesson-display-box">
                <h2>{this.props.state.currentLesson.title}</h2>
                <h4>{this.props.state.currentLesson.description}</h4>
    
                <Query query={GET_LESSON_CONTENTS} variables={{id: this.lessonID}} displayName="GET_LESSON_CONTENTS">
                {
                    ({data, refetch, loading}) => {
                        if(loading) return <h4>loading...</h4>
                        let contents = data.lesson.contents
                        // bug with refetch: 
                        // triggered if contentPreview updated too often.
                        // therefore, now only triggers if content preview does not exist
                        // e.g. the user submited the content, therefore clearing the preview
                        // debugger
                        if(!contentPreview){
                            // refetch();
                        }
                    
                        !this.props.state.currentLesson.contents 
                        &&
                        this.setCurrentLessonContents(contents)
                    
                        this.countInteractiveAssignments(contents);
                        
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
                                {this.displayTokenGenerator()}
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
