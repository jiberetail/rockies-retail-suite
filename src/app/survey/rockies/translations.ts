import type { MerchandiseAudience, MerchandiseCategory } from "./catalog";

export type SurveyLanguage = "en" | "es" | "ko" | "ja" | "zh";

export interface SurveyCopy {
  languageTitle: string;
  languageSubtitle: string;
  locationTitle: string;
  locationSubtitle: string;
  zipLabel: string;
  zipPlaceholder: string;
  zipHelp: string;
  surveyEyebrow: string;
  questions: [string, string, string];
  yes: string;
  no: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  productsTitle: string;
  productsSubtitle: string;
  productOnlineEyebrow: string;
  productOnlineTitle: string;
  productOnlineSubtitle: string;
  scanToShop: string;
  onlineNote: string;
  feedbackTitle: string;
  feedbackSubtitle: string;
  feedbackOptions: [string, string, string, string, string, string];
  otherPlaceholder: string;
  ratingTitle: string;
  ratingSubtitle: string;
  ratingLabels: [string, string, string];
  thankYouTitle: string;
  thankYouSubtitle: string;
  claimDiscount: string;
  discountTitle: string;
  discountSubtitle: string;
  discountLegal: string;
  returning: string;
  continue: string;
  back: string;
  home: string;
  selected: string;
  categoryLabels: Record<MerchandiseCategory, string>;
  audienceLabels: Record<MerchandiseAudience, string>;
}

export const languages: Array<{
  code: SurveyLanguage;
  name: string;
  englishName: string;
}> = [
  { code: "en", name: "English", englishName: "English" },
  { code: "es", name: "Español", englishName: "Spanish" },
  { code: "ko", name: "한국어", englishName: "Korean" },
  { code: "ja", name: "日本語", englishName: "Japanese" },
  { code: "zh", name: "中文", englishName: "Chinese" },
];

export const countryOptions: Array<{
  code: string;
  flag: string;
  labels: Record<SurveyLanguage, string>;
}> = [
  {
    code: "US",
    flag: "🇺🇸",
    labels: { en: "United States", es: "Estados Unidos", ko: "미국", ja: "アメリカ", zh: "美国" },
  },
  {
    code: "CA",
    flag: "🇨🇦",
    labels: { en: "Canada", es: "Canadá", ko: "캐나다", ja: "カナダ", zh: "加拿大" },
  },
  {
    code: "MX",
    flag: "🇲🇽",
    labels: { en: "Mexico", es: "México", ko: "멕시코", ja: "メキシコ", zh: "墨西哥" },
  },
  {
    code: "JP",
    flag: "🇯🇵",
    labels: { en: "Japan", es: "Japón", ko: "일본", ja: "日本", zh: "日本" },
  },
  {
    code: "KR",
    flag: "🇰🇷",
    labels: { en: "South Korea", es: "Corea del Sur", ko: "대한민국", ja: "韓国", zh: "韩国" },
  },
  {
    code: "OTHER",
    flag: "🌎",
    labels: { en: "Somewhere else", es: "Otro lugar", ko: "기타 지역", ja: "その他", zh: "其他地区" },
  },
];

const categoryLabels = (values: string[]): Record<MerchandiseCategory, string> => ({
  Jerseys: values[0],
  Hats: values[1],
  "T-Shirts": values[2],
  Outerwear: values[3],
  "Accessories & Gifts": values[4],
});

const audienceLabels = (values: string[]): Record<MerchandiseAudience, string> => ({
  All: values[0],
  Men: values[1],
  Women: values[2],
  Kids: values[3],
});

