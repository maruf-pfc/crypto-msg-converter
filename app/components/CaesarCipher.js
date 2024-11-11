// CaesarCipher.js
// This component implements the Caesar Cipher encryption and decryption

export function caesarCipher(text, shift) {
  // Encrypt the text using Caesar Cipher
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

export function caesarDecipher(text, shift) {
  // Decrypt the text using Caesar Cipher
  // Decryption is done by shifting in the opposite direction
  return caesarCipher(text, 26 - shift);
}
