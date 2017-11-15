import "./index.scss";

import React from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Footer from './components/Footer';

class App extends React.Component
{
    constructor ()
    {
        super();

        this.state = {
            sidebar: "false",
            source: ""
        };
    }

    toggleSidebar()
    {
        this.setState({
            sidebar: (this.state.sidebar == "true")?"false":"true"
        });
    }

    changeSource(url)
    {
        this.setState({
            source: url
        });
    }

    render()
    {
        return (
            <div className="appWrapper">
                <div className="App">
                    <Sidebar onSourceChange={ this.changeSource.bind(this) } 
                                visible={ this.state.sidebar } 
                                onCloseButtonClick={ this.toggleSidebar.bind(this) } />
                    <div className="rightColumn">
                        <Header onMenuButtonClick={ this.toggleSidebar.bind(this) }/>
                        <Feed source={ this.state.source } />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

render(<App/>, window.document.getElementById("app"));

//inline just because it is useful for commenting and uncommenting the line
if ('serviceWorker' in navigator) navigator.serviceWorker.register("/sw.js").then(() => console.log("Service worker is registered."));