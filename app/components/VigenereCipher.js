// VigenereCipher.js
// This component implements the Vigenère Cipher encryption and decryption

export function vigenereCipher(text, key) {
  // Encrypt the text using Vigenère Cipher
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

export function vigenereDecipher(text, key) {
  // Decrypt the text using Vigenère Cipher
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
