const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const less = require('gulp-less');
const path = require('path');

const tsconfig = require('./tsconfig.json');

function clean() {
  return del(['./es', './lib']);
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(
      babel({
        plugins: ['./babel-transform-less-to-css'],
      })
    )
    .pipe(gulp.dest('es/'));
}

function buildLib() {
  return gulp
    .src(['es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('lib/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    paths: {
      ...tsconfig.compilerOptions.paths,
      react: ['node_modules/@types/react'],
      'markdown-it': ['node_modules/@types/markdownIt'],
    },
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
}

function buildStyle() {
  return gulp
    .src(['./src/**/*.less'], {
      base: './src/',
      ignore: ['**/demos/**/*', '**/tests/**/*', '*.patch.less'],
    })
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true,
      })
    )
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
}

exports.default = gulp.series(
  clean,
  buildES,
  buildLib,
  gulp.parallel(buildDeclaration, buildStyle)
);
