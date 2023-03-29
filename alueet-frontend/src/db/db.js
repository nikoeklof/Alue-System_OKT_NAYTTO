const users = [
  {
    email: "tupu@email.com",
    id: 1,
    admin: false,
    areas: {
      1: 4,
    },
  },
  {
    username: "Janne",
    email: "jami@email.com",
    id: 2,
    admin: false,
    areas: {
      1: 2,
      2: 4,
      3: 9,
    },
  },
  {
    username: "Niko",
    email: "niek@email.com",
    id: 3,
    admin: true,
    areas: {},
  },
  {
    username: "Samuli",
    email: "sako@email.com",
    id: 4,
    admin: true,
    areas: {},
  },
  {
    username: "Marko",
    email: "mala@email.com",
    id: 5,
    admin: false,
    areas: {},
  },
  {
    username: "Johanna",
    email: "jotu@email.com",
    id: 6,
    admin: true,
    areas: {},
  },
];

const areas = [
  {
    name: "Emola-Rouhiala",
    buildings: 12,
    ownerId: 1,
  },
  {
    name: "Graani",
    buildings: 3,
    ownerId: null,
  },
  {
    name: "Kattilansilta-Laajalampi",
    buildings: 30,
    ownerId: 2,
  },
  {
    name: "Keskusta",
    buildings: 19,
    ownerId: 3,
  },
  {
    name: "Kirjala-Nuijamies",
    buildings: 9,
    ownerId: null,
  },
  {
    name: "Lähemäki",
    buildings: 25,
    ownerId: 4,
  },
  {
    name: "Launiala",
    buildings: 16,
    ownerId: 5,
  },
  {
    name: "Lehmuskylä",
    buildings: 4,
    ownerId: null,
  },
];

const initialAreas = [
  {
    id: 134,
    areaName: "Siekkilä",
    neighborhood: "Test",
	loaned:false,
    apartmentAmount: 50,
    latlngs: [
      {
        lat: 61.689302329747484,
        lng: 27.230815887451175,
      },
      {
        lat: 61.68954656134125,
        lng: 27.235450744628906,
      },
      {
        lat: 61.68620856227581,
        lng: 27.23922729492188,
      },
      {
        lat: 61.68702274167488,
        lng: 27.231330871582035,
      },
    ],
  },
  {
    id: 156,
    areaName: "Lehmuskylä",
    neighborhood: "Test",
    apartmentAmount: 50,
    loaned: false,
    latlngs: [
      {
        lat: 61.69402379806822,
        lng: 27.233390808105472,
      },
      {
        lat: 61.693047001817156,
        lng: 27.243347167968754,
      },
      {
        lat: 61.69670982833595,
        lng: 27.244033813476566,
      },
      {
        lat: 61.69768650864526,
        lng: 27.238883972167972,
      },
    ],
  },
  {
    id: 171,
    areaName: "Kaukola",
    neighborhood: "Test",
    loaned: true,
    apartmentAmount: 50,
    latlngs: [
      {
        lat: 61.685475782455356,
        lng: 27.252101898193363,
      },
      {
        lat: 61.67839134732683,
        lng: 27.256050109863285,
      },
      {
        lat: 61.681974483211036,
        lng: 27.271327972412113,
      },
      {
        lat: 61.68808114278884,
        lng: 27.266521453857425,
      },
    ],
  },
];

export { users, areas, initialAreas };
