// data to hash 16581375
export function hashfunctionString(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i)
        hash = (hash << 5) - hash + charCode
        hash = hash & hash // Convert to 32bit integer
    }
    return (Math.abs(hash) % 16581374) + 1
}

export function hashfunctionInteger(i) {
    return (Math.abs(i) % 16581374) + 1
}

export function hashfunctionFloat(f) {
    const decimals = f.toString().split('.')[1].length
    const i = f * Math.pow(10, decimals)
    return (Math.abs(i) % 16581374) + 1
}

// color to hash 16581375
export function colorToHash(color) {
    return parseInt(color.substring(1), 16)
}

export function hashToColor(hash) {
    // Convert the integer to a 24-bit RGB color value
    const r = (hash & 0xff0000) >> 16 // Red component
    const g = (hash & 0x00ff00) >> 8 // Green component
    const b = hash & 0x0000ff // Blue component

    // Convert the RGB color value to hexadecimal format
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')

    return '#' + hex // Return the color in hexadecimal format
}

export function dataToHash(data) {
    const iData = parseInt(data)
    const siData = iData.toString()

    const fData = parseFloat(data)
    const sfData = fData.toString()

    if (data === siData) {
        return hashfunctionInteger(iData)
    } else if (data === sfData) {
        return hashfunctionFloat(fData)
    } else {
        return hashfunctionString(data)
    }
}
// hash 16581375 to data

export function convertColorIntoDataArray(array, countWidth, countHeight) {
    const newArray = new Array(countWidth)

    for (let i = 0; i < countWidth; i++) {
        newArray[i] = new Array(countHeight)

        for (let j = 0; j < countHeight; j++) {
            if (array[i][j]) {
                newArray[i][j] = colorToHash(array[i][j])
            } else {
                newArray[i][j] = 'empty'
            }
        }
    }
    return newArray
}

export function convertDataIntoColor(data) {
    const hash = dataToHash(data)
    return hashToColor(hash)
}
