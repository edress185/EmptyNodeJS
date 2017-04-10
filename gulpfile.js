/**
 * Created by Gebruiker on 09/04/2017.
 */
/**
 * Created by Gebruiker on 07/04/2017.
 */
var gulp =require('gulp');
var jshint =require('gulp-jshint');
gulp.task('default',function(){
    gulp.src(['js/main.js']).pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))

})
