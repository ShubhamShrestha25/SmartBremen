export const fakeData = [
  {
    id: 123,
    userId: "user-1",
    title: "Street Gathering at Marktplatz",
    description:
      "A small informal gathering observed at Marktplatz, where people used the public space for social interaction beyond its formal design.",
    status: "Approved",
    category: {
      informalityCategoryId: "cat-1",
      name: "Social & Cultural Practices",
    },
    author: {
      authorId: "auth-1",
      firstName: "Max",
      lastName: "Mustermann",
    },
    device: {
      deviceId: "dev-1",
      tac: "12345678",
      brand: "Apple",
      model: "iPhone 14",
    },
    location: {
      locationId: "loc-1",
      name: "Marktplatz",
      lng: 8.8071,
      lat: 53.0758,
      subdistrict: "Altstadt",
      district: "Mitte",
    },
    images: [
      {
        imageId: "img-1",
        filename: "marktplatz_001.jpg",
        timestamp: "2026-01-21T10:15:00Z",
        url: "/images/marker-popup-default.png",
      },
      {
        imageId: "img-2",
        filename: "marktplatz_002.jpg",
        timestamp: "2026-01-21T11:05:00Z",
        url: "/images/city1.png",
      },
    ],
  },

  {
    id: 333,
    userId: "user-1",
    title: "Informal Trade Along Schlachte",
    description:
      "Informal economic activity taking place along the Schlachte promenade, involving small-scale exchanges in a public waterfront area.",
    status: "Pending",
    category: {
      informalityCategoryId: "cat-2",
      name: "Informal Economies & Exchanges",
    },
    author: {
      authorId: "auth-1",
      firstName: "Jonas",
      lastName: "Becker",
    },
    device: {
      deviceId: "dev-3",
      tac: "23456789",
      brand: "Google",
      model: "Pixel 7",
    },
    location: {
      locationId: "loc-2",
      name: "Schlachte",
      lng: 8.8046,
      lat: 53.0743,
      subdistrict: "Altstadt",
      district: "Mitte",
    },
    images: [
      {
        imageId: "img-3",
        filename: "schlachte_001.jpg",
        timestamp: "2026-01-22T09:40:00Z",
        url: "/images/help-bg.webp",
      },
      {
        imageId: "img-4",
        filename: "schlachte_002.jpg",
        timestamp: "2026-01-22T10:30:00Z",
        url: "/images/city1.png",
      },
    ],
  },

  {
    id: 223,
    userId: "user-2",
    title: "Temporary Structures in Bürgerpark",
    description:
      "Temporary and improvised structures observed in Bürgerpark, reflecting flexible and informal use of park space.",
    status: "Approved",
    category: {
      informalityCategoryId: "cat-3",
      name: "Material & Spatial Informality",
    },
    author: {
      authorId: "auth-2",
      firstName: "Sophie",
      lastName: "Neumann",
    },
    device: {
      deviceId: "dev-6",
      tac: "56789012",
      brand: "Huawei",
      model: "P40",
    },
    location: {
      locationId: "loc-3",
      name: "Bürgerpark",
      lng: 8.8284,
      lat: 53.0855,
      subdistrict: "Schwachhausen",
      district: "Schwachhausen",
    },
    images: [
      {
        imageId: "img-5",
        filename: "burgerpark_001.jpg",
        timestamp: "2026-01-23T14:10:00Z",
        url: "/images/city1.png",
      },
      {
        imageId: "img-6",
        filename: "burgerpark_002.jpg",
        timestamp: "2026-01-23T15:00:00Z",
        url: "/images/help-bg.webp",
      },
    ],
  },

  {
    id: 556,
    userId: "user-1",
    title: "Waterfront Adaptations in Überseestadt",
    description:
      "Adaptations and informal landscape use identified in the Überseestadt area, shaped by proximity to water and ongoing development.",
    status: "Approved",
    category: {
      informalityCategoryId: "cat-4",
      name: "Landscape & Environmental Informality",
    },
    author: {
      authorId: "auth-1",
      firstName: "Anna",
      lastName: "Weber",
    },
    device: {
      deviceId: "dev-8",
      tac: "78901234",
      brand: "Nokia",
      model: "8.3",
    },
    location: {
      locationId: "loc-4",
      name: "Überseestadt",
      lng: 8.7812,
      lat: 53.0991,
      subdistrict: "Walle",
      district: "Walle",
    },
    images: [
      {
        imageId: "img-7",
        filename: "ueberseestadt_001.jpg",
        timestamp: "2026-01-24T16:20:00Z",
        url: "/images/city1.png",
      },
      {
        imageId: "img-8",
        filename: "ueberseestadt_002.jpg",
        timestamp: "2026-01-24T17:10:00Z",
        url: "/images/marker-popup-default.png",
      },
    ],
  },

  {
    id: 888,
    userId: "user-2",
    title: "Unclassified Activity Near Universum Bremen",
    description:
      "An observed activity near Universum Bremen that does not clearly fit into predefined categories but indicates informal use of space.",
    status: "Approved",
    category: {
      informalityCategoryId: "cat-5",
      name: "Other",
    },
    author: {
      authorId: "auth-2",
      firstName: "Paul",
      lastName: "Zimmermann",
    },
    device: {
      deviceId: "dev-9",
      tac: "89012345",
      brand: "Motorola",
      model: "Edge 30",
    },
    location: {
      locationId: "loc-5",
      name: "Universum Bremen",
      lng: 8.8526,
      lat: 53.1066,
      subdistrict: "Horn-Lehe",
      district: "Horn-Lehe",
    },
    images: [
      {
        imageId: "img-9",
        filename: "universum_001.jpg",
        timestamp: "2026-01-25T13:30:00Z",
        url: "/images/marker-popup-default.png",
      },
      {
        imageId: "img-10",
        filename: "universum_002.jpg",
        timestamp: "2026-01-25T14:15:00Z",
        url: "/images/help-bg.webp",
      },
    ],
  },
];
