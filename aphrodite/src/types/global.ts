export type StringIndexSignature<T> = { [key: string]: T };
export type NumberIndexSignature<T> = { [key: number]: T };

export type ActionBase = { type: string };

export type Literal = string | number | boolean | undefined | null;

export type UpdateState<T> = (state: Partial<T>) => T;
