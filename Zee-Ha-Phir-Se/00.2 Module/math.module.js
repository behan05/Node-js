
function addTwoNum(a, b) {
    const result = a + b;

    return () => {
        return result;
    }
}

function sub(a, b) {
    const result = a - b;

    return () => {
        return result;
    }
}


module.exports = {
    addTwoNum,
    sub
}