import React from 'react';

const ContentBulletList = (props) => {

    return(
        <div className="content-box content-ul">
            <ul>
                {
                    props.content.map((item, index) => {
                        return(<li key={index}>{item}</li>)
                    })
                }
            </ul>
        </div>
    )

}

export default ContentBulletList;