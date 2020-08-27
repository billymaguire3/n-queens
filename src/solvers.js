/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// O(n^2);


window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var storage = [];
  for (var i = 0; i < n; i++) {
    var randomPosition = Math.floor(Math.random() * n); //Should generate a random index position within the current row (i)
    if (storage.indexOf(randomPosition) === -1) { //The position hasnt been used yet, its a valid option
      storage.push(randomPosition); //Adding and removing it as a possible option
      board.rows()[i][randomPosition] = 1; //We have now represented this as a taken position on the actual board
    } else if (storage.indexOf(randomPosition) > -1) { //Position has already been taken
      i--; //To keep going through that same row
    }
  }
  return board.rows(); //return the hopefully solved board
};


//console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

// I: n which represents the n x n matrix of the board
// O: A board with a correct solution


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
  //return a integer of possible solution
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
  //Returning a board
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
  //Returning an integer of possible solutions
};
