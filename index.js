import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      userName: '',
      isSubmitted: false,
      age: -1,
      gender: '',
      nation: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const userName = this.state.name;

    function getAge(n) {
      return fetch('https://api.agify.io?name=' + n).then((response) =>
        response.json()
      );
    }

    function getGender(n) {
      return fetch('https://api.genderize.io?name=' + n).then((response) =>
        response.json()
      );
    }

    function getNation(n) {
      return fetch('https://api.nationalize.io?name=' + n).then((response) =>
        response.json()
      );
    }

    Promise.all([
      getAge(userName),
      getGender(userName),
      getNation(userName),
    ]).then(([age_response, gender_response, nation_response]) => {
      this.setState({
        userName: userName,
        isSubmitted: true,
        age: age_response.age,
        gender: gender_response.gender,
        nation: nation_response.country[0].country_id,
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Enter in a your name:
          <input type="text" onChange={this.handleChange} />
          <button type="submit"> Submit </button>
          <br />
          {this.state.isSubmitted
            ? 'Hello ' +
              this.state.userName +
              '. I think you are a ' +
              this.state.gender +
              ' and ' +
              this.state.age +
              ' years old, from ' +
              this.state.nation +
              '.'
            : ''}
        </div>
      </form>
    );
  }
}

render(<App />, document.getElementById('root'));
