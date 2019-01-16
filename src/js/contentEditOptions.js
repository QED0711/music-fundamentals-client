import React from 'react';

const contentEditOptions = () => {
    const type = document.getElementById("new-content-type").value;
    let options
    switch(type){
        case("Paragraph"):
            options = `
                <div id="content-edit-options">
                    <textarea></textarea>
                </div>
            `
        default:
            options = `
                <div id="content-edit-options">
                    <label>Text</label><br/>
                    <textarea></textarea>
                    <br/>
                    <label>Position (optional)</label><br/>
                    <input type="number"/>
                </div>
            `
            
    }
    document.getElementById("content-edit-options").innerHTML = options;
}

export default contentEditOptions;