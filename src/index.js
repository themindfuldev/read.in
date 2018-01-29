import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Word from './components/Word';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Word word="example" />, document.getElementById('root'));
registerServiceWorker();
