function containsDoug(msg) {
    const arr = msg.match(/d|o|u|g/g) ?? [];

    if (arr.join('').includes('doug')) {
        return true;
    } else if ([...new Set(arr)].length === 4) {
        return Math.random() < 0.25;
    }

    return false;
}

exports.containsDoug = containsDoug;