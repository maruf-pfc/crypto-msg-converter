// PlayfairCipher.js
// This component implements the Playfair Cipher encryption and decryption

export function playfairCipher(text, key) {
  // Encrypt the text using Playfair Cipher
  const grid = createPlayfairGrid(key);
  const pairs = preparePairs(text.toUpperCase().replace(/J/g, "I"));

  return pairs
    .map((pair) => {
      const [a, b] = pair.split("");
      const [aRow, aCol] = findPosition(grid, a);
      const [bRow, bCol] = findPosition(grid, b);

      if (aRow === bRow) {
        return grid[aRow][(aCol + 1) % 5] + grid[bRow][(bCol + 1) % 5];
      } else if (aCol === bCol) {
        return grid[(aRow + 1) % 5][aCol] + grid[(bRow + 1) % 5][bCol];
      } else {
        return grid[aRow][bCol] + grid[bRow][aCol];
      }
    })
    .join("");
}

export function playfairDecipher(text, key) {
  // Decrypt the text using Playfair Cipher
  const grid = createPlayfairGrid(key);
  const pairs = text.match(/.{1,2}/g) || [];

  return pairs
    .map((pair) => {
      const [a, b] = pair.split("");
      const [aRow, aCol] = findPosition(grid, a);
      const [bRow, bCol] = findPosition(grid, b);

      if (aRow === bRow) {
        return grid[aRow][(aCol - 1 + 5) % 5] + grid[bRow][(bCol - 1 + 5) % 5];
      } else if (aCol === bCol) {
        return grid[(aRow - 1 + 5) % 5][aCol] + grid[(bRow - 1 + 5) % 5][bCol];
      } else {
        return grid[aRow][bCol] + grid[bRow][aCol];
      }
    })
    .join("");
}

function createPlayfairGrid(key) {
  // Create the 5x5 grid for Playfair Cipher
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const uniqueChars = [
    ...new Set(key.toUpperCase().replace(/J/g, "I") + alphabet),
  ];
  const grid = [];
  for (let i = 0; i < 5; i++) {
    grid.push(uniqueChars.slice(i * 5, (i + 1) * 5));
  }
  return grid;
}

function preparePairs(text) {
  // Prepare the text into pairs for Playfair Cipher
  const pairs = [];
  for (let i = 0; i < text.length; i += 2) {
    if (i === text.length - 1) {
      pairs.push(text[i] + "X");
    } else if (text[i] === text[i + 1]) {
      pairs.push(text[i] + "X");
      i--;
    } else {
      pairs.push(text[i] + text[i + 1]);
    }
  }
  return pairs;
}

function findPosition(grid, char) {
  // Find the position of a character in the Playfair grid
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (grid[i][j] === char) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}
