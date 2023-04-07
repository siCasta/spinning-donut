export const $ = <Q extends Element>(query: string) =>
    document.querySelector<Q>(query)!
