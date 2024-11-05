import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { mockString } from "./mock";
import 'highlight.js/styles/github.css';

const md: any= new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
});

const App = () => {
  const [htmlString, setHtmlString] = useState(md.render(mockString));

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setHtmlString(md.render(value));
  }

  return (
    <div className={'wrapper'}>
      <textarea defaultValue={mockString} className={'editor'} onChange={handleInputChange}/>
      <div className={'content markdown-body'} dangerouslySetInnerHTML={{ __html: htmlString }}/>
    </div>
  )
};

export default App;
