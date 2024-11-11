"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { caesarCipher, caesarDecipher } from "./components/CaesarCipher";
import { vigenereCipher, vigenereDecipher } from "./components/VigenereCipher";
import { playfairCipher, playfairDecipher } from "./components/PlayfairCipher";
import { rsaEncrypt, rsaDecrypt } from "./components/RSA";

export default function CryptoConverter() {
  const [selectedAlgo, setSelectedAlgo] = useState("caesar");
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [key, setKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [theme, setTheme] = useState("light");

  const algorithms = ["caesar", "vigenere", "playfair", "rsa"];

  useEffect(() => {
    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    // Toggle the theme and save it to localStorage
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
    // Encrypt the plain text using the selected algorithm
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
    // Decrypt the cipher text using the selected algorithm
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
    // Copy the given text to clipboard
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