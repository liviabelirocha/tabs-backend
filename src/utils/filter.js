module.exports = function filter(arr) {
    let obj = [];
    for (let i in arr) {
        for (let j in arr[i]) {
            obj.push(arr[i][j]);
        }
    }

    const unique = new Set(obj.map((e) => JSON.stringify(e)));

    const out = Array.from(unique).map((e) => JSON.parse(e));

    return out;
};
