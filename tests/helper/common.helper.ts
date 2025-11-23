export const commonHelper = {
  cleanText(text: string | null | undefined): string {
    if (!text) return "N/A";
    return text.replace(/\s+/g, " ").trim();
  }
};
