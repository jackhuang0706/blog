const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../public/posts');
const outFile = path.join(postsDir, 'posts-meta.json');

try {
  if (!fs.existsSync(postsDir)) {
    throw new Error('posts 目錄不存在: ' + postsDir);
  }
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const meta = files.map(file => {
    const stat = fs.statSync(path.join(postsDir, file));
    return {
      file,
      mtime: stat.mtime.toISOString(),
    };
  });
  fs.writeFileSync(outFile, JSON.stringify(meta, null, 2), 'utf-8');
  console.log('posts-meta.json generated!');
} catch (e) {
  console.error('Error generating posts-meta.json:', e);
} 