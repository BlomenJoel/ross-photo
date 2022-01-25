/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export type Dispatch = <EventKey extends string>(type: EventKey, detail?: any) => void

export type Category = {
	title: string,
	description: string,   
}

export type Size = {
	size: string,
	discountPrice?: number,
	originalPrice: number,
}
export type Print = {
	alt: string,
	slug: string,
	image: string,
	title: string,
	categories: Category[],
	minimumPrice: number,
	discountMinimumPrice?: number,
	sizes: Size[]
}
export type Item = {
	slug: string
	size: Size,
	quantity: number,
	title: string,
}