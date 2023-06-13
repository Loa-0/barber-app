export const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
