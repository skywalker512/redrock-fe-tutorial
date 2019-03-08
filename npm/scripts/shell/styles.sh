for file in src/styles/*.scss
do
  filename=$(basename $file)
  distpath=$(echo $filename | sed 's/\.scss$/\.css/')
  node-sass $file | cssmin > dist/styles/$distpath
done
