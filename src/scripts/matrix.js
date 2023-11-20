
import { colorTo01Matrix, matrix01ToColor } from "./util"


export function identity(matrix, width, height) {
    if(width == height){
        const array = new Array(height)
        for (let i = 0; i < height; i++) {
            array[i] = new Array(width)

            for (let j = 0; j < width; j++) {
                if (i == j) {
                    array[i][j] = '#000000'
                    
                } else {
                    array[i][j] = '#ffffff'
                }
            }
        }
        return array;
    } else {
        alert('matrix must be a square matrix')
        return matrix;
    }

}

export function diagonal(orgArray, width, height){
    if(width == height){
        const array = new Array(height)
        for (let i = 0; i < height; i++) {
            array[i] = new Array(width)

            for (let j = 0; j < width; j++) {
                if (i == j) {
                    if(orgArray[i][j] === '#ffffff'){
                        array[i][j] = '#000000'
                    } else {
                        array[i][j] = orgArray[i][j]
                    }
                    
                } else {
                    array[i][j] = '#ffffff'
                }
            }
        }
        return array
    } else {
        return null;
    }
}


function get(){
    return null
}

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



function sMulti(array, scalar) {
    return array.map((row) => row.map((entry) => entry * scalar))
}

function determinant(matrix) {
    if (matrix.length === 1) {
        return matrix[0][0];
    }
    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
        let subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        det += matrix[0][i] * Math.pow(-1, i) * determinant(subMatrix);
    }
    return det;
}


export function inverse(matrix) {
    if (matrix.length !== matrix[0].length) {
        alert('Matrix must be square');
        return matrix
    }

    let numberMatrix = matrix01ToColor(matrix)
    let det = determinant(numberMatrix);
    if (det === 0) {
        alert('Matrix has no inverse (determinant is zero)');
        return matrix
    }

    let inverse = [];
    
    for (let i = 0; i < matrix.length; i++) {
        inverse.push([]);
        for (let j = 0; j < matrix.length; j++) {
            // Calculate cofactor
            let subMatrix = numberMatrix.filter((_, k) => k !== i).map(row => row.filter((_, l) => l !== j));
            inverse[i][j] = Math.pow(-1, i + j) * determinant(subMatrix) / det;
        }
    }
    return matrix01ToColor(inverse);
}


export function transpose(array, width, height) {
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

    return array
}
