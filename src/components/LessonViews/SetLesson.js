import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';

import {Query} from 'react-apollo';
import {GET_LESSON} from '../../queries/queries'


class SetLesson extends Component {
    constructor(props){
        super(props);

        this.lessonId = this.props.match.params.id
        this.setCurrentLesson = this.props.stateMethods.setCurrentLesson;
    }


    componentWillUnmount(){
        console.log("UNMOUNTING")
    }

    render(){

        if(this.props.state.currentLesson.id){
            // debugger
            // document.getElementById("set-lesson").remove();
            return <Redirect to={`/lessons/${this.props.state.currentLesson.id}`} />
        } else {
            return(
                <div id="set-lesson">
                <Query query={GET_LESSON} variables={{id: this.lessonId}} onCompleted={() => {
                        debugger
                        this.setCurrentLesson(data.lesson)
                    }}>
                    {
                        ({data, loading, error, stopPolling}) => {
                            if(error) return <Redirect to="/"/>
                            if(loading) return (<h3>Loading Lesson...</h3>)
                            if(data.lesson){
                            //     console.log("DATA: ", data)
                            //     // debugger
                            //     // set the returned lesson to the current state
                            //     this.setCurrentLesson(data.lesson);
                            //     return <h1>LOADED!!!</h1>
                            }
                        }
                    }
                </Query>
                </div>
            )
        }

    }

}

export default SetLesson;