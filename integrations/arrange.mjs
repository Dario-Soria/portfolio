// Local photo arranger (dev only).
// `npm run dev` → http://localhost:4321/arrange
// Adds the /arrange page plus two endpoints that write src/data/arrangement.json
// and, for "publish", commit that one file and push it (GitHub Pages then redeploys).
// Nothing here runs in `npm run build`, so the public site has no editor.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const REL = 'src/data/arrangement.json';

const isStrings = (a) => Array.isArray(a) && a.every((s) => typeof s === 'string');
function validate(d) {
  if (!d || typeof d !== 'object') return false;
  if (!isStrings(d.projects) || !isStrings(d.hiddenProjects) || !isStrings(d.hidden)) return false;
  if (!d.photos || typeof d.photos !== 'object') return false;
  return Object.values(d.photos).every(isStrings);
}

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export default function arrange() {
  return {
    name: 'photo-arranger',
    hooks: {
      'astro:config:setup': ({ command, config, injectRoute, updateConfig, logger }) => {
        if (command !== 'dev') return;
        const root = fileURLToPath(config.root);
        const file = path.join(root, REL);
        const git = (...args) => run('git', args, { cwd: root });
        let last = null; // result of the last save/publish, shown after the page reloads

        injectRoute({ pattern: '/arrange', entrypoint: './src/arrange/Arrange.astro' });

        const middleware = async (req, res, next) => {
          if (!req.url?.startsWith('/__arrange/')) return next();
          const reply = (status, body) => {
            res.statusCode = status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
          };
          const action = req.url.slice('/__arrange/'.length);

          if (req.method === 'GET' && action === 'status') return reply(200, last);
          if (req.method !== 'POST' || !['save', 'publish'].includes(action)) return reply(404, null);

          try {
            const data = await readBody(req);
            if (!validate(data)) throw new Error('Invalid arrangement data');
            const { projects, hiddenProjects, photos, hidden } = data;
            await fs.writeFile(file, JSON.stringify({ projects, hiddenProjects, photos, hidden }, null, 2) + '\n');
            last = { ok: true, time: Date.now(), message: 'Saved locally. Use “Save & publish” to update the live site.' };

            if (action === 'publish') {
              const { stdout } = await git('status', '--porcelain', '--', REL);
              if (stdout.trim()) await git('commit', '-m', 'Update photo arrangement', '--', REL);
              await git('push', 'origin', 'HEAD');
              last = {
                ok: true,
                time: Date.now(),
                message: stdout.trim()
                  ? 'Published ✓ The live site updates in about a minute.'
                  : 'Nothing new to publish: the live site already has this arrangement.',
              };
            }
            logger.info(last.message);
            reply(200, last);
          } catch (err) {
            last = { ok: false, time: Date.now(), message: `Failed: ${(err.stderr || err.message || err).toString().trim()}` };
            logger.error(last.message);
            reply(500, last);
          }
        };

        updateConfig({
          vite: { plugins: [{ name: 'photo-arranger', configureServer: (server) => void server.middlewares.use(middleware) }] },
        });
      },
    },
  };
}
