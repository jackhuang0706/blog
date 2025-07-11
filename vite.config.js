import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
}) 