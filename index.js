const searchAPIURL = 'https://api.publicapis.org/entries';
const randomAPIURL = 'https://api.publicapis.org/random';

const categories = [
	'Animals',
	'Anime',
	'Anti-Malware',
	'Art & Design',
	'Books',
	'Business',
	'Calendar',
	'Cloud Storage & File Sharing',
	'Continuous Integration',
	'Cryptocurrency',
	'Currency Exchange',
	'Data Validation',
	'Development',
	'Dictionaries',
	'Documents & Productivity',
	'Environment',
	'Events',
	'Finance',
	'Food & Drink',
	'Games & Comics',
	'Geocoding',
	'Government',
	'Health',
	'Jobs',
	'Machine Learning',
	'Music',
	'News',
	'Open Data',
	'Open Source Projects',
	'Patent',
	'Personality',
	'Phone',
	'Photography',
	'Science & Math',
	'Security',
	'Shopping',
	'Social',
	'Sports & Fitness',
	'Test Data',
	'Text Analysis',
	'Tracking',
	'Transportation',
	'URL Shorteners',
	'Vehicle',
	'Video',
	'Weather',
];

const form = document.querySelector('form');
const titleInput = document.querySelector('#titleInput');
const inputs = document.querySelectorAll('input');
const randomBtn = document.querySelector('#randomBtn');
const apiOutputContainer = document.querySelector('.api-output-container');

const chooseEndpointURL = (eventType) => (eventType === 'submit' ? searchAPIURL : randomAPIURL);

const makeQueryString = () => {
	return [...inputs].reduce((acc, input) => {
		if (!input.name) {
			return acc + `${input.id}=${input.value}&`;
		} else if (input.checked) {
			return acc + `${input.name}=${input.value}&`;
		} else return acc;
	}, '?');
};

const clearOutput = () => {
	apiOutputContainer.innerHTML = '';
};

const createAPILink = (api) => {
	const link = document.createElement('a');
	link.href = api.Link;
	link.target = '_blank';
	link.innerText = api.API;
	return link;
};

const createStatsSection = (api) => {
	const stats = document.createElement('section');
	stats.classList.add('api__stats');
	const auth = document.createElement('p');
	auth.innerText = `Auth: ${!api.Auth ? 'none' : api.Auth}`;
	const cors = document.createElement('p');
	cors.innerText = `CORS: ${api.Cors}`;
	const https = document.createElement('p');
	https.innerText = `HTTPS: ${api.HTTPS ? 'yes' : 'no'}`;
	stats.append(auth, cors, https);
	return stats;
};

const createAPIArticle = (api) => {
	const article = document.createElement('article');
	article.classList.add('api');
	const h3 = document.createElement('h3');
	const link = createAPILink(api);
	const description = document.createElement('h4');
	description.innerText = api.Description;
	const category = document.createElement('h5');
	category.innerText = `Category: ${api.Category}`;
	const stats = createStatsSection(api);
	h3.append(link);
	article.append(h3, description, category, stats);
	apiOutputContainer.append(article);
};

const createAPIArticles = (apis) => {
	apis.forEach((api) => createAPIArticle(api));
};

const getAPI = async (e) => {
	e.preventDefault();
	clearOutput();
	try {
		const response = await fetch(chooseEndpointURL(e.type) + makeQueryString());
		const parsedResponse = await response.json();
		createAPIArticles(parsedResponse.entries);
	} catch (err) {
		const errorP = document.createElement('p');
		errorP.classList.add('error');
		errorP.innerText = 'Sorry, no match found! Please try something else.';
		apiOutputContainer.append(errorP);
	}
};

form.addEventListener('submit', getAPI);
randomBtn.addEventListener('click', getAPI);
