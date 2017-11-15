import React from 'react';

const FeedSource = (props) =>
{
    return (
        <div className="FeedSource" onClick={ ()=>props.onClick(props.src) }>
            <span className="full-title">{ props.fullTitle }</span><span className="short-title">{ props.shortTitle }</span>
        </div>
    )
};

export default FeedSource;