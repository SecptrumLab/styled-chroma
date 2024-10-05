import React from "react";
import { styleSheetManager } from "./utils/StyleSheetManger";
import { StandardProperties } from "./types";
type ExtendedProperties = StandardProperties & {
  [key: string]: ExtendedProperties | string | number | undefined;
};
type Interpolation =
  | string
  | number
  | ExtendedProperties
  | ((props: any) => string | number);

type StyledFunction = <
  Tag extends keyof JSX.IntrinsicElements,
  CustomProps = {}
>(
  tag: Tag
) => (
  strings: TemplateStringsArray,
  ...interpolations: Array<Interpolation>
) => React.FC<JSX.IntrinsicElements[Tag] & CustomProps>;

const parseStyles = (css: string, props: any): ExtendedProperties => {
  const result: ExtendedProperties = {};
  let currentObj = result;
  const stack: ExtendedProperties[] = [];

  css.split(/(?<=})|(?<=;)/).forEach((rule) => {
    rule = rule.trim();
    if (!rule) return;

    if (rule.includes("{")) {
      const [selector, styles] = rule.split("{");
      currentObj[selector.trim()] = {};
      stack.push(currentObj);
      currentObj = currentObj[selector.trim()] as ExtendedProperties;
      Object.assign(currentObj, parseStyles(styles, props));
    } else if (rule === "}") {
      currentObj = stack.pop() || result;
    } else {
      const [key, value] = rule.split(":").map((s) => s.trim());
      if (key && value) {
        currentObj[key] =
          typeof value === "function" ? value ?? props : value.replace(";", "");
      }
    }
  });

  return result;
};

const generateStyleString = (
  styles: ExtendedProperties,
  selector: string = ""
): string => {
  let styleString = "";
  Object.entries(styles).forEach(([key, value]) => {
    if (typeof value === "object") {
      if (key.startsWith("@media")) {
        styleString += `${key} { ${generateStyleString(value, selector)} }`;
      } else {
        const newSelector = selector
          ? key.startsWith("&")
            ? selector + key.slice(1)
            : `${selector} ${key}`
          : key;
        styleString += generateStyleString(value, newSelector);
      }
    } else {
      if (selector) {
        styleString += `${selector} { ${key}: ${value}; }`;
      } else {
        styleString += `${key}: ${value}; `;
      }
    }
  });
  return styleString;
};
/**
 * Generates a styled component function.
 *
 * @type {StyledFunction}
 * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be styled.
 * @returns {Function} A function that takes template literals and returns a React component.
 *
 * @example
 * const Button = styled('button')`
 *   background-color: blue;
 *   color: white;
 *   padding: 10px 20px;
 * `;
 *
 * // Usage:
 * <Button onClick={() => console.log('Clicked!')}>Click me</Button>
 */

const styled: StyledFunction = (tag: keyof JSX.IntrinsicElements) => {
  return (
    strings: TemplateStringsArray,
    ...interpolations: Array<Interpolation>
  ) => {
    return React.forwardRef((props: any, ref) => {
      const css = strings.reduce((acc, str, i) => {
        const interpolation = interpolations[i];
        if (typeof interpolation === "function") {
          return acc + str + interpolation(props);
        }
        return acc + str + (interpolation || "");
      }, "");

      const styles = parseStyles(css, props);
      const className = `css-${Math.random().toString(36).substr(2, 7)}`;
      const styleString = `.${className} { ${generateStyleString(styles)} }`;
      styleSheetManager.addStyle(styleString);

      const validProps = Object.keys((tag as any).propTypes || {});

      // Handle props
      const { prefixedProps, remainingProps } = Object.entries(props).reduce<{
        prefixedProps: Record<string, any>;
        remainingProps: Record<string, any>;
      }>(
        (acc, [key, value]) => {
          if (
            key !== "children" &&
            key !== "className" &&
            key !== "ref" &&
            !key.startsWith("data-") &&
            !validProps.includes(key)
          ) {
            if (typeof value === "function") {
              acc.remainingProps[key] = value;
            } else {
              acc.prefixedProps[`data-${key.toLowerCase()}`] = value;
            }
          } else {
            acc.remainingProps[key] = value;
          }
          return acc;
        },
        { prefixedProps: {}, remainingProps: {} }
      );

      return React.createElement(tag, {
        ...prefixedProps,
        ...remainingProps,
        ref,
        className: `${className} ${props.className || ""}`,
      });
    });
  };
};

export default styled;
