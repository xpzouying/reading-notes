import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import './App.css';

const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  // 加载 README.md 文件
  useEffect(() => {
    fetch('/README.md')
      .then((response) => response.text())
      .then((text) => setMarkdown(marked(text)))
      .catch((error) => console.error(error));

    loadDefaultPage(); // 加载默认页面
  }, []);

  const loadDefaultPage = () => {
    fetch('/content/default.html')
      .then(response => response.text())
      .then(html => setHtmlContent(html))
      .catch(error => console.error(error));
  };

  // 处理超链接点击事件
  const handleLinkClick = (event) => {
    event.preventDefault();
    const href = event.target.getAttribute('href');

    // 如果链接指向的是 content 文件夹下的 HTML 文件
    if (href.startsWith('./content/')) {
      fetch(href)
        .then((response) => response.text())
        .then((html) => setHtmlContent(html))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="App">
      <div className="menu-bar">
        <button onClick={loadDefaultPage}>首页</button>
      </div>
      <div className="content">
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdown }} onClick={handleLinkClick} />
        <div className="html-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default App;
