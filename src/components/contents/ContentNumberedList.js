import React from 'react';

const ContentNumberedList = (props) => {

    return(
        <div className="content-box content-ul">
            <ol>
                {
                    props.content.map((item, index) => {
                        return(<li key={index}>{item}</li>)
                    })
                }
            </ol>
        </div>
    )

}

export default ContentNumberedList;