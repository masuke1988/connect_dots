import { defineConfig } from 'vite'
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';
import readDirClass from './readDirClass'
import handlebars from 'vite-plugin-handlebars'
import viteImagemin from 'vite-plugin-imagemin'
import pageData from './pageData'

/**
 * src以下のディレクトリを再帰的に取得し、index.htmlのパスを取得する
 * 最終的にvite.config.tsのinputに渡す
 * @param dirPath 
 * @returns 
 */
function allPageHtmlList(dirPath) {
  let objs = {}

  const readDir = new readDirClass()
  const htmlListObjs = readDir.getDirRecursively(dirPath)

  htmlListObjs.forEach((path) => {
    const name = path.replace(/^\.\/src\//, '').replace(/\//g, '_');
    if (name === '._src') {
      objs['index'] = resolve(__dirname, `${path}/index.html`)
    } else {
      objs[name] = resolve(__dirname, `${path}/index.html`)
    }
  })

  return objs
}

const inputFileObjs = allPageHtmlList('./src')

export default defineConfig({
  base: '',
  root: './src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetsInfo) => {

          let extType = assetsInfo.name.split('.').pop()

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }

          if (extType === 'css') {
            return `assets/css/[name]/style.css`
          }

          if (extType === 'js') {
            return `assets/js/[name][extname]`
          }

          return `assets/${extType}/[name][extname]`
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
      input: inputFileObjs
    }
  },
  publicDir: '../public',
  plugins: [
    glsl(),
    handlebars({
      //コンポーネントの格納ディレクトリを指定
      partialDirectory: resolve(__dirname, './src/components'),
      //各ページ情報の読み込み
      context(pagePath) {
        return pageData[pagePath];
      },
      compileOptions: {
        preventIndent: true,
        assumeObjects: true,
        noEscape: true,
      }
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ]
})