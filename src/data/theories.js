// Radiation types
export const RADIATION_TYPES = [
  {
    type: 'alpha',
    symbol: 'α',
    name: 'Tia Alpha',
    damage: 1,
    hints: [
      'Tia này có thể bị lệch trong điện trường',
      'Tia này có khối lượng lớn nhất',
      'Tia này là hạt nhân Heli',
      'Tia này không phải là sóng điện từ',
      'Tia này có tốc độ chậm nhất'
    ]
  },
  {
    type: 'beta',
    symbol: 'β',
    name: 'Tia Beta',
    damage: 2,
    hints: [
      'Tia này có thể bị lệch trong điện trường mạnh hơn Alpha',
      'Tia này là dòng electron',
      'Tia này không phải là sóng điện từ',
      'Tia này có khối lượng nhỏ hơn Alpha',
      'Tia này nhanh hơn Alpha nhưng chậm hơn Gamma'
    ]
  },
  {
    type: 'gamma',
    symbol: 'γ',
    name: 'Tia Gamma',
    damage: 3,
    hints: [
      'Tia này KHÔNG bị lệch trong điện trường',
      'Tia này là sóng điện từ',
      'Tia này có năng lượng cao nhất',
      'Tia này không mang điện tích',
      'Tia này có khả năng đâm xuyên mạnh nhất'
    ]
  }
]

// Physics theories for the game
export const THEORIES = [
  {
    statement: 'Tia Alpha có khả năng đâm xuyên mạnh nhất trong ba loại tia phóng xạ',
    invertedStatement: 'Tia Alpha có khả năng đâm xuyên yếu nhất trong ba loại tia phóng xạ',
    isTrue: false,
    explanation: 'Sai. Tia Gamma có khả năng đâm xuyên mạnh nhất'
  },
  {
    statement: 'Tia Beta là dòng electron chuyển động nhanh',
    invertedStatement: 'Tia Beta không phải là dòng electron',
    isTrue: true,
    explanation: 'Đúng. Tia Beta thực chất là các electron'
  },
  {
    statement: 'Tia Gamma bị lệch trong điện trường',
    invertedStatement: 'Tia Gamma không bị lệch trong điện trường',
    isTrue: false,
    explanation: 'Sai. Tia Gamma là sóng điện từ, không mang điện nên không bị lệch'
  },
  {
    statement: 'Tấm chì có thể chặn được tia Alpha',
    invertedStatement: 'Tấm chì không thể chặn được tia Alpha',
    isTrue: true,
    explanation: 'Đúng. Chì có thể chặn mọi loại tia phóng xạ'
  },
  {
    statement: 'Tia Alpha là hạt nhân Heli (2 proton + 2 neutron)',
    invertedStatement: 'Tia Alpha không phải là hạt nhân Heli',
    isTrue: true,
    explanation: 'Đúng. Tia Alpha chính là hạt nhân nguyên tử Heli'
  },
  {
    statement: 'Giấy có thể chặn tia Gamma',
    invertedStatement: 'Giấy không thể chặn tia Gamma',
    isTrue: false,
    explanation: 'Sai. Giấy chỉ có thể chặn tia Alpha, không chặn được Gamma'
  },
  {
    statement: 'Tia Beta có khối lượng lớn hơn tia Alpha',
    invertedStatement: 'Tia Beta có khối lượng nhỏ hơn tia Alpha',
    isTrue: false,
    explanation: 'Sai. Electron (Beta) có khối lượng nhỏ hơn nhiều so với hạt Alpha'
  },
  {
    statement: 'Tia Gamma là sóng điện từ có tần số rất cao',
    invertedStatement: 'Tia Gamma không phải là sóng điện từ',
    isTrue: true,
    explanation: 'Đúng. Tia Gamma là dạng sóng điện từ năng lượng cao'
  },
  {
    statement: 'Tia Alpha mang điện tích dương',
    invertedStatement: 'Tia Alpha mang điện tích âm',
    isTrue: true,
    explanation: 'Đúng. Tia Alpha (2 proton + 2 neutron) mang điện tích +2e'
  },
  {
    statement: 'Tấm nhôm có thể chặn cả ba loại tia phóng xạ',
    invertedStatement: 'Tấm nhôm không thể chặn cả ba loại tia phóng xạ',
    isTrue: false,
    explanation: 'Sai. Nhôm chỉ chặn được Alpha và Beta, không chặn được Gamma'
  },
  {
    statement: 'Tia Beta mang điện tích âm',
    invertedStatement: 'Tia Beta mang điện tích dương',
    isTrue: true,
    explanation: 'Đúng. Tia Beta là electron nên mang điện tích âm'
  },
  {
    statement: 'Tốc độ của tia Gamma bằng tốc độ ánh sáng',
    invertedStatement: 'Tốc độ của tia Gamma chậm hơn tốc độ ánh sáng',
    isTrue: true,
    explanation: 'Đúng. Tia Gamma là sóng điện từ nên truyền với tốc độ ánh sáng'
  },
  {
    statement: 'Tia Alpha có thể xuyên qua tấm nhôm dày',
    invertedStatement: 'Tia Alpha không thể xuyên qua tấm nhôm dày',
    isTrue: false,
    explanation: 'Sai. Tia Alpha bị chặn bởi giấy và nhôm'
  },
  {
    statement: 'Trong ba loại tia, tia Alpha có khối lượng lớn nhất',
    invertedStatement: 'Trong ba loại tia, tia Alpha có khối lượng nhỏ nhất',
    isTrue: true,
    explanation: 'Đúng. Alpha là hạt nhân Heli, nặng nhất trong ba loại'
  },
  {
    statement: 'Tia Gamma không mang điện tích',
    invertedStatement: 'Tia Gamma mang điện tích',
    isTrue: true,
    explanation: 'Đúng. Tia Gamma là sóng điện từ, không mang điện'
  },
  {
    statement: 'Tia Beta có thể bị lệch bởi từ trường',
    invertedStatement: 'Tia Beta không thể bị lệch bởi từ trường',
    isTrue: true,
    explanation: 'Đúng. Beta là hạt mang điện nên bị lệch bởi từ trường'
  },
  {
    statement: 'Năng lượng của tia Alpha lớn hơn tia Gamma',
    invertedStatement: 'Năng lượng của tia Alpha nhỏ hơn tia Gamma',
    isTrue: false,
    explanation: 'Sai. Tia Gamma có năng lượng cao nhất'
  },
  {
    statement: 'Tờ giấy có thể chặn hoàn toàn tia Alpha',
    invertedStatement: 'Tờ giấy không thể chặn hoàn toàn tia Alpha',
    isTrue: true,
    explanation: 'Đúng. Một tờ giấy đủ để chặn tia Alpha'
  },
  {
    statement: 'Tia phóng xạ có thể ion hóa không khí',
    invertedStatement: 'Tia phóng xạ không thể ion hóa không khí',
    isTrue: true,
    explanation: 'Đúng. Các tia phóng xạ đều có khả năng ion hóa'
  },
  {
    statement: 'Tia Beta nhanh hơn tia Alpha',
    invertedStatement: 'Tia Beta chậm hơn tia Alpha',
    isTrue: true,
    explanation: 'Đúng. Electron nhẹ hơn nên chuyển động nhanh hơn'
  }
]
