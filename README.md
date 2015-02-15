# justlazy.js [![Build Status](https://travis-ci.org/fhopeman/justlazy.svg?branch=master)](https://travis-ci.org/fhopeman/justlazy)
Lightweight javascript plugin to lazy load (responsive) images. Most of the existing javascript plugins using jQuery or supporting just the img-tag. This plugin is supposed to be an alternative for (responsive) image lazy loading.

- 100% performance with plain javascript (no jQuery)
- 100% valid HTML (no empty src tag)
- Simplicity and lightness (just lazy loading of images, no special cases)
- Heavily tested on various devices  

[![Sauce Test Status](https://saucelabs.com/browser-matrix/fhopeman.svg)](https://saucelabs.com/u/fhopeman)

## Usage
The basic way is to include the justlazy.js file (maybe minified) into your page.

### img-tag
The images to lazy load are represented by a placeholder of your choice (e.g. div, span, ..). The `data-src` attribute is mandatory, the `data-alt` attribute optional. 
```
  <span id="lazy-span" data-src="path/to/image" data-alt="altText"></span>
```

You can trigger the lazy loading with the following commands:
```
  var justlazy = Justlazy();
  justlazy.lazyLoadImg(document.getElementById("lazy-span"));
```

The result will be:
```
  <img src="path/to/image" alt="altText"/>
```

### picture-tag
Coming soon ..

## Testing
justlazy has CI set up through Travis CI and Sauce Labs (free for open-source projects).
Pull-request and checkins will be tested automatically.

To run tests manually you can use the `grunt server` command and
call the jasmine runner in your browser [localhost:9999](http://localhost:9999)

## Contributing
Just clone the repo and feel free to contribute.
