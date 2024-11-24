import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import FloatBubble from './components/float-bubble';
import './index.less';
import './styles/github-markdown.css';

const md: any = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (err) {
        console.log(err);
      }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

const Editor = () => {
  const [htmlString, setHtmlString] = useState(md.render(''));
  const [collapse, setCollapse] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setHtmlString(md.render(value));
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={'wrapper'}>
      <textarea
        style={{ maxWidth: collapse ? '0px' : 'unset' }}
        defaultValue={''}
        className={'editor'}
        onChange={handleInputChange}
      />
      <div
        className={'content markdown-body'}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
      <FloatBubble>
        <div onClick={handleCollapse}>{collapse ? '收起' : '展开'}</div>
      </FloatBubble>
    </div>
  );
};

export default Editor;
