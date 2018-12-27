const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const config = require('../webpack.config.js');
const options = Object.assign({}, config.devServer);
delete config.devServer;


const dir = path.join(__dirname, '../src/page')
const menuDir = path.join(__dirname, 'menu')

function genMenuFile() {
    const promise = new Promise((resolve, reject) => {
        fs.readdir(dir, function (err, files) {
            let menu = [];
            let dirs = (files && files.map((file) => { 
                return path.join(dir, file);
            })) || [];
            dirs.forEach((item, i) => {
                let stat = fs.statSync(item);
                if (stat.isDirectory()) { // 如果是目录
                    menu.push(item.substr(item.lastIndexOf("\\") + 1));
                }
            });
            if (!fs.existsSync(menuDir)) { 
                fs.mkdirSync(menuDir)
            }
            let menuFileTmp = [];
            menu.forEach((item, i) => {
                menuFileTmp.push(`import ${item} from '@page/${item}' \n`);
            });
            menuFileTmp.push(`export default {${menu.join(',')}}`)
            const menuFileStr = menuFileTmp.join('');
        
            fs.writeFileSync(path.join(menuDir, 'index.js'), menuFileStr);
            console.log('gen menu file', menu)
            resolve();
        });
    });
    return promise;
}


const startServer = () => {
    console.log('startServer')
    webpackDevServer.addDevServerEntrypoints(config, options);
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, options);


    server.listen(options.port, options.host, function() {
        console.log(`dev server address ---> ${options.host}:${options.port}`);
    });
}

function run() { 
    genMenuFile().then(() => { 
        // startServer();
    })
}

run()