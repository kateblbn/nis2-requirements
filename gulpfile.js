import gulp from 'gulp';
import inject from 'gulp-inject';


gulp.task('default', () => {
    const target = gulp.src('powerapps-web-resource/inject-template/index.html');
    

    // Inject compiled JavaScript and CSS into HTML
    const sources = gulp.src(['dist/assets/*.js', 'dist/assets/*.css']);

    return target
      .pipe(inject(sources, {
        transform: function (filePath, file) {
          // Inject the full content of the CSS into <style> tags
          if (filePath.endsWith('.css')) {
            return `<style>\n${file.contents.toString('utf8')}\n</style>`;
          }

          // Inject the full content of the JS into <script> tags
          if (filePath.endsWith('.js')) {
            return `<script>\n${file.contents.toString('utf8')}\n</script>`;
          }

          // Return default behavior (if any other file types, although this is not expected here)
          return inject.transform.apply(inject.transform, arguments);
        }
      }))
      .pipe(gulp.dest('powerapps-web-resource/dist'));  // Save the resulting HTML to the dist directory
  });