"use client";

export default function Error({ error }: any) {
	return <h1>{error.message}</h1>;
}
