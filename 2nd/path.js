console.clear();
console.log('--------------------------[node start]--------------------------');
const path = require('path');
console.log(path.basename(__filename));
console.log(path.basename(__filename, '.js'));

console.log(path.delimiter);

console.log(path.dirname(__filename));
console.log(path.extname(__filename));

console.log(path.isAbsolute(__filename));

console.log(path.sep);
