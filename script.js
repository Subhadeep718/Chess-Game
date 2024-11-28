$(document).ready(function () {
    const chessboard = $("#chessboard");
    const pieces = {
        white: { pawns: "♙", rook: "♖", knight: "♘", bishop: "♗", queen: "♕", king: "♔" },
        black: { pawns: "♟", rook: "♜", knight: "♞", bishop: "♝", queen: "♛", king: "♚" },
    };

    let currentPlayer = "white";
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
        // Place pieces using the chessboard layout
        const initialLayout = [
            [pieces.black.rook, pieces.black.knight, pieces.black.bishop, pieces.black.queen, pieces.black.king, pieces.black.bishop, pieces.black.knight, pieces.black.rook],
            Array(8).fill(pieces.black.pawns),
            Array(8).fill(""),
            Array(8).fill(""),
            Array(8).fill(""),
            Array(8).fill(""),
            Array(8).fill(pieces.white.pawns),
            [pieces.white.rook, pieces.white.knight, pieces.white.bishop, pieces.white.queen, pieces.white.king, pieces.white.bishop, pieces.white.knight, pieces.white.rook],
        ];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                squares.eq(row * 8 + col).text(initialLayout[row][col]);
            }
        }
    }
    setupPieces();

    // Get the color of a piece
    function getPieceColor(piece) {
        if (Object.values(pieces.white).includes(piece)) return "white";
        if (Object.values(pieces.black).includes(piece)) return "black";
        return null;
    }

    // Validate moves for each piece
    function isValidMove(piece, startRow, startCol, endRow, endCol, targetPiece) {
        const pieceColor = getPieceColor(piece);
        const rowDiff = endRow - startRow;
        const colDiff = endCol - startCol;

        switch (piece) {
            case pieces.white.king:
            case pieces.black.king:
                return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
            case pieces.white.queen:
            case pieces.black.queen:
                return (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) && isPathClear(startRow, startCol, endRow, endCol);
            case pieces.white.rook:
            case pieces.black.rook:
                return (rowDiff === 0 || colDiff === 0) && isPathClear(startRow, startCol, endRow, endCol);
            case pieces.white.bishop:
            case pieces.black.bishop:
                return Math.abs(rowDiff) === Math.abs(colDiff) && isPathClear(startRow, startCol, endRow, endCol);
            case pieces.white.knight:
            case pieces.black.knight:
                return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
            case pieces.white.pawns:
                return validatePawnMove(pieceColor, startRow, startCol, endRow, endCol, targetPiece);
            case pieces.black.pawns:
                return validatePawnMove(pieceColor, startRow, startCol, endRow, endCol, targetPiece);
        }
        return false;
    }

    // Validate pawn moves
    function validatePawnMove(color, startRow, startCol, endRow, endCol, targetPiece) {
        const direction = color === "white" ? -1 : 1;
        const startRowPawn = color === "white" ? 6 : 1;

        // Normal move
        if (endCol === startCol && !targetPiece) {
            if (endRow === startRow + direction) return true;
            if (startRow === startRowPawn && endRow === startRow + 2 * direction) return true;
        }
        // Capture move
        if (Math.abs(endCol - startCol) === 1 && endRow === startRow + direction && targetPiece) {
            return true;
        }
        return false;
    }

    // Check if path is clear for rooks, bishops, and queens
    function isPathClear(startRow, startCol, endRow, endCol) {
        const rowStep = Math.sign(endRow - startRow);
        const colStep = Math.sign(endCol - startCol);
        let currentRow = startRow + rowStep;
        let currentCol = startCol + colStep;

        while (currentRow !== endRow || currentCol !== endCol) {
            if ($(`.square[data-row=${currentRow}][data-col=${currentCol}]`).text() !== "") return false;
            currentRow += rowStep;
            currentCol += colStep;
        }
        return true;
    }

    // Handle piece selection and movement
    $(".square").on("click", function () {
        const clickedSquare = $(this);
        const clickedPiece = clickedSquare.text().trim();
        const clickedPieceColor = getPieceColor(clickedPiece);
        const clickedRow = parseInt(clickedSquare.attr("data-row"));
        const clickedCol = parseInt(clickedSquare.attr("data-col"));

        if (selectedSquare === null) {
            // Select a piece
            if (clickedPiece !== "" && clickedPieceColor === currentPlayer) {
                selectedSquare = clickedSquare;
                clickedSquare.addClass("selected");
            } else {
                alert(`It's ${currentPlayer}'s turn!`);
            }
        } else {
            // Try to move the selected piece
            const selectedPiece = selectedSquare.text().trim();
            const selectedRow = parseInt(selectedSquare.attr("data-row"));
            const selectedCol = parseInt(selectedSquare.attr("data-col"));

            if (isValidMove(selectedPiece, selectedRow, selectedCol, clickedRow, clickedCol, clickedPiece)) {
                clickedSquare.text(selectedPiece);
                selectedSquare.text("");
                selectedSquare.removeClass("selected");
                selectedSquare = null;

                // Switch turns
                currentPlayer = currentPlayer === "white" ? "black" : "white";
            } else {
                alert("Invalid move!");
            }
        }
    });
});
