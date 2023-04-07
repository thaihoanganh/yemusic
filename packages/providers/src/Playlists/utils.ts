import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
	const uuid = uuidv4().split('-');
	return uuid[2] + uuid[1] + uuid[0] + uuid[3] + uuid[4];
}

export function generateSlug(name: string): string {
	return name.toLowerCase().replace(/ /g, '-');
}
