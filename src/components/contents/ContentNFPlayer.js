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

        this.options.viewParams = {
            scale: 1,
            role: "reader",
            displayMode: "paginated"
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
        const score = new this.NFClient.ScoreView(this.content.id, this.scoreCode, this.options)
        const frame = document.getElementById(this.content.id)
        frame.score = score
        frame.onload = () => {
            console.log("LOADED")
            debugger
        }

    }



    render(){
        if(this.score){
            
        }
        return (
            <div className="content-box content-nf-player">
                {/* this div element below will be replaceed by a noteflight embeded score */}
                <div className="score-container" id={this.content.id}></div>
            </div> 
        )
    }
} 
    
    


export default ContentNFPlayer;