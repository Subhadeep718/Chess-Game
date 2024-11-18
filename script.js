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
        const rows = $(".square");
        // Black pieces
        rows.eq(0).text(pieces.black.rook);
        rows.eq(1).text(pieces.black.knight);
        rows.eq(2).text(pieces.black.bishop);
        rows.eq(3).text(pieces.black.queen);
        rows.eq(4).text(pieces.black.king);
        rows.eq(5).text(pieces.black.bishop);
        rows.eq(6).text(pieces.black.knight);
        rows.eq(7).text(pieces.black.rook);
        for (let i = 8; i < 16; i++) rows.eq(i).text(pieces.black.pawns);

        // White pieces
        rows.eq(56).text(pieces.white.rook);
        rows.eq(57).text(pieces.white.knight);
        rows.eq(58).text(pieces.white.bishop);
        rows.eq(59).text(pieces.white.queen);
        rows.eq(60).text(pieces.white.king);
        rows.eq(61).text(pieces.white.bishop);
        rows.eq(62).text(pieces.white.knight);
        rows.eq(63).text(pieces.white.rook);
        for (let i = 48; i < 56; i++) rows.eq(i).text(pieces.white.pawns);
    }
    setupPieces();

    // Handle piece movement
    let selectedSquare = null;
    $(".square").on("click", function () {
        if (selectedSquare === null && $(this).text().trim() !== "") {
            // Select a piece
            selectedSquare = $(this);
            $(this).addClass("selected");
        } else if (selectedSquare) {
            // Move the selected piece
            $(this).text(selectedSquare.text());
            selectedSquare.text("");
            selectedSquare.removeClass("selected");
            selectedSquare = null;
        }
    });
});
