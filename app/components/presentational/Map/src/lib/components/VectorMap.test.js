import React from 'react';
import ReactDOM from 'react-dom';
import SecondExample from './VectorMap';

it('SecondExample renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SecondExample />, div);
});
