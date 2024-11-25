import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import FloatBubble from './components/float-bubble';
import './index.less';
import './styles/github-markdown.css';
import 'highlight.js/styles/github.css';

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

interface EditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, htmlValue: string) => void;
}

const Editor = (props: EditorProps) => {
  const { onChange, defaultValue } = props;

  const [htmlString, setHtmlString] = useState(md.render(defaultValue || ''));
  const [collapse, setCollapse] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange?.(value, md.render(value));
    setHtmlString(md.render(value));
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={'wrapper'}>
      <textarea
        style={{ display: collapse ? 'none' : 'block' }}
        defaultValue={defaultValue}
        className={'editor'}
        onChange={handleInputChange}
      />
      <div
        className={'content markdown-body'}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
      <FloatBubble>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={handleCollapse}
        >
          {collapse ? '+' : '-'}
        </div>
      </FloatBubble>
    </div>
  );
};

export default Editor;
