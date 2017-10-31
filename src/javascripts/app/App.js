import React, { Component } from 'react';

import Header from './containers/header';
import Menu from './containers/menu';
import Notifications from './containers/notifications';

class App extends Component {
  render() {
    return (
    	<div className="wrapper">
	      <Header></Header>
	      <Menu></Menu>
	      <div className="content-wrapper">
	      	<Notifications></Notifications>
	      </div>
      </div>
    );
  }
}

export default App;
