import React, {Component} from 'react';

class ContentNFPlayer extends Component{
    constructor(props){
        super(props);
        const {content, stateMethods, options} = props
        this.content = content
        this.NFClient = stateMethods.NFClient;
        
        this.options = options;

        // this.options.height = 500;
        // this.options.widht = 800;

        this.options = {
            viewParams: {
                scale: 1,
                role: "reader",
                displayMode: "paginated"
            }
        }

        this.scoreCode = this.parseNFUrl(content.data[0])

        this.state = {
            playerScore: null
        }

        this.setPlayerScore = this.setPlayerScore.bind(this);

        console.log("RENDERED")
    }
    
    setPlayerScore(score){
        this.setState({
            playerScore: score
        })
    }

    parseNFUrl(url){
        let splitUrl = url.split("/")
        return splitUrl[splitUrl.length - 1];
    }

    shouldComponentUpdate(){
        // stops rerendering from taking place
        return false;
    }

    componentDidMount(){
        window.NFClient.init(() => {
            // create the iframe with the NFClient ScoreView
            const score = new this.NFClient.ScoreView(this.content.id, this.scoreCode, this.options)
            // Get the new iframe element & add class names to it
            const frame = document.getElementById(this.content.id)
            frame.classList.add("score-container")
            frame.classList.add("nf-player-score")
            // once the iframe loads its contents:
                // add an event listener to the score to be notified with the score is ready for interaction
                // Then, get the data from the score as XML
            frame.onload = () => {
                console.log(`score-${this.content.id} Loaded`)
                score.addEventListener("scoreDataLoaded", function(){
                    score.getMusicXML().done(data => console.log(data))
                })
            }

        })

    }



    render(){
        if(this.score){
            
        }
        return (
            <div className="content-box content-nf-player">
                {/* this div element below will be replaceed by a noteflight embeded score */}
                <div id={this.content.id}></div>
                {/* <iframe id={this.content.id} src="https://www.noteflight.com/embed/8120ed2061deda2fe59478e99dfcf3c4bccfb44c?scale=1&displayMode=paginated&role=reader"></iframe> */}
            </div> 
        )
    }
} 
    
    


export default ContentNFPlayer;