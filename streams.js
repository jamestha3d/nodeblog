const fs = require('fs');

const readstream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writestream = fs.createWriteStream('./docs/blog4.txt');
const writestream1 = fs.createWriteStream('/.docs/blog5.txt');

readstream.on('data', (chunk) => {
    console.log('----NEW CHUNK----');
    console.log(chunk);
    writestream.write('\nNew Chunk\n');
    writestream.write(chunk);
})

//using piping instead
readstream.pipe(writestream1);