import { data } from "./firebase";

export const updateText = (id: string, text: string) => {
  return data.memories.doc(id).set({ text }, { merge: true });
};

export const addIcon = async (id: string, iconName: string) => {
  const memData = await data.memories
    .doc(id)
    .get()
    .then(_ => _.data());

  const existingIcons = memData?.icons || [];
  existingIcons.push(iconName);

  return data.memories.doc(id).set(
    {
      icons: existingIcons,
    },
    { merge: true },
  );
};
