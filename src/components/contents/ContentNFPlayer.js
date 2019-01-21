import React, {Component} from 'react';

class ContentNFPlayer extends Component{
    constructor(props){
        super(props);
        const {content, stateMethods, options} = props
        this.content = content
        this.NFClient = stateMethods.NFClient;
        
        this.options = options;

        this.options.height = 500;
        this.options.widht = 800;

        this.options.viewParams = {
            scale: 1,
            role: "reader",
            displayMode: "paginated"
        }

        this.scoreCode = this.parseNFUrl(content.data[0])
    }

    parseNFUrl(url){
        let splitUrl = url.split("/")
        return splitUrl[splitUrl.length - 1];
    }
    
    componentDidMount(){
        const score = new this.NFClient.ScoreView(this.content.id, this.scoreCode, this.options)
        score.addEventListener("scoreDataLoaded", function(e){
            console.log("Score Loaded")
        })
    }



    render(){
        return (
            <div className="content-box content-nf-player">
                {/* this div element below will be replaceed by a noteflight embeded score */}
                <div className="score-container" id={this.content.id}></div>
        
            </div>
        )
    }
} 
    
    


export default ContentNFPlayer;