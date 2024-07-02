const API_KEY = process.env.PIXABAY_API_KEY;

export async function getRandomPixabayImage(query) {
	const encodedQueryName = encodeURIComponent(query.toLowerCase());
	const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodedQueryName}&image_type=photo&orientation=horizontal&editors_choice=false`;

	const response = await fetch(API_URL);
	const data = await response.json();

	if (!response.ok) {
		throw new Error();
	}

	if (data.total === 0) {
		return { largeImageURL: "/not-found.webp" };
	}

	const randomIndex = Math.floor(Math.random() * data.hits.length);
	const randomImage = data.hits[randomIndex];

	return randomImage;
}
