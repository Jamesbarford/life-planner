export type StringIndexSignature<T> = { [key: string]: T };
export type NumberIndexSignature<T> = { [key: number]: T };

export type ActionBase = { type: string };
