# justlazy.js [![Build Status](https://travis-ci.org/fhopeman/justlazy.svg?branch=master)](https://travis-ci.org/fhopeman/justlazy)
Lightweight javascript plugin to lazy load responsive images. Most of the existing javascript plugins using extensive dependencies or
supporting just the img-tag without responsive parts. This plugin is supposed to be an alternative.

[>> View demo](http://fhopeman.github.io/justlazy/)

- 100% performance with plain javascript (no jQuery)
- 100% valid HTML (no empty src tag)
- Simplicity and lightness (just lazy loading of images, no special cases)
- Heavily tested on various devices, browsers and OS versions

[![Sauce Test Status](https://saucelabs.com/browser-matrix/fhopeman.svg)](https://saucelabs.com/u/fhopeman)

## Installation
#### script include
Firstly, you can include the `justlazy.js` file (or the minified version `justlazy.min.js`) as follows into your page.
```
   <script src="javascript/justlazy.js" type="text/javascript"></script>
```

#### npm
To install it via npm, the following URL has to be added to the `package.json` file:
```
   "dependencies": {
       [some other dependencies],
       "justlazy": "git://github.com/fhopeman/justlazy.git#x.y.z"
     }
```
`x.y.z` has to be replaced with the current [tag number](https://github.com/fhopeman/justlazy/releases).

## Usage
#### lazy load images with img-tag
The images to lazy load are represented by a placeholder of your choice (e.g. div, span, ..).
The `data-src` and `data-alt` attributes are mandatory, the `data-title` and `data-error-handler`
attributes are optional. If you don't want to provide a `data-alt` attribute, you can also define
`data-alt=""` (not recommended!).
```
  <span id="lazySpan"
                data-src="path/to/image"
                data-alt="optional alt text"
                data-title="optional title"
                data-error-handler="optional img error handler code">
  </span>
```

You can trigger the image lazy loading with the following commands:
```
  Justlazy.lazyLoadImg(document.getElementById("lazySpan"), function() {
      // optional onload callback, parameter can be undefined
  }, function() {
      // optional lazy load error callback, parameter can be undefined
  });
```
The lazy load error handler will be invoked if the placeholder could not be
replaced. This occurs if mandatory attributes (e.g. `data-src`) aren't available.

The result of the function call will be the following img element:
```
  <img src="path/to/image" alt="optional alt text"
       title="optional title" onerror="optional error handler code"
  />
```

#### lazy load responsive images with srcset-attribute
Similar to the img example above, you can easily lazy load responsive img-tags which contain a `srcset` attribute. You just have
to add the `data-srcset` attribute to the placeholder:
```
  <span id="lazySpanWithSrcset"
                data-src="path/to/default/image" data-alt="some alt text"
                data-srcset="path/to/small/image 600w, path/to/big/image 1000w">
  </span>
```
After performing the `Justlazy.lazyLoadImg` function, the result will be:
```
  <img src="path/to/default/image" alt="some alt text"
       srcset="path/to/small/image 600w, path/to/big/image 1000w"
  />
```

#### lazy load responsive images with picture-tag
Coming soon ..

## Contributing
Just feel free to contribute..

#### Setup
To set up the project you just have to clone the repository and run the install command:
```
   npm install
```

#### Testing
To run tests manually you can use the `grunt` command to perform jshint and jasmine tests with phantomjs.
Furthermore you can run `grunt server` to call the jasmine runner in your browser [localhost:9999](http://localhost:9999)

#### Continuous Integration
justlazy has CI set up through [Travis CI](https://travis-ci.org) and [Sauce Labs](https://saucelabs.com) (free for open-source projects).
Pull-request and checkins will be tested automatically.
