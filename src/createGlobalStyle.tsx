import React from "react";
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

    // return () => {
    //   document.head.removeChild(styleElement);
    // };
  }

  return () => {
    /**
     * A React component that applies global styles to the document.
     * This component uses useEffect to append and remove a style element from the document head.
     *
     * @returns {React.FC} A React functional component that renders nothing (null) but applies global styles.
     *
     * @example
     * const GlobalStyles = createGlobalStyle`
     *   body {
     *     margin: 0;
     *     padding: 0;
     *   }
     * `;
     *
     *  const App = () => {
     *    return (
     *      <>
     *        <GlobalStyles />
     *      </>
     *    );
     *  }
     **/
    const GlobalStyles = () => {
      React.useEffect(() => {
        if (typeof window !== "undefined" && document) {
          document.head.appendChild(styleElement);
          return () => {
            document.head.removeChild(styleElement);
          };
        }
      }, []);

      return null;
    };

    return <GlobalStyles />;
  };
};

export default createGlobalStyle;
