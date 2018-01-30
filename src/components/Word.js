import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { firstCharLowerCase } from 'xml2js/lib/processors';
import './Word.css';

class Word extends Component {
  state = {
    isLoaded: false
  };

  parseXml(xml) {
    return new Promise((resolve, reject) => {
      parseString(
        xml,
        {
          explicitArray: false,
          tagNameProcessors: [firstCharLowerCase]
        },
        (error, result) => {
          if (error) {
            console.error(error);
            reject({ error });
          }

          resolve(result);
        }
      );
    });
  }

  transformData(json) {
    const wordDefinition = json.wordDefinition,
      definitions = wordDefinition.definitions.definition.filter(
        definition => definition.dictionary.id !== 'easton'
      );

    return {
      word: wordDefinition.word,
      definitions
    };
  }

  componentWillMount() {
    fetch(
      `http://services.aonaware.com/DictService/DictService.asmx/Define?word=${
        this.props.word
      }`
    )
      .then(response => response.text())
      .then(xml => this.parseXml(xml))
      .then(json => this.transformData(json))
      .then(
        json => {
          this.setState({ ...json, isLoaded: true });
        },
        error => {
          this.setState({ error, isLoaded: true });
        }
      );
  }

  renderDefinition(definition, index) {
    const { dictionary, wordDefinition } = definition;

    return (
      <li className="definition" key={`definition-${index}`}>
        <p>From {dictionary.name}</p>
        <blockquote>
          <pre>{wordDefinition}</pre>
        </blockquote>
      </li>
    );
  }

  render() {
    const { isLoaded, error, word, definitions } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="word">
          <h2>{word}</h2>

          <ul className="definitions">
            {definitions.map(this.renderDefinition)}
          </ul>
        </div>
      );
    }
  }
}

export default Word;
