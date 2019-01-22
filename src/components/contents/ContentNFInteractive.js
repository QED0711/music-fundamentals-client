import React, {Component} from 'react';

class ContentNFInteractive extends Component{
    constructor(props){
        super(props);
        const {content, stateMethods, options} = props
        this.content = content
        this.NFClient = stateMethods.NFClient;
        
        this.options = options;

        // this.options.height = 500;
        // this.options.widht = 800;

        this.options.viewParams = {
            scale: 1,
            role: "reader",
            displayMode: "paginated"
        }

        this.exerciseScoreCode = this.parseNFUrl(content.data[0])
        this.answerScoreCode = this.parseNFUrl(content.data[1])
    }

    parseNFUrl(url){
        let splitUrl = url.split("/")
        return splitUrl[splitUrl.length - 1];
    }

    componentDidMount(){
        // const score = new this.NFClient.ScoreView(this.content.id, this.exerciseScoreCode, this.options)
        
        const exercise = new this.NFClient.ScoreView(`exercise-${this.content.id}`, this.exerciseScoreCode, this.options);
        const answer = new this.NFClient.ScoreView(`answer-${this.content.id}`, this.answerScoreCode, this.options);

        const exerciseFrame = document.getElementById(`exercise-${this.content.id}`)
        const answerFrame = document.getElementById(`answer-${this.content.id}`)

        // add class names here

        exerciseFrame.onload = () => {
            console.log("Exercise Loaded")
            exercise.addEventListener("scoreDataLoaded", () => {
                exercise.getScore().done(data => console.log(data))
            })
        }
        
        answerFrame.onload = () => {
            console.log("Answer Loaded")
            answer.addEventListener("scoreDataLoaded", () => {
                answer.getScore().done(data => console.log(data))
            })
        }
        
        // const answerIframe = document.getElementById(`answer-${this.content.id}`);
        // const answer = new this.NFClient.ScoreView(answerIframe);
        // answer.addEventListener("scoreDataLoaded", function(e){
        //     console.log("Answer Data Loaded")
        // })



    }



    render(){
        return (
            <div className="content-box content-nf-player">
                {/* this div element below will be replaceed by a noteflight embeded score */}
                <div id={`exercise-${this.content.id}`}></div>
                <div id={`answer-${this.content.id}`}></div>
                
                {/* <iframe id={`exercise-${this.content.id}`} className="nf-iframe nf-interactive-iframe" 
                src={`https://noteflight.com/embed/${this.exerciseScoreCode}?scale=1&role=reader&displayMode=paginated`} 
                height="300"
                ></iframe>
                
                <iframe id={`answer-${this.content.id}`} className="nf-iframe nf-interactive-iframe" 
                src={`https://noteflight.com/embed/${this.answerScoreCode}?scale=1&role=reader&displayMode=paginated`} 
                height="1" width="1"
                ></iframe> */}


            </div>
        )
    }
} 
    
    


export default ContentNFInteractive;