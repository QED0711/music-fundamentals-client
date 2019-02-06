import React, {Component} from 'react';

import parseOptionsString from '../../js/parseOptionsString';

class ContentNFInteractive extends Component{
    constructor(props){
        super(props);

        this.state = {answer: null};
        this.setAnswer = this.setAnswer.bind(this);
    }

    componentSetup(){
        const {content, stateMethods, options} = this.props
        this.content = content
        
        if(!this.content.id) this.content.id = "PREVIEW"

        this.contentOptions = parseOptionsString(content.data[content.data.length - 1])
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
    }

    parseNFUrl(url){
        let splitUrl = url.split("/")
        return splitUrl[splitUrl.length - 1];
    }

    setAnswer(answerData){
        console.log(answerData)
        this.setState({
            answerData
        })
    }

    shouldComponentupdate(){
        return false
    }

    parseXML(exerciseXML, parser){
        let parsedData = parser.parseFromString(exerciseXML, "text/xml");
        parsedData = parsedData.getElementsByTagName("part")[0].getElementsByTagName("measure");
        return parsedData
    }

    checkXML(exerciseXML, answerData, exerciseScore){
        for(let i = 0; i < answerData.length; i++){
            if(answerData[i].innerHTML.toLowerCase() !== exerciseXML[i].innerHTML.toLowerCase()){
              exerciseScore.selectMeasures(i, i+1);
              return
            } 
          }
          document.getElementById(`nf-interactive-${this.content.id}`).classList.add("nf-interactive-passed");     
          this.props.stateMethods.increasePassedInteractiveCount()
    }

    parseJSON(exerciseJSON){
        let currentMeasure = -1;
        let passed = [];
        const traverseAnswers = (answerData, exerciseData, currentKey = 'staves') => {

            if(passed.length) return
            // if the passed in answerData is itself a string, number, etc. 
            // Check for equality with exercise and deterine grade
            if(typeof answerData !== 'object'){
                if(answerData !== exerciseData){
                    console.log("FAILED");
                    passed.push([currentMeasure, false]);
                    return                    
                } else {
                    return
                }
            }

            if(typeof answerData[currentKey] !== 'object'){ 
                if(!exerciseData || answerData[currentKey] !== exerciseData[currentKey]){
                    console.log("FAILED");
                    passed.push([currentMeasure, false]);
                    return
                }
            }
            
            for(let newKey in answerData[currentKey]){
                if(newKey === "noteSets") currentMeasure++;
                if(answerData && exerciseData){
                    traverseAnswers(answerData[currentKey], exerciseData[currentKey], newKey);
                }
            }
        }

        let answerJSON = this.state.answerData
        traverseAnswers(answerJSON, exerciseJSON)
        return passed 
      }
  
      checkJSON(exerciseJSON, exerciseScore){
        // parse and grade the exerciseJSON  
        let graded = this.parseJSON(exerciseJSON);
            // the graded array will only contain measures that are incorrect
            // take the first measure that has an error, and select it in th exercise score
            if(graded.length > 0){
                exerciseScore.selectMeasures(graded[0][0], graded[0][0] + 1);
            } else {
                document.getElementById(`nf-interactive-${this.content.id}`).classList.add("nf-interactive-passed");
                this.props.stateMethods.increasePassedInteractiveCount()
            }
        
      }


    componentDidMount(){

        // create the exercise and answer score iframes via the noteflight api
        const exercise = new this.NFClient.ScoreView(`exercise-${this.content.id}`, this.exerciseScoreCode, this.options.exercise);
        const answer = new this.NFClient.ScoreView(`answer-${this.content.id}`, this.answerScoreCode, this.options.answer);
        // get the newly created iframe objects for later use
        const exerciseFrame = document.getElementById(`exercise-${this.content.id}`)
        const answerFrame = document.getElementById(`answer-${this.content.id}`)

        // interactive buttons
        const checkWorkButton = document.getElementById(`check-work-${this.content.id}`);
        const playAnswerButton = document.getElementById(`play-answer-${this.content.id}`);
        const activateButtons = () => {
            checkWorkButton.innerHTML = "Check Your Work"
            checkWorkButton.disabled = false;
            if(playAnswerButton){
                playAnswerButton.innerHTML = "Play Dictation Excerpt";
                playAnswerButton.disabled = false;
            }
        }
        // add class names here
        exerciseFrame.className = "score-container nf-exercise-score nf-interactive"
        answerFrame.className = "score-container nf-answer-score nf-interactive"
        
        // declar a new DOMParser to use to check exercise vs answer scores
        let parser = new DOMParser();

        // using the iframe objects from earlier, set their onload method to get the score data from each individual score
        exerciseFrame.onload = () => {
            console.log("Exercise Loaded")
            exercise.addEventListener("scoreDataLoaded", () => {
                console.log("EXERCISE FRAME READY FOR INTERACTION")
            })
        }
        
        // ANSWER: When answer data loads, get and parse its musicXML and store it in the component state
        answerFrame.onload = () => {
            console.log("Answer Loaded")
            answer.addEventListener("scoreDataLoaded", () => {
                if(this.contentOptions.gradingMethod === "simple"){
                    console.log("ANSWER FRAME READY FOR INTERACTION")
                    // if simple grading method, load score data as json like object (only checkes pitches & durations)
                    answer.getScore().done(data => {
                        let answerData = data;
                        this.setAnswer(answerData)
                        activateButtons();
                    })
                } else {
                    // if detailed grading method, load score data as musicXML (checks for perfect match)
                    answer.getNoteflightXML().done(data => {
                        let answerData = this.parseXML(data, parser)
                        this.setAnswer(answerData)
                        checkWorkButton.disabled = false;
                        activateButtons();
                        // delete answer iframe after its data has been saved to the component state?
                    })
                }
            })
        }

        // get the button element that the user presses to check their work
        // when clicked, it should check the current exercise score data against the stored answer score data
        checkWorkButton.onclick = (e) => {
            if(this.contentOptions.gradingMethod === "simple"){
                exercise.getScore().done(data => {
                    this.checkJSON(data, exercise)
                })
            } else {
                exercise.getNoteflightXML().done(data => {
                    let exerciseXML = this.parseXML(data, parser);
                    let answerData = this.state.answerData
                    // console.log({answerData, exerciseXML})
                    this.checkXML(exerciseXML, answerData, exercise)
                })
            }
        }

        // If assingmentType is a dictation, we need to allow for the user to play the dictation example
        if(this.contentOptions.assignmentType === "dictation"){
            playAnswerButton.onclick = (e) => {
                answer.playFromSelection(0);
            }
        }
    }



    render(){
        // calling the constructor in the render method allows us to reset the variables designated in the original constructor call 
        // this way when anything is that would effect the component, we can update just those parts without having to remount the entire component.
        // this.constructor(this.props, this.state)
        this.componentSetup();
        return (
            <div id={`nf-interactive-${this.content.id}`} className="content-box content-nf-player">
                <h6>Assignment Type: {this.contentOptions.assignmentType}</h6>
                <h6>Grading Method: {this.contentOptions.gradingMethod}</h6>
                {
                    this.contentOptions.assignmentType === "dictation" 
                    &&
                    <button id={`play-answer-${this.content.id}`} disabled>Loading Dictation...</button>
                }
                <br/>
                {/* this div element below will be replaceed by a noteflight embeded score */}
                <div id={`exercise-${this.content.id}`}></div>
                <div id={`answer-${this.content.id}`}></div>
                <br/>
                <button id={`check-work-${this.content.id}`} disabled>Loading Exercise...</button>

            </div>
        )
    }
} 
    
    


export default ContentNFInteractive;