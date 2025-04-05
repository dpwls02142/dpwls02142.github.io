// build-css.js
const { PurgeCSS } = require('purgecss');
const fs = require('fs');

const DIST_PATH = '_sass/dist';

// 폴더 삭제 및 생성
fs.rmSync(DIST_PATH, { recursive: true, force: true });
fs.mkdirSync(DIST_PATH, { recursive: true });

(async () => {
  const purgeCSSResult = await new PurgeCSS().purge({
    content: ['_includes/**/*.html', '_layouts/**/*.html', '_javascript/**/*.js'],
    css: ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
    keyframes: true,
    variables: true,
    safelist: {
      standard: [/^collaps/, /^w-/, 'shadow', 'border', 'kbd'],
      greedy: [/^col-/, /tooltip/],
    },
  });

  const result = purgeCSSResult[0].css;

  fs.writeFileSync(`${DIST_PATH}/bootstrap.css`, result);
  console.log('✅ CSS purged and written to:', `${DIST_PATH}/bootstrap.css`);
})();
