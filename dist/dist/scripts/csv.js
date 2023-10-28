export function makeCSV(array) {
    const csvContent =
        'data:text/csv;charset=utf-8,' +
        array.map((row) => row.join(',')).join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'data.csv')
    document.body.appendChild(link)
    link.click()
}

export function processData(csvdata) {
    const arrayOfRows = csvdata.split('\n')
    const seperatedData = []

    let maxLength = 0

    for (let i = 0; i < arrayOfRows.length; i++) {
        const oneRow = arrayOfRows[i].split(',')
        seperatedData.push(oneRow)
        if (oneRow.length > maxLength) {
            maxLength = oneRow.length
        }
    }

    return { arrayOfRows, maxLength, seperatedData }
}
