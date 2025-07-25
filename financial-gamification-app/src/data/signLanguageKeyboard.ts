export interface SignLanguageKey {
  value: string;
  signUrl: string;
  label: string;
  description?: string;
}

export interface SignLanguageCategory {
  name: string;
  icon: string;
  keys: SignLanguageKey[];
}

export const signLanguageKeyboard: SignLanguageCategory[] = [
  {
    name: 'Numbers',
    icon: '🔢',
    keys: [
      {
        value: '0',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Zero',
        description: 'Closed fist, forming "O" shape'
      },
      {
        value: '1',
        signUrl: '/signs/number-1.svg',
        label: 'One',
        description: 'Index finger pointing up'
      },
      {
        value: '2',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Two',
        description: 'Index and middle fingers extended'
      },
      {
        value: '3',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Three',
        description: 'Thumb, index, and middle fingers extended'
      },
      {
        value: '4',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Four',
        description: 'Four fingers extended, thumb tucked'
      },
      {
        value: '5',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Five',
        description: 'All fingers extended'
      },
      {
        value: '6',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Six',
        description: 'Thumb and pinky extended'
      },
      {
        value: '7',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Seven',
        description: 'Thumb, index, and middle spread'
      },
      {
        value: '8',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Eight',
        description: 'Thumb and three fingers spread'
      },
      {
        value: '9',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Nine',
        description: 'Index finger curved down'
      }
    ]
  },
  {
    name: 'Common Words',
    icon: '🗣️',
    keys: [
      {
        value: 'yes',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Yes',
        description: 'Fist nodding up and down'
      },
      {
        value: 'no',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'No',
        description: 'Index and middle finger moving side to side'
      },
      {
        value: 'help',
        signUrl: '/signs/number-1-enhanced.svg', // fallback
        label: 'Help',
        description: 'Thumb up, palm up, lifted by other hand'
      },
      {
        value: 'understand',
        signUrl: '/signs/number-1-enhanced.svgunderstand.svg',
        label: 'Understand',
        description: 'Index finger moving from temple forward'
      }
    ]
  },
  {
    name: 'Finance Terms',
    icon: '$',
    keys: [
      {
        value: 'money',
        signUrl: '/signs/number-1-enhanced.svgmoney.svg',
        label: 'Money',
        description: 'Rubbing thumb against fingers'
      },
      {
        value: 'save',
        signUrl: '/signs/number-1-enhanced.svgsave.svg',
        label: 'Save',
        description: 'Money sign moving into pocket motion'
      },
      {
        value: 'bank',
        signUrl: '/signs/number-1-enhanced.svgbank.svg',
        label: 'Bank',
        description: 'B-hand shape with money motion'
      },
      {
        value: 'pay',
        signUrl: '/signs/number-1-enhanced.svgpay.svg',
        label: 'Pay',
        description: 'P-hand shape with giving motion'
      }
    ]
  }
];
