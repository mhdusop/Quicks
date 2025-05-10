export const formatDate = (isoDate: string | number | Date) => {
   const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" } as const;
   return new Date(isoDate).toLocaleDateString("en-US", options);
};