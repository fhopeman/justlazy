# justlazy.js [![Build Status](https://travis-ci.org/fhopeman/justlazy.svg?branch=master)](https://travis-ci.org/fhopeman/justlazy)
Lightweight javascript plugin to lazy load responsive images. Most of the existing javascript plugins using extensive dependencies or
supporting just the img-tag without responsive parts. This plugin is supposed to be an alternative.

[>> View demo](http://fhopeman.github.io/justlazy/)

- 100% performance with plain javascript (no jQuery)
- 100% valid HTML (no empty src tag)
- Simplicity and lightness (just lazy loading of images, no special cases)
- Heavily tested on various devices, browsers and OS versions

## Installation
#### file include
Firstly, you can include the `justlazy.js` file as follows in your page.
```
<script src="javascript/justlazy.js" type="text/javascript"></script>
```

If you want to use the lazy spinner, following css file is needed:
```
<link href="stylesheets/justlazy.css" type="text/css" rel="stylesheet">
```

#### npm
To install it via npm, the git URL has to be added to the `package.json` file:
```
"dependencies": {
    [some other dependencies],
    "justlazy": "git://github.com/fhopeman/justlazy.git#x.y.z"
}
```
`x.y.z` has to be replaced with the current [tag number](https://github.com/fhopeman/justlazy/releases).

## Usage
To lazy load an image, first of all a placeholder of your choice (e.g. span, div, ..)
has to be defined. This placeholder itself is a html element which contains
different data-attributes to provide the image information.

After calling the manual loading function or the auto loading is triggered, the library
loads the image with javascript in the background and then replaces the whole
placeholder with the image. You don't have to care about deleting the styling
or other relics.

#### Function

###### Manual loading
The replacement function is defined as follows:
```
Justlazy.lazyLoad(placeholder[, options]);
```

###### Auto loading
The function to register images for auto loading is defined as follows:
```
Justlazy.registerLazyLoad(placeholder[, options]);
```

###### Options

- The mandatory `placeholder` is a html object which represents the
image placeholder.
- Possible `options` are:

| Option | Description |
|--------|-------------|
|`successCallback`| will be invoked if the placeholder is properly replaced|
|`errorCallback`  | will be invoked if the placeholder could not be replaced. This occurs if mandatory attributes (e.g. `data-src`) aren't available.|
|`threshold`      | (only auto loading) The image is loaded the defined pixels before it appears on the screen. E.g. 200px before it become visible.

#### Placeholder attributes
Following attributes can be used as data-attributes of the image
placeholder:

| Attribute   | Mandatory   | Description                         |
|-------------|-------------|-------------------------------------|
|`data-src`   |yes          |image source                         |
|`data-alt`   |yes          |alt text of image, `data-alt=""` allowed (not recommended!)|
|`data-title` |no           |title of image                       |
|`data-error` |no           |error handler of image               |
|`data-srcset`|no           |responsive image source-set attribute|

#### Styling
The default loading spinner has the css class `justlazy-placeholder`.

## Examples
#### 1. Manual loading
```
<span id="lazySpan" data-src="some/image/path" data-alt="some alt text"
      class="justlazy-placeholder">
</span>
```

Trigger the image lazy loading:
```
Justlazy.lazyLoad(document.getElementById("lazySpan"));
```

The result of the function call will be:
```
<img src="some/image/path" alt="some alt text"/>
```

#### 2. Manual loading with srcset-attribute
Similar to the img example above, you can easily lazy load responsive img-tags which containing a `srcset` attribute.
You just have to add the `data-srcset` attribute to the placeholder:
```
<span id="lazySpanWithSrcset"
              data-src="path/to/default/image" data-alt="some alt text"
              data-srcset="path/to/small/image 600w, path/to/big/image 1000w">
</span>
```
After performing the `Justlazy.lazyLoad` function, the result will be:
```
<img src="path/to/default/image" alt="some alt text"
     srcset="path/to/small/image 600w, path/to/big/image 1000w"
/>
```

#### 3. Auto loading with threshold
Instead of calling the manual loading function, you have to use the registration
function:
```
Justlazy.registerLazyLoad(document.getElementById("lazySpan"), {
    threshold: 100
});
```

## Contributing
Just feel free to contribute ..

#### Project setup
To set up the project you need the grunt-cli:
```
sudo npm install -g grunt-cli
```

Then you just have to clone the repository and run the install command:
```
npm install
```

#### Testing
To run tests manually you can use the `grunt` command to perform jshint and jasmine tests with phantomjs.
Furthermore you can run `grunt server` to call the jasmine runner in your browser [localhost:9999](http://localhost:9999)

#### Continuous Integration
`justlazy` has CI set up through [Travis CI](https://travis-ci.org) and [Sauce Labs](https://saucelabs.com) (free for open-source projects).
Pull-request and checkins will be tested automatically.
