# justlazy.js [![Build Status](https://travis-ci.org/fhopeman/justlazy.svg?branch=master)](https://travis-ci.org/fhopeman/justlazy) [![Sauce Test Status](https://saucelabs.com/buildstatus/fhopeman)](https://saucelabs.com/u/fhopeman)

Lightweight javascript plugin to lazy load responsive images. Most of the existing javascript plugins using extensive dependencies or
supporting just the img-tag without responsive parts. This plugin is supposed to be an alternative.

[>> View demo and usage](http://fhopeman.github.io/justlazy/)

[>> View history and migration path](https://github.com/fhopeman/justlazy/releases)

- 100% performance with plain javascript (no jQuery)
- 100% valid HTML (no empty src tag)
- Simplicity and lightness (just lazy loading of images, no special cases)
- Heavily tested on various devices, browsers and OS versions

<a href="https://saucelabs.com/u/fhopeman">
  <img src="https://saucelabs.com/browser-matrix/fhopeman.svg" alt="Sauce Test Status"/>
</a> 

## Installation

### file include
You can download the latest [release](https://github.com/fhopeman/justlazy/releases) and include
the `justlazy.js` file as follows in your page:
```
<script src="javascript/justlazy.js" type="text/javascript"></script>
```

If you want to use the lazy spinner, following css file is needed:
```
<link href="stylesheets/justlazy.css" type="text/css" rel="stylesheet">
```

### NPM
```
$ npm install justlazy
```

#### Usage

Import the CSS file:

```
@import "justlazy/src/justlazy.css";
```

Import/require the JavaScript file:

```
var justLazy = require('justlazy/src/justlazy.js');
```

Or

```
import justLazy from 'justlazy/src/justlazy.js';
```

## Contributing
Just feel free to contribute ..

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
