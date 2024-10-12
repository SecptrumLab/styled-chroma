# styled-chroma

A flexible styling library for React.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Using With Types](#using-with-types)
- [Exported Types](#exported-types)
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

- Intuitive API for easy styling
- Type-safe styling with TypeScript support
- Performance optimized with minimal runtime overhead
- Customizable and extendable
- Automatic vendor prefixing for cross-browser compatibility
- No dependencies on external libraries
- Filters invalid props from being passed to the DOM
- Supports dynamic styling based on props

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

## Using With Types

styled-chroma is fully compatible with TypeScript and provides type definitions for all HTML elements. Here's how you can use it with types:

1. Basic usage with inferred types:

```tsx
import styled from "styled-chroma";

const Button = styled("button")`
  background-color: blue;
  color: white;
  padding: 10px 20px;
`;

// Button will automatically have the correct HTML button element props
```

2. Extending HTML element props:

```tsx
import { styled } from "styled-chroma";
import { ButtonProps } from "styled-chroma/dist/types";

interface CustomButtonProps extends ButtonProps {
  isActive?: boolean;
}

const Button = styled<CustomButtonProps>("button")`
  background-color: ${(props) => (props.isActive ? "blue" : "gray")};
  color: white;
  padding: 10px 20px;
`;

// Usage
<Button isActive={true} onClick={() => console.log("Clicked!")}>
  Click me
</Button>;
```

3. Using with custom components:

```tsx
import styled from "styled-chroma";
import { ComponentProps } from "react";

const CustomComponent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={className}>{children}</div>;

interface StyledCustomComponentProps
  extends ComponentProps<typeof CustomComponent> {
  backgroundColor?: string;
}

const StyledCustomComponent = styled(
  CustomComponent
)<StyledCustomComponentProps>`
  background-color: ${(props) => props.backgroundColor || "white"};
  padding: 20px;
`;

// Usage
<StyledCustomComponent backgroundColor="lightblue">
  Custom styled component
</StyledCustomComponent>;
```

By leveraging TypeScript with styled-chroma, you get full type checking for your styled components, including autocomplete for HTML attributes and custom props.

## Exported Types

styled-chroma exports type definitions for all HTML elements. You can import these types from `styled-chroma/dist/types`. Here's a list of all exported types:

- `ButtonProps`
- `AnchorProps`
- `InputProps`
- `TextareaProps`
- `SelectProps`
- `FormProps`
- `ImageProps`
- `DivProps`
- `SpanProps`
- `ParagraphProps`
- `ListItemProps`
- `UnorderedListProps`
- `OrderedListProps`
- `TableProps`
- `TableRowProps`
- `TableCellProps`
- `HeaderProps`
- `LabelProps`
- `ArticleProps`
- `SectionProps`
- `NavProps`
- `AsideProps`
- `FooterProps`
- `MainProps`
- `AddressProps`
- `AudioProps`
- `VideoProps`
- `CanvasProps`
- `EmbedProps`
- `IFrameProps`
- `ObjectProps`
- `PictureProps`
- `SourceProps`
- `TrackProps`
- `DetailsProps`
- `DialogProps`
- `MenuProps`
- `SummaryProps`
- `DataProps`
- `TimeProps`
- `VarProps`
- `CodeProps`
- `PreProps`
- `BlockquoteProps`
- `CiteProps`
- `DelProps`
- `InsProps`
- `KbdProps`
- `MarkProps`
- `QProps`
- `SProps`
- `SampProps`
- `StrongProps`
- `SubProps`
- `SupProps`
- `WbrProps`
- `AreaProps`
- `MapProps`
- `ColProps`
- `ColGroupProps`
- `CaptionProps`
- `THeadProps`
- `TBodyProps`
- `TFootProps`
- `ThProps`
- `FieldsetProps`
- `LegendProps`
- `DatalistProps`
- `OptGroupProps`
- `OptionProps`
- `OutputProps`
- `ProgressProps`
- `MeterProps`
- `HtmlProps`
- `HeadProps`
- `BaseProps`
- `MetaProps`
- `ScriptProps`
- `NoScriptProps`
- `TemplateProps`
- `SlotProps`

You can use these types to extend the props of your styled components or to type-check your components. For example:

```tsx
import styled from "styled-chroma";
import { ButtonProps } from "styled-chroma/types";

interface CustomButtonProps extends ButtonProps {
  isActive?: boolean;
}

const Button = styled<CustomButtonProps>("button")`
  // ... styles ...
`;
```

This ensures type safety and provides autocompletion for all standard HTML attributes plus your custom props.

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
