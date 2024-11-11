# Project Structure

- The project is built using Next.js with the App Router.
- We have a single page component (`app/page.js`) that contains all the logic for encryption and decryption.
- The layout file (`app/layout.js`) sets up the basic HTML structure and includes the necessary Tailwind CSS classes.
- The `tailwind.config.js` file is configured to enable dark mode.

## Algorithms and Key Requirements

a. Caesar Cipher (requires key):

- Uses a simple shift of the alphabet.
- The key is a number representing the shift amount.

b. Vigenère Cipher (requires key):

- Uses a keyword to shift the alphabet for each letter.
- The key is a word or phrase.

c. Playfair Cipher (requires key):

- Uses a 5x5 grid of letters based on a keyword.
- The key is a word or phrase used to generate the grid.

d. RSA (does not require user-provided key):

- Uses public-key cryptography.
- In our simplified implementation, we use fixed values for n, e, and d.
- In a real-world scenario, these would be generated and managed securely.

## Implementation Structure

- The main component (`CryptoConverter`) manages the state for inputs, outputs, and the selected algorithm.
- Each algorithm is implemented as a separate function.
- The `encrypt` and `decrypt` functions in the component act as dispatchers, calling the appropriate algorithm based on the user's selection.
- The theme is managed using React state and persisted using localStorage.
