import React from 'react';
import he from 'he';

const Article = (props) => {
    let dateTime = new Date(Date.parse(props.time));
    let now = new Date(Date.now());
    let diffMs = now.getTime() - dateTime.getTime();

    let hours = Math.round(diffMs / (1000*60*60));
    let days = Math.round(hours / 24);
    let months = Math.round(days / 30);
    let years = Math.round(months / 12);
    let timeStr = "";
    if(hours < 24)
        timeStr = hours + " hour" + (hours>1?"s":"") + " ago";
    else if(days < 30)
        timeStr = days + " day" + (days>1?"s":"") + " ago";
    else if(months < 12)
        timeStr = months + " month" + (months>1?"s":"") + " ago";
    else 
        timeStr = years + " year" + (years>1?"s":"") + " ago";


    return (
        <article className="Article">
            <h3><a target="_blank" href={props.link}>{ he.decode(props.title) }</a></h3>
            <time>  { timeStr }</time>
            { props.image && <div className="imageHolder"><a target="_blank" href={ props.fullImage }><img src={ props.image }/><div className="imageCaption">{props.caption}</div></a></div> }
            <div className="text">{ props.children }</div>
        </article>
    )
};

export default Article;