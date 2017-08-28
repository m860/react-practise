# $1 - target path

if [ -z "$1" ];then
    echo "请提供初始化工程的路径"
else
    if [ ! -d "$1" ];then
        mkdir "$1"
    fi
    cp ./.babelrc "$1"
    cp ./.eslintrc "$1"
    cp ./.gitignore "$1"
    cp ./package.json "$1"
    cp ./webpack.config.js "$1"
    cp -r ./src "$1"
fi