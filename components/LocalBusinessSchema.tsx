// components/LocalBusinessSchema.tsx
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Watch39",
    "description": "Интернет-магазин оригинальных наручных часов в Калининграде",
    "url": "https://watch39.ru",
    "telephone": "+79211075725",
    "priceRange": "₽₽",
    "image": "https://watch39.ru/placeholder.png",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "ул. Интернациональная, 30",
        "addressLocality": "Калининград",
        "addressRegion": "Калининградская область",
        "postalCode": "236039",
        "addressCountry": "RU"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "ул. Киевская, 95",
        "addressLocality": "Калининград",
        "addressRegion": "Калининградская область",
        "postalCode": "236001",
        "addressCountry": "RU"
      }
    ],
    "geo": [
      {
        "@type": "GeoCoordinates",
        "latitude": "54.692037",
        "longitude": "20.522653"
      },
      {
        "@type": "GeoCoordinates",
        "latitude": "54.711621",
        "longitude": "20.472534"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "19:00"
      }
    ],
    "paymentAccepted": "Наличные, Карты, QR-код",
    "currenciesAccepted": "RUB",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "sameAs": [
      // Добавьте ссылки на ваши соцсети, если есть:
      // "https://vk.com/watch39",
      // "https://t.me/watch39",
      // "https://instagram.com/watch39"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
