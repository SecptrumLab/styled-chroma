class StyleSheetManager {
  private styleSheet: CSSStyleSheet | null = null;
  private styles: Set<string> = new Set();

  constructor() {
    if (typeof window !== "undefined" && document) {
      const style = document.createElement("style");
      document.head.appendChild(style);
      this.styleSheet = style.sheet;
    }
  }

  addStyle(rule: string): void {
    if (this.styleSheet && !this.styles.has(rule)) {
      this.styles.add(rule);
      this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
    }
  }

  removeStyle(rule: string): void {
    if (this.styleSheet && this.styles.has(rule)) {
      this.styles.delete(rule);
      for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
        if (this.styleSheet.cssRules[i].cssText === rule) {
          this.styleSheet.deleteRule(i);
          break;
        }
      }
    }
  }

  clearStyles(): void {
    if (this.styleSheet) {
      while (this.styleSheet.cssRules.length > 0) {
        this.styleSheet.deleteRule(0);
      }
      this.styles.clear();
    }
  }
}

export const styleSheetManager = new StyleSheetManager();
