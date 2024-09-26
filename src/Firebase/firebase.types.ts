import { OrderByDirection, WhereFilterOp } from "firebase/firestore";

export type whereQueryProps = {
  field: string;
  operator: WhereFilterOp;
  value: any;
};

export type generateCustomQueryProps = {
  collectionName: [string, ...string[]];
  orderByKey?: string;
  limitAmt?: number;
  whereQuery?: whereQueryProps[];
};
