import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/blog/',
  plugins: [
    react(),
    {
      name: 'generate-posts-json',
      closeBundle() {
        try {
          const postsDir = path.join(__dirname, 'public', 'posts');
          const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).sort();
          fs.writeFileSync(
            path.join(postsDir, 'posts.json'),
            JSON.stringify(files, null, 2),
            'utf-8'
          );
          console.log(`✓ Generated posts.json with ${files.length} files`);
        } catch (error) {
          console.error('Error generating posts.json:', error);
        }
      }
    },
    {
      name: 'posts-api',
      configureServer(server) {
        server.middlewares.use('/api/posts', (req, res) => {
          if (req.method === 'GET') {
            try {
              const postsDir = path.join(__dirname, 'public', 'posts');
              const files = fs.readdirSync(postsDir);
              const mdFiles = files.filter(file => file.endsWith('.md'));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(mdFiles));
            } catch (error) {
              console.error('Error reading posts directory:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to read posts directory' }));
            }
          } else {
            res.statusCode = 405;
            res.end('Method not allowed');
          }
        });
      }
    }
  ],
  server: {
    proxy: {
      '/api/posts': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      }
    }
  }
}) 