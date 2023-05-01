echo "Remove old build"
rm -rf out/

echo "Building app..."
yarn run build

echo "Export app..."
yarn run export

echo "Deploying files to server..."
scp -r out/* root@164.92.215.171:/var/www/html/testapp.giftyshop.pro/

echo "done"
