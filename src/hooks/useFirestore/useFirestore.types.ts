export type UseFirestoreCollectionResult<T> = {
  data: Array<T & { id: string }>;
  loading: boolean;
  error: Error | null;
};
