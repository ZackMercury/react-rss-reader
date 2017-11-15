import React from 'react';

const FeedItem = (props) =>
{
    return (
        <div className="FeedItem">
            <img className="icon" src={ props.icon } />
            <div className="name">{ props.name }</div>
            <div>
                { props.children }
            </div>
        </div>
    )
};

export default FeedItem;