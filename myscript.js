// used the methos of solving this by objects of classes

const game = new TictactoeGame();

game.start();

class TictactoeGame {
    constructor() {
        let turn = 0;
        // creating new objects of needed classes
        const board = new Board();
        const player0 = new Player();
        const player1 = new Player();

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

// constructing functions for new defined classes
class Board {
    constructor() {
        //every position is an inner div in the board, => 9 positions 
        this.positions = Array.from(document.querySelectorAll('.column'));
        console.log(this.positions);
    }
}

function Player(){
    
}