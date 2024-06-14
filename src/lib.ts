export const convertDate = (_date: string) => {
  const date = new Date(_date);
  return date.toLocaleDateString();
};
