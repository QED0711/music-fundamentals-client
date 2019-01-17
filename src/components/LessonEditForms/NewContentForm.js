import React, {Component} from 'react'

import {Mutation} from 'react-apollo';
import {CREATE_NEW_CONTENT} from '../../queries/mutations';

import contentEditOptions from '../../js/contentEditOptions'

class NewContentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            contentType: "paragraph"
        }

        this.lesson = this.props.lesson
        this.appendContent = this.props.stateMethods.appendContent;

        this.setContentType = this.setContentType.bind(this);
    }


    getContentInfo = () => {
        const type = document.getElementById("new-content-type").value
        const data = [...document.getElementsByClassName("new-content-data")].map(x => {
            return x.value !== "" ? x.value : null
        }).filter(x => x) // filter stacked on map here removes empty items (e.g. if you skip a list item)

        // get the user defined position of the new content element if given
        // if not given, or outside the range of elements, set to the default last position
        const userPosition = document.getElementById("new-content-position").value;
        let position = userPosition !== "" ? parseInt(userPosition) : this.lesson.contents.length;
        if(position > this.lesson.contents.length) position = this.lesson.contents.length;
        
        
        return{
            type,
            data,
            position,
            lessonId: this.lesson.id
        }
    }

    setContentType(e){
        let contentType = e.target.value;
        this.setState({
            contentType
        })
    }

    render(){
        
        return(
            <Mutation mutation={CREATE_NEW_CONTENT}>
                {
                    (createContent, {data}) => {
                        if(data){
                            this.appendContent(data.createContent)
                        }
                        return(
            
                            <form id="new-content-form" onSubmit={ e => {
                                e.preventDefault();    
                                const contentInfo = this.getContentInfo();
                                createContent({variables: contentInfo});
                                }
                            }
                            >
                                <h3>Create New Content</h3>
                                <label>Content Type</label><br/>
                                <select id="new-content-type" onChange={this.setContentType}>
                                    <option value="paragraph">Paragraph</option>
                                    <option value="heading2">Section Heading</option>
                                    <option value="heading3">Sub-Section Heading</option>
                                    <option value="image">Image</option>
                                    <option value="nfPlayer">Noteflight Score</option>
                                    <option value="nfInteractive">Interactive Noteflight Score</option>
                                    <option value="iframe">Embeded iframe</option>
                                    <option value="bulletList">Bullet Point List</option>
                                    <option value="numberedList">Numbered List</option>
                                </select><br/>
    
                                {contentEditOptions(this.state.contentType)}
                                <br/>
                                <input type="submit" value="Save Changes"/>
                                
                            </form>
    
                        ) 
                    }
                }
            </Mutation>
    
        )
    }
}

export default NewContentForm;
