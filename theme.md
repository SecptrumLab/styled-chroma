## Working with Themes

If you're using a theme provider from a library like styled-components or emotion, you can access the theme in your styled components:

```typescript
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "blue",
    secondary: "gray",
  },
};

const ThemedButton = styled<"button", { secondary?: boolean }>("button")`
  background-color: ${(props) =>
    props.secondary
      ? props.theme.colors.secondary
      : props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`;

// Usage
<ThemeProvider theme={theme}>
  <ThemedButton>Primary</ThemedButton>
  <ThemedButton secondary>Secondary</ThemedButton>
</ThemeProvider>;
```
