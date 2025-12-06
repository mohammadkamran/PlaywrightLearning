export const commonHelper = {
  cleanText(text: string | null | undefined): string {
    if (!text) return "N/A";
    return text.replace(/\s+/g, " ").trim();
  }
};

export function generateRandomEmail(prefix: string = 'user'): string {
  const timestamp = Date.now();
  return `${prefix}_${timestamp}@example.com`;
};

