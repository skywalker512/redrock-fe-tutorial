for file in src/scripts/*.js
do
  uglifyjs $file --compress --mangle > dist/scripts/$(basename $file)
done
