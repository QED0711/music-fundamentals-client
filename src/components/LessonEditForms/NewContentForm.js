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
        // this.contents = this.props.contents
        this.appendContent = this.props.stateMethods.appendContent;

        this.setContentType = this.setContentType.bind(this);

        this.setContentPreview = this.props.setContentPreview;
        this.clearContentPreview = this.props.clearContentPreview;
    }


    getContentInfo = (preview = false) => {
        const type = document.getElementById("new-content-type").value
        let data = [...document.getElementsByClassName("new-content-data")].map(x => {
            return x.value !== "" ? x.value : null
        }).filter(x => x) // filter stacked on map here removes empty items (e.g. if you skip a list item)
        
        // if we are dealing with a list, we remove the last auto generated item because it is empty
        if((type === "bulletList" || type === "numberedList") && data[0]){
            data = data[0].split("\n").filter(x => x !== "")
            console.log(data)
        }

        // get the user defined position of the new content element if given
        // if not given, or outside the range of elements, set to the default last position
        const userPosition = document.getElementById("new-content-position").value;
        let position = userPosition !== "" ? parseInt(userPosition) : this.props.contents.length;
        if(position > this.props.contents.length) position = this.props.contents.length;

        // Get content options (unique to each content type)
        // Find all elements with className "new-content-options"
        // Return each individual option as a string in the format <name>:<value> (key value pair in string form);
        // join all option strings together. separated by commas
        let options = [...document.getElementsByClassName("new-content-options")].map(x => {
            return x.name + ":" + x.value;
        }).join(",")
        
        // add the options string to the end of the data array
        data.push(options)
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
        let {scheduleRefetch} = this.props
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
                                this.clearContentPreview();
                                // scheduleRefetch()
                                const contentInfo = this.getContentInfo();
                                createContent({variables: contentInfo});
                                }
                            }
                            onChange={ e => {
                                this.setContentPreview(this.getContentInfo(true));
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
                                    <option value="link">Link</option>
                                    <option value="list">List</option>
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
