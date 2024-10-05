import css from "./utils/css";

/**
 * Creates a global style by injecting CSS into the document's head.
 *
 * @param {TemplateStringsArray} strings - The static parts of the template literal.
 * @param {...any} interpolations - The dynamic values to be interpolated into the CSS.
 * @returns {() => void} A function to remove the injected styles.
 *
 * @example
 * const GlobalStyle = createGlobalStyle`
 *   body {
 *     margin: 0;
 *     padding: 0;
 *     background-color: ${props => props.theme.backgroundColor};
 *   }
 * `;
 */

const createGlobalStyle = (
  strings: TemplateStringsArray,
  ...interpolations: any[]
) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = css(strings, ...interpolations);
  if (typeof window !== "undefined" && document) {
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }
};

export default createGlobalStyle;
