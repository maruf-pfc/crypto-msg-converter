// RSA.js
// This component implements a simplified RSA encryption and decryption
// Note: This is a basic implementation for demonstration purposes only
// and should not be used for real-world encryption

export function rsaEncrypt(text, key) {
  // Encrypt the text using RSA
  // In this simplified version, we use fixed values for n and e
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

export function rsaDecrypt(text, key) {
  // Decrypt the text using RSA
  // In this simplified version, we use fixed values for n and d
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
