const sass = require('@stencil/sass');
const postcss = require('@stencil/postcss');
exports.config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    }
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  plugins: [
    sass(),
    postcss(),
  ],
  enableCache: false
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
