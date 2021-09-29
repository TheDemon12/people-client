interface ItemsType {
	[key: string]: string;
}

function checkWindowObject() {
	if (typeof window === 'undefined') return null;
}

export function storeItem(key: string, value: string) {
	checkWindowObject();

	localStorage.setItem(key, value);
}

export function storeItems(data: ItemsType) {
	checkWindowObject();

	for (let key in data) {
		localStorage.setItem(key, data[key]);
	}
}

export function getItem(key: string) {
	checkWindowObject();

	const value = localStorage.getItem(key);
	if (!value) return null;
	return value;
}

export function getItems(keys: string[]) {
	checkWindowObject();

	let items: ItemsType[] = [];

	keys.forEach(key => {
		const value = localStorage.getItem(key);
		if (value)
			items.push({
				[key]: value,
			});
	});

	if (items.length === 0) return null;

	return items;
}

export function clearItem(key: string) {
	checkWindowObject();

	return localStorage.removeItem(key);
}
export function clearItems(keys: string[]) {
	checkWindowObject();

	keys.forEach(key => clearItem(key));
}
