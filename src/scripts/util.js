
export function colorToHexDecimal(color) {
    if (color.startsWith("#")) {
        color = color.slice(1);
        return parseInt(color, 16)
    }
    return null;
}

export function colorToDecimal(color) {
    if (color.startsWith("#")) {
        color = color.slice(1);
        return parseInt(color, 10)
    }
    return null;
}


export function colorTo01(color) {
    const decimal = colorToDecimal(color)
    return 1 - (decimal / 16777215);
}


export function compressDecimal(decimal){
    return 1 / (1 + Math.exp(-decimal));
}


export function integerToColor(intVal) {
    const decimal = compressDecimal(intVal)
    return decimal01ToColor(decimal)
}


export function decimal01ToColor(decimal){
    return '#' + String(Math.round(decimal * 16777215))
}


export function decimalToHexColor(decimal) {
    if (decimal < 0 || decimal > 1) {
        throw new Error('Input must be a decimal between 0 and 1');
    }
    const brightness = Math.round((1 - decimal) * 255);

    const hexComponent = brightness.toString(16).padStart(2, '0');

    return `#${hexComponent}${hexComponent}${hexComponent}`;
}


export function colorTo01Matrix(matrix){
    const height = matrix.length
    const width = matrix[0].length
    const array = new Array(height)
        for (let i = 0; i < height; i++) {
            array[i] = new Array(width)

            for (let j = 0; j < width; j++) {
                array[i][j] = colorTo01(array[i][j])
            }
        }
        return array;
}

export function matrix01ToColor(matrix){
    const height = matrix.length
    const width = matrix[0].length
    const array = new Array(height)
        for (let i = 0; i < height; i++) {
            array[i] = new Array(width)

            for (let j = 0; j < width; j++) {
                array[i][j] = decimal01ToColor(array[i][j])
            }
        }
        return array;
}