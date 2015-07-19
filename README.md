# justlazy.js [![Build Status](https://travis-ci.org/fhopeman/justlazy.svg?branch=master)](https://travis-ci.org/fhopeman/justlazy)
Lightweight javascript plugin to lazy load responsive images. Most of the existing javascript plugins using extensive dependencies or
supporting just the img-tag without responsive parts. This plugin is supposed to be an alternative.

[>> View demo and usage](http://fhopeman.github.io/justlazy/)

- 100% performance with plain javascript (no jQuery)
- 100% valid HTML (no empty src tag)
- Simplicity and lightness (just lazy loading of images, no special cases)
- Heavily tested on various devices, browsers and OS versions

[![Sauce Test Status](https://saucelabs.com/browser-matrix/fhopeman.svg)](https://saucelabs.com/u/fhopeman)

## Installation

#### file include
You can include the `justlazy.js` file as follows in your page.
```
<script src="javascript/justlazy.js" type="text/javascript"></script>
```

If you want to use the lazy spinner, following css file is needed:
```
<link href="stylesheets/justlazy.css" type="text/css" rel="stylesheet">
```

#### npm
```
$ npm install justlazy
```
Then include a script and link tag to your page as follows:
```
<script src="node_modules/justlazy/src/justlazy.js" type="text/javascript"></script>
<link href="node_modules/justlazy/src/justlazy.css" type="text/css" rel="stylesheet">
```
As an alternative you can use [browserify](https://github.com/substack/node-browserify).

## Contributing
Just feel free to contribute..

#### Project setup
To set up the project you need the grunt-cli:
```
$ sudo npm install -g grunt-cli
```

Then you just have to clone the repository and run the install command:
```
$ npm install
```

#### Testing
To run tests manually you can use the `$ grunt` command to perform jshint and jasmine tests with phantomjs.
Furthermore you can run `$ grunt server` to call the jasmine runner in your browser [localhost:9999](http://localhost:9999)

#### Continuous Integration
`justlazy` has CI set up through [Travis CI](https://travis-ci.org) and [Sauce Labs](https://saucelabs.com) (free for open-source projects).
Pull-request and checkins will be tested automatically.
