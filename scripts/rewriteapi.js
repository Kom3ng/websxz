const fs = require('fs')

const apiFile = './src/utils/api/zykj/api.ts';
const baseFile = './src/utils/api/zykj/base.ts';

const data = fs.readFileSync(apiFile, 'utf8')
    .replaceAll('appName: string','appName: string = "WebClient"')
    .replaceAll('appVersion: number','appVersion: number = 0');

const baseData = fs.readFileSync(baseFile, 'utf8')
    .replaceAll('http://sxz.api.zykj.org','https://proxy.astrack.me/zykj');

fs.writeFileSync(apiFile, data, 'utf8');
fs.writeFileSync(baseFile, baseData, 'utf8');
