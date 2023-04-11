const users = [
	{
		email: 'tupu@email.com',
		id: 1,
		admin: false,
		areas: {
			1: 4,
		},
	},
	{
		username: 'Janne',
		email: 'jami@email.com',
		id: 2,
		admin: false,
		areas: {
			1: 2,
			2: 4,
			3: 9,
		},
	},
	{
		username: 'Niko',
		email: 'niek@email.com',
		id: 3,
		admin: true,
		areas: {},
	},
	{
		username: 'Samuli',
		email: 'sako@email.com',
		id: 4,
		admin: true,
		areas: {},
	},
	{
		username: 'Marko',
		email: 'mala@email.com',
		id: 5,
		admin: false,
		areas: {},
	},
	{
		username: 'Johanna',
		email: 'jotu@email.com',
		id: 6,
		admin: true,
		areas: {},
	},
];

const areas = [
	{
		id: 0,
		name: 'Emola-Rouhiala',
		buildings: 12,
		ownerId: 1,
		loaned: true,
		latlngs: [
			{
				lat: 61.70151154218786,
				lng: 27.268066406250004,
			},
			{
				lat: 61.702528758508194,
				lng: 27.27364540100098,
			},
			{
				lat: 61.700250147365686,
				lng: 27.272872924804688,
			},
			{
				lat: 61.69764581424961,
				lng: 27.275962829589847,
			},
			{
				lat: 61.69670982833595,
				lng: 27.271585464477543,
			},
			{
				lat: 61.69931424045855,
				lng: 27.26729393005371,
			},
		],
	},
	{
		id: 1,
		name: 'Graani',
		buildings: 3,
		loaned: false,
		ownerId: null,
		latlngs: [
			{
				lat: 61.68683955318242,
				lng: 27.293257713317875,
			},
			{
				lat: 61.68765371593847,
				lng: 27.296347618103027,
			},
			{
				lat: 61.68681919883838,
				lng: 27.2995662689209,
			},
			{
				lat: 61.68433586815883,
				lng: 27.295961380004886,
			},
			{
				lat: 61.68398981441874,
				lng: 27.29411602020264,
			},
		],
	},
	{
		name: 'Kattilansilta-Laajalampi',
		buildings: 30,
		ownerId: 2,
		id: 2,
		loaned: true,
		latlngs: [
			{
				lat: 61.665032358921145,
				lng: 27.25193023681641,
			},
			{
				lat: 61.661365772545395,
				lng: 27.261028289794925,
			},
			{
				lat: 61.66609151398264,
				lng: 27.267208099365234,
			},
			{
				lat: 61.66829118155313,
				lng: 27.27304458618164,
			},
			{
				lat: 61.67008338747772,
				lng: 27.26789474487305,
			},
			{
				lat: 61.66763944452713,
				lng: 27.26343154907227,
			},
		],
	},
	{
		id: 3,
		name: 'Keskusta',
		buildings: 19,
		loaned: true,
		ownerId: 3,
		latlngs: [
			{
				lat: 61.686137320556654,
				lng: 27.27092027664185,
			},
			{
				lat: 61.68579128701048,
				lng: 27.273516654968265,
			},
			{
				lat: 61.688315207365456,
				lng: 27.27486848831177,
			},
			{
				lat: 61.688610329736456,
				lng: 27.272250652313236,
			},
		],
	},
	{
		id: 4,
		name: 'Kirjala-Nuijamies',
		buildings: 9,
		loaned: false,
		ownerId: null,
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

	{
		id: 5,
		name: 'Launiala',
		buildings: 16,
		loaned: false,
		ownerId: 5,
		latlngs: [
			{
				lat: 61.695936601164824,
				lng: 27.307977676391605,
			},
			{
				lat: 61.69626217286178,
				lng: 27.314500808715824,
			},
			{
				lat: 61.693291203778585,
				lng: 27.31587409973145,
			},
			{
				lat: 61.69272139619582,
				lng: 27.3076343536377,
			},
		],
	},
	{
		id: 6,
		name: 'Lehmuskylä',
		buildings: 4,
		loaned: true,
		ownerId: null,
		latlngs: [
			{
				lat: 61.69410519636017,
				lng: 27.229270935058597,
			},
			{
				lat: 61.684010170628476,
				lng: 27.24540710449219,
			},
			{
				lat: 61.681893052922305,
				lng: 27.233562469482425,
			},
		],
	},
];

export { users, areas };
