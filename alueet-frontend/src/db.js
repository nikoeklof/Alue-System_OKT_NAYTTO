
const users = [
	{
		email: 'tupu@email.com',
		id: 1,
		admin: false,
		areas: {
			1: 4
		}
	},
	{
		username: 'Janne',
		email: 'jami@email.com',
		id: 2,
		admin: false,
		areas: {
			1: 2
		}
	},
	{
		username: 'Niko',
		email: 'niek@email.com',
		id: 3,
		admin: true,
		areas: {
			
		}
	},
	{
		username: 'Samuli',
		email: 'sako@email.com',
		id: 4,
		admin: true,
		areas: {
			
		}
	},
	{
		username: 'Marko',
		email: 'mala@email.com',
		id: 5,
		admin: false,
		areas: {

		}
	},
	{
		username: 'Johanna',
		email: 'jotu@email.com',
		id: 6,
		admin: true,
		areas: {
			
		}
	}
];

const areas = [
	{
		name: 'Emola-Rouhiala',
		buildings: 12,
		ownerId: 1
	},
	{
		name: 'Graani',
		buildings: 3,
		ownerId: null
	},
	{
		name: 'Kattilansilta-Laajalampi',
		buildings: 30,
		ownerId: 2
	},
	{
		name: 'Keskusta',
		buildings: 19,
		ownerId: 3
	},
	{
		name: 'Kirjala-Nuijamies',
		buildings: 9,
		ownerId: null
	},
	{
		name: 'Lähemäki',
		buildings: 25,
		ownerId: 4
	},
	{
		name: 'Launiala',
		buildings: 16,
		ownerId: 5
	},
	{
		name: 'Lehmuskylä',
		buildings: 4,
		ownerId: null
	}
];

export {
	users,
	areas
};