export function formatTime(time: number): string {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = Math.floor(time % 60);

	const minutesString = minutes.toString().padStart(2, '0');
	const secondsString = seconds.toString().padStart(2, '0');

	return hours > 0 ? `${hours}:${minutesString}:${secondsString}` : `${minutes}:${secondsString}`;
}
