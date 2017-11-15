import React from 'react';
import Article from './components/Article';
import {serverGet} from '../utils';
import buttonScreenshot from './img/button.jpg';

class Feed extends React.Component 
{
    constructor (props)
    {
        super(props);

        this.state = {
            data: null,
            state: 0
        };
    }

    feedLoaded(code, res)
    {
        console.log(res);
        if(String(res) == "Error")
        {
            this.setState({
                state: 404
            })
            document.title = "Oups...";
            return;
        }
        let parser = new DOMParser();
        this.setState({
            data: parser.parseFromString(res, "text/xml"),
            state: 200
        });

        document.title = this.state.data.getElementsByTagName("title")[0].textContent;
    }

    componentWillReceiveProps(nextProps, nextContext)
    {
        if(this.props.source != nextProps.source)
        {
            document.title = "Loading...";
            serverGet(nextProps.source, this.feedLoaded.bind(this));
        }
    }

    render()
    {
        let content;

        if(this.props.source && this.state.data && this.state.state != 404)
        {
            let items = Array.prototype.slice.call( this.state.data.getElementsByTagName("item") ); //Converting into an array to use map
            
            let fullImages = this.state.data.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "content");

            let thumbnails = this.state.data.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail");

            content = (
                <div>
                    { items.map((item, index)=><Article 
                                                    key={index} 
                                                    caption={ item.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "text")[0] ? item.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "text")[0].textContent : ""}
                                                    link={item.getElementsByTagName("link")[0].textContent}
                                                    time={item.getElementsByTagName("pubDate")[0].textContent} 
                                                    title={item.getElementsByTagName("title")[0].textContent}
                                                    fullImage={fullImages[index] ? fullImages[index].getAttribute("url") : "" }
                                                    image={thumbnails[index] ? thumbnails[index].getAttribute("url") : "" }>
                                            {React.createElement('div',{ dangerouslySetInnerHTML:{ __html:item.getElementsByTagName("description")[0].childNodes[0].data }})}
                                        </Article>) } 
                </div>
            );
        }
        else if(this.state.state == 404)
        {
            content = (
                <div>
                    <p>Sorry, but currently you experience internet connection troubles, and therefore, this resourse hasn't been cached since the last time being connected. You may want to read feed sources you've already loaded before.</p>
                </div>
            );
        }
        else
        {
            content = (
                <div>
                    <h3>What is this?</h3>
                    <p>
                        This is an open source RSS feed reader, which was made with the following free and open source tools:
                        <br/>
                    </p>
                    <ul>
                        <li>webpack</li>
                        <li>webpack-dev-server</li>
                        <li>Inkscape Portable</li>
                        <li>Microsoft Visual Studio Code</li>
                        <li>Babel</li>
                        <li>extract-text-webpack-plugin</li>
                        <li>url-loader</li>
                        <li>sass-loader</li>
                        <li>css-loader</li>
                        <li>nanoajax</li>
                        <li>Node.js</li>
                        <li>ReactJS</li>
                    </ul>
                    <br/>
                    <p>
                        Thank you to:
                    </p>
                    <ul>
                        <li>Maximilian Schwarzmüller</li>
                        <li>Joe Parys</li>
                        <li>Scott Tolinski</li>
                    </ul>
                    <br/>
                    <h3>How do I use the app?</h3>
                    <p>
                        In order to open an RSS feed source, you need to show the sidebar by clicking this button located at the top left corner of the website:<br/>
                        <img className="centeredImage" src={buttonScreenshot}/>
                        And then select your prefered magazine and subject.

                        Thank you for using RSS Reader!
                    </p>
                </div>
            );
        }

        return (
            <div className="Feed">
                <div className="inblock">
                    { content }
                </div>
            </div>
        )
    }
};

export default Feed;