// used the methos of solving this by objects of classes
// classes must be declared before using them
// constructing functions for new defined classes
class Board {
    constructor() {
        //every position is an inner div in the board, => 9 positions 
        this.positions = Array.from(document.querySelectorAll('.column'));
    }
}
//passing the board to each player constructor so the player can be aware of the board state
class Player0 {
    constructor(board) {

        this.takeTurn = function () {
            //adding an event listener on click for each inner div
            board.positions.forEach(e => e.addEventListener('click', HandleTurnTaken) )
        };

        function HandleTurnTaken(e) {
            // the target of the click event will have X as an inner text
            e.target.innerText = "X";
            // now remove the event listener because we should not be able to click when its not our turn
            board.positions.forEach(e => e.removeEventListener('click', HandleTurnTaken) )
        }

    }
}
class Player1 {
    constructor(board) {

        this.takeTurn = function () {
            // this is not player 0, so not all positions are available
            // filter the positions according to the innerText, if empty or not
            // availablePositions will be an array
            const availablePositions = board.positions.filter((p) => p.innerText == '');
            console.log(availablePositions);
        };

    }
}

class TictactoeGame {
    constructor() {
        let turn = 0;
        // creating new objects of needed classes
        const board = new Board();
        const player0 = new Player0(board);
        const player1 = new Player1(board);

        this.start = function () {
            // to watch changes of all positions, if a change happens to a position, turn will be for the other player
            // whenever child of a div changes, we will know 
            const config = { childList: true };
            // keep track of changes being made to the DOM tree using an object of MutationObserver
            const observer = new MutationObserver(() => takeTurn());
            // to observe changes of each div, put observer on each position
            board.positions.forEach((e) => observer.observe(e, config)); //obsrve each element based on the congig declared

            //call takeTurn function to give turn to first playyer
            takeTurn();

        };

        function takeTurn() {
            if (turn % 2 == 0) {
                player0.takeTurn();
            }
            else {
                player1.takeTurn();
            }
            turn = turn + 1;
        }

    }
}

const game = new TictactoeGame();

game.start();


