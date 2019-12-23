const nextPosition = (matrix, x, y, move) => {
    let nextX = x
    let nextY = y
    if (move === 'W') nextX = !invalidPosition(matrix, x-1, y) ? x-1 : x
    if (move === 'E') nextX = !invalidPosition(matrix, x+1, y) ? x+1 : x
    if (move === 'N') nextY = !invalidPosition(matrix, x, y+1) ? y+1 : y
    if (move === 'S') nextY = !invalidPosition(matrix, x, y-1) ? y-1 : y
    return [ nextX, nextY ]
}

const invalidData = data => !data || (data && data.length < 3)

const invalidMove = move => !new Set(['W', 'E', 'N', 'S']).has(move)

const invalidPosition = (matrix, x, y) => x >= matrix[0].length || x<0 || y<0 || y >= matrix.length || matrix[y][x] === -1

const invalidCoord = (coordString, matrix) => {
    if (!coordString) return true
    const coords = coordString.split(' ')
    if (coords.length !== 2) return true

    const [ x, y ] = coords
    if (parseInt(x) === NaN || parseInt(y) === NaN) return true
    if (matrix) return x >= matrix[0].length || x<0 || y<0 || y >= matrix.length 

    return false
}

module.exports = {
    nextPosition,
    invalidCoord,
    invalidData,
    invalidMove,
    invalidPosition
}