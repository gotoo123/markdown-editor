import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.less';
import './styles/github-markdown.css';
// TODO 动态样式切换

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
