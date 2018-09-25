import React, { Component } from 'react';
import User from './components/User'
import './App.css';
import Header from './components/Header'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }
  getUser = () => {
    const name = this.refs.name.value;
    fetch(`http://api.github.com/users/${name}`)
      .then(response => response.json())
      .then(data => {

        this.setState({
          user: data
        });
      })
  }
  render() {
    const name = this.state.user.name
    let userProfile;
    if (name) {
      userProfile = <User user={this.state.user} />
    }
    return (
      <div className="App">
        <Header />
        <div id='search-bar'>
          <input type="text" placeholder='Enter UserName' ref="name" />
          <button className='searchButton' onClick={this.getUser}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        {userProfile}
      </div>

    );
  }
}

export default App;
