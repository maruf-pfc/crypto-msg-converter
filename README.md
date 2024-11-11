# Crypto Message Converter

Crypto Message Converter is a web application built with Next.js and Tailwind CSS that allows users to encrypt and decrypt messages using various cryptographic algorithms. The application features a responsive design with both light and dark themes.

## Features

- Support for multiple encryption algorithms:
  - Caesar Cipher
  - Vigenère Cipher
  - Playfair Cipher
  - Simplified RSA (for demonstration purposes only)
- Real-time encryption and decryption
- Responsive design for all devices
- Light and dark theme support with persistent user preference

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- pnpm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/maruf-pfc/crypto-msg-converter.git
   ```

2. Navigate to the project directory:
   ```
   cd crypto-msg-converter
   ```

3. Install the dependencies:
   ```
   pnpm install
   ```

### Running the Application

To run the application in development mode:

```
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create a production build:

```
pnpm run build
```

To start the production server:

```
pnpm start
```

## Usage

1. Select an encryption algorithm from the available options.
2. For encryption:
   - Enter the plain text in the input field.
   - If required by the selected algorithm, enter a key.
   - Click the "Encrypt" button to see the encrypted text.
3. For decryption:
   - Enter the cipher text in the input field.
   - If required by the selected algorithm, enter the key.
   - Click the "Decrypt" button to see the decrypted text.
4. Use the theme toggle button in the top-right corner to switch between light and dark themes.

## Security Note

The cryptographic implementations in this project are for educational purposes only and should not be used for securing sensitive information. The RSA implementation, in particular, uses fixed values and is not secure for real-world applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
