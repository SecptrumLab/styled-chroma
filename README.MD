# styled-chroma

A flexible styling library for modern web applications.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [API Reference](#api-reference)
- [License](#license)
- [Issues](#issues)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Installation

npm:

```bash
npm install styled-chroma
```

yarn:

```bash
yarn add styled-chroma
```

## Features

- Intuitive API similar to styled-components
- Type-safe styling with TypeScript support
- Performance optimized with minimal runtime overhead
<!-- - Server-side rendering (SSR) support -->
- Automatic vendor prefixing for cross-browser compatibility

## Usage

Basic example:

```tsx
import styled from "styled-chroma";

const Button = styled("button")`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

export default Button;
```

## API Reference

### `styled`

The `styled` function is the core function for creating styled components. It takes a tag name as an argument and returns a new component that applies the styles to the specified HTML element.

#### Parameters

- `tag: keyof JSX.IntrinsicElements` - The HTML tag to be styled.

#### Returns

- `React.FC<any>` - A new React functional component that renders the styled element.

### `styled('div')`, `styled('span')`, etc.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for more details.

## Issues

If you find any issues, please open an issue on the [GitHub repository](https://github.com/SecptrumLab/styled-chroma/issues).

## Contributing

We welcome contributions to styled-chroma! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

For more detailed information on how to contribute, please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Rollup](https://rollupjs.org/)
- [Babel](https://babeljs.io/)
