/* eslint-disable @typescript-eslint/no-explicit-any */
interface QueryModel {
    /** @property Key for query */
    key?: string
    /** @method Call api */
    // eslint-disable-next-line no-unused-vars
    call: (...args: any) => any;
};

export type {
    QueryModel,
};