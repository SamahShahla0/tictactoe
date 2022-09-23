// used the method of solving this by objects of classes
// classes must be declared before using them
// constructing functions for new defined classes
class Board {
    constructor() {
        //every position is an inner div in the board, => 9 positions //this is an attribute of the class
        this.positions = Array.from(document.querySelectorAll('.column'));
        this.remaining = this.positions;
        // giving the board a function to check who is the winner // this is a function of the class
        // combinations of numbers for knowing the winner will be based on the folloiwng order 
        // 0 1 2
        // 3 4 5 
        // 6 7 8
        this.checkForWinner = function() {
            let winner = false; // to flag if winner is found or not
            const winningCombinations = [
                [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
            ]

            const positions = this.positions;
            // cycling the winning combinations to see if the board has any of them
            winningCombinations.forEach((winningCombo) => {
                // storing the value of each element of the winningCombo mini array in a variable
                const position0innerText = positions[winningCombo[0]].innerText;
                const position1innerText = positions[winningCombo[1]].innerText
                const position2innerText = positions[winningCombo[2]].innerText

                const isWinningCombo = position0innerText != '' && position0innerText == position1innerText &&    position1innerText == position2innerText ;

                if (isWinningCombo) {
                    winner = true;
                    winningCombo.forEach((index) => {
                        // added winner styleing class to the winning combination elements text
                        positions[index].classList.add('winner');
                    })
                }
            });
            
            return winner;
        }
    }
}
//passing the board to each player constructor so the player can be aware of the board state
class Player0 {
    constructor(board) {

        this.takeTurn = function () {
            //adding an event listener on click for each inner div
            board.remaining.forEach(e => e.addEventListener('click', HandleTurnTaken) )
            
        };

        function HandleTurnTaken(e) {
            // the target of the click event will have X as an inner text
            e.target.innerText = "X";
            // now remove the event listener because we should not be able to click when its not our turn
            board.remaining.forEach(e => e.removeEventListener('click', HandleTurnTaken) )
             //filtering the available positions on the board
            board.remaining = board.positions.filter((p) => p.innerText == '');
            console.log(board.remaining);
            
        }

    }
}
class ComputerPlayer {
    constructor(board) {
        // filter the positions according to the innerText, if empty or not
        // availablePositions will be an array
        //let availablePositions = board.positions.filter((p) => p.innerText == '');

        this.takeTurn = function () {

            let e = Math.floor(Math.random() * board.remaining.length);
            board.remaining[e].innerText = "O";
            /////////////////////////////////////////////////////////////////////////////////////////
            //availablePositions = board.positions.filter((p) => p.innerText == '');
            //console.log(availablePositions);
            //adding an event listener on click for the unchosen divs
           // board.remaining.forEach(e => e.addEventListener('click', HandleTurnTaken) );
        };

        /*function HandleTurnTaken(e) {
            // the target of the click event will have X as an inner text
            e.target.innerText = "O";
            // now remove the event listener because we should not be able to click when its not our turn
            board.remaining.forEach(e => e.removeEventListener('click', HandleTurnTaken) )
            //filtering the available positions on the board
            board.remaining = board.positions.filter((p) => p.innerText == '');
            //console.log(board.remaining);
            //availablePositions = board.positions.filter((p) => p.innerText == '');
            //console.log(availablePositions);
            
            //availablePositions.forEach(e => e.removeEventListener('click', HandleTurnTaken) )
            
        }*/

    }
}

class TictactoeGame {
    constructor() {
        let turn = 0;
        // creating new objects of needed classes
        const board = new Board();
        const player0 = new Player0(board);
        const computer = new ComputerPlayer(board);

        this.start = function () {
            // to watch changes of all positions, if a change happens to a position, turn will be for the other player
            // whenever child of a div changes, we will know 
            const config = { childList: true };
            // keep track of changes being made to the DOM tree using an object of MutationObserver
            const observer = new MutationObserver(() => takeTurn());
            // to observe changes of each div, put observer on each position
            board.positions.forEach((e) => observer.observe(e, config)); //obsrve each element based on the config declared

            //call takeTurn function to give turn to first playyer
            takeTurn();

        };

        function takeTurn() {
            if (board.checkForWinner()){
                return;
            }
            if (turn % 2 == 0) {
                player0.takeTurn();
            }
            else {
                computer.takeTurn();
            }
            turn = turn + 1;
        }

    }
}

const game = new TictactoeGame();

game.start();


