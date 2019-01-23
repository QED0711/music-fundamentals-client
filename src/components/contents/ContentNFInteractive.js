import React, {Component} from 'react';

import parseOptionsString from '../../js/parseOptionsString';

class ContentNFInteractive extends Component{
    constructor(props){
        super(props);
        const {content, stateMethods, options} = props
        this.content = content
        
        this.contentOptions = parseOptionsString(content.data[2])
        this.NFClient = stateMethods.NFClient;
        
        this.options = options;

        this.options.viewParams = {}

        this.options.exercise = {
            viewParams: {
                scale: 1,
                role: "template",
                displayMode: "paginated"
            }
        }
        
        this.options.answer = {
            height: 1,
            width: 1,
            viewParams: {
                scale: 0.1,
                role: "reader",
                displayMode: "paginated",
            }
        }

        this.exerciseScoreCode = this.parseNFUrl(content.data[0])
        this.answerScoreCode = this.parseNFUrl(content.data[1])

        this.state = {answer: null};

        this.setAnswer = this.setAnswer.bind(this);
    }

    parseNFUrl(url){
        let splitUrl = url.split("/")
        return splitUrl[splitUrl.length - 1];
    }

    setAnswer(answerXML){
        console.log(answerXML)
        this.setState({
            answerXML
        })
    }

    shouldComponentupdate(){
        return false
    }

    parseXML(data, parser){
        let parsedData = parser.parseFromString(data, "text/xml");
        parsedData = parsedData.getElementsByTagName("part")[0].getElementsByTagName("measure");
        return parsedData
    }

    checkXML(exerciseXML, answerXML, exerciseScore){
        for(let i = 0; i < answerXML.length; i++){
            if(answerXML[i].innerHTML.toLowerCase() !== exerciseXML[i].innerHTML.toLowerCase()){
              exerciseScore.selectMeasures(i, i+1);
              return
            } 
          }
          alert("CONGRADULATIONS!!! You Passed")        
    }

    componentDidMount(){
        // create the exercise and answer score iframes via the noteflight api
        const exercise = new this.NFClient.ScoreView(`exercise-${this.content.id}`, this.exerciseScoreCode, this.options.exercise);
        const answer = new this.NFClient.ScoreView(`answer-${this.content.id}`, this.answerScoreCode, this.options.answer);
        // get the newly created iframe objects for later use
        const exerciseFrame = document.getElementById(`exercise-${this.content.id}`)
        const answerFrame = document.getElementById(`answer-${this.content.id}`)

        // add class names here
        exerciseFrame.className = "score-container nf-exercise-score nf-interactive"
        answerFrame.className = "score-container nf-answer-score nf-interactive"
        
        // declar a new DOMParser to use to check exercise vs answer scores
        let parser = new DOMParser();

        // using the iframe objects from earlier, set their onload method to get the score data from each individual score
        exerciseFrame.onload = () => {
            console.log("Exercise Loaded")
            exercise.addEventListener("scoreDataLoaded", () => {
                console.log("READY TO ACCEPT INTERACTIONS")
            })
        }
        
        // ANSWER: When answer data loads, get and parse its musicXML and store it in the component state
        answerFrame.onload = () => {
            console.log("Answer Loaded")
            answer.addEventListener("scoreDataLoaded", () => {
                if(this.contentOptions.gradingMethod === "simple"){
                    // if simple grading method, load score data as json like object (only checkes pitches & durations)
                    answer.getScore().done(data => {
                        let answerData = data;
                        this.setAnswer(answerData)
                    })
                } else {
                    // if detailed grading method, load score data as musicXML (checks for perfect match)
                    answer.getMusicXML().done(data => {
                        let answerData = this.parseXML(data, parser)
                        this.setAnswer(answerData)
                        // delete answer iframe after its data has been saved to the component state?
                    })
                }
            })
        }

        // get the button element that the user presses to check their work
        // when clicked, it should check the current exercise score data against the stored answer score data
        const checkWorkButton = document.getElementById(`check-work-${this.content.id}`)
        checkWorkButton.onclick = (e) => {
            if(this.contentOptions.gradingMethod === "simple"){
                console.log("SIMPLE GRADING LOGIC HERE")
            } else {
                exercise.getMusicXML().done(data => {
                    let exerciseXML = this.parseXML(data, parser);
                    let answerXML = this.state.answerXML
                    // console.log({answerXML, exerciseXML})
                    this.checkXML(exerciseXML, answerXML, exercise)
                })
            }
        }
    }



    render(){
        return (
            <div className="content-box content-nf-player">
                {/* this div element below will be replaceed by a noteflight embeded score */}
                <div id={`exercise-${this.content.id}`}></div>
                <div id={`answer-${this.content.id}`}></div>
                <br/>
                <button id={`check-work-${this.content.id}`}>Check Your Work</button>

            </div>
        )
    }
} 
    
    


export default ContentNFInteractive;