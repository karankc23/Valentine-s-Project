
export const getParamsFromUrl = () => {
  // Use a regex to find A=... and B=... anywhere in the URL (pathname, search, or hash)
  const url = window.location.href;
  
  // Regex looks for A= or a= followed by characters that aren't path separators or param delimiters
  const aMatch = url.match(/[A|a]=([^/&#?]+)/);
  const bMatch = url.match(/[B|b]=([^/&#?]+)/);
  
  return {
    A: aMatch ? decodeURIComponent(aMatch[1]) : null,
    B: bMatch ? decodeURIComponent(bMatch[1]) : null
  };
};

export const generateInviteUrl = (sender: string, recipient: string) => {
  const baseUrl = window.location.origin + window.location.pathname;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Use the format requested by the user: /A=.../B=...
  // We include a hash for SPA compatibility, but the parser is liberal.
  return `${cleanBase}/#/A=${encodeURIComponent(recipient)}/B=${encodeURIComponent(sender)}`;
};
