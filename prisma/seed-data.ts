// prisma/seed-data.ts


// model Watch {
//   id              String   @id @default(uuid())
//   modelCode       String   @unique // GA-2100-1A1
//   title           String   // Полное SEO-название: Наручные часы Casio G-Shock GA-2100-1A1
//   slug            String   @unique // Для URL товара: /product/casio-g-shock-ga-2100-1a1
//   price           Int
//   description     String
//   imageUrl        String?
//   inStock         Boolean  @default(true)
//   stockKaliningrad Int     @default(0) // Важно для локального SEO ранжирования!
  
//   brandId         String
//   brand           Brand    @relation(fields: [brandId], references: [id])
//   categoryId      String
//   category        Category @relation(fields: [categoryId], references: [id])

//   // SEO-переопределения (если пустые — генерируем шаблоном)
//   metaTitle       String?
//   metaDescription String?
//   h1              String?
// }

export const seoBrands = [
  { name: "Casio", slug: "casio", metaTitle: "Японские часы Casio — купить в Калининграде", metaDescription: "Огромный выбор оригинальных часов Casio (G-Shock, Edifice) в Калининграде. Официальная гарантия, лучшая цена." },
  { name: "Tissot", slug: "tissot", metaTitle: "Швейцарские часы Tissot — каталог оригиналов", metaDescription: "Купить оригинальные швейцарские часы Tissot в Калининграде. Легендарная коллекция PRX и спортивные хронографы." },
  { name: "Orient", slug: "orient", metaTitle: "Механические часы Orient — цены и каталог", metaDescription: "Японские часы Orient с автоподзаводом. Классические Bambino и дайверские Kamasu в наличии." },
  { name: "Seiko", slug: "seiko", metaTitle: "Часы Seiko — купить оригинальные японские часы", metaDescription: "Каталог японских часов Seiko (5 Sports, Presage). Официальный дилер в Калининграде." },
  { name: "Citizen", slug: "citizen", metaTitle: "Часы Citizen Eco-Drive с солнечной батареей", metaDescription: "Технологичные часы Citizen Eco-Drive. Не требуют замены батарейки. Доставка по Калининградской области." },
  { name: "Hamilton", slug: "hamilton", metaTitle: "Часы Hamilton — американская классика", metaDescription: "Военные механические часы Hamilton Khaki Field. Оригиналы с гарантией." },
  { name: "Certina", slug: "certina", metaTitle: "Швейцарские часы Certina DS — ультразащита", metaDescription: "Сверхнадежные спортивные часы Certina с системой Double Security. Водонепроницаемость 200м." },
  { name: "Swatch", slug: "swatch", metaTitle: "Яркие часы Swatch — оригинальный дизайн", metaDescription: "Швейцарские молодежные часы Swatch. Кварцевые хронографы Irony." },
  { name: "Diesel", slug: "diesel", metaTitle: "Брутальные часы Diesel — массивный стиль", metaDescription: "Fashion-часы Diesel Mega Chief для мужчин. Крупный корпус, оригинальный дизайн." },
  { name: "Fossil", slug: "fossil", metaTitle: "Американские часы Fossil — классика и винтаж", metaDescription: "Наручные часы Fossil на кожаных ремешках. Стильный аксессуар на каждый день." }
];

export const seoCategories = [
  { name: "Кварцевые часы", slug: "quartz", metaTitle: "Мужские кварцевые наручные часы — купить недорого", metaDescription: "Каталог точных кварцевых часов от ведущих мировых брендов. Цены, отзывы, наличие." },
  { name: "Механические с автоподзаводом", slug: "automatic", metaTitle: "Мужские механические часы с автоподзаводом", metaDescription: "Элегантная механика с автоподзаводом. Японские и швейцарские калибры." },
  { name: "Eco-Drive (Солнечная батарея)", slug: "eco-drive", metaTitle: "Часы на солнечной батарее (Eco-Drive / Solar)", metaDescription: "Экологичные и автономные наручные часы, заряжающиеся от любого источника света." },
  { name: "Механика с ручным заводом", slug: "mechanical", metaTitle: "Наручные часы с ручным заводом — винтажная классика", metaDescription: "Классические механические часы без автоподзавода для ценителей традиций." }
];

