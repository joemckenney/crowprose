import path from 'node:path';
import express from 'express';

import { render } from '@www/app/ssr';

import template from '@www/app/template';

import serveStatic from 'serve-static';

import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = parseInt(process.env.PORT, 0) || 3000;

const app = express();

async function createServer() {
  app.use(
    serveStatic(path.resolve(__dirname, '../../app/dist/client'), {
      index: false,
    })
  );

  app.use('*', async (req, res) => {
    res
      .status(200)
      .set({ 'Content-Type': 'text/html' })
      .end(template.render({ html: render(req.url) }));
  });

  return { server: app };
}

const { server } = await createServer();
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
