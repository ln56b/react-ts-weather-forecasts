export const generateUrlForPast7Days = (baseUrl: string): string[] => {
  const urls = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0];
    urls.push(`${baseUrl}&dt=${formattedDate}`);
  }
  return urls;
};
