import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Editor from '../index';
// TODO 动态样式切换

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
);
