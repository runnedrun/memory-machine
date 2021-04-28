import firebase from "firebase";
import { useEffect, useState } from "react";

export default <Type>(
  ref: firebase.firestore.DocumentReference<Type>,
  debounceTime = 1000,
): [Partial<Type> | undefined, (newValue: Partial<Type>) => void] => {
  const [cache, setCache] = useState<undefined | Partial<Type>>();

  useEffect(() => {
    ref.get().then(_ => setCache(_.data()));
  }, []);

  const lastUpdateTime = 0;
  let pendingUpdate = 0;

  const setFirebase = (newvalue: Partial<Type>) =>
    ref.set(newvalue, { merge: true });

  const set = (newValue: Partial<Type>) => {
    //we don't allow set until we've instantiated data
    if (!cache) return;
    setCache(newValue);
    const shouldUpdateNow = Date.now() - lastUpdateTime > debounceTime;
    if (shouldUpdateNow) {
      setFirebase(newValue);
      clearTimeout(pendingUpdate);
    } else if (!pendingUpdate) {
      pendingUpdate = setTimeout(() => {
        setFirebase(newValue);
      }, debounceTime);
    }
  };

  return [cache, set];
};
