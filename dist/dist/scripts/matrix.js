function getMinor(array, i, j) {
    const minor = []
    const n = array.length

    for (let k = 0; k < n; k++) {
        if (k !== i) {
            minor.push([])

            for (let l = 0; l < n; l++) {
                if (l !== j) {
                    minor[minor.length - 1].push(array[k][l])
                }
            }
        }
    }

    return minor
}

function adj(array) {
    // Check if the matrix is square
    if (array.length !== array[0].length) {
        return null
    }

    const n = array.length
    const adjugate = []

    for (let i = 0; i < n; i++) {
        adjugate[i] = []

        for (let j = 0; j < n; j++) {
            const cofactor = (-1) ** (i + j) * det(getMinor(array, i, j))
            adjugate[i][j] = cofactor
        }
    }

    // Transpose the adjugate matrix to get the inverse
    return transp(adjugate)
}

function det(array) {
    // Check if the matrix is square
    if (array.length !== array[0].length) {
        return 0
    }

    const n = array.length

    // Base case for 2x2 matrix
    if (n === 2) {
        return array[0][0] * array[1][1] - array[0][1] * array[1][0]
    }

    let determinant = 0

    // Compute determinant using cofactor expansion along first row
    for (let j = 0; j < n; j++) {
        const cofactor = (-1) ** j * array[0][j]
        const minor = getMinor(array, 0, j)
        determinant += cofactor * det(minor)
    }

    return determinant
}

function sMulti(array, scalar) {
    return array.map((row) => row.map((entry) => entry * scalar))
}

function transp(array) {
    const n = array.length
    const transpose = []

    for (let i = 0; i < n; i++) {
        transpose[i] = []

        for (let j = 0; j < n; j++) {
            transpose[i][j] = array[j][i]
        }
    }

    return transpose
}

export function inverse(array, width, height, reinitializeGrid) {
    const determinant = det(array)

    // Check if the determinant is zero (matrix is not invertible)
    if (determinant === 0) {
        return null
    }

    const adjugate = adj(array)
    const inverse = sMulti(adjugate, 1 / determinant)

    return inverse
}

export function transpose(array, width, height, reinitializeGrid) {
    const prevArray = array
    array = new Array(height)
    for (let i = 0; i < height; i++) {
        array[i] = new Array(width)

        for (let j = 0; j < width; j++) {
            if (prevArray[j][i]) {
                array[i][j] = prevArray[j][i]
            } else {
                array[i][j] = null
            }
        }
    }

    reinitializeGrid(array, height, width)
}
