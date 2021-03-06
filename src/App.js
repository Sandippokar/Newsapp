import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress : 0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        //onLoaderFinished={() => setProgress(0)}
      />
        <News setProgress={this.setProgress}/>
      </div>
    );
  }
}
