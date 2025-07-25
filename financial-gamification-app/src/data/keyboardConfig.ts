export interface KeyboardConfig {
  label: string;
  keys: string[];
  signLanguageUrls?: Record<string, string>;
  translations?: Record<string, string>;
  audioUrls?: Record<string, string>;
}

export const keyboardConfigs: Record<string, KeyboardConfig> = {
  english: {
    label: "English",
    keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "⌫"],
    signLanguageUrls: {
      "1": "/signs/number-1-enhanced.svg",
      "2": "/signs/number-2-enhanced.svg",
      "3": "/signs/number-3-enhanced.svg",
      "4": "/signs/number-4-enhanced.svg",
      "5": "/signs/number-5-enhanced.svg",
      "6": "/signs/number-6-enhanced.svg",
      "7": "/signs/number-7-enhanced.svg",
      "8": "/signs/number-8-enhanced.svg",
      "9": "/signs/number-9-enhanced.svg",
      "0": "/signs/number-0-enhanced.svg"
    }
  },
  hindi: {
    label: "हिंदी",
    keys: [
      "१", "२", "३",
      "४", "५", "६",
      "७", "८", "९",
      "०", ".", "⌫"
    ],
    translations: {
      "१": "एक",
      "२": "दो",
      "३": "तीन",
      "४": "चार",
      "५": "पाँच",
      "६": "छः",
      "७": "सात",
      "८": "आठ",
      "९": "नौ",
      "०": "शून्य",
      ".": "दशमलव",
      "⌫": "मिटाएं"
    },
    signLanguageUrls: {
      "१": "/signs/hindi/number-1.svg",
      "२": "/signs/hindi/number-2.svg",
      "३": "/signs/hindi/number-3.svg",
      "४": "/signs/hindi/number-4.svg",
      "५": "/signs/hindi/number-5.svg",
      "६": "/signs/hindi/number-6.svg",
      "७": "/signs/hindi/number-7.svg",
      "८": "/signs/hindi/number-8.svg",
      "९": "/signs/hindi/number-9.svg",
      "०": "/signs/hindi/number-0.svg"
    }
  },
  chinese: {
    label: "中文",
    keys: [
      "一", "二", "三",
      "四", "五", "六",
      "七", "八", "九",
      "零", "。", "⌫"
    ],
  }
};

// ASL (American Sign Language) number signs
export const signLanguageUrls = {
  "0": "/signs/number-0.svg",
  "1": "/signs/number-1.svg",
  "2": "/signs/number-2.svg",
  "3": "/signs/number-3.svg",
  "4": "/signs/number-4.svg",
  "5": "/signs/number-5.svg",
  "6": "/signs/number-6.svg",
  "7": "/signs/number-7.svg",
  "8": "/signs/number-8.svg",
  "9": "/signs/number-9.svg"
};
