"use strict";

/* ============================================================
   Global Variables
   ============================================================ */

/* puzzleCells  
   References all <td> (Table Data) cells inside the puzzle grid */
var puzzleCells;

/* cellBackground  
   Stores the color being applied while the mouse is held down */
var cellBackground;

/* dragging  
   Boolean that tracks whether the mouse button is currently held */
var dragging = false;


/* ============================================================
   init()
   Runs when the page loads
   ============================================================ */

window.onload = init;

function init() {

   // Display Puzzle 1 title
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";

   // Display Puzzle 1 grid
   document.getElementById("puzzle").innerHTML =
      drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

   // Add event handlers to the puzzle buttons
   var puzzleButtons = document.getElementsByClassName("puzzles");
   for (var i = 0; i < puzzleButtons.length; i++) {
      puzzleButtons[i].onclick = swapPuzzle;
   }

   // IMPORTANT: Initialize Puzzle 1 cells
   setupPuzzle();
}


/* ============================================================
   swapPuzzle(e)
   Loads the selected puzzle
   ============================================================ */

function swapPuzzle(e) {

   var puzzleID = e.target.id;     // puzzle1, puzzle2, puzzle3
   var puzzleTitle = e.target.value; // Button text

   document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

   switch (puzzleID) {
      case "puzzle1":
         document.getElementById("puzzle").innerHTML =
            drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
         break;

      case "puzzle2":
         document.getElementById("puzzle").innerHTML =
            drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
         break;

      case "puzzle3":
         document.getElementById("puzzle").innerHTML =
            drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
         break;
   }

   // Reinitialize the new puzzle
   setupPuzzle();
}


/* ============================================================
   setupPuzzle()
   Prepares the puzzle for interaction
   ============================================================ */

function setupPuzzle() {

   // Select all <td> cells inside the puzzle grid
   puzzleCells = document.querySelectorAll("#hanjieGrid td");

   for (var i = 0; i < puzzleCells.length; i++) {

      // Remove CSS classes (.filled or .empty)
      puzzleCells[i].className = "";

      // Set gold background
      puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";

      // When mouse is pressed on a cell
      puzzleCells[i].onmousedown = setBackground;

      // When mouse enters another cell while dragging
      puzzleCells[i].onmouseenter = extendBackground;
   }

   // When mouse is released anywhere on the page
   document.onmouseup = endBackground;
}


/* ============================================================
   setBackground(e)
   Called when user clicks a cell
   ============================================================ */

function setBackground(e) {

   dragging = true; // Mouse is now held down

   // e.target = the <td> cell that was clicked
   var cell = e.target;

   // Toggle between gold and black
   if (cell.style.backgroundColor === "rgb(233, 207, 29)") {
      cell.style.backgroundColor = "black";
      cellBackground = "black";
   } else {
      cell.style.backgroundColor = "rgb(233, 207, 29)";
      cellBackground = "rgb(233, 207, 29)";
   }
}


/* ============================================================
   extendBackground(e)
   Called when mouse enters a cell while dragging
   ============================================================ */

function extendBackground(e) {

   if (dragging) {
      e.target.style.backgroundColor = cellBackground;
   }
}


/* ============================================================
   endBackground()
   Called when mouse button is released
   ============================================================ */

function endBackground() {
   dragging = false;
}


