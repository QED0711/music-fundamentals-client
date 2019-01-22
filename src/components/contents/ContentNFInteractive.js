import React, {Component} from 'react';

class ContentNFInteractive extends Component{
    constructor(props){
        super(props);
        const {content, stateMethods, options} = props
        this.content = content
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
            if(answerXML[i].innerHTML !== exerciseXML[i].innerHTML){
              exerciseScore.selectMeasures(i, i+1);
              return
            } 
          }
          alert("CONGRADULATIONS!!! You Passed")        
    }

    componentDidMount(){
        // const score = new this.NFClient.ScoreView(this.content.id, this.exerciseScoreCode, this.options)
        
        const exercise = new this.NFClient.ScoreView(`exercise-${this.content.id}`, this.exerciseScoreCode, this.options.exercise);
        const answer = new this.NFClient.ScoreView(`answer-${this.content.id}`, this.answerScoreCode, this.options.answer);

        const exerciseFrame = document.getElementById(`exercise-${this.content.id}`)
        const answerFrame = document.getElementById(`answer-${this.content.id}`)

        // add class names here
        exerciseFrame.className = "score-container nf-exercise-score nf-interactive"
        answerFrame.className = "score-container nf-answer-score nf-interactive"
        
        // declar a new DOMParser to use to check exercise vs answer scores
        let parser = new DOMParser();

        exerciseFrame.onload = () => {
            console.log("Exercise Loaded")
            exercise.addEventListener("scoreDataLoaded", () => {
                console.log("READY TO ACCEPT INTERACTIONS")
                // exercise.getScore().done(data => console.log(data))
            })
        }
        
        // ANSWER: When answer data loads, get and parse its musicXML and store it in the component state
        answerFrame.onload = () => {
            console.log("Answer Loaded")
            answer.addEventListener("scoreDataLoaded", () => {
                answer.getMusicXML().done(data => {
                    let answerXML = this.parseXML(data, parser)
                    this.setAnswer(answerXML)
                    // delete answer iframe after its data has been saved to the component state
                })
            })
        }

        const checkWorkButton = document.getElementById(`check-work-${this.content.id}`)

        checkWorkButton.onclick = (e) => {
            exercise.getMusicXML().done(data => {
                let exerciseXML = this.parseXML(data, parser);
                let answerXML = this.state.answerXML
                // console.log({answerXML, exerciseXML})
                this.checkXML(exerciseXML, answerXML, exercise)
            })
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