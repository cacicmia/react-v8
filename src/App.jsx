import React from 'react';
import { createRoot } from 'react-dom';
const Pet = props => {
  return React.createElement('div', {}, [
    React.createElement('h1', {}, props.name),
    React.createElement('h2', {}, props.animal),
    React.createElement('h3', {}, props.breed),
  ]);
};
const App = () => {
  return React.createElement('div', { id: 'my-id' }, [
    React.createElement('h1', {}, 'Adopt me!'),
    React.createElement(Pet, {
      name: 'luna',
      breed: 'havanese',
      animal: 'Dog',
    }),
    React.createElement(Pet, {
      name: 'Luna',
      breed: 'havanese',
      animal: 'Dog',
    }),
    React.createElement(Pet, {
      name: 'luna',
      breed: 'Havanese',
      animal: 'Dog',
    }),
  ]);
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(App));
