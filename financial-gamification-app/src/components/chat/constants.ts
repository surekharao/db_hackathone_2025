export const emojis = {
  reactions: {
    title: "Reactions",
    list: [
      "👍",
      "👎",
      "😊",
      "❤️",
      "🙌",
      "👏",
      "🎉",
      "🤔",
      "😮",
      "💪",
      "👌",
      "✨",
    ],
  },
  gestures: {
    title: "Hand Gestures",
    list: [
      "👋",
      "✌️",
      "👌",
      "🤝",
      "🤲",
      "🤞",
      "🙏",
      "🤙",
      "👈",
      "✋",
      "👐",
      "🤚",
    ],
  },
  finance: {
    title: "Finance & Business",
    list: [
      "💰",
      "💵",
      "💳",
      "🏦",
      "📈",
      "📉",
      "💹",
      "🤑",
      "💸",
      "💼",
      "📊",
      "💡",
    ],
  },
  expressions: {
    title: "Expressions",
    list: [
      "😄",
      "😅",
      "😂",
      "🤣",
      "😘",
      "😉",
      "😍",
      "🤩",
      "😘",
      "🥳",
      "😎",
      "🤓",
    ],
  },
  indicators: {
    title: "Indicators",
    list: [
      "✅",
      "❌",
      "⭐",
      "❗",
      "❓",
      "⚡",
      "🔥",
      "💯",
      "🎯",
      "🎯",
      "🎲",
      "🔔",
    ],
  },
};

// Hindi keyboard layout (Devanagari script)
export const hindiKeyboard = [
  ["१", "२", "३", "४", "५", "६", "७", "८", "९", "०"],
  ["औ", "ै", "ा", "ी", "ू", "ब", "ह", "ग", "द", "ज", "ड़"],
  ["ो", "े", "्", "ि", "ु", "प", "र", "क", "त", "च", "ट"],
  ["ॉ", "ं", "म", "न", "व", "ल", "स", ",", ".", "य"],
];

// Common Hindi words for finance
export const hindiFinanceWords = [
  { hindi: "पैसा", english: "money", transliteration: "paisa" },
  { hindi: "बैंक", english: "bank", transliteration: "bank" },
  { hindi: "बचत", english: "savings", transliteration: "bachat" },
  { hindi: "निवेश", english: "investment", transliteration: "nivesh" },
  { hindi: "ऋण", english: "loan", transliteration: "rin" },
  { hindi: "जमा", english: "deposit", transliteration: "jama" },
  { hindi: "खाता", english: "account", transliteration: "khata" },
  { hindi: "व्याज", english: "interest", transliteration: "vyaj" },
];

// Chinese keyboard layout (Simplified Chinese with Pinyin)
export const chineseKeyboard = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["钱", "银行", "储蓄", "投资", "贷款", "存款", "账户", "利息"],
  ["支付", "收入", "支出", "预算", "债务", "资产", "股票", "基金"],
  ["保险", "退休", "理财", "风险", "收益", "市场", "经济", "财务"],
];

// Chinese finance words with pinyin
export const chineseFinanceWords = [
  { chinese: "钱", pinyin: "qián", english: "money" },
  { chinese: "银行", pinyin: "yínháng", english: "bank" },
  { chinese: "储蓄", pinyin: "chǔxù", english: "savings" },
  { chinese: "投资", pinyin: "tóuzī", english: "investment" },
  { chinese: "贷款", pinyin: "dàikuǎn", english: "loan" },
  { chinese: "存款", pinyin: "cúnkuǎn", english: "deposit" },
  { chinese: "账户", pinyin: "zhànghù", english: "account" },
  { chinese: "利息", pinyin: "lìxī", english: "interest" },
];
