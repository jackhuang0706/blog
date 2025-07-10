import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function parseFrontmatter(md) {
  const match = md.match(/^-{3,}\s*([\s\S]*?)\s*-{3,}/m);
  let date = null;
  if (match) {
    const lines = match[1].split("\n");
    for (const line of lines) {
      const d = line.match(/^date:\s*(.+)$/);
      if (d) date = d[1].trim();
    }
  }
  return { date };
}

function getPreview(md) {
  // 去除 frontmatter
  md = md.replace(/^---([\s\S]*?)---/, "");
  // 去除標題
  md = md.replace(/^#.+\n/, "");
  // 取前100字
  return md.trim().replace(/\n+/g, ' ').slice(0, 100) + (md.length > 100 ? '...' : '');
}

function App() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const files = ["about.md", "sample.md", "second.md"];
    Promise.all(
      files.map(async (file) => {
        const res = await fetch(`/posts/${file}`);
        const text = await res.text();
        const match = text.match(/^#\s+(.+)/m);
        const { date } = parseFrontmatter(text);
        const preview = getPreview(text);
        return {
          file,
          title: match ? match[1] : file,
          date,
          preview,
        };
      })
    ).then((arr) => {
      arr.sort((a, b) => (b.date || "") > (a.date || "") ? 1 : -1);
      setPosts(arr);
    });
  }, []);

  // hash-based routing
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, "");
      if (hash && posts.some(p => p.file === hash)) {
        setSelected(hash);
      } else {
        setSelected(null);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange(); // 初始化
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [posts]);

  useEffect(() => {
    if (selected) {
      fetch(`/posts/${selected}`)
        .then((res) => res.text())
        .then(setMarkdown);
      window.location.hash = `/${selected}`;
    } else {
      window.location.hash = "";
    }
  }, [selected]);

  return (
    <div className="container">
      {console.log('DEBUG posts:', posts)}
      {!selected ? (
        <>
          <header>
            <h1>Lazy Blog</h1>
            <p className="subtitle">Fijjj的學習日記</p>
          </header>
          <nav className="post-list">
            {posts.map((post) => (
              <button key={post.file} onClick={() => setSelected(post.file)}>
                <div className="post-list-meta">
                  <span className="post-title">{post.title}</span>
                </div>
                <div className="post-date-label">
                  Last Update: <span className="post-date">{post.date}</span>
                </div>
              </button>
            ))}
          </nav>
        </>
      ) : (
        <div className="reading-layout">
          <aside className="sidebar">
            <h1>Lazy Blog</h1>
            <p className="subtitle">Fijjj的學習日記</p>
            <button className="back-btn" onClick={() => setSelected(null)}>
              ← 返回文章列表
            </button>
          </aside>
          <main className="reading-main">
            <article className="markdown-body">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          </main>
        </div>
      )}
      <footer>
        <span>© {new Date().getFullYear()} Lazy Blog</span>
        <span className="powered-by">Powered by Vite & TypeScript</span>
      </footer>
    </div>
  );
}

export default App; 