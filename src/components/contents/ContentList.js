import React from 'react';
import parseOptionsString from '../../js/parseOptionsString';

const ContentList = ({content}) => {

    let listItems = content[0].split("\n").filter(item => item !== "").map(item => <li>{item}</li>)
    let options = parseOptionsString(content[content.length - 1]);
    return(
        <div>
            {
                options.listType === "bullet" ? 
                <ul>{listItems}</ul>
                :
                <ol>{listItems}</ol>
            }
        </div>
    )

}

export default ContentList;

