import React, { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import Editor from '../index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  const [value, setValue] = useState('hello');

  const handleChange = (value: string) => {
    console.log(value);
    setValue(value);
  };

  return (
    <div>
      <Editor defaultValue={value} onChange={handleChange} />
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
