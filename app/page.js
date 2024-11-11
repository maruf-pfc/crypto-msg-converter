"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function CryptoConverter() {
  const [selectedAlgo, setSelectedAlgo] = useState("caesar");
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [key, setKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [theme, setTheme] = useState("light");

  const algorithms = ["caesar", "vigenere", "playfair", "rsa"];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const encrypt = () => {
    let result = "";
    switch (selectedAlgo) {
      case "caesar":
        result = caesarCipher(plainText, parseInt(key));
        break;
      case "vigenere":
        result = vigenereCipher(plainText, key);
        break;
      case "playfair":
        result = playfairCipher(plainText, key);
        break;
      case "rsa":
        result = rsaEncrypt(plainText, key);
        break;
    }
    setCipherText(result);
  };

  const decrypt = () => {
    let result = "";
    switch (selectedAlgo) {
      case "caesar":
        result = caesarDecipher(cipherText, parseInt(decryptKey));
        break;
      case "vigenere":
        result = vigenereDecipher(cipherText, decryptKey);
        break;
      case "playfair":
        result = playfairDecipher(cipherText, decryptKey);
        break;
      case "rsa":
        result = rsaDecrypt(cipherText, decryptKey);
        break;
    }
    setPlainText(result);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Crypto Message Converter
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Encryption
            </h2>
            <div className="mb-4 flex flex-wrap gap-2">
              {algorithms.map((algo) => (
                <button
                  key={algo}
                  onClick={() => setSelectedAlgo(algo)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedAlgo === algo
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900"
                  }`}
                >
                  {algo.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter plain text"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
            {selectedAlgo !== "rsa" && (
              <div className="mb-4">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter key"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            )}
            <div className="mb-4 flex gap-2">
              <button
                onClick={encrypt}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Encrypt
              </button>
              <button
                onClick={() => copyToClipboard(cipherText)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Copy Cipher Text
              </button>
            </div>
            <div>
              <textarea
                value={cipherText}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                rows={4}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Decryption
            </h2>
            <div className="mb-4">
              <input
                type="text"
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
                placeholder="Enter cipher text"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
            {selectedAlgo !== "rsa" && (
              <div className="mb-4">
                <input
                  type="text"
                  value={decryptKey}
                  onChange={(e) => setDecryptKey(e.target.value)}
                  placeholder="Enter decryption key"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            )}
            <div className="mb-4">
              <button
                onClick={decrypt}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Decrypt
              </button>
            </div>
            <div>
              <textarea
                value={plainText}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Encryption algorithms (unchanged)
function caesarCipher(text, shift) {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const shiftAmount = isUpperCase ? 65 : 97;
        return String.fromCharCode(
          ((code - shiftAmount + shift) % 26) + shiftAmount
        );
      }
      return char;
    })
    .join("");
}

function caesarDecipher(text, shift) {
  return caesarCipher(text, 26 - shift);
}

function vigenereCipher(text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase();
    if (alphabet.includes(char)) {
      const textIndex = alphabet.indexOf(char);
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyCharIndex = alphabet.indexOf(keyChar);
      const encryptedIndex = (textIndex + keyCharIndex) % 26;
      result += alphabet[encryptedIndex];
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

function vigenereDecipher(text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase();
    if (alphabet.includes(char)) {
      const textIndex = alphabet.indexOf(char);
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyCharIndex = alphabet.indexOf(keyChar);
      const decryptedIndex = (textIndex - keyCharIndex + 26) % 26;
      result += alphabet[decryptedIndex];
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

function playfairCipher(text, key) {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
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

function playfairDecipher(text, key) {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
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
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (grid[i][j] === char) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

function rsaEncrypt(text, key) {
  const n = 3233;
  const e = 17;
  return text
    .split("")
    .map((char) => {
      const m = char.charCodeAt(0);
      return BigInt(m) ** BigInt(e) % BigInt(n);
    })
    .join(" ");
}

function rsaDecrypt(text, key) {
  const n = 3233;
  const d = 2753;
  return text
    .split(" ")
    .map((char) => {
      const c = BigInt(char);
      const m = c ** BigInt(d) % BigInt(n);
      return String.fromCharCode(Number(m));
    })
    .join("");
}
