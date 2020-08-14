import { v4 as uuid } from 'uuid';

import checkForDupes from './checkForDupes';
import getFirebaseCollection from './getFirebaseCollection';

export default async ({
  entity,
  collection,
  firebaseConfig,
  checkForDuplicates
}) => {
  const entities = getFirebaseCollection({
    collection,
    firebaseConfig
  });
  if (checkForDuplicates && !checkForDupes({
    dupeKeys: checkForDuplicates,
    entities,
  })) return;

  return entities.doc(uuid()).set(entity);
}