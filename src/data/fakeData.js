export const fakeData = [
  {
    id: 123,
    location: {
      locationId: "loc-1",
      name: "Marktplatz",
      lng: 8.8071,
      lat: 53.0758,
      subdistrict: "Altstadt",
      district: "Mitte",
    },

    authors: [
      { authorId: "auth-1", firstName: "Max", lastName: "Mustermann" },
      { authorId: "auth-2", firstName: "Lina", lastName: "Schmidt" },
    ],

    devices: [
      {
        deviceId: "dev-1",
        tac: "12345678",
        brand: "Apple",
        model: "iPhone 14",
      },
      {
        deviceId: "dev-2",
        tac: "87654321",
        brand: "Samsung",
        model: "Galaxy S22",
      },
    ],

    category: {
      informalityCategoryId: "cat-1",
      name: "Social and Cultural Practices",
    },

    images: [
      {
        imageId: "img-1",
        filename: "marktplatz_001.jpg",
        timestamp: "2026-01-21T10:15:00Z",
        url: "https://nextcloud.example.com/f/marktplatz_001.jpg",
      },
      {
        imageId: "img-2",
        filename: "marktplatz_002.jpg",
        timestamp: "2026-01-21T11:05:00Z",
        url: "https://nextcloud.example.com/f/marktplatz_002.jpg",
      },
    ],
  },

  {
    id: 333,
    location: {
      locationId: "loc-2",
      name: "Schlachte",
      lng: 8.8046,
      lat: 53.0743,
      subdistrict: "Altstadt",
      district: "Mitte",
    },

    authors: [
      { authorId: "auth-3", firstName: "Jonas", lastName: "Becker" },
      { authorId: "auth-4", firstName: "Mara", lastName: "Hoffmann" },
    ],

    devices: [
      { deviceId: "dev-3", tac: "23456789", brand: "Google", model: "Pixel 7" },
      { deviceId: "dev-4", tac: "34567890", brand: "Xiaomi", model: "Mi 11" },
    ],

    category: {
      informalityCategoryId: "cat-2",
      name: "Informal Economies & Exchanges",
    },

    images: [
      {
        imageId: "img-3",
        filename: "schlachte_001.jpg",
        timestamp: "2026-01-22T09:40:00Z",
        url: "https://nextcloud.example.com/f/schlachte_001.jpg",
      },
      {
        imageId: "img-4",
        filename: "schlachte_002.jpg",
        timestamp: "2026-01-22T10:30:00Z",
        url: "https://nextcloud.example.com/f/schlachte_002.jpg",
      },
    ],
  },

  {
    id: 223,
    location: {
      locationId: "loc-3",
      name: "Bürgerpark",
      lng: 8.8284,
      lat: 53.0855,
      subdistrict: "Schwachhausen",
      district: "Schwachhausen",
    },

    authors: [
      { authorId: "auth-5", firstName: "Tim", lastName: "Krüger" },
      { authorId: "auth-6", firstName: "Sophie", lastName: "Neumann" },
    ],

    devices: [
      { deviceId: "dev-5", tac: "45678901", brand: "OnePlus", model: "9 Pro" },
      { deviceId: "dev-6", tac: "56789012", brand: "Huawei", model: "P40" },
    ],

    category: {
      informalityCategoryId: "cat-3",
      name: "Material & Spatial Informality",
    },

    images: [
      {
        imageId: "img-5",
        filename: "burgerpark_001.jpg",
        timestamp: "2026-01-23T14:10:00Z",
        url: "https://nextcloud.example.com/f/burgerpark_001.jpg",
      },
      {
        imageId: "img-6",
        filename: "burgerpark_002.jpg",
        timestamp: "2026-01-23T15:00:00Z",
        url: "https://nextcloud.example.com/f/burgerpark_002.jpg",
      },
    ],
  },

  {
    id: 556,
    location: {
      locationId: "loc-4",
      name: "Überseestadt",
      lng: 8.7812,
      lat: 53.0991,
      subdistrict: "Walle",
      district: "Walle",
    },

    authors: [
      { authorId: "auth-7", firstName: "Leon", lastName: "Fischer" },
      { authorId: "auth-8", firstName: "Anna", lastName: "Weber" },
    ],

    devices: [
      { deviceId: "dev-7", tac: "67890123", brand: "Sony", model: "Xperia 5" },
      { deviceId: "dev-8", tac: "78901234", brand: "Nokia", model: "8.3" },
    ],

    category: {
      informalityCategoryId: "cat-4",
      name: "Landscape & Environmental Informality",
    },

    images: [
      {
        imageId: "img-7",
        filename: "ueberseestadt_001.jpg",
        timestamp: "2026-01-24T16:20:00Z",
        url: "https://nextcloud.example.com/f/ueberseestadt_001.jpg",
      },
      {
        imageId: "img-8",
        filename: "ueberseestadt_002.jpg",
        timestamp: "2026-01-24T17:10:00Z",
        url: "https://nextcloud.example.com/f/ueberseestadt_002.jpg",
      },
    ],
  },

  {
    id: 888,
    location: {
      locationId: "loc-5",
      name: "Universum Bremen",
      lng: 8.8526,
      lat: 53.1066,
      subdistrict: "Horn-Lehe",
      district: "Horn-Lehe",
    },

    authors: [
      { authorId: "auth-9", firstName: "Paul", lastName: "Zimmermann" },
      { authorId: "auth-10", firstName: "Nina", lastName: "Koch" },
    ],

    devices: [
      {
        deviceId: "dev-9",
        tac: "89012345",
        brand: "Motorola",
        model: "Edge 30",
      },
      {
        deviceId: "dev-10",
        tac: "90123456",
        brand: "Asus",
        model: "Zenfone 9",
      },
    ],

    category: {
      informalityCategoryId: "cat-5",
      name: "Other",
    },

    images: [
      {
        imageId: "img-9",
        filename: "universum_001.jpg",
        timestamp: "2026-01-25T13:30:00Z",
        url: "https://nextcloud.example.com/f/universum_001.jpg",
      },
      {
        imageId: "img-10",
        filename: "universum_002.jpg",
        timestamp: "2026-01-25T14:15:00Z",
        url: "https://nextcloud.example.com/f/universum_002.jpg",
      },
    ],
  },
];
