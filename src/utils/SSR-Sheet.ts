class StyleSheetManager {
  private styles: Set<string> = new Set();
  private isServer: boolean;
  private styleSheet: CSSStyleSheet | null = null;

  constructor() {
    this.isServer = typeof window === 'undefined';
    if (!this.isServer) {
      this.initBrowserStyleSheet();
    }
  }

  addStyle(rule: string): void {
    if (!this.styles.has(rule)) {
      this.styles.add(rule);
      if (!this.isServer) {
        this.insertRuleInBrowser(rule);
      }
    }
  }

  removeStyle(rule: string): void {
    if (this.styles.has(rule)) {
      this.styles.delete(rule);
      if (!this.isServer) {
        this.removeRuleInBrowser(rule);
      }
    }
  }

  clearStyles(): void {
    this.styles.clear();
    if (!this.isServer) {
      this.clearStylesInBrowser();
    }
  }

  getStylesAsString(): string {
    return Array.from(this.styles).join('\n');
  }

  /**
   * collect styles for the next render
   */
  collectStyles(): string {
    return this.getStylesAsString();
  }

  /**
   * reset styles for the next render
   */
  resetStyles(): void {
    this.clearStyles();
  }

  private initBrowserStyleSheet(): void {
    if (document) {
      const style = document.createElement('style');
      document.head.appendChild(style);
      this.styleSheet = style.sheet;
    }
  }

  private insertRuleInBrowser(rule: string): void {
    if (this.styleSheet) {
      this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
    }
  }

  private removeRuleInBrowser(rule: string): void {
    if (this.styleSheet) {
      for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
        if (this.styleSheet.cssRules[i].cssText === rule) {
          this.styleSheet.deleteRule(i);
          break;
        }
      }
    }
  }

  private clearStylesInBrowser(): void {
    if (this.styleSheet) {
      while (this.styleSheet.cssRules.length > 0) {
        this.styleSheet.deleteRule(0);
      }
    }
  }
}
/**
 * StyleSheetManager class for managing styles in both server-side and client-side environments.
 *
 * This class provides methods to add, remove, and manage styles, handling the differences
 * between server-side rendering (SSR) and client-side rendering.
 *
 * @class
 */

export const styleSheetManager = new StyleSheetManager();
