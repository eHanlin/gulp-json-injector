gulp-json-injector
====================================

The injector is able to modify json data.

And you can add some base json data to be extended.

You can implement a injector to modify json content, too.

## Install

```bash
npm install gulp-json-injector
```

## Usage

```js
var gulp = require('gulp');
var jsonInjector = require('gulp-json-injector');

gulp.task('default', function(){
  gulp.src('config/**/*.json')
    .pipe(jsonInjector({
      bases:[{
        path:'base.json',
        mapping:/.*/
      },
      {
        contents:{
          tasks:['run']
        }
      }],
      inject:function(json, next, file){
        json.version = '0.0.2';
        next(json);
      }
    }))
    .pipe(gulp.dest('./dist/'))

});
```

## Options

#### inject: function
> Implement a **injector** to modified json data.

#### bases: Object[]
> Add some target json data to be extended.

**base.path:** A json file path will be read.

**base.contents:** A json data base will be extended.

**base.mapping:** Give a **regular expression** to validate file path. The default is all files.

The **base.path** or **base.contents** is only needed one.

#### ignoreOtherFormat: boolean
> Ignore other formats for processing.

## LICENSE

The MIT License (MIT)

Copyright (c) 2016 eHanlin Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
