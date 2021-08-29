var emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function findEmptyPosition(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0) 
                return [i, j];
        }
    }
    return [-1, -1];
}

function checkCurrRow(board, row, number){
    for(var i = 0; i < board[row].length; i++) {
        if(board[row][i] === number) {
            return false;
        }
    }
   
    return true;
}


function checkCurrColumn(board, column, number){
    for(var i = 0; i < board.length; i++) {
        if(board[i][column] === number) {
            return false;
        }
    }

    return true;
};

function checkCurrSquare(board, row, column, number){
    squareRow = Math.floor(row / 3) * 3;
    squareColumn = Math.floor(column / 3) * 3;
    
    for (var row = 0; row < 3; row++){
        for (var column = 0; column < 3; column++){
            if (board[squareRow + row][squareColumn + column] === number){
                return false;
			}
        }
    }
    return true;
};


function checkValue(board, row, column, number) {
    return checkCurrRow(board, row, number) &&
      checkCurrColumn(board, column, number) &&
      checkCurrSquare(board, row, column, number)
};



function findSolution(board) {  
    let emptyPositionCoord = findEmptyPosition(board);
    let row = emptyPositionCoord[0];
    let col = emptyPositionCoord[1];

    if (row === -1 || col === -1){
        return board;
    }

    for(let number = 1; number<=9; number++){
        if (checkValue(board, row, col, number)){
            board[row][col] = number;
            findSolution(board);
        }
    }

    if (findEmptyPosition(board)[0] !== -1)
        board[row][col] = 0;

    return board;
}

function checkIfSolutionFound(board)
{
	var emptyPositionCoord = findEmptyPosition(board);
	if (emptyPositionCoord[0] !== -1 || emptyPositionCoord[1] !== -1)
	{
		return false;
	}
	return true;
}

function getResult(board)
{
	findSolution(board);
	if (checkIfSolutionFound(board))
	{
		console.log(board);
	}
	else
	{
		console.log("A solution could not be determined. Please check your input for accuracy.")
	}
}

var readline = require('readline'), input = readline.createInterface(process.stdin, process.stdout);


console.log("Type 'Done' when you've finished providing input.")
input.setPrompt('Enter any given values, seperated by commas (1 to 9): row, col, value: ');
input.prompt();

input.on('line', function(line) 
{
	if (line.trim().toLowerCase() == "done")
	{
		input.close();
	}
	else
	{
		line.trim().split(',')
		var x = parseInt(line[0]);
		var y = parseInt(line[2]);
		var value = parseInt(line[4]);
		if ((x > 0 && x < 10) && (y > 0 && y < 10))
		{
			emptyBoard[x][y] = value;
		}
		else
		{
			console.log("Your input must be between 1 and 9.")
		}
		input.prompt();
	}
}).on('close', function() {
	console.log(emptyBoard);
	getResult(emptyBoard);
});
