// src/StyleSheetManager.ts
class StyleSheetManager {
  private styleSheet: HTMLStyleElement;
  private styles: Set<string>;

  constructor() {
    this.styleSheet = document.createElement("style");
    this.styles = new Set();
    document.head.appendChild(this.styleSheet);
  }

  addStyle(rule: string): void {
    if (!this.styles.has(rule)) {
      this.styles.add(rule);
      this.styleSheet.innerHTML += rule;
    }
  }
}

export const styleSheetManager = new StyleSheetManager();
