export const getTenantNameFromHostName = (
  hostName: string,
  baseUrl: string
): string => {
  if (hostName === baseUrl) {
    return "";
  }
  const appURLRegex = new RegExp(`^(.*)\\.${baseUrl}$`);
  const match = hostName.match(appURLRegex);
  if (match && match[1]) {
    return match[1];
  }
  return "";
};
