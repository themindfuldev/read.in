import React, { Component } from 'react';
import './Word.css';

class Word extends Component {
  state = {
    word: 'example',
    results: [
      {
        definition: 'a representative form or pattern',
        partOfSpeech: 'noun',
        synonyms: ['model'],
        typeOf: [
          'representation',
          'internal representation',
          'mental representation'
        ],
        hasTypes: [
          'prefiguration',
          'archetype',
          'epitome',
          'guide',
          'holotype',
          'image',
          'loadstar',
          'lodestar',
          'microcosm',
          'original',
          'paradigm',
          'pilot',
          'prototype',
          'template',
          'templet',
          'type specimen'
        ],
        derivation: ['exemplify'],
        examples: ['I profited from his example']
      },
      {
        definition: 'something to be imitated',
        partOfSpeech: 'noun',
        synonyms: ['exemplar', 'good example', 'model'],
        typeOf: ['ideal'],
        hasTypes: [
          'pacemaker',
          'pattern',
          'beauty',
          'prodigy',
          'beaut',
          'pacesetter'
        ],
        derivation: ['exemplify', 'exemplary']
      },
      {
        definition: 'an occurrence of something',
        partOfSpeech: 'noun',
        synonyms: ['case', 'instance'],
        typeOf: ['happening', 'natural event', 'occurrence', 'occurrent'],
        hasTypes: [
          'clip',
          'mortification',
          'piece',
          'time',
          'humiliation',
          'bit'
        ],
        derivation: ['exemplify'],
        examples: ['but there is always the famous example of the Smiths']
      },
      {
        definition:
          'an item of information that is typical of a class or group',
        partOfSpeech: 'noun',
        synonyms: ['illustration', 'instance', 'representative'],
        typeOf: ['information'],
        hasTypes: [
          'excuse',
          'apology',
          'specimen',
          'case in point',
          'sample',
          'exception',
          'quintessence',
          'precedent'
        ],
        derivation: ['exemplify', 'exemplary'],
        examples: [
          'this patient provides a typical example of the syndrome',
          'there is an example on page 10'
        ]
      },
      {
        definition: 'punishment intended as a warning to others',
        partOfSpeech: 'noun',
        synonyms: ['deterrent example', 'lesson', 'object lesson'],
        typeOf: ['monition', 'admonition', 'word of advice', 'warning'],
        derivation: ['exemplary'],
        examples: ['they decided to make an example of him']
      },
      {
        definition:
          'a task performed or problem solved in order to develop skill or understanding',
        partOfSpeech: 'noun',
        synonyms: ['exercise'],
        typeOf: ['lesson'],
        examples: [
          'you must work the examples at the end of each chapter in the textbook'
        ]
      }
    ],
    syllables: {
      count: 3,
      list: ['ex', 'am', 'ple']
    },
    pronunciation: {
      all: "ɪɡ'zæmpəl"
    },
    frequency: 4.67
  };

  renderMeaning(meaning, index) {
    const {
      partOfSpeech,
      definition,
      similarTo,
      synonyms,
      derivation,
      examples
    } = meaning;
    return (
      <li className="meaning" key={`meaning-${index}`}>
        <p>
          <strong className="part-of-speech">{partOfSpeech}. </strong>
          <span className="definition">{definition}</span>
        </p>
        {similarTo &&
          similarTo.length > 0 && (
            <p>
              <h5>Similar to</h5>
              <ul>{similarTo.map(w => <li>{w}</li>)}</ul>
            </p>
          )}
        {synonyms &&
          synonyms.length > 0 && (
            <p>
              <h5>Synonyms</h5>
              <ul>{synonyms.map(w => <li>{w}</li>)}</ul>
            </p>
          )}
        {derivation &&
          derivation.length > 0 && (
            <p>
              <h5>Derivation</h5>
              <ul>{derivation.map(w => <li>{w}</li>)}</ul>
            </p>
          )}
        {examples &&
          examples.length > 0 && (
            <p>
              <h5>Examples</h5>
              <ul>{examples.map(w => <li>{w}</li>)}</ul>
            </p>
          )}
      </li>
    );
  }

  render() {
    const { word, pronunciation, syllables, results } = this.state;
    return (
      <div className="word">
        <h2>
          {word}
          <span className="word-details">
            <span className="pronounciation">| {pronunciation.all} |</span>
            <span className="syllables">({syllables.list.join('/')})</span>
          </span>
        </h2>

        <ul className="meanings">{results.map(this.renderMeaning)}</ul>
      </div>
    );
  }
}

export default Word;
