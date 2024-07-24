"use client";

export default function Error({ error, reset }: any) {
	return (
		<div>
			<h1>{error?.message}</h1>
			<button onClick={reset}>Retry</button>
		</div>
	);
}