export const surveyCopy: Record<SurveyLanguage, SurveyCopy> = {
  en: {
    languageTitle: "Choose your language",
    languageSubtitle: "Select a language to begin your store survey.",
    locationTitle: "Where are you visiting from?",
    locationSubtitle: "This helps us understand Rockies fans from everywhere.",
    zipLabel: "ZIP code",
    zipPlaceholder: "Enter 5 digits",
    zipHelp: "Optional — skip it if you prefer.",
    surveyEyebrow: "Dugout Store Survey",
    questions: [
      "Were you able to find what you were looking for?",
      "Are you satisfied with your shopping experience?",
      "Did you interact with a store associate today?",
    ],
    yes: "Yes",
    no: "No",
    categoriesTitle: "What were you looking for?",
    categoriesSubtitle: "Choose the closest merchandise category.",
    productsTitle: "Which item is closest?",
    productsSubtitle: "Select an item and we’ll help you find it online.",
    productOnlineEyebrow: "Keep shopping",
    productOnlineTitle: "We found it online",
    productOnlineSubtitle: "Scan to check current options and availability on Fanatics.",
    scanToShop: "Scan to shop this item",
    onlineNote: "Selection and availability may change. Product names are shown as listed online.",
    feedbackTitle: "What affected your experience?",
    feedbackSubtitle: "Choose all that apply.",
    feedbackOptions: [
      "Item was unavailable",
      "Couldn’t find my size",
      "Needed more help",
      "Checkout took too long",
      "Store was hard to shop",
      "Something else",
    ],
    otherPlaceholder: "Tell us what happened (optional)",
    ratingTitle: "How was your associate interaction?",
    ratingSubtitle: "Your feedback helps our team improve.",
    ratingLabels: ["Great", "Okay", "Poor"],
    thankYouTitle: "Thanks for helping us improve",
    thankYouSubtitle: "Your feedback makes the Dugout Store better for every Rockies fan.",
    claimDiscount: "Get my 10% discount",
    discountTitle: "Your 10% discount is ready",
    discountSubtitle: "Scan this code and save it for your next Dugout Store purchase.",
    discountLegal: "Valid at participating Colorado Rockies Dugout Store locations for 30 days. Restrictions may apply.",
    returning: "New survey in",
    continue: "Continue",
    back: "Back",
    home: "Start over",
    selected: "Selected",
    categoryLabels: categoryLabels(["Jerseys", "Hats", "T-Shirts", "Outerwear", "Accessories & gifts"]),
    audienceLabels: audienceLabels(["All", "Men", "Women", "Kids"]),
  },
  es: {
    languageTitle: "Elige tu idioma",
    languageSubtitle: "Selecciona un idioma para comenzar la encuesta.",
    locationTitle: "¿Desde dónde nos visitas?",
    locationSubtitle: "Esto nos ayuda a conocer a los fans de los Rockies.",
    zipLabel: "Código postal",
    zipPlaceholder: "Ingresa 5 dígitos",
    zipHelp: "Opcional — puedes omitirlo.",
    surveyEyebrow: "Encuesta de Dugout Store",
    questions: [
      "¿Encontraste lo que estabas buscando?",
      "¿Estás satisfecho con tu experiencia de compra?",
      "¿Hablaste con un empleado de la tienda hoy?",
    ],
    yes: "Sí",
    no: "No",
    categoriesTitle: "¿Qué estabas buscando?",
    categoriesSubtitle: "Elige la categoría más cercana.",
    productsTitle: "¿Cuál artículo se parece más?",
    productsSubtitle: "Selecciona uno y te ayudaremos a encontrarlo en línea.",
    productOnlineEyebrow: "Sigue comprando",
    productOnlineTitle: "Lo encontramos en línea",
    productOnlineSubtitle: "Escanea para ver opciones y disponibilidad en Fanatics.",
    scanToShop: "Escanea para comprar",
    onlineNote: "La selección y disponibilidad pueden cambiar. Los nombres aparecen como están publicados en línea.",
    feedbackTitle: "¿Qué afectó tu experiencia?",
    feedbackSubtitle: "Elige todas las opciones que correspondan.",
    feedbackOptions: [
      "El artículo no estaba disponible",
      "No encontré mi talla",
      "Necesitaba más ayuda",
      "La caja tardó demasiado",
      "Fue difícil recorrer la tienda",
      "Otro motivo",
    ],
    otherPlaceholder: "Cuéntanos qué pasó (opcional)",
    ratingTitle: "¿Cómo fue tu interacción con el empleado?",
    ratingSubtitle: "Tus comentarios ayudan a nuestro equipo.",
    ratingLabels: ["Excelente", "Regular", "Mala"],
    thankYouTitle: "Gracias por ayudarnos a mejorar",
    thankYouSubtitle: "Tus comentarios mejoran la tienda para todos los fans de los Rockies.",
    claimDiscount: "Obtener mi 10% de descuento",
    discountTitle: "Tu 10% de descuento está listo",
    discountSubtitle: "Escanea el código y guárdalo para tu próxima compra.",
    discountLegal: "Válido en tiendas Colorado Rockies Dugout participantes durante 30 días. Pueden aplicarse restricciones.",
    returning: "Nueva encuesta en",
    continue: "Continuar",
    back: "Atrás",
    home: "Reiniciar",
    selected: "Seleccionado",
    categoryLabels: categoryLabels(["Jerseys", "Gorras", "Camisetas", "Abrigos", "Accesorios y regalos"]),
    audienceLabels: audienceLabels(["Todos", "Hombres", "Mujeres", "Niños"]),
  },
  ko: {
    languageTitle: "언어를 선택하세요",
    languageSubtitle: "매장 설문을 시작할 언어를 선택하세요.",
    locationTitle: "어디에서 오셨나요?",
    locationSubtitle: "전 세계 로키스 팬을 이해하는 데 도움이 됩니다.",
    zipLabel: "우편번호",
    zipPlaceholder: "숫자 5자리",
    zipHelp: "선택 사항입니다.",
    surveyEyebrow: "더그아웃 스토어 설문",
    questions: [
      "찾으시던 상품을 찾으셨나요?",
      "오늘의 쇼핑 경험에 만족하시나요?",
      "오늘 매장 직원과 대화하셨나요?",
    ],
    yes: "예",
    no: "아니요",
    categoriesTitle: "어떤 상품을 찾으셨나요?",
    categoriesSubtitle: "가장 가까운 상품 카테고리를 선택하세요.",
    productsTitle: "어떤 상품과 가장 비슷한가요?",
    productsSubtitle: "상품을 선택하면 온라인에서 찾도록 도와드리겠습니다.",
    productOnlineEyebrow: "계속 쇼핑하기",
    productOnlineTitle: "온라인에서 찾았습니다",
    productOnlineSubtitle: "QR 코드를 스캔하여 Fanatics의 현재 옵션을 확인하세요.",
    scanToShop: "스캔하여 쇼핑하기",
    onlineNote: "상품과 재고는 변경될 수 있습니다. 상품명은 온라인 표기 그대로입니다.",
    feedbackTitle: "어떤 점이 쇼핑 경험에 영향을 주었나요?",
    feedbackSubtitle: "해당되는 항목을 모두 선택하세요.",
    feedbackOptions: ["상품 품절", "사이즈 없음", "도움이 더 필요했음", "결제가 오래 걸림", "매장이 불편했음", "기타"],
    otherPlaceholder: "무슨 일이 있었는지 알려주세요 (선택)",
    ratingTitle: "직원과의 경험은 어땠나요?",
    ratingSubtitle: "고객님의 의견은 팀의 개선에 도움이 됩니다.",
    ratingLabels: ["좋았어요", "보통이에요", "아쉬웠어요"],
    thankYouTitle: "소중한 의견 감사합니다",
    thankYouSubtitle: "고객님의 의견으로 모든 로키스 팬을 위한 매장을 만들어 갑니다.",
    claimDiscount: "10% 할인 받기",
    discountTitle: "10% 할인이 준비되었습니다",
    discountSubtitle: "QR 코드를 스캔해 다음 방문을 위해 저장하세요.",
    discountLegal: "참여 Colorado Rockies Dugout Store에서 30일간 유효합니다. 제한 사항이 적용될 수 있습니다.",
    returning: "새 설문까지",
    continue: "계속",
    back: "뒤로",
    home: "처음부터",
    selected: "선택됨",
    categoryLabels: categoryLabels(["유니폼", "모자", "티셔츠", "아우터", "액세서리 & 선물"]),
    audienceLabels: audienceLabels(["전체", "남성", "여성", "키즈"]),
  },
  ja: {
    languageTitle: "言語を選択してください",
    languageSubtitle: "アンケートを始める言語を選んでください。",
    locationTitle: "どちらからお越しですか？",
    locationSubtitle: "世界中のロッキーズファンを知るために役立ちます。",
    zipLabel: "郵便番号",
    zipPlaceholder: "5桁を入力",
    zipHelp: "任意です。入力せずに進めます。",
    surveyEyebrow: "ダグアウトストア アンケート",
    questions: ["お探しの商品は見つかりましたか？", "今日のお買い物に満足しましたか？", "今日、店舗スタッフと話しましたか？"],
    yes: "はい",
    no: "いいえ",
    categoriesTitle: "何をお探しでしたか？",
    categoriesSubtitle: "最も近いカテゴリーを選んでください。",
    productsTitle: "最も近い商品はどれですか？",
    productsSubtitle: "商品を選ぶとオンラインで探せます。",
    productOnlineEyebrow: "買い物を続ける",
    productOnlineTitle: "オンラインで見つかりました",
    productOnlineSubtitle: "QRコードからFanaticsの現在の品揃えを確認できます。",
    scanToShop: "スキャンして商品を見る",
    onlineNote: "品揃えと在庫は変わる場合があります。商品名はオンライン表記です。",
    feedbackTitle: "何が体験に影響しましたか？",
    feedbackSubtitle: "当てはまるものをすべて選んでください。",
    feedbackOptions: ["商品がなかった", "サイズがなかった", "もっと手助けが必要だった", "会計に時間がかかった", "店内が見づらかった", "その他"],
    otherPlaceholder: "内容を教えてください（任意）",
    ratingTitle: "スタッフとのやり取りはいかがでしたか？",
    ratingSubtitle: "ご意見はチームの改善に役立ちます。",
    ratingLabels: ["良かった", "普通", "良くなかった"],
    thankYouTitle: "ご協力ありがとうございました",
    thankYouSubtitle: "皆様の声が、ロッキーズファンのためのより良い店舗をつくります。",
    claimDiscount: "10%割引を受け取る",
    discountTitle: "10%割引をご利用いただけます",
    discountSubtitle: "コードをスキャンし、次回のお買い物用に保存してください。",
    discountLegal: "対象のColorado Rockies Dugout Storeで30日間有効です。条件が適用される場合があります。",
    returning: "新しいアンケートまで",
    continue: "次へ",
    back: "戻る",
    home: "最初から",
    selected: "選択済み",
    categoryLabels: categoryLabels(["ユニフォーム", "キャップ", "Tシャツ", "アウター", "アクセサリー"]),
    audienceLabels: audienceLabels(["すべて", "メンズ", "レディース", "キッズ"]),
  },
  zh: {
    languageTitle: "选择语言",
    languageSubtitle: "请选择商店调查所用的语言。",
    locationTitle: "您来自哪里？",
    locationSubtitle: "这有助于我们了解世界各地的洛矶队球迷。",
    zipLabel: "邮政编码",
    zipPlaceholder: "输入5位数字",
    zipHelp: "选填，可以跳过。",
    surveyEyebrow: "Dugout Store 调查",
    questions: ["您找到想要的商品了吗？", "您对今天的购物体验满意吗？", "您今天与店员交流过吗？"],
    yes: "是",
    no: "否",
    categoriesTitle: "您在找什么商品？",
    categoriesSubtitle: "请选择最接近的商品类别。",
    productsTitle: "哪件商品最接近？",
    productsSubtitle: "选择商品，我们会帮您在线查找。",
    productOnlineEyebrow: "继续购物",
    productOnlineTitle: "我们在网上找到了",
    productOnlineSubtitle: "扫描二维码查看 Fanatics 当前的选择和库存。",
    scanToShop: "扫描购买此商品",
    onlineNote: "商品选择和库存可能变化。商品名称按网站原文显示。",
    feedbackTitle: "哪些因素影响了您的体验？",
    feedbackSubtitle: "请选择所有符合的选项。",
    feedbackOptions: ["商品缺货", "没有合适尺码", "需要更多帮助", "结账时间太长", "店内不便浏览", "其他原因"],
    otherPlaceholder: "请告诉我们发生了什么（选填）",
    ratingTitle: "您与店员的交流体验如何？",
    ratingSubtitle: "您的反馈有助于团队改进。",
    ratingLabels: ["很好", "一般", "较差"],
    thankYouTitle: "感谢您帮助我们改进",
    thankYouSubtitle: "您的反馈让每位洛矶队球迷都能获得更好的体验。",
    claimDiscount: "领取九折优惠",
    discountTitle: "您的九折优惠已准备好",
    discountSubtitle: "扫描并保存此二维码，下次购物时使用。",
    discountLegal: "在参与活动的 Colorado Rockies Dugout Store 内30天有效。可能有其他限制。",
    returning: "返回新调查",
    continue: "继续",
    back: "返回",
    home: "重新开始",
    selected: "已选择",
    categoryLabels: categoryLabels(["球衣", "帽子", "T恤", "外套", "配饰与礼品"]),
    audienceLabels: audienceLabels(["全部", "男士", "女士", "儿童"]),
  },
};