export const seoWatches = [
  {
    modelCode: "GA-2100-1A1",
    title: "Мужские наручные часы Casio G-Shock GA-2100-1A1",
    slug: "casio-g-shock-ga-2100-1a1",
    brandName: "Casio",
    categorySlug: "quartz",
    price: 11990,
    description: "Аналогово-цифровые часы с ударопрочным корпусом Carbon Core Guard, защитой от магнитных полей и яркой подсветкой. Идеальный выбор для активного отдыха.",
    imageUrl: "https://yandex-images.clstorage.net/96ekIe385/bf2b23EJXo/xPs1xx5l-mm0HdvaVNNROMHa49a6h9lrKCz_v5OkJOkztbBAwrae4raJcHebpbhDZV6fI-0dFHB9Nl9h2R7W-tC_PYkCNO87pUmRy0mNUS_Xl7eN79fEdCIrsqfbqSWjL4uNctyEpN-Cr0VTtLK6SC4C1T6sWX0YchdbfooLmP7NwkqRVWPFQLIp5Owo61MyhfXT6b-H4AMeHcLUpbYAogGiul3HtrDbvYlLQJOimXYpLMVys0RQLyIxeVm_F6rG-vpZh3tC-kmmGMHBLtF3CpXz9dukifgLIiL7162tHa0Do7lZ05SCx4OqR3itka10Azf3Url6Vw0LP1Zhixql29rGVZhgYPtFpBDCxwDKRS-i2ejJlozGMRA558iioCm2K7qhZM2LmPWAlnNzi4auZSQ9z3Woa2MSPDpGc5kopvbz5HiKeWrKbasJ3sERzncdufnYzLyz4D8HD-Dnp5kRqBO3hVz7j7_okZxbc7O8sE8OMsBeqFV7HjYReleMIqfLzf9Cm1ZI_HCsOsjCE-pvH4z5ytKGrukJHgLE55GyNoM4sp5d96uW8qiHSki3pbVDKC_BRIdYWwIHK2l2uwuAyc7SVapQde5MhRDkwg7NUiOgxejTiI3TCjEC8uGiqBK9BYGRe9CcnPyklWV9ioWTVQcEzEKvR3Y-HS1xXaAAs9_n3UKwfXbHboQQzf0rznoaldrt0q2O2SAFMMrYk602rAOEt3jat5DjuIFoU7e9mkkYPuN8lUZ2LCoaclKaF6LKwMNKkmNh30WiOsToIOhzD7nC-92mqOkqAhPE17KvAbQLpYNG3qq1_aaTbH-cqp1OICP3XIp0YwQxCGxhqjmA_sDnarhXVMR6oSTs2jTGbwyAxsH7p7j1NTY9yuOwhwiADrWRd9aulNS7q2hdgr2iUSws_1aGQFAOJTRqc4sdmMTw42KYWWn5R4ovzM0y1lsen_b66Lqv8wQDItrnkKc",
    inStock: true,
    stockKaliningrad: 5,
    metaTitle: "Часы Casio G-Shock GA-2100-1A1 купить в Калининграде — цена, фото",
    metaDescription: "Оригинальные «Casio-Дубы» GA-2100-1A1 в наличии в Калининграде. Ударопрочный карбоновый корпус, водозащита 200м. Гарантия 2 года.",
    model3dUrl: null,
    images: [
      { url: "/GA-2100-1A1_1.webp", alt: "Японские часы Casio G-Shock GA-2100-1A1 в магазине на Южном Рынке в Калининграде" },
      { url: "/GA-2100-1A1_2.webp", alt: "Наручные часы Casio GA-2100-1A1 вид сбоку — ТЦ на Южном" }
    ]
  },
  {
    modelCode: "T137.410.11.051.00",
    title: "Швейцарские наручные часы Tissot PRX Quartz",
    slug: "tissot-prx-quartz-t137-410-11-051-00",
    brandName: "Tissot",
    categorySlug: "quartz",
    price: 39900,
    description: "Трендовый интегрированный браслет в стиле Neo-Vintage, точный швейцарский кварцевый механизм, сапфировое стекло с антибликовым покрытием и 100 м водозащиты.",
    imageUrl: 'https://yandex-images.clstorage.net/96ekIe385/bf2b23EJXo/xPs1xx5l-mm0HdvaVNNROMHa49a6h9lrKCz_v5OkJOkztbBAwrae4raJcHebpbhDZVacJOYeEXdrcVZ0m0DTq4bpN9oCYL449h-fmUvYVHzZxrWL7dGRJH96uqXM7jixLbGNbNyHuc-ftEtds4WiRyQDyGjwXlcYDX53cIQdkuXW8UWtSGDrQYgO_OQ_7GAtlsnU6Y-DxAQAEd_ZsJAnlCyfpFvznIvbm4ttU6CismQaBOZ4vEFKNTouUVKjKI7X7sZ9vl5Oyn6BGs3BEupaCa7Z0s-9mMocCC3g4LOYPIkjnaVY94ip6Ye1Tl-YnIFQGC79SpxLdDIYB199mxyD2PPmQbJBVeh_jRjFwhTEQTuL7vjSr6rPIjIf-_yslzG9OLW8QMqWtvO1tnJrk7qWUwkJ93K7WmUGBzBabYkOsdvez2OfU0ziTqUX3N4S1UUJufXY4qqA8AQ8CM37g5IIhSaNsWTyoLLUqKd4Q5OCrE0jI_h9kFpbHgs6cVGtG7va4_F4pUJjwHi4EO_IEddhEbvA2PC0uu0NChHA34OkI6INprR_86yW_bKeY1KohrVILwXlfIp1Vj4XC0tCjCyS_eHyVbJzZf1qhDnF5BHKRiyH7OTStbTONwk-wOmFlzmGM5uHcNWLofe8knF9nbuVbjkqznGMXUkTKxFNWqc3mc7321qlaUj-Q6Y4xc0u70UEvtn717SRzT0jCvLRvKY8oiKdglbWgYr7o45lcLOGrWclNfResmdIEzkmelmoDY7f4vxErUtW6VuNHu_EO-RjDav148G7musNKQ3R37OHPpU6laNi6IWX3r2Qd3SfrbpgIg3pSpJ4egYRPWhHmz2g_db8YI1hYtxAsh3x7AnwTRGozOf7nZv7ETY5_9GHhRacDpCzcNmNk_-UjU9wvbOtXz0B5kKYdE41GylUQYkchOXszGSFQWzhfY82-swe9l0lutPXwI6G7BcHDODBg6U',
    inStock: true,
    stockKaliningrad: 2,
    metaTitle: "Часы Tissot PRX Quartz T137.410.11.051.00 — купить оригиналы",
    metaDescription: "Легендарный стальной хит Tissot PRX Quartz с черным циферблатом. Быстрая доставка по городу, примерка перед покупкой."
  },
  {
    modelCode: "FAC00009N0",
    title: "Японские механические часы Orient Bambino V2",
    slug: "orient-bambino-v2-fac00009n0",
    brandName: "Orient",
    categorySlug: "automatic",
    price: 29900,
    description: "Классический автоматический механизм (калибр F6722) с возможностью ручного завода. Винтажный купольный циферблат, кожаный ремешок.",
    imageUrl: null,
    inStock: true,
    stockKaliningrad: 3,
    metaTitle: "Классические часы Orient Bambino V2 FAC00009N0 в Калининграде",
    metaDescription: "Купить оригинальные Orient Bambino V2 с кремовым циферблатом. Механика с автоподзаводом, строгий костюмный стиль."
  },
  {
    modelCode: "RA-AA0003L19B",
    title: "Дайверские часы Orient Kamasu Mako III",
    slug: "orient-kamasu-mako-3-ra-aa0003l19b",
    brandName: "Orient",
    categorySlug: "automatic",
    price: 34900,
    description: "Культовые дайверские часы с автоматическим механизмом, прочным сапфировым стеклом и профессиональной водозащитой 200 метров.",
    imageUrl: null,
    inStock: true,
    stockKaliningrad: 4,
    metaTitle: "Мужские часы для дайвинга Orient Kamasu Mako III — цена",
    metaDescription: "Надежные японские дайверы Orient Kamasu с синим циферблатом. Сапфир, водозащита ISO, автоподзавод. В наличии в магазинах Калининграда."
  },
  {
    modelCode: "SRPD51K1",
    title: "Спортивные часы Seiko 5 Sports SRPD51K1",
    slug: "seiko-5-sports-srpd51k1",
    brandName: "Seiko",
    categorySlug: "automatic",
    price: 28900,
    description: "Легендарная серия Seiko 5. Автоматический механизм 4R36, прозрачная задняя крышка, литой стальной браслет, яркий люминофор LumiBrite.",
    imageUrl: null,
    inStock: true,
    stockKaliningrad: 1,
    metaTitle: "Механические часы Seiko 5 Sports SRPD51K1 — купить, отзывы",
    metaDescription: "Оригинальные спортивные часы Seiko 5 Sports синего цвета. Магазин оригинальных часов, гарантия качества, экспресс-доставка."
  },
  {
    modelCode: "BN0151-09L",
    title: "Дайверские часы Citizen Promaster Diver Eco-Drive",
    slug: "citizen-promaster-diver-bn0151-09l",
    brandName: "Citizen",
    categorySlug: "eco-drive",
    price: 33900,
    description: "ISO-сертифицированный профессиональный дайвер. Питание от света Eco-Drive, каучуковый ремешок с таблицей пределов декомпрессии.",
    imageUrl: null,
    inStock: true,
    stockKaliningrad: 2,
    metaTitle: "Citizen Promaster Diver BN0151-09L на солнечной батарее",
    metaDescription: "Профессиональные часы для дайвинга Citizen Promaster BN0151-09L. Питание Eco-Drive, водозащита 200m. Идеально для Балтийского моря."
  },
  {
    modelCode: "DW-5600E-1V",
    title: "Мужские наручные часы Casio G-Shock DW-5600E-1V",
    slug: "casio-g-shock-dw-5600e-1v",
    brandName: "Casio",
    categorySlug: "quartz",
    price: 8990,
    description: "Легендарная цифровая классика G-Shock в культовом квадратном корпусе. Сверхнадежная кварцевая модель с водозащитой 200 метров, электролюминесцентной подсветкой, таймером и будильником. Проверено временем и экстремальными нагрузками.",
    imageUrl: "https://vladivostok.timebit.ru/upload/resize_cache/iblock/eff/1366_768_0/effc05d44325b1b2b2d1ae53a76b51e1.jpg",
    inStock: true,
    stockKaliningrad: 12,
    metaTitle: "Часы Casio G-Shock DW-5600E-1V купить в Калининграде — цена, фото",
    metaDescription: "Оригинальные противоударные часы Casio G-Shock DW-5600E-1V в Калининграде. Легендарный квадратный корпус, водозащита 20 бар. Гарантия от производителя."
  },
  {
    modelCode: "EFR-526L-1A",
    title: "Мужские наручные часы Casio Edifice EFR-526L-1A",
    slug: "casio-edifice-efr-526l-1a",
    brandName: "Casio",
    categorySlug: "quartz",
    price: 13490,
    description: "Спортивный кварцевый хронограф из престижной автомобильной линейки Edifice. Прочный корпус из нержавеющей стали, строгий черный циферблат с окошком даты и мягкий ремешок из натуральной кожи. Отличный баланс между спортом и деловым стилем.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVyZWlAewN8t5M2b-UPymlYYos98kuGatUg&s",
    inStock: true,
    stockKaliningrad: 4,
    metaTitle: "Мужские часы Casio Edifice EFR-526L-1A — купить оригинал, цена",
    metaDescription: "Официальные часы Casio Edifice EFR-526L-1A на кожаном ремешке. Быстрая доставка по Калининградской области, примерка перед покупкой, чек и гарантия."
  },
  {
    modelCode: "T006.407.16.033.00",
    title: "Швейцарские наручные часы Tissot Le Locle Powermatic 80",
    slug: "tissot-le-locle-powermatic-80-t006-407-16-033-00",
    brandName: "Tissot",
    categorySlug: "automatic",
    price: 64900,
    description: "Эталон классических швейцарских часов. Модель оснащена автоматическим калибром Powermatic 80 с рекордным запасом хода до 80 часов. Изящный гильошированный циферблат с римскими цифрами, сапфировое стекло и прозрачная задняя крышка.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeoO7fpa8ueKmZu3FPHoOWtO6GJs7qymX6RA&s",
    inStock: true,
    stockKaliningrad: 2,
    metaTitle: "Швейцарские часы Tissot Le Locle T006.407.16.033.00 в Калининграде",
    metaDescription: "Купить оригинальную швейцарскую механику Tissot Le Locle Powermatic 80. Классический костюмный стиль, сапфировое стекло. Бесплатная примерка."
  },
  {
    modelCode: "SPB121J1",
    title: "Японские механические часы Seiko Prospex Alpinist",
    slug: "seiko-prospex-alpinist-spb121j1",
    brandName: "Seiko",
    categorySlug: "automatic",
    price: 82900,
    description: "Культовое переиздание легендарного «Альпиниста». Премиальный зеленый циферблат с золотистыми индексами, мануфактурный автоматический калибр 6R35 с запасом хода 70 часов, сапфировое стекло с линзой даты и внутренний компас. Настоящая икона для часовых энтузиастов.",
    imageUrl: "https://www.seikowatches.com/uk-en/-/media/Images/Product--Image/All/Seiko/2022/02/20/00/45/SPB121J1/SPB121J1.png?mh=300&mw=300",
    inStock: true,
    stockKaliningrad: 1,
    metaTitle: "Часы Seiko Prospex Alpinist SPB121J1 — купить в Калининграде",
    metaDescription: "Легендарные зеленые часы Seiko Alpinist SPB121J1 в наличии. Сапфир, автоподзавод, внутренний компас. 100% оригинал с гарантией дилера."
  },
  {
    modelCode: "NY0040-09E",
    title: "Дайверские часы Citizen Promaster Marine Automatic",
    slug: "citizen-promaster-marine-ny0040-09e",
    brandName: "Citizen",
    categorySlug: "automatic",
    price: 31900,
    description: "Профессиональные механические дайверы, официально поставлявшиеся для итальянских ВМС. Сертифицированы по стандарту ISO 6425. Неубиваемый автоматический механизм, завинчивающаяся заводная головка на уровне «8 часов» для максимального комфорта и яркий люминофор.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Iey8lQxGAYTHFThYO2rnvr0JDjR96Q1GlQ&s",
    inStock: true,
    stockKaliningrad: 3,
    metaTitle: "Дайверские часы Citizen Promaster NY0040-09E — цены, отзывы",
    metaDescription: "Купить оригинальные дайверские часы Citizen Promaster NY0040-09E в Калининграде. Водозащита 200м, каучуковый ремешок, надежная механика."
  },
  {
    modelCode: "BM7108-81L",
    title: "Мужские наручные часы Citizen Eco-Drive Corso",
    slug: "citizen-eco-drive-corso-bm7108-81l",
    brandName: "Citizen",
    categorySlug: "eco-drive",
    price: 24900,
    description: "Технологичные и стильные часы на каждый день. Фирменная система Eco-Drive заряжается от любого источника света и избавляет от необходимости менять батарейку. Глубокий синий циферблат, прочное сапфировое стекло, корпус и браслет из нержавеющей стали.",
    imageUrl: "https://img.chrono24.com/images/uhren/22551384-bgyyco56z3jomh0iom0bbmrm-ExtraLarge.jpg",
    inStock: true,
    stockKaliningrad: 5,
    metaTitle: "Часы Citizen Eco-Drive BM7108-81L на солнечной батарее купить",
    metaDescription: "Оригинальные японские часы Citizen Corso BM7108-81L с синим циферблатом. Солнечная батарея Eco-Drive, сапфировое стекло. В наличии в Калининграде."
  },
  {
    modelCode: "H69439931",
    title: "Механические часы Hamilton Khaki Field Mechanical",
    slug: "hamilton-khaki-field-mechanical-h69439931",
    brandName: "Hamilton",
    categorySlug: "mechanical",
    price: 59900,
    description: "Настоящая военная классика с ручным заводом, уходящая корнями к армейским часам середины XX века. Оснащены эксклюзивным калибром H-50 с запасом хода 80 часов. Матовый стальной корпус, лаконичный черный циферблат с 24-часовой разметкой и прочный ремешок NATO.",
    imageUrl: "https://img.chrono24.com/images/uhren/36517801-cgsrgc52aq998eufw1uli65g-ExtraLarge.jpg",
    inStock: true,
    stockKaliningrad: 2,
    metaTitle: "Часы Hamilton Khaki Field Mechanical H69439931 — купить",
    metaDescription: "Швейцарские полевые часы Hamilton Khaki Field H69439931 с ручным заводом. Военный стиль, запас хода 80ч. Оригинальная комплектация."
  },
  {
    modelCode: "C032.607.11.051.00",
    title: "Швейцарские наручные часы Certina DS Action Diver",
    slug: "certina-ds-action-diver-c032-607-11-051-00",
    brandName: "Certina",
    categorySlug: "automatic",
    price: 94900,
    description: "Премиальные швейцарские дайверские часы, отвечающие жестким стандартам ISO 6425. Система повышенной надежности DS (Double Security), керамический безель, устойчивый к царапинам, сапфировое стекло и автоматический механизм Powermatic 80 с антимагнитной пружиной Nivachron.",
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/5209489/img_id7318288040621838101.jpeg/9hq",
    inStock: true,
    stockKaliningrad: 1,
    metaTitle: "Часы Certina DS Action Diver C032.607.11.051.00 в Калининграде",
    metaDescription: "Купить оригинальные швейцарские дайверы Certina DS Action Diver с керамическим безелем. Водозащита 300 метров. Официальная гарантия."
  },
  {
    modelCode: "DZ4318",
    title: "Брутальные мужские часы Diesel Mega Chief",
    slug: "diesel-mega-chief-dz4318",
    brandName: "Diesel",
    categorySlug: "quartz",
    price: 27900,
    description: "Один из самых узнаваемых fashion-хронографов в мире. Массивный стальной корпус диаметром 51 мм, уникальное переливающееся стекло хамелеон (меняет цвет от красного до синего под разными углами) и фирменная защитная скоба над заводной головкой.",
    imageUrl: "https://yandex-images.clstorage.net/96ekIe385/bf2b23EJXo/xPs1xx5l-mm0HdvaVNNROMHa49a6h9lrKCz_v5OkJOkztbBAwrae4raJcHebpbhDZVacI-cbEnBrcVZ0mxnSpIDsat9QYu5p9Bmenh-OUH_cxrfZ74OXd35wuqbM7jixLbGNbNyHuc-ftEtds4WiRyQDyGjwXlcYDX53cIQdkuXW8UWtSGDrQYgO_OQ_7GAtlsnU6Y-DxAQAEd_ZsJAnlCyfpFvznIvbm4ttU6CismQaBOZ4vEFKNTouUVKjKI7X7sZ9vl5Oyn6BGs3BEupaCa7Z0s-9mMocCC3g4LOYPIkjnaVY94ip6Ye1Tl-YnIFQGC79SpxLdDIYB199mxyD2PPmQbJBVeh_jRjFwhTEQTuL7vjSr6rPIjIf-_yslzG9OLW8QMqWtvO1tnJrk7qWUwkJ93K7WmUGBzBabYkOsdvez2OfU0ziTqUX3N4S1UUJufXY4qqA8AQ8CM37g5IIhSaNsWTyoLLUqKd4Q5OCrE0jI_h9kFpbHgs6cVGtG7va4_F4pUJjwHi4EO_IEddhEbvA2PC0uu0NChHA34OkI6INprR_86yW_bKeY1KohrVILwXlfIp1Vj4XC0tCjCyS_eHyVbJzZf1qhDnF5BHKRiyH7OTStbTONwk-wOmFlzmGM5uHcNWLofe8knF9nbuVbjkqznGMXUkTKxFNWqc3mc7321qlaUj-Q6Y4xc0u70UEvtn717SRzT0jCvLRvKY8oiKdglbWgYr7o45lcLOGrWclNfResmdIEzkmelmoDY7f4vxErUtW6VuNHu_EO-RjDav148G7musNKQ3R37OHPpU6laNi6IWX3r2Qd3SfrbpgIg3pSpJ4egYRPWhHmz2g_db8YI1hYtxAsh3x7AnwTRGozOf7nZv7ETY5_9GHhRacDpCzcNmNk_-UjU9wvbOtXz0B5kKYdE41GylUQYkchOXszGSFQWzhfY82-swe9l0lutPXwI6G7BcHDODBg6U",
    inStock: true,
    stockKaliningrad: 6,
    metaTitle: "Часы Diesel Mega Chief DZ4318 с переливающимся стеклом купить",
    metaDescription: "Крупные мужские часы Diesel DZ4318 Хронограф в Калининграде. Оригинал, фирменная коробка, паспорт и гарантия. Доставка и примерка."
  },
  {
    modelCode: "FS4735",
    title: "Американские наручные часы Fossil Grant",
    slug: "fossil-grant-fs4735",
    brandName: "Fossil",
    categorySlug: "quartz",
    price: 16490,
    description: "Стильный кварцевый хронограф в винтажном исполнении. Корпус из полированной стали гармонично сочетается с текстурированным кремовым циферблатом, классическими римскими цифрами и темно-коричневым ремешком из мягкой кожи с прострочкой.",
    imageUrl: "https://yandex-images.clstorage.net/96ekIe385/bf2b23EJXo/xPs1xx5l-mm0HdvaVNNROMHa49a6h9lrKCz_v5OkJOknpLtQsvPLoOnVNynV-boWeledIO8UQ3NhPAsni0_SpIO-P4kFYb4590rLm0vbVH7ejO3Kt4X-GgcIyc-7kxmDA5qrUvOinuj-lHdFpeuSQyEC3mm8VWgCKzpZXKcKtNHx2lqOSG7aWZEdzOg85mECq_L16Lip1y0oE_vbv6w_jRC9u3HNpbD4sotqaJK7tGEGN8JbhGJQET0UeGOuHoX03NxgqnB-3H-jBsLwNNpeO6j67vW3q9YuLAfZ6aOSHIEog4hFz4-rypKBVG-wkrpOPgPPVJlCbB0iD1piohyN99rye5hVSfZisTTHzg7oRSe39ePBrIPPNhEZxvORkSC1I6WfRt6oofK1kEVbr6W_XiwR_Ve0a04wMBZQU4oTlOvc43-qZ1LWUrQe-OgA_3MgmPDa-bK7whIpL8LUjIAqnSOdpVj0gq79npB7Q6OvlGIIBPdWiVVVCiE5cmWXFKf93-FbsmVn1kCqJOXhNuZ-BJjG8d6ZkMcJKCPm_Za5MYwYmbxd-KSz_IS_dmO_nq5xKTPecYtWeB0QP093qz2N0d_8fI9ZS-piqyrG2zXJfjKe9ev6p630Bg4E0feYtSOjLaSce-6LmPGCl2lOg4SoaQIo1UKdf3cKChJMXok8jfjg2X-nYH71Z6oPxdEf_UwKp8Tu3rar8SANDvr7h6k3rgOZpHLylKLevK1oTpGzn2oNEsJTiFhpAigMW0aiGqfx9dJZrnVS7XGlBOPhFfpvBKjl7Omuo9AUMwrn3pm3JaovsrN19ay_ypyyWlu5qI10PiLscbxYTSICOG5dnRm52cfGd7J2a-lLgwXz_QrOQQqc58TgmqbABgIC4_-wqh2uDaykSuqgsMKWvm5os7yxciwDyGmGaEkqIjZTYKAysvnQwGeGZHTZcJAY5Ps7-14amMfk8Law5QsXKP7zvKM",
    inStock: true,
    stockKaliningrad: 4,
    metaTitle: "Мужские часы Fossil Grant FS4735 — купить в Калининграде",
    metaDescription: "Классические часы-хронограф Fossil FS4735 на кожаном ремешке. Доступная цена, идеальный подарок. Быстрая доставка по городу."
  },
];

