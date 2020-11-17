const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

readFile('./sample.txt', 'utf-8')
    .then(data => {
        console.log('readfile');
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
for (let i = 0; i < 10; i++) {
    console.log(i);
}

(async () => {
    try {
        const content = await readFile('./sample.txt', 'utf-8');
        console.log('async');
        console.log(content);
    } catch (err) {
        console.error(err);
    }
})();

{
    const getMaxCustom = (callback, ...args) => {
        let max = -Infinity;

        for (let i of args) {
            if (i > max) {
                max = i;
            }
        }

        callback(max);
    }

    getMaxCustom((max) => {
        console.log('Max is ' + max)
    }, 10, 2, 23, 1, 111, 20);
}
// Promise
 {
    const getMaxCustom = (callback, ...args) => {
        let max = -Infinity;
        for (let i of args) {
            if (i > max) {
                max = i;
            }
        }
        callback(max);
    }

    const getMaxPromise = (...args) => {
        return new Promise((resolve) => {
            getMaxCustom((max) => {
                resolve(max);
            }, ...args);
        });
    }

    getMaxPromise(10, 2, 23, 1, 111, 20)
        .then(max => console.log(max));
}