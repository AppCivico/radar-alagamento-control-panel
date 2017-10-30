import React, { Component } from 'react';

import Header from './containers/header';
import Menu from './containers/menu';

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
