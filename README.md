# justlazy.js [![Build Status](https://travis-ci.org/fhopeman/justlazy.svg?branch=master)](https://travis-ci.org/fhopeman/justlazy)
Lightweight javascript plugin to lazy load (responsive) images. Most of the existing javascript plugins using jQuery or supporting just the img-tag. This plugin is supposed to be an alternative.

[>> View demo](http://fhopeman.github.io/justlazy/)

- 100% performance with plain javascript (no jQuery)
- 100% valid HTML (no empty src tag)
- Simplicity and lightness (just lazy loading of images, no special cases)
- Heavily tested on various devices, browsers and OS versions

[![Sauce Test Status](https://saucelabs.com/browser-matrix/fhopeman.svg)](https://saucelabs.com/u/fhopeman)

## Usage
The basic way is to include the `justlazy.js` file (or the minified version `justlazy.min.js`) into your page.
```
   <script src="javascript/justlazy.js" type="text/javascript"></script>
```

### loading the img-tag
The images to lazy load are represented by a placeholder of your choice (e.g. div, span, ..).
The `data-src` attribute is mandatory, the `data-alt`, `data-title` and `data-errorhandler`
attributes are optional.
```
  <span id="lazy-span" data-src="path/to/image"
                       data-alt="optional alt text"
                       data-title="optional title"
                       data-errorhandler="optional error handler code">
  </span>
```

You can trigger the lazy loading with the following commands:
```
  Justlazy.lazyLoadImg(document.getElementById("lazy-span"));
```

The result will be:
```
  <img src="path/to/image" alt="optional alt text"
       title="optional title" onerror="optional error handler code"
  />
```

### loading the picture-tag
Coming soon ..

## Continuous Integration
justlazy has CI set up through [Travis CI](https://travis-ci.org) and [Sauce Labs](https://saucelabs.com) (free for open-source projects).
Pull-request and checkins will be tested automatically.

## Contributing
Just feel free to contribute ..

### Setup
To set up the project you just have to run the install command.
```
   npm install
```

### Testing
To run tests manually you can use the `grunt` command to perform jshint and jasmine tests with phantomjs.
Furthermore you can run `grunt server` to call the jasmine runner in your browser [localhost:9999](http://localhost:9999)
