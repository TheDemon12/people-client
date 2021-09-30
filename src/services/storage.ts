interface ItemsType {
	[key: string]: string;
}

function isWindowDefined() {
	return typeof window !== 'undefined';
}

export function storeItem(key: string, value: string) {
	if (!isWindowDefined()) return;

	localStorage.setItem(key, value);
}

export function storeItems(data: ItemsType) {
	if (!isWindowDefined()) return;

	for (let key in data) {
		localStorage.setItem(key, data[key]);
	}
}

export function getItem(key: string) {
	if (!isWindowDefined()) return null;

	const value = localStorage.getItem(key);
	if (!value) return null;
	return value;
}

export function getItems(keys: string[]) {
	if (!isWindowDefined()) return null;

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
	if (!isWindowDefined()) return;

	return localStorage.removeItem(key);
}
export function clearItems(keys: string[]) {
	if (!isWindowDefined()) return;

	keys.forEach(key => clearItem(key));
}
