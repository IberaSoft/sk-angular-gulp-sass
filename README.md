# Angular, Gulp, SASS

This is a skeleton application for a project using HTML5, AngularJS, Gulp and SASS.

The main code is developed to ECMAScript 6 standards and transpiled using Babel.

[![Build Status](https://travis-ci.org/IberaSoft/sk-angular-gulp-sass.svg?branch=master)](https://travis-ci.org/IberaSoft/sk-angular-gulp-sass)
[![GitHub issues](https://img.shields.io/github/issues/IberaSoft/sk-angular-gulp-sass.svg)](https://github.com/IberaSoft/sk-angular-gulp-sass/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/IberaSoft/sk-angular-gulp-sass/master/LICENSE)

## Prerequisites

- [Java](https://www.java.com/en/download/) v1.8.0 or greater is installed, and is available on the PATH environment variable.
- [Git](https://git-scm.com/) v2.6.4 or greater is installed, and is available on the PATH environment variable.
- [NodeJS](https://nodejs.org/en/download/) v5.3.0 or greater is installed, and `node` and `npm` are available on the PATH environment variable. (Note: Python 2.6 or 2.7 is required to build from source tarballs.)
- Gulp is installed globally `npm i gulp -g`. Check the [official documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).
- Add the following entry to your host file: `127.0.0.1 local.myapp.com`

## Quick Start

1- Open your terminal and clone the repository on your disk

```
git clone --depth=1 https://github.com/IberaSoft/sk-angular-gulp-sass
```

2- Remove the .git folder

```
cd sk-angular-gulp-sass
rm -rf .git
```

3- Install all of the node dependencies required by the project. (Note: Some npm plugins need node-gyp to be installed. To avoid errors please check the documentation.)

```
npm i
```