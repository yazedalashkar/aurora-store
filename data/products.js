export const categories = ['الكل', 'خواتم', 'أساور', 'فساتين'];

export const products = [
  {
    id: 1,
    name: 'طقم خواتم كلاسيكي',
    category: 'خواتم',
    price: 2.5,
    originalPrice: 4.9,
    image: '/productsPictures/rings.png',
    description: 'طقم أنيق يجمع بين النعومة والفخامة، يضم خاتماً بتصميم أوراق الشجر المرصعة بالفصوص اللامعة وآخر أسود عصري بلمسة رجالية جذابة، مثالي للهدايا',
    badge: 'Sale',
  },
  {
    id: 2,
    name: 'سوار وردي ناعم',
    category: 'أساور',
    price: 1.5,
    originalPrice: 3.9,
    image: '/productsPictures/wristband.png',
    description: 'سوار فضي رقيق مزين بتفاصيل على شكل أوراق شجر وفصوص وردية وبيضاء متلألئة، يمنح اليد لمسة من الأنوثة والجمال الراقي في المناسبات البسيطة.',
    badge: 'Sale',
  },
  {
    id: 3,
    name: 'ميدالية مفاتيح رياضية',
    category: 'أساور',
    price: 0.9,
    originalPrice: 2.9,
    image: '/productsPictures/keyring.png',
    description: 'مجموعة ميداليات مبتكرة لعشاق اللياقة البدنية، تشمل تصاميم مصغرة لقرص الوزن، زجاجة البروتين، وكوب "ستانلي" الشهير بأسلوب عصري ومرح.',
    badge: 'Sale',
  },
  {
    id: 4,
    name: 'فستان سهرة أومبري',
    category: 'فساتين',
    price: 21.9,
    originalPrice: 44.9,
    image: '/productsPictures/dress.png',
    description: ' فستان طويل بتصميم "حورية البحر" وبدون أكمام، يتميز بتدرج لوني ساحر يبدأ من الكحلي الداكن وينتهي بالسماوي الفاتح ليبرز جمال القوام بأناقة فائقة.',
    badge: 'Sale',
  },
];

export const featuredProducts = products.filter((p) =>
  [1, 2, 3, 4].includes(p.id)
);
