
const path = require('path');
const fs = require('fs');

// console.log(path);

// console.warn(__dirname, __filename);
// console.log(path.basename('./script.js'));
// console.log(path.extname('./script.js'));

// fs.promises.mkdir('./programitically', { recursive: true })
//     .then(() => {
//         console.log('folder created!');
//         fs.promises.writeFile(
//             path.join(__dirname, 'programitically', 'text.txt'),
//             "console.log('HEY THERE!')",
//             'utf-8'
//         )
//             .then(() => console.log('file are created with the help of path module path'))
//             .catch((err) => console.error(err));
//     })
//     .catch(err => {
//         console.log(err);
//     });


// Rename extension.

const basename = path.extname(path.join(__dirname, 'programitically', 'text.txt'));

fs.rename(path.join(__dirname, 'programitically', 'text.txt'), path.join(__dirname, 'programitically', 'text.js'), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('renamed');
    }
})



