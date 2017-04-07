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
  return solution;
};

window.countNRooksSolutions = function(n) {
  var result = n;
  n -= 1;
  while (n > 1) {
    result = result * n;
    n--
  }
  return result;
}


window.deepCopy = function(array) {
  var result = [];
  for (var y = 0; y < array.length; y++) {
    result.push(array[y].slice());
  }
  return result;
};


window.generateMatrix = function(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    var tempArr = [];
    for (var x = 0; x < n; x++) {
      tempArr.push(0)
    }
    result.push(tempArr);
  }
  return result;
}


window.convertCoordsToBoard = function(coords, n) {
  if (n === 0) {
    return [];
  }
  if (coords === undefined) {
    return generateMatrix(n);
  }

  var board = generateMatrix(n);
  for (var i = 0; i < coords.length; i++) {

    var y = coords[i][0];
    var x = coords[i][1];
    board[y][x] = 1;
  }
  return board;
}

// var solutionFound = false;

// window.findQueenPlacement = function(coordsArr, n, solutions) {
//   if (!solutionFound) {
//     if (coordsArr.length === n) {
//       solutionFound = true;
//       return coordsArr;

//     } else {
//       var lastCoord = coordsArr[coordsArr.length - 1];

//       for (var y = lastCoord[0]; y < n; y++) {
          
//         if (!coordsArr.y.includes(y)) {
            
//             for (var x = 0; x < n; x++) {

//               if ( (!coordsArr.x.includes(x)) && (!coordsArr.major.includes(y - x)) && (!coordsArr.minor.includes(y + x)) ) {
//                 var newArr = deepCopy(coordsArr);
//                 newArr.x = coordsArr.x.slice();
//                 newArr.y = coordsArr.y.slice();
//                 newArr.major = coordsArr.major.slice();
//                 newArr.minor = coordsArr.minor.slice();
//                 newArr.push([y, x]);
//                 newArr.y.push(y);
//                 newArr.x.push(x);
//                 newArr.major.push(y - x);
//                 newArr.minor.push(y + x);

//                 newArr.sort();
//                 var temp = findQueenPlacement(newArr, n, solutions);
//                 if (temp !== undefined) {
//                   return temp;
//                 }
//               }

//             }
//         }
//       }

//     }
//   }
// }


// window.findNQueensSolution = function(n) {
//   debugger;
//   var solutions = [];

//   for (var y = 0; y < n; y++) {
//     for (var x = 0; x < n; x++) {
//       var newCoordsArray = [[y, x]];
//       newCoordsArray.x = [x];
//       newCoordsArray.y = [y];
//       newCoordsArray.major = [y - x];
//       newCoordsArray.minor = [y + x]; 
//       var foundSolution = findQueenPlacement(newCoordsArray, n, solutions);
//       if (foundSolution) {
//         solutions.push(foundSolution);
//         // console.log("foundSolution: "+solutions);
//       }
//     }
//   }
//   var temp = convertCoordsToBoard(solutions[0], n);
//   return temp;
// };


window.findNQueensSolution = function(n) {

  var solutionFound = false;
  var solutions = [];

  var findQueenPlacement = function(coordsArr) {
    if (!solutionFound) {
      if (coordsArr.length === n) {
        solutions.push(coordsArr);
        solutionFound = true;
      } else {

        var lastCoord = coordsArr[coordsArr.length - 1];

        for (var y = lastCoord[0]; y < n; y++) {
          
          if (!coordsArr.y.includes(y)) {
            
              for (var x = 0; x < n; x++) {

                  if ( (!coordsArr.x.includes(x)) && (!coordsArr.major.includes(y - x)) && (!coordsArr.minor.includes(y + x)) ) {
                    var newArr = deepCopy(coordsArr);
                    newArr.x = coordsArr.x.slice();
                    newArr.y = coordsArr.y.slice();
                    newArr.major = coordsArr.major.slice();
                    newArr.minor = coordsArr.minor.slice();
                    newArr.push([y, x]);
                    newArr.y.push(y);
                    newArr.x.push(x);
                    newArr.major.push(y - x);
                    newArr.minor.push(y + x);

                    newArr.sort();
                    findQueenPlacement(newArr);
                  }

              }
          }
        }

      }
    }
  }

  for (var y = 0; y < n; y++) {
    for (var x = 0; x < n; x++) {
      var newCoordsArray = [[y, x]];
      newCoordsArray.x = [x];
      newCoordsArray.y = [y];
      newCoordsArray.major = [y - x];
      newCoordsArray.minor = [y + x]; 
      findQueenPlacement(newCoordsArray);
    }
  }
  var temp = convertCoordsToBoard(solutions[0], n);
  return temp;
};



window.countNQueensSolutions = function(n) {

  if (n === 0) {
    return 1;
  }
  var solutions = [];

  var findQueenPlacement = function(coordsArr) {
    if (coordsArr.length === n && (!JSON.stringify(solutions).includes(JSON.stringify(coordsArr))) ) {
      solutions.push(coordsArr);
    } else {

      var lastCoord = coordsArr[coordsArr.length - 1];

      for (var y = lastCoord[0]; y < n; y++) {
        
        if (!coordsArr.y.includes(y)) {
          
            for (var x = 0; x < n; x++) {

                if ( (!coordsArr.x.includes(x)) && (!coordsArr.major.includes(y - x)) && (!coordsArr.minor.includes(y + x)) ) {
                  var newArr = deepCopy(coordsArr);
                  newArr.x = coordsArr.x.slice();
                  newArr.y = coordsArr.y.slice();
                  newArr.major = coordsArr.major.slice();
                  newArr.minor = coordsArr.minor.slice();
                  newArr.push([y, x]);
                  newArr.y.push(y);
                  newArr.x.push(x);
                  newArr.major.push(y - x);
                  newArr.minor.push(y + x);
                  newArr.sort();
                  findQueenPlacement(newArr);
                } 
            }
        }
      }
    }
  }

  for (var y = 0; y < n; y++) {
    for (var x = 0; x < n; x++) {
      var newCoordsArray = [[y, x]];
      newCoordsArray.x = [x];
      newCoordsArray.y = [y];
      newCoordsArray.major = [y - x];
      newCoordsArray.minor = [y + x]; 
      findQueenPlacement(newCoordsArray);
    }
  }
  return solutions.length;
};
