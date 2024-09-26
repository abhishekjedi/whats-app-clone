import { useState, useEffect } from "react";
import { listenToCollection } from "../../helpers/Firebase/Firestore.service";
import { UseFirestoreCollectionResult } from "./useFirestore.types";
import { OrderByDirection } from "firebase/firestore";

const useFirestoreCollection = <T>(
  collectionName: [string, ...string[]],
  orderCollection: {
    key: string;
    orderDirection: OrderByDirection;
  },
  transform?: (data: Array<T & { id: string }>) => Array<T & { id: string }>
): UseFirestoreCollectionResult<T> => {
  const [data, setData] = useState<Array<T & { id: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleSnapshot = (items: Array<T & { id: string }>) => {
      setData(transform ? transform(items) : items);
      setLoading(false);
    };

    const handleError = (err: Error) => {
      console.error("Error listening to collection:", err);
      setError(err);
      setLoading(false);
    };

    const unsubscribe = listenToCollection<T>(
      collectionName,
      orderCollection,
      handleSnapshot,
      handleError
    );

    return () => unsubscribe();
  }, [collectionName, transform, orderCollection]);

  return { data, loading, error };
};

export default useFirestoreCollection;
