//set up the canvas and context

import { convertColorIntoDataArray, convertDataIntoColor } from './color'
import { makeCSV, processData } from './csv'
import { transpose, inverse, diagonal, identity } from './matrix'


export function createApp() {

    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const sideMenu = document.getElementById('sideMenu');
    const contentToggles = document.querySelectorAll('.content-toggle');
    
    const colorBttn1 = document.getElementById('color1')
    const colorBttn2 = document.getElementById('color2')
    const colorBttn3 = document.getElementById('color3')

    const makeDiagonalMatrixBttn = document.getElementById('diagonal')
    const makeIdentityMatrixBttn = document.getElementById('identity')

    const invertBttn = document.getElementById('invert')
    const transposeBttn = document.getElementById('transpose')
    const reflectBttn = document.getElementById('reflect')

    const matrixCountBttn = document.getElementById('matrixcountbttn')

    const currentColorMonitor = document.getElementById('currentColorMonitor')

    const inputFieldWidth = document.getElementById('inputWidth')
    const inputFieldHeight = document.getElementById('inputHeight')

    const sizeInputBttn = document.getElementById('sizeInputBttn')

    const fileInput = document.getElementById('file-upload')
    const fileOutput = document.getElementById('file-output')

    const dataInputBttn = document.getElementById('dataInputBttn')
    const dataOutputBttn = document.getElementById('dataOutputBttn')

    const inputFileName = document.getElementById('inputFileName')

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const widthCanvas = document.getElementById('widthNotation')
    const wctx = widthCanvas.getContext('2d')
    const heightCanvas = document.getElementById('heightNotation')
    const hctx = heightCanvas.getContext('2d')
    const coords = document.getElementById('coords')

    const unit = 20

    let matrixCount = 1

    let canvasWidth = 600
    let canvasHeight = 600

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    widthCanvas.width = canvasWidth
    widthCanvas.height = 20
    heightCanvas.width = 20
    heightCanvas.height = canvasHeight

    let countWidth = 30
    let countHeight = 30
    let inputWidth = 30
    let inputHeight = 30

    let fillArray = []
    let prevFillArray = []

    let fillArrayTwo = []
    let prevFillArrayTwo = []

    let currentX = -1
    let currentY = -1

    let currentMatrix = 1

    let currentColor = '#000000'
    let colorGrid = '#0e5f54'
    let gridLine = 1

    let outputDataForm = ''
    let csvFile = null

    currentColorMonitor.style.backgroundColor = currentColor

    let mouseIsDown = false


    menuToggle.addEventListener('click', () => {
        sideMenu.style.width = '250px';
        menuToggle.style.display = 'none';
        menuClose.style.display = 'block';
    });

    menuClose.addEventListener('click', () => {
        sideMenu.style.width = '0px';
        menuToggle.style.display = 'block';
        menuClose.style.display = 'none';
    });


    matrixCountBttn.addEventListener('click', (event) => {
        if(matrixCount === 1){
            matrixCount = 2;
            addMatrix()
            event.target.textContent = "Remove Matrix"
            let nextSibling = event.target.nextElementSibling;
            while (nextSibling) {
                nextSibling.style.color = "#dff5da"; 
                nextSibling.style.backgroundColor = '#0e5f54'; 
                nextSibling.style.pointerEvents = 'default'; 
                nextSibling.style.cursor = 'pointer';
                nextSibling = nextSibling.nextElementSibling;
            }
        } else {
            matrixCount = 1
            removeMatrix()
            event.target.textContent = "Add Matrix"
            let nextSibling = event.target.nextElementSibling;
            while (nextSibling) {
                nextSibling.style.color = "#aaa"; 
                nextSibling.style.backgroundColor = '#ddd'; 
                nextSibling.style.pointerEvents = 'none'; 
                nextSibling.style.cursor = 'not-allowed';
                nextSibling = nextSibling.nextElementSibling;
            }
        }
    })


    function addMatrix(){
        alert("yet to be  implemented")
        return null
    }

    function removeMatrix(){
        alert("yet to be implemented")
        return null
    }

    contentToggles.forEach(button => {
        button.addEventListener('click', () => {
            // Get the parent container of the button, which is .menu-header
            const menuHeader = button.parentElement;
            
            // Get the next sibling of the .menu-header, which is the content we want to toggle
            const content = menuHeader.nextElementSibling;
            
            const isExpanded = button.getAttribute('data-expanded') === 'true';
            
            if (isExpanded) {
                content.style.display = 'none';
                button.textContent = '+';
                button.setAttribute('data-expanded', 'false');
            } else {
                content.style.display = 'block';
                button.textContent = '-';
                button.setAttribute('data-expanded', 'true');
            }
        });
    });

    
    
    function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect()
        const x = evt.clientX - rect.left
        const y = evt.clientY - rect.top
        const coordX = Math.floor(x / unit)
        const coordY = Math.floor(y / unit)

        coords.style.display = 'block'
        coords.style.top = evt.clientY + 'px'
        coords.style.left = evt.clientX + 'px'
        coords.textContent = `x: ${coordX}, y: ${coordY}`
        return {
            x,
            y,
        }
    }

    function initializeSideGrids() {
        for (let i = 0; i < countWidth; i++) {
            wctx.lineWidth = gridLine.toString()

            wctx.strokeStyle = colorGrid
            wctx.strokeRect(i * unit, 0, unit, unit)

            wctx.font = '15px Courier'
            wctx.fillText(i.toString(), i * unit, 0.75 * unit)
        }
        for (let i = 0; i < countHeight; i++) {
            hctx.lineWidth = gridLine.toString()

            hctx.strokeStyle = colorGrid
            hctx.strokeRect(0, i * unit, unit, unit)

            hctx.font = '15px Courier'
            hctx.fillText(i.toString(), 0, i * unit + 0.75 * unit)
        }
    }

    function initializeGrid() {
        fillArray = new Array(countWidth)
        for (let i = 0; i < countWidth; i++) {
            fillArray[i] = new Array(countHeight)

            for (let j = 0; j < countHeight; j++) {
                fillArray[i][j] = '#ffffff'
            }
        }
    }

    function reInitializeGrid(array, newWidth, newHeight) {
        fillArray = array
        countWidth = newWidth
        countHeight = newHeight

        canvasWidth = unit * countWidth
        canvasHeight = unit * countHeight

        canvas.width = canvasWidth
        canvas.height = canvasHeight
        widthCanvas.width = canvasWidth
        widthCanvas.height = 20
        heightCanvas.width = 20
        heightCanvas.height = canvasHeight

        inputFieldWidth.value = newWidth
        inputFieldHeight.value = newHeight

        initializeSideGrids()
        drawGrid()
    }

    function drawGrid() {
        for (let i = 0; i < countWidth; i++) {
            for (let j = 0; j < countHeight; j++) {
                ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

                ctx.lineWidth = gridLine.toString()

                ctx.strokeStyle = colorGrid
                ctx.strokeRect(i * unit, j * unit, unit, unit)

                if (fillArray[i][j] !== '#ffffff') {
                    ctx.fillStyle = fillArray[i][j]
                    ctx.fillRect(i * unit, j * unit, unit, unit)
                }
            }
        }
    }

    document.addEventListener(
        'mouseup',
        () => {
            mouseIsDown = false
        },
        false
    )

    inputFieldWidth.addEventListener('change', (event) => {
        const newWidth = event.target.value
        inputWidth = parseInt(newWidth)
    })

    inputFieldHeight.addEventListener('change', (event) => {
        const newHeight = event.target.value
        inputHeight = parseInt(newHeight)
    })

    sizeInputBttn.addEventListener(
        'click',
        () => {
            if (inputHeight === countHeight && inputWidth === countWidth) {
                return null
            }

            prevFillArray = fillArray
            fillArray = new Array(inputWidth)
            for (let i = 0; i < inputWidth; i++) {
                fillArray[i] = new Array(inputHeight)

                for (let j = 0; j < inputHeight; j++) {
                    if (
                        j >= countHeight ||
                        i >= countWidth ||
                        prevFillArray[i][j] === '#ffffff'
                    ) {
                        fillArray[i][j] = '#ffffff'
                    } else {
                        fillArray[i][j] = prevFillArray[i][j]
                    }
                }
            }

            reInitializeGrid(fillArray, inputWidth, inputHeight)
        },
        false
    )

    canvas.addEventListener(
        'dblclick',
        function (evt) {
            const mousePos = getMousePos(evt)

            currentX = Math.floor(mousePos.x / unit)
            currentY = Math.floor(mousePos.y / unit)

            if (fillArray[currentX][currentY] !== '#ffffff') {
                fillArray[currentX][currentY] = '#ffffff'
                ctx.clearRect(currentX * unit, currentY * unit, unit, unit)

                ctx.lineWidth = gridLine.toString()
                ctx.strokeStyle = colorGrid
                ctx.strokeRect(currentX * unit, currentY * unit, unit, unit)
            } else {
                ctx.fillStyle = currentColor
                ctx.fillRect(currentX * unit, currentY * unit, unit, unit)

                ctx.lineWidth = gridLine.toString()
                ctx.strokeStyle = colorGrid
                ctx.strokeRect(currentX * unit, currentY * unit, unit, unit)

                fillArray[currentX][currentY] = currentColor
            }
        },
        false
    )

    canvas.addEventListener(
        'mousedown',
        function (evt) {
            mouseIsDown = true

            const mousePos = getMousePos(evt)
            currentX = Math.floor(mousePos.x / unit)
            currentY = Math.floor(mousePos.y / unit)

            ctx.fillStyle = currentColor
            ctx.fillRect(currentX * unit, currentY * unit, unit, unit)

            fillArray[currentX][currentY] = currentColor
        },
        false
    )

    canvas.addEventListener(
        'mousemove',
        function (evt) {
            const mousePos = getMousePos(evt)

            const nextX = Math.floor(mousePos.x / unit)
            const nextY = Math.floor(mousePos.y / unit)

            if (mouseIsDown && (nextX !== currentX || nextY !== currentY)) {
                currentX = nextX
                currentY = nextY

                ctx.fillStyle = currentColor
                ctx.fillRect(currentX * unit, currentY * unit, unit, unit)

                fillArray[currentX][currentY] = currentColor
            }
        },
        false
    )

    function doneResizing() {
        drawGrid()
    }

    let resizeId

    window.addEventListener('resize', () => {
        clearTimeout(resizeId)
        resizeId = setTimeout(doneResizing, 1000)
    })

    window.addEventListener('load', () => {
        initializeGrid()
        initializeSideGrids()
        drawGrid()
    })

    function setCurrentColor(color) {
        currentColor = color
        currentColorMonitor.style.backgroundColor = currentColor
    }

    colorBttn1.addEventListener(
        'input',
        (event) => setCurrentColor(event.target.value),
        false
    )
    colorBttn2.addEventListener(
        'input',
        (event) => setCurrentColor(event.target.value),
        false
    )
    colorBttn3.addEventListener(
        'input',
        (event) => setCurrentColor(event.target.value),
        false
    )

    /* colorBttn1.addEventListener(
        'change',
        (event) => setCurrentColor(event.target.value),
        false
    )
    colorBttn2.addEventListener(
        'change',
        (event) => setCurrentColor(event.target.value),
        false
    )
    colorBttn3.addEventListener(
        'change',
        (event) => setCurrentColor(event.target.value),
        false
    )
 */

    fileInput.addEventListener(
        'change',
        (event) => {
            csvFile = event.target.files[0]

            if (csvFile) {
                inputFileName.textContent = csvFile.name
            } else {
                inputFileName.textContent = 'CSV File'
            }
        },
        false
    )

    dataInputBttn.addEventListener(
        'click',
        () => {
            if (csvFile) {
                const reader = new FileReader()

                reader.onload = function () {
                    const csvdata = reader.result
                    const { arrayOfRows, maxLength, seperatedData } = processData(csvdata)
                    const height = arrayOfRows.length
                    const width = maxLength

                    fillArray = new Array(height)
                    for (let i = 0; i < height; i++) {
                        fillArray[i] = new Array(width)

                        for (let j = 0; j < width; j++) {
                            fillArray[i][j] = convertDataIntoColor(
                                seperatedData[i][j]
                            )
                        }
                    }

                    reInitializeGrid(fillArray, height, width)
                }

                reader.readAsText(csvFile)
            }
        },
        false
    )

    fileOutput.addEventListener(
        'change',
        (event) => {
            outputDataForm = event.target.value
        },
        false
    )

    dataOutputBttn.addEventListener(
        'click',
        () => {
            if (outputDataForm !== '') {
                const array = convertColorIntoDataArray(
                    fillArray,
                    countWidth,
                    countHeight
                )
                makeCSV(array)
            }
        },
        false
    )

    invertBttn.addEventListener(
        'click',
        (event) => {
            event.preventDefault();
            fillArray = inverse(fillArray);
            reInitializeGrid(fillArray, countHeight, countWidth); 
        },
        false
    )

    transposeBttn.addEventListener(
        'click',
        (event) => {
            event.preventDefault(); 
            fillArray = transpose(fillArray, countWidth, countHeight);
            reInitializeGrid(fillArray, countHeight, countWidth);
        }
    );

    reflectBttn.addEventListener(
        'click',
        (event) => {
            event.preventDefault(); 
            fillArray = transpose(fillArray, countWidth, countHeight);
            reInitializeGrid(fillArray, countHeight, countWidth);
        },
        false
    );


    makeDiagonalMatrixBttn.addEventListener('click',
        (event) => {
            event.preventDefault(); 
            fillArray = diagonal(fillArray, countWidth, countHeight)
            reInitializeGrid(fillArray, countHeight, countWidth)
        }, false
    )


    makeIdentityMatrixBttn.addEventListener('click',
        (event) => {
            event.preventDefault()
            fillArray = identity(countWidth, countHeight)
            reInitializeGrid(fillArray, countHeight, countWidth)
        }, false
    )
}
