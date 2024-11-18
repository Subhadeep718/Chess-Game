// script.js
$(document).ready(function () {
    const chessboard = $("#chessboard");
    const pieces = {
        white: {
            pawns: "♙",
            rook: "♖",
            knight: "♘",
            bishop: "♗",
            queen: "♕",
            king: "♔",
        },
        black: {
            pawns: "♟",
            rook: "♜",
            knight: "♞",
            bishop: "♝",
            queen: "♛",
            king: "♚",
        },
    };

    let currentPlayer = "white"; // Start with white's turn
    let selectedSquare = null;

    // Create the chessboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = $("<div>")
                .addClass("square")
                .addClass((row + col) % 2 === 0 ? "white" : "black")
                .attr("data-row", row)
                .attr("data-col", col);
            chessboard.append(square);
        }
    }

    // Set initial positions
    function setupPieces() {
        const squares = $(".square");
        // Black pieces
        squares.eq(0).text(pieces.black.rook);
        squares.eq(1).text(pieces.black.knight);
        squares.eq(2).text(pieces.black.bishop);
        squares.eq(3).text(pieces.black.queen);
        squares.eq(4).text(pieces.black.king);
        squares.eq(5).text(pieces.black.bishop);
        squares.eq(6).text(pieces.black.knight);
        squares.eq(7).text(pieces.black.rook);
        for (let i = 8; i < 16; i++) squares.eq(i).text(pieces.black.pawns);

        // White pieces
        squares.eq(56).text(pieces.white.rook);
        squares.eq(57).text(pieces.white.knight);
        squares.eq(58).text(pieces.white.bishop);
        squares.eq(59).text(pieces.white.queen);
        squares.eq(60).text(pieces.white.king);
        squares.eq(61).text(pieces.white.bishop);
        squares.eq(62).text(pieces.white.knight);
        squares.eq(63).text(pieces.white.rook);
        for (let i = 48; i < 56; i++) squares.eq(i).text(pieces.white.pawns);
    }
    setupPieces();

    // Check the piece's color
    function getPieceColor(piece) {
        if (Object.values(pieces.white).includes(piece)) return "white";
        if (Object.values(pieces.black).includes(piece)) return "black";
        return null;
    }

    // Handle piece selection and movement
    $(".square").on("click", function () {
        const clickedSquare = $(this);
        const clickedPiece = clickedSquare.text().trim();
        const clickedPieceColor = getPieceColor(clickedPiece);

        if (selectedSquare === null) {
            // No piece selected yet - allow selecting a piece
            if (clickedPiece !== "" && clickedPieceColor === currentPlayer) {
                selectedSquare = clickedSquare;
                clickedSquare.addClass("selected");
            } else {
                alert(`It's ${currentPlayer}'s turn!`);
            }
        } else {
            // Piece already selected - try to move
            if (clickedSquare === selectedSquare) {
                // Deselect if clicking the same square
                selectedSquare.removeClass("selected");
                selectedSquare = null;
            } else {
                // Move piece if valid
                const selectedPiece = selectedSquare.text().trim();
                const targetPiece = clickedSquare.text().trim();
                const targetPieceColor = getPieceColor(targetPiece);

                if (targetPiece === "" || targetPieceColor !== currentPlayer) {
                    // Empty square or opponent's piece
                    clickedSquare.text(selectedPiece);
                    selectedSquare.text("");
                    selectedSquare.removeClass("selected");
                    selectedSquare = null;

                    // Switch turns
                    currentPlayer = currentPlayer === "white" ? "black" : "white";
                } else {
                    alert(`You cannot capture your own piece!`);
                }
            }
        }
    });
});
