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



window.findNRooksSolution = function(n) {
  var solution = []; 
  for (var i = 0; i < n; i++) {
    var tempArray = [];
    for (var x = 0; x < n; x++) {
      (x === i) ? tempArray.push(1) : tempArray.push(0);
    }
    solution.push(tempArray);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.checkIfSolutionExists = function(solutions, newSolution) {
  for (var i = 0; i < solutions.length; i++) {
    var coordinates = JSON.stringify(solutions[i].currentRooks)
    var temp = newSolution.currentRooks.every(function(element, index) {
      if (coordinates.includes(newSolution.currentRooks[index])) {
        return true;
      }
    });
    if (temp === true) {
      return true;
    }
  }
  return false;
}

window.deepCopy = function(array) {
  var result = [];
  for (var y = 0; y < array.length; y++) {
    result.push(array[y].slice());
  }
  return result;
}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var rooks = [];

    // first time, setup initial branches starting points
    //  N = 4
    // [0,0], [0,1], [0,2], [0,3]
    // call place rooks on each one

  var placeRooks = function(matrix) {
    // takes in coords 
    
  }
  




};


// window.countNRooksSolutions = function(n) {
//   var solutions = [];
//   if (n > 6) { n = 6; }

//   var matrix = new Array(n).fill( new Array(n).fill(0) );

//   var placeRooks = function(matrix) {

//     if ( matrix.rookCount === n && !checkIfSolutionExists(solutions, matrix) ) {
//       solutions.push(matrix);

//     } else {

//       // 
//       for (var y = 0; y < matrix.length; y++) {
//         // 
//         for (var x = 0; x < matrix.length; x++) {

//           if (matrix[y][x] === 0) {

//             // copy matrix
//             var newMatrix = deepCopy(matrix);
//             newMatrix.rookCount = matrix.rookCount;
//             newMatrix.currentRooks = matrix.currentRooks.slice();
//             newMatrix[y][x] = 1;

//             // checks out x coord
//             for (var a = 0; a < matrix.length; a++) {
//               if (newMatrix[y][a] !== 1) {
//                 newMatrix[y][a] = 2;
//               }
//             }

//             // check out vertical
//             for (var b = 0; b < matrix.length; b++) {
//               if (newMatrix[b][x] !== 1) {
//                 newMatrix[b][x] = 2;
//               }
//             }

//             newMatrix.rookCount++;
//             newMatrix.currentRooks.push([y, x]);
//             placeRooks(newMatrix);

//           }

//         }
//       }

//     }
//   }
//   matrix.rookCount = 0;
//   matrix.currentRooks = [];
//   placeRooks(matrix);
//   // define a recursive function
//     // if (the amount of rooks is not met) 
//       // loop through matrix (only half of it)
//         // if (current square is a 0)
//           // define a new matrix which will have a new piece and more unavailable squares
//           // call recursive function with that matrix
//     // otherwise if the matrix does not already exist
//       //add the matrix to the solution and don't call again
  

//   // call the function with an empty matrix
//   // call unique
//   console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
//   return solutions.length;
// };



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
