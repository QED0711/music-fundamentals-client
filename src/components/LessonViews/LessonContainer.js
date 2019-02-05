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
            contentPreview : null,
            refetch: false
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
            return (
                <ContentCard 
                    key={index} 
                    content={content} 
                    lesson={this.lesson} 
                    state={this.props.state} 
                    stateMethods={this.props.stateMethods}
                    scheduleRefetch={this.scheduleRefetch}
                />
            )
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
        let lessonId = this.props.match.params.id;
        let {currentLesson} = this.props.state
        let {contents}  = currentLesson;
        return(
            <div id="lesson-display-box">
                <h2>{this.props.state.currentLesson.title}</h2>
                <h4>{this.props.state.currentLesson.description}</h4>
    
                <Query query={GET_LESSON_CONTENTS} variables={{id: this.lessonID}} fetchPolicy="network-only">
                {
                    ({data,loading}) => {
                        if(loading) return <h4>loading...</h4>
                        // debugger
                        // bug with refetch: 
                        // triggered if contentPreview updated too often.
                        // therefore, now only triggers if content preview does not exist
                        // e.g. the user submited the content, therefore clearing the preview
                        // debugger

                        // if(this.state.refetch /* !contentPreview && currentUser.signedIn && !data.lesson */){
                        //     refetch();
                        //     this.clearRefetch();
                        //     console.log("REFETCH CALLED")
                        // }
                        
                        // if the state does not yet have the contents in it, then set the contents of the current lesson
                        !contents && this.setCurrentLessonContents(data.lesson.contents)
                        // count how many interactive assignments are on the page, and send that number to the state
                        contents && this.countInteractiveAssignments(contents);
                                                
                        return(
                            <div>
                                {
                                    // check to see if this lessons instructor is the current signed in user
                                    (this.props.state.currentUser.id === this.lesson.instructorId  
                                    || 
                                    // check to see if student view is active, and allow if id matches
                                    (this.props.state.currentUser.id && this.props.state.currentUser.id.split("STUDENT-VIEW-")[1] === this.lesson.instructorId)) 
                                    && 
                                    <LessonEditBanner 
                                        lesson={this.lesson} 
                                        state={this.props.state} 
                                        stateMethods={this.props.stateMethods} 
                                    />
                                }
                                {
                                    // if the current user has instructor prileges for this lesson, present the new content form.
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
                                    // if the user is creating new content, then render the content preview
                                    (this.state.contentPreview && this.state.contentPreview.data[0] !== "") 
                                    && 
                                    <ContentPreview content={this.state.contentPreview} stateMethods={this.props.stateMethods}/> 
                                }
                                {/* take the contents and render it into the correct content component */}
                                {contents && this.contentMapper(contents)}
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
