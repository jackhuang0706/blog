import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

type Post = {
  file: string;
  title: string;
  date: string | null;
  preview: string;
};

type TocItem = {
  text: string;
  level: number;
  id: string;
};

function parseFrontmatter(md: string) {
  const match = md.match(/^-{3,}\s*([\s\S]*?)\s*-{3,}/m);
  let date = null;
  let tags: string[] = [];
  if (match) {
    const lines = match[1].split("\n");
    for (const line of lines) {
      const d = line.match(/^date:\s*(.+)$/);
      if (d) date = d[1].trim();
      const t = line.match(/^tags:\s*\[(.*)\]/);
      if (t) {
        tags = t[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }
  }
  return { date, tags };
}

function getPreview(md: string) {
  md = md.replace(/^---([\s\S]*?)---/, "");
  md = md.replace(/^#.+\n/, "");
  return md.trim().replace(/\n+/g, ' ').slice(0, 150) + (md.length > 150 ? '...' : '');
}

function getUrlSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function getFilenameFromSlug(slug: string): string {
  return slug.endsWith('.md') ? slug : `${slug}.md`;
}

function extractToc(md: string): TocItem[] {
  const lines = md.split(/\r?\n/);
  const toc: TocItem[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      // 產生 id，與 markdown-it-anchor 類似
      const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ text, level, id });
    }
  }
  return toc;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const [postTags, setPostTags] = useState<string[]>([]);
  const [showTagsPage, setShowTagsPage] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagMap, setTagMap] = useState<Record<string, Post[]>>({});

  useEffect(() => {
    // 動態掃描所有 markdown 檔案
    const scanMarkdownFiles = async () => {
      // 使用預設檔案列表，因為 GitHub Pages 無法使用 API
      const defaultFiles = ["about.md", "sample.md"];
      
      Promise.all(
        defaultFiles.map(async (file) => {
          const res = await fetch(`/blog/posts/${file}`);
          let text = '';
          if (res.ok) {
            text = await res.text();
          }
          if (!res.ok || text.trim().startsWith('<')) {
            return {
              file,
              title: file,
              date: null,
              preview: '檔案不存在',
            };
          }
          const match = text.match(/^#\s+(.+)/m);
          const { date } = parseFrontmatter(text);
          const preview = getPreview(text);
          const title = match ? match[1].trim() : file.replace('.md', '');
          console.log(`File: ${file}, Title: ${title}`); // 除錯用
          return {
            file,
            title,
            date,
            preview,
          };
        })
      ).then((arr) => {
        arr.sort((a, b) => (b.date || "") > (a.date || "") ? 1 : -1);
        setPosts(arr);
      });
    };
    
    scanMarkdownFiles();
  }, []);

  // 收集所有 tags 與對應文章
  useEffect(() => {
    if (posts.length > 0) {
      const newTagMap: Record<string, Post[]> = {};
      
      // 只處理 sample.md，因為 about.md 不需要標籤
      const samplePost = posts.find(post => post.file === 'sample.md');
      if (samplePost) {
        fetch(`/blog/posts/sample.md`)
          .then(res => res.text())
          .then(md => {
            const { tags } = parseFrontmatter(md);
            (tags || []).forEach((tag: string) => {
              if (!newTagMap[tag]) newTagMap[tag] = [];
              newTagMap[tag].push(samplePost);
            });
            setTagMap(newTagMap);
          })
          .catch(error => {
            console.error('Error fetching sample.md:', error);
            setTagMap({});
          });
      }
    }
  }, [posts]);

  useEffect(() => {
    if (selected) {
      fetch(`/blog/posts/${selected}`)
        .then((res) => res.text())
        .then(md => {
          // 移除 frontmatter
          const contentWithoutFrontmatter = md.replace(/^---[\s\S]*?---\s*/, '');
          setMarkdown(contentWithoutFrontmatter);
          setToc(extractToc(contentWithoutFrontmatter));
          const { tags } = parseFrontmatter(md);
          setPostTags(tags || []);
        });
      const urlSlug = getUrlSlug(selected);
      window.history.pushState({}, '', `/${urlSlug}`);
    } else {
      window.history.pushState({}, '', '/');
    }
  }, [selected]);

  // 產生帶 id 的 heading
  function createHeading(level: number) {
    return function Heading(props: any) {
      const children = props.children;
      let text = '';
      if (Array.isArray(children)) {
        text = children.map((c) => (typeof c === 'string' ? c : '')).join('');
      } else if (typeof children === 'string') {
        text = children;
      }
      const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)/g, '');
      return React.createElement(`h${level}`, { id }, children);
    };
  }

  return (
    <div className="container">
      <div className="dynamic-curves"></div>
      <nav className="top-bar">
        <div className="top-bar-content">
          <a href="/" className="top-bar-brand" onClick={(e) => {
            e.preventDefault();
            setSelected(null);
            setShowTagsPage(false);
            setSelectedTag(null);
          }}>
            <img src="/blog/logo_of_blog.png" alt="logo" className="brand-icon" />
            Lazy Blog
          </a>
          <div className="top-bar-nav">
            <a 
              href="/" 
              className={!selected && !showTagsPage ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setSelected(null);
                setShowTagsPage(false);
                setSelectedTag(null);
              }}
            >
              Home
            </a>
            <a 
              href="/about" 
              className={selected === 'about.md' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setSelected('about.md');
                setShowTagsPage(false);
                setSelectedTag(null);
              }}
            >
              About
            </a>
            <div className="dropdown">
              <a href="#" className={selected && posts.some(p => p.file === selected) ? 'active' : ''}>
                Archives
              </a>
              <div className="dropdown-content">
                {posts.filter(post => post.file !== 'about.md').map(post => (
                  <a href="#" key={post.file} onClick={e => {
                    e.preventDefault();
                    setSelected(post.file);
                    setShowTagsPage(false);
                    setSelectedTag(null);
                  }}>{post.title}</a>
                ))}
              </div>
            </div>
            <a 
              href="#"
              className={showTagsPage ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                setShowTagsPage(true);
                setSelected(null);
                setSelectedTag(null);
              }}
            >
              Tags
            </a>
            <a 
              href="https://github.com/jackhuang0706/blog.git" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Github Repo
            </a>
          </div>
        </div>
      </nav>

      {/* Tags 頁面 */}
      {showTagsPage ? (
        <div className="reading-layout">
          <aside className="sidebar">
            <div className="sidebar-block sidebar-header-block">
              <h1>Tags</h1>
              <p className="subtitle">所有標籤</p>
              <button 
                className="back-btn" 
                onClick={() => {
                  setShowTagsPage(false);
                  setSelected(null);
                  setSelectedTag(null);
                }}
              >
                ← 回首頁
              </button>
            </div>
          </aside>
          <main className="reading-main">
            <article className="markdown-body">
              {!selectedTag ? (
                <div className="all-tags-list">
                  {Object.keys(tagMap).sort().map(tag => (
                    <span
                      className="post-tag"
                      key={tag}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <button className="back-btn" onClick={() => setSelectedTag(null)}>
                      ← 返回所有標籤
                    </button>
                  </div>
                  <h2 style={{ marginTop: 0 }}>#{selectedTag}</h2>
                  <ul>
                    {tagMap[selectedTag]?.map(post => (
                      <li key={post.file}>
                        <a href="#" onClick={e => {
                          e.preventDefault();
                          setSelected(post.file);
                          setShowTagsPage(false);
                          setSelectedTag(null);
                        }}>{post.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </main>
        </div>
      ) : selected ? (
        // 顯示文章內容
        <div className="reading-layout">
          <aside className="sidebar">
            <div className="sidebar-block sidebar-header-block">
              <h1>回首頁</h1>
              <p className="subtitle">Back to Home</p>
              <button 
                className="back-btn" 
                onClick={() => {
                  setSelected(null);
                  setShowTagsPage(false);
                  setSelectedTag(null);
                }}
              >
                ← 回首頁
              </button>
            </div>
          </aside>
          <main className="reading-main">
            <article className="markdown-body">
              <ReactMarkdown
                components={{
                  h1: createHeading(1),
                  h2: createHeading(2),
                  h3: createHeading(3),
                  h4: createHeading(4),
                  h5: createHeading(5),
                  h6: createHeading(6),
                }}
              >
                {markdown}
              </ReactMarkdown>
              {/* 顯示 tags */}
              {postTags.length > 0 && (
                <div className="post-tags">
                  {postTags.map(tag => (
                    <span className="post-tag" key={tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </article>
          </main>
        </div>
      ) : (
        // 首頁
        <>
          <header>
            <h1>Lazy Blog</h1>
            <p className="subtitle">Fijjj的學習日記</p>
          </header>
        </>
      )}
      <footer>
        <span>© {new Date().getFullYear()} Lazy Blog</span>
        <span className="powered-by">Powered by React & Vite</span>
      </footer>
    </div>
  );
}

export default App; 