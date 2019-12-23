/**
 * Author: Ryan Margono
 * Finds number of coins collected by pacman based on parameters from text file.
 * @function pacman
 * @param {String} inputFile    Filename of text file containing game configuration.
 * @return {Array}              Result of Pacman's game [ finalXPosition, finalYPosition, coinsCollected ]
 */

const fs = require('fs')
const {
    nextPosition,
    invalidCoord,
    invalidData,
    invalidMove,
    invalidPosition
} = require('./utils')

const pacman = (inputFile) => {
    try {
        // read data
        const data= fs.readFileSync(inputFile).toString().split('\n')
        if (!data[data.length-1]) data.pop() // deal with trailing new line
        if (invalidData(data)) throw `${inputFile} doesn't have the required data.`
        const [ boardDimensions, initialPos, movements, ...walls ] = data

        // initialize board
        if (invalidCoord(boardDimensions)) throw `${boardDimensions} is an invalid board dimension coord.`
        const [ x, y ] = boardDimensions.split(' ')
        const matrix = new Array(+y).fill(0).map(row => new Array(+x).fill(1))
        
        // set walls
        walls.forEach(coord => {
            if (invalidCoord(coord, matrix)) throw `${coord} is an invalid wall coord.`
            const [ wallX, wallY ] = coord.split(' ')
            matrix[wallY][wallX] = -1
        })

        // place pacman
        let [xPos, yPos ] = initialPos.split(' ')
        if(invalidPosition(matrix, +xPos, +yPos)) throw `${initialPos} is an invalid initial position coord.`
        
        // follow movements and collect coins
        let coinsCollected = 0
        movements.split('').forEach(move => {
            if (invalidMove(move)) throw `${move} is an invalid move char.`
            matrix[yPos][xPos] = 0
            const [ nextX, nextY ] = nextPosition(matrix, +xPos, +yPos, move)
            coinsCollected += matrix[nextY][nextX] === 1 ? 1 : 0
            xPos = nextX
            yPos = nextY
        })

        return [xPos, yPos, coinsCollected];

    } catch(e) {
        // console.log(e) do some processing with error in a real world application
        return [-1, -1, 0]
    }
}

module.exports.pacman = pacman;
