import React, { Component } from 'react';

import Header from './components/layout/header';
import Menu from './components/layout/menu';

class App extends Component {
  render() {
    return (
    	<div className="wrapper">
	      <Header></Header>
	      <Menu></Menu>
	      <div className="content-wrapper">
	      </div>
      </div>
    );
  }
}

export default App;
