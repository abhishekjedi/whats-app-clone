import { useState, useEffect } from "react";
import { listenToCollection } from "../../Firebase/Firestore.service";
import { UseFirestoreCollectionResult } from "./useFirestore.types";

const useFirestoreCollection = <T>(
  collectionName: [string, ...string[]],
  transform?: (data: Array<T & { id: string }>) => Array<T & { id: string }>
): UseFirestoreCollectionResult<T> => {
  const [data, setData] = useState<Array<T & { id: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleSnapshot = (items: Array<T & { id: string }>) => {
      setData(transform ? transform(items) : items);
      console.log(items);
      setLoading(false);
    };

    const handleError = (err: Error) => {
      console.error("Error listening to collection:", err);
      setError(err);
      setLoading(false);
    };

    const unsubscribe = listenToCollection<T>(
      collectionName,
      handleSnapshot,
      handleError
    );

    return () => unsubscribe();
  }, [collectionName, transform]);

  return { data, loading, error };
};

export default useFirestoreCollection;
