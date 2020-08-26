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

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
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
    // I: rows index. Index of an array
    // O: boolean
    hasRowConflictAt: function(rowIndex) {
      // storing an array in a variable
      var gatheredArray = this.get(rowIndex);
      // create a conflict counter
      var conflictCounter = 0;
      // iterate over the array
      for (var i = 0; i < gatheredArray.length; i++) {
        //if the current element is a 1
        if (gatheredArray[i] === 1) {
          // increment our conflict counter
          conflictCounter++;
        }
      }
      // if the conflict counter is 2 or greater
      if (conflictCounter >= 2) {
        // know for sure there is conflict, return true
        return true;
      } else {
      // otherwise, return false, no conflict on that row
        return false; // fixme
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // store an array in a variable
      var gatheredArray = this.rows();
      // iterate over the array
      for (var i = 0; i < gatheredArray.length; i++) {
        // if our hasRowConflictAt function called on each element in the array ever equals true
        if (this.hasRowConflictAt(i) === true) {
          // return true, conflicts
          return true;
        }
      }
      return false; // fixme
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //store our gathered arr in a variable
      var gatheredArr = this.rows();
      //create a counter variable
      var conflictCounter = 0;
      //iterate over that arr
      for (var i = 0; i < gatheredArr.length; i++) {
        if (gatheredArr[i][colIndex] === 1) {
          conflictCounter++;
        }
      }
      if (conflictCounter >= 2) {
        return true;
      } else {
        return false;
      }
      //if the current elem is a 1
    //incremenet our conflict counter
      // if conflict counter is 2 or greater(there is a conflict)
      //return true;
      //else
      //return false; (no conflict);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //store our gathered arr in a var
      var gatheredArr = this.rows();
      for (var i = 0; i < gatheredArr.length; i++) {
        if (this.hasColConflictAt(i) === 1) {
          return true;
        }
      }
      return false; // fixme
    },
    //iterate over that arr
    //if calling our hasColConflictAt on the current element is equal to true
    //return true
    //return false



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // I: column index at first row, column1 row1
    // O: boolean
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // create a conflict counter
      var conflictCounter = 0;
      // set our input to an easier variable
      var major = majorDiagonalColumnIndexAtFirstRow;
      // set gathered array to a variable
      var gatheredArr = this.rows();
      // create variable number and ititialize to input variable
      var column = major;
      // iterate over our gathered array
      for (var i = 0; i < gatheredArr.length; i++) {
        if (gatheredArr[i][column] === 1) {
          conflictCounter++;
        }
        column++;
      }
      if (conflictCounter >= 2) {
        return true;
      } else {
        return false;
      }
      // check if our element at our index at our number/column is a 1(rook), conflict
      // increment our conflict counter by 1
      // increment our number/column variable by one(move to next column)
      // if ourconflict counter is 2 or greater
      // return true(conflict)
      // otherwishe
      // return false
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    // I: nothing
    // O: boolean
    hasAnyMajorDiagonalConflicts: function() {
      // initialize gathered array into a variable
      var gatheredArr = this.rows();
      // iterate over gathered array
      for (var i = 0; i < gatheredArr.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i) === true) {
          return true;
        }
      }
      // if calling our previous function on each index is ever true
      // return true, conflict
      // othersie,
      // return false
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // I: Starting position of a minor diag which would be like row 1 col 4
    // O: bool
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //create a conflict counter
      var conflictCounter = 0;
      //set input variable to something easier
      var minor = minorDiagonalColumnIndexAtFirstRow;
      //set gathered arr to a var
      var gatheredArr = this.rows();
      //create a var to represent the current col we are in and set it equal to the input var
      var column = minor;
      //iterate over the arr
      for (i = 0; i < gatheredArr.length; i++) {
        //if element at the index at the column is a 1
        if (gatheredArr[i][column] === 1) {
          //increment our conflict counter by 1
          conflictCounter++;
        }
        //decrement our col variable by 1
        column--;
      }
      //if the conflict counter is 2 or greater (there is a conflict)
      if (conflictCounter >= 2) {
        return true;
      } else {
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    // I: Nothing
    // O: bool
    hasAnyMinorDiagonalConflicts: function() {
      //create a var to store our gathered arr
      var gatheredArr = this.rows();
      //iterate over that arr
      for (var i = 0; i < gatheredArr.length; i++) {
        //if the result of calling the above funciton on each index is ever true
        if (this.hasMinorDiagonalConflictAt(i) === true) {
          //return true (conflicts)
          return true;
        }
      }
      //return false (no conflicts)
      return false; // fixme
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
