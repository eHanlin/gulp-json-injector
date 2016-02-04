gulp-json-injector
====================================

The injector is able to modify json data.

And you can add some base json data to be extended.

You can implement a injector to modify json content, too.

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

**base.mapping:** Give a **regular expression** to validate file path.

The **base.path** or **base.contents** is only needed one.

