export default async ({ dupeKeys, entities }) => {
  Object.entries(dupeKeys).map(([key, value]: any) => {
    console.log(`Searching for dupes ${key}==${value}`)
    entities.where(key, '==', value);
  });

  const duplicates = await entities.get();

  duplicates.docs.length && console.log('Dupes found', duplicates.docs.length, duplicates.docs[0]);

  return !!duplicates.docs.length
}