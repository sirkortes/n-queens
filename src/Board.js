// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    columns: function() {
      var rows = this.rows();
      var columns = [];
      for ( var x = 0; x < rows.length; x++) {
        var column = [];
        for (var y = 0; y < rows[x].length; y++) {
          column.push(rows[y][x]);
        }
        columns.push(column);
      }
      return columns;
    },

    // diagonal: function(startingPoint, position){
    //   var rows = this.rows();
    //   var diagonals = [];
    //   var modifier;

    //   if (startingPoint === 'topLeft') {
    //     modifier = 1;
    //   } else if (startingPoint === 'topRight') {
    //     modifier = -1;
    //   } else {
    //     console.log('oops, the wrong direction was entered in for diagonal');
    //   }


    //   for ( var x = 0; x < rows.length; x += modifier) {
    //     var diagonal = [];
    //     for (var y = 0; y < rows[x].length - x - y; y++) {
    //       diagonal.push(rows[y][x]);
    //     }
    //     diagonals.push(diagonal);
    //   }


    //   return diagonals;
    // },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    /*

    */

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      // console.log(colIndex+' + '+rowIndex+' =  '+(colIndex + rowIndex) )
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var specificRow = this.rows()[rowIndex];
      return (specificRow.reduce((sum, currentVal) => sum + currentVal) > 1) ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      var context = this;
      return rows.some(function(row, index) {
        return context.hasRowConflictAt(index);
      });
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(index) {
      var specificColumn = this.columns()[index];
      return (specificColumn.reduce((sum, currentVal) => sum + currentVal) > 1) ? true : false;
    },
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var columns = this.columns();
      var context = this;
      return columns.some(function(column, index) {
        return context.hasColConflictAt(index);
      });
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var rows = this.rows();
      var result = 0;
      var y = (majorDiagonalColumnIndexAtFirstRow >= 0) ? Math.abs(majorDiagonalColumnIndexAtFirstRow) : 0;
      var x = (majorDiagonalColumnIndexAtFirstRow > 0) ? 0 : Math.abs(majorDiagonalColumnIndexAtFirstRow);

      var square = 0;
      while (rows[x] !== undefined && rows[x][y] !== undefined) {
        result += rows[x][y];
        x++;
        y++;
      }
      return (result > 1) ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var result = false;
      var spread = ((rows.length - 1) * 2)

      for (var i = (0 - (spread / 2)); i <= (spread/2); i++) {
        result = result ? result : this.hasMajorDiagonalConflictAt(i);
      }
      return result;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();

      var result = 0;

      var y = (minorDiagonalColumnIndexAtFirstRow >= rows.length) ? minorDiagonalColumnIndexAtFirstRow - rows.length + 1 : 0;
      var x = (minorDiagonalColumnIndexAtFirstRow >= rows.length) ? rows.length - 1 : minorDiagonalColumnIndexAtFirstRow;
      
      var square = 0;
      while (rows[x] !== undefined && rows[x][y] !== undefined) {

        var row = rows[x];
        var square = row[y];
        result += square;
        x--;
        y++;
      }
      return (result > 1) ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var result = false;
      for (var i = 0; i < (rows.length - 1) * 2; i++) {
        result = result ? result : this.hasMinorDiagonalConflictAt(i);
      }
      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
