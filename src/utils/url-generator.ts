export const generateFetchForecastUrl = (
  baseUrl: string,
  isFuture: boolean,
  days: number
): string[] => {
  const urls = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();

    if (isFuture) {
      date.setDate(date.getDate() + 14 + i); // 14 days in the future as per the API limitations
    } else {
      date.setDate(date.getDate() - i);
    }

    const formattedDate = date.toISOString().split("T")[0];
    urls.push(`${baseUrl}&dt=${formattedDate}`);
  }
  return urls;
};
