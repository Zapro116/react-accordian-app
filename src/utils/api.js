export const fetchCelebrities = async () => {
	try {
		const response = await fetch('/celebrities.json');
		if (!response.ok) {
			throw new Error('Failed to fetch celebrities');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching celebrities:', error);
		return [];
	}
};