export const articles = [
  {
    slug: 'kak-vybrat-muzhskie-naruchnye-chasy-guide',
    title: 'Как выбрать мужские наручные часы: Полный гайд для покупателей в Калининграде',
    excerpt: 'Разбираемся, какие мужские часы купить в 2026 году. Кварц или механика? Металл или кожа? Советы по подбору оригинальных часов с примеркой в Калининграде.',
    imageUrl: 'https://placehold.co/800x450/1a1a1a/ffffff/png?text=Kak+Vybrat+Chasy',
    published: true,
    content: `
      <h2>Введение: Почему выбор часов — это инвестиция в стиль</h2>
      <p>Сегодня решение <strong>купить часы</strong> — это не просто покупка прибора для фиксации времени. Это манифест статуса, вкуса и внутреннего мира мужчины. Наручные часы остаются главным легитимным мужским аксессуаром. Но как не запутаться в сотнях брендов и выбрать то, что прослужит десятилетия?</p>
      <p>В этом руководстве мы разберем, как правильно выбрать и где выгодно купить оригинальные <em>мужские наручные часы в Калининграде</em> с официальной гарантией.</p>

      <h2>1. Кварцевые или механические часы: что лучше именно для вас?</h2>
      <p>Это главный водораздел часового мира. Выбор зависит от вашего темпа жизни:</p>
      <ul>
        <li><strong>Механические часы с автоподзаводом:</strong> Это классика, статус и «живой» механизм. Они заводятся от колебаний вашей руки. Идеальный выбор под деловой костюм. Обратите внимание на японские спортивные часы <strong>Seiko 5 Sports</strong> или культовые дайверские часы <strong>Orient Kamasu</strong>.</li>
        <li><strong>Кварцевые мужские часы:</strong> Работают от батарейки. Максимально точные, неприхотливые, не боятся ударов. Если вам нужны надежные «рабочие лошадки» на каждый день — это ваш выбор.</li>
      </ul>

      <h2>2. На что обратить внимание перед покупкой наручных часов</h2>
      <p>Чтобы часы идеально сидели на запястье и служили долго, оценивайте три ключевых параметра:</p>
      <h3>Материал стекла</h3>
      <p>Сапфировое стекло (Sapphire Crystal) практически невозможно поцарапать — оно остается идеальным спустя годы. Минеральное стекло — более бюджетный вариант, устойчивый к прямым ударам, но подверженный мелким царапинам.</p>
      <h3>Ремешок или браслет?</h3>
      <p>Выбирая <strong>часы на металлическом браслете</strong>, вы получаете долговечность и брутальный вид. Кожаный ремешок — классика, но требует замены раз в 1.5–2 года. Для спорта лучше купить часы с силиконовым или каучуковым ремешком.</p>
      <h3>Водонепроницаемость</h3>
      <p>Для повседневной жизни достаточно защиты 50m (5 ATM) — в них можно мыть руки. Если вы планируете плавать, ищите <strong>водонепроницаемые часы</strong> с маркировкой от 100m (10 ATM) или полноценные дайверы (200m).</p>

      <h2>3. Где купить оригинальные часы в Калининграде с примеркой?</h2>
      <p>При покупке дорогого аксессуара критически важно избегать подделок. Наш интернет-магазин часов работает как <strong>официальный дилер</strong> ведущих мировых марок. Мы предлагаем:</p>
      <ul>
        <li>Только 100% <strong>оригинальные часы</strong> в фирменных коробках;</li>
        <li>Официальную международную гарантию и чек;</li>
        <li>Уникальную услугу для жителей региона: <strong>бесплатная доставка и примерка часов</strong> (до 3 моделей на выбор) прямо к вам домой или в офис в Калининграде перед окончательной оплатой!</li>
      </ul>
    `
  },
  {
    slug: 'rejting-naruchnyh-chasov-2026-kaliningrad',
    title: 'Рейтинг наручных часов 2026: Какие часы лучше купить в Калининграде',
    excerpt: 'Честный экспертный рейтинг часов 2026 года. ТОП-модели от Casio, Tissot, Seiko и Orient. Разбор преимуществ, цен и локальных предложений в Калининградской области.',
    imageUrl: 'https://placehold.co/800x450/1a1a1a/ffffff/png?text=Rating+Chasov+2026',
    published: true,
    content: `
      <h2>Рейтинг часов 2026: Ориентиры для точного выбора</h2>
      <p>Рынок наручных часов в 2026 году демонстрирует возвращение к проверенной временем классике, надежности и японскому качеству. В условиях изменения логистики калининградцы всё чаще ищут, где купить проверенные бренды без риска нарваться на реплику. Мы составили независимый <strong>рейтинг часов</strong>, основанный на объемах продаж и отзывах наших клиентов.</p>

      <h2>ТОП-Бренды в категории «Цена — Качество — Надежность»</h2>
      
      <h3>1. Легендарные японские часы Casio</h3>
      <p>Если вам нужны <strong>неубиваемые часы</strong>, которые выдержат любые испытания — альтернатив бренду <strong>Casio</strong> просто нет. Линейка <em>Casio G-Shock купить</em> которую мечтает каждый любитель активного отдыха, бьет рекорды популярности. В 2026 году безусловными бестселлерами остаются:</p>
      <ul>
        <li><strong>Casio G-Shock GA-2100</strong> (знаменитый «Casioak» в стильном восьмиугольном корпусе);</li>
        <li>Классические цифровые <strong>Casio DW-5600</strong>;</li>
        <li>Бюджетная классика с мировым временем <strong>Casio AE-1200</strong>.</li>
      </ul>

      <h3>2. Швейцарская классика: Часы Tissot</h3>
      <p>Для ценителей европейских традиций и строгого стиля идеальным решением станет покупка <strong>Tissot</strong>. Запрос <em>«Tissot PRX купить в Калининграде»</em> держится в топе поисковых систем не первый месяц. Модель PRX с интегрированным браслетом в стиле 70-х годов — это эталон нео-винтажного дизайна, который одинаково круто смотрится и на деловой встрече, и на отдыхе.</p>

      <h3>3. Механическое превосходство: Seiko и Orient</h3>
      <p>Японские мануфактуры полностью доминируют в сегменте доступной механики. Линейка <strong>Seiko 5 Sports</strong> предлагает безупречные калибры с автоподзаводом и прозрачной задней крышкой, а дайверы от <strong>Orient</strong> радуют глубокими цветами циферблатов и бескомпромиссной водозащитой.</p>

      <h2>Сравнительная таблица бестселлеров 2026 года</h2>
      <table border="1" style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 10px;">Модель</th>
            <th style="padding: 10px;">Тип механизма</th>
            <th style="padding: 10px;">Главная фишка</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px;"><strong>Casio G-Shock GA-2100</strong></td>
            <td style="padding: 10px;">Кварцевый</td>
            <td style="padding: 10px;">Ударопрочность Carbon Core Guard</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Tissot PRX</strong></td>
            <td style="padding: 10px;">Кварц / Механика</td>
            <td style="padding: 10px;">Премиальный швейцарский дизайн</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Orient Kamasu</strong></td>
            <td style="padding: 10px;">Механический автоподзавод</td>
            <td style="padding: 10px;">Водозащита 200м, сапфировое стекло</td>
          </tr>
        </tbody>
      </table>

      <h2>Где найти настоящий оригинал?</h2>
      <p>Ищете надежный <strong>магазин часов в Калининграде</strong>? Мы гарантируем защиту от подделок. Все модели поставляются в полной комплектации: коробка, паспорт, фирменная инструкция на русском языке и заполненный гарантийный талон. Оформляйте заказ на сайте, выбирайте удобное время, и курьер привезет часы на примерку!</p>
    `
  },
  {
    slug: 'rejting-smart-chasov-2026-kakie-luchshe-kupit',
    title: 'Рейтинг смарт-часов 2026: Топ умных часов и какие лучше выбрать',
    excerpt: 'Актуальный рейтинг смарт-часов 2026 года. Сравнение Apple Watch, HUAWEI и Xiaomi. Выбираем лучшие умные часы с GPS и пульсометром в Калининграде.',
    imageUrl: 'https://placehold.co/800x450/1a1a1a/ffffff/png?text=Smart+Watches+2026',
    published: true,
    content: `
      <h2>Эволюция носимых гаджетов: Что актуально в 2026 году</h2>
      <p>Сегмент умных гаджетов развивается стремительно. Запросы вроде <strong>«смарт часы Калининград»</strong> и <strong>«какие смарт часы лучше»</strong> стабильно занимают первые строчки в поисковой выдаче Яндекса. В 2026 году пользователи выбирают не просто красивый экран на запястье, а полноценный медицинский трекер и спортивный ассистент.</p>
      <p>Давайте разберем актуальный <em>рейтинг смарт часов</em> и выделим лидеров рынка, которые можно выгодно приобрести локально.</p>

      <h2>Топ смарт-часов 2026 года по категориям</h2>

      <h3>1. Лучшие в соотношении цена/качество: HUAWEI и Xiaomi</h3>
      <p>Если ваша цель — получить максимум автономности и спортивных функций за разумные деньги, обратите внимание на лидеров этого года:</p>
      <ul>
        <li><strong>HUAWEI Watch FIT 3 купить</strong> стоит тем, кто ценит легкий стильный корпус, напоминающий премиум-сегмент, и невероятно точный мониторинг сна и активности.</li>
        <li><strong>Xiaomi Watch 5 Active</strong> — яркий представитель ультрабюджетного класса с феноменальной автономностью до 14 дней от одной зарядки и базовым набором датчиков.</li>
      </ul>
      <p>Оба бренда предлагают отличные <strong>смарт часы для спорта</strong>, которые не боятся влаги (защита по стандарту IP67/5ATM) и стабильно держат связь со смартфонами на iOS и Android.</p>

      <h3>2. Премиум-сегмент: Apple Watch</h3>
      <p>Для владельцев iPhone лучшим выбором остаются устройства от Apple. Если флагманские модели кажутся вам избыточными, то решение <strong>Apple Watch SE купить</strong> будет самым прагматичным. Вы получаете полную интеграцию в экосистему, возможность отвечать на звонки, отправлять голосовые сообщения и безупречный дизайн.</p>

      <h2>Критически важный функционал: как сделать правильный выбор</h2>
      <p>Перед тем как купить умные гаджеты, убедитесь, что в них есть следующие технологии:</p>
      <ul>
        <li><strong>Умные часы с пульсометром и датчиком SpO2:</strong> Позволяют отслеживать частоту сердечных сокращений и уровень кислорода в крови 24/7.</li>
        <li><strong>Смарт часы с GPS:</strong> Незаменимы для пробежек и тренировок на открытом воздухе в парках Калининграда — они строят точную карту маршрута без участия телефона.</li>
        <li><strong>Защита корпуса:</strong> Выбирайте модели с маркировкой <em>«смарт часы IP67 водонепроницаемые»</em> или выше, чтобы не снимать их в душе или во время дождя.</li>
      </ul>

      <h2>Покупка смарт-часов в Калининграде: быстро, надежно, с чеком</h2>
      <p>Не нужно переплачивать за долгую доставку из Москвы или рисковать на маркетплейсах. В нашем каталоге представлены только сертифицированные, оригинальные умные часы. Мы предлагаем быструю доставку по городу, помощь в первоначальной настройке и синхронизации с вашим телефоном, а также честную локальную гарантию.</p>
    `
  }
];