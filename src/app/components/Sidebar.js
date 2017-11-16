import React from 'react';
import FeedItem from './components/FeedItem';
import FeedSource from './components/FeedSource';

class Sidebar extends React.Component 
{
    constructor(){
        super();

        this.state = { //Just a plan to make the feed list dynamic
            feedList: [],
            classList: "Sidebar invisible"
        };
    }

    componentWillReceiveProps(nextProps)
    {
        if((nextProps.visible == "true" && this.props.visible != "true") ||
           (nextProps.visible != "true" && this.props.visible == "true"))
        {
            //toggle class
            let classes = this.state.classList.split(" ");
            if(classes.indexOf("visible") > -1)
            {
                classes.splice(classes.indexOf("visible"), 1);
                classes.push("invisible");
            }
            else
            {
                classes.splice(classes.indexOf("invisible"), 1);
                classes.push("visible");
            }

            this.setState({
                classList: classes.join(" ")
            });
        }
    }

    render()
    {
        return (
            <div className={this.state.classList} onClick={ this.props.onCloseButtonClick }>
                <div className="closeBtn"> &lt; <span id="hide">Hide</span> </div>
                <hr style={{borderColor: "rgb(65, 62, 62)"}} />
                <hr/>
                <FeedItem name="The Economist" icon="https://www.economist.com/favicon.ico">
                    <FeedSource fullTitle="Business & Finance" shortTitle="B&F" src="rss/economist-business-finance.xml" onClick={ this.props.onSourceChange.bind(this) } />
                    <FeedSource fullTitle="Economics" shortTitle="Ecnm" src="rss/economist-economics.xml" onClick={ this.props.onSourceChange.bind(this) } />
                    <FeedSource fullTitle="Science & Technology" shortTitle="S&T" src="rss/economist-science-technology.xml" onClick={ this.props.onSourceChange.bind(this) } />
                </FeedItem>
                <FeedItem name="The Independent" icon="https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2016/11/18/09/indy-logo.png">
                    <FeedSource fullTitle="News" shortTitle="Nws" src="rss/independent-news.xml" onClick={ this.props.onSourceChange.bind(this) } />
                    <FeedSource fullTitle="Environment" shortTitle="Env" src="rss/independent-environment.xml" onClick={  this.props.onSourceChange.bind(this) } />
                    <FeedSource fullTitle="Sport" shortTitle="Sprt" src="rss/independent-sport.xml" onClick={ this.props.onSourceChange.bind(this) } />
                    <FeedSource fullTitle="Life & Style" shortTitle="L&S" src="rss/independent-life-style.xml" onClick={ this.props.onSourceChange.bind(this) } />
                    <FeedSource fullTitle="Arts & Enternainment" shortTitle="Art" src="rss/independent-arts-entertainment.xml" onClick={ this.props.onSourceChange.bind(this) } />
                    <FeedSource fullTitle="Travel" shortTitle="Trvl" src="rss/independent-travel.xml" onClick={ this.props.onSourceChange.bind(this) } />
                </FeedItem>
            </div>
        )
    }
};

export default Sidebar;