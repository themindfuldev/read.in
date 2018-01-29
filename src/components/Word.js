import React, { Component } from 'react';
import { parseString } from 'xml2js';
import './Word.css';

class Word extends Component {
  state = {
    isLoaded: false
  };

  parseResponse(xml) {
    return new Promise((resolve, reject) => {
      parseString(xml, (error, result) => {
        if (error) {
          console.error(error);
          reject({ error });
        }

        resolve(result);
      });
    });
  }

  componentWillMount() {
    fetch(
      `http://services.aonaware.com/DictService/DictService.asmx/Define?word=${
        this.props.word
      }`
    )
      .then(response => response.text())
      .then(xml => this.parseResponse(xml))
      .then(
        json => {
          this.setState({
            ...json.WordDefinition,
            isLoaded: true
          });
        },
        error => {
          this.setState({
            error,
            isLoaded: true
          });
        }
      );
  }

  renderDefinition(Definition, index) {
    const [Dictionary] = Definition.Dictionary,
      [WordDefinition] = Definition.WordDefinition;

    return (
      <li className="definition" key={`definition-${index}`}>
        <p>From {Dictionary.Name}</p>
        <blockquote>{WordDefinition}</blockquote>
      </li>
    );
  }

  render() {
    const { isLoaded, error, Word, Definitions } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="word">
          <h2>{Word}</h2>

          <ul className="definitions">
            {Definitions[0].Definition.map(this.renderDefinition)}
          </ul>
        </div>
      );
    }
  }
}

export default Word;
