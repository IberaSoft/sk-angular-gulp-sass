# Angular, Gulp, SASS

This is a skeleton application for a project using HTML5, AngularJS, Gulp and SASS.

The main code is developed with the ECMAScript 6 standards and transpiled using Babel.

[![Build Status](https://travis-ci.org/IberaSoft/sk-angular-gulp-sass.svg?branch=master)](https://travis-ci.org/IberaSoft/sk-angular-gulp-sass)
[![GitHub issues](https://img.shields.io/github/issues/IberaSoft/sk-angular-gulp-sass.svg)](https://github.com/IberaSoft/sk-angular-gulp-sass/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/IberaSoft/sk-angular-gulp-sass/master/LICENSE)

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/) v4.2.4 or greater is installed, and `node` and `npm` are available on the PATH environment variable.
- [Git](https://git-scm.com/) v2.6.4 or greater is installed, and is available on the PATH environment variable.

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

3- Install all of the node dependencies and bower packages required by the project. (Note: Some npm plugins need node-gyp to be installed. To avoid errors please check the documentation.)

```
npm i
```


## Gulp Tasks

- `gulp`

    Run all tasks and launch the browser.

- `gulp clean`

    Remove all files from the build folder.

- `gulp styles`

    Compile less files to CSS, add vendor prefixes, and copy to the build folder

- `gulp build`

    Optimize all assets, scripts, styles, etc to build the production code.
    
    
## License

The code is available under the [MIT license](LICENSE).