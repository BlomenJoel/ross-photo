/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
import { States } from '../three/script'
export interface Locals {
	userid: string;
}

export type StateMachine = {
	state: States;
	page: number;
}

export type Dispatch = <EventKey extends string>(type: EventKey, detail?: any) => void
