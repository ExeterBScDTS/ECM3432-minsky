
# Build with pathPrefix. See gatsby-config.js
# N.B. if both assetPrefix and pathPrefix are defined they are applied as assetPrefix/pathPrefix
gatsby build --prefix-paths
#gatsby build

rm -rf ../minsky-one/src/main/webapp/static
cp -r public/ ../minsky-one/src/main/webapp/static
