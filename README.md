# Angular, Gulp, Bootstrap (SASS)

This is a starting point for a project with Angular, Gulp and Bootstrap (SASS).

[![Build Status](https://travis-ci.org/IberaSoft/sk-angular-gulp-sass.svg?branch=master)](https://travis-ci.org/IberaSoft/sk-angular-gulp-sass)

It uses :

* AngularJs
* Angular UI Router
* Twitter Bootstrap (SASS)
* Gulp

## Installation

Clone the repository and remove the .git folder :

```
git clone --depth=1 https://github.com/IberaSoft/sk-angular-gulp-sass
cd sk-angular-gulp-sass
rm -rf .git
```

Install gulp globally : [Official documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

```
npm install -g gulp
```

Install dependencies using npm and bower. The `npm install` command will run `bower install` too :

```
npm install
```

## Structure

The app source files will be stored in the `src/` folder. 
When building and serving, all files will be processed and copied to the automatically created `dist/` or `build/` folders.
The difference between this two folders are that one will contain all the files ready for production (dist) and the other one will contain all  files for the staging.
Some parameters of the gulp script can be configured with the `config.json` file.