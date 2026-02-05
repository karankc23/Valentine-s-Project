
export const getParamsFromUrl = () => {
  // Use a regex to find A=... and B=... anywhere in the URL (pathname, search, or hash)
  // This is the most robust way to handle GitHub Pages subdirectories
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
  // baseUrl handles the origin + path (including subfolders like /my-repo/)
  const baseUrl = window.location.origin + window.location.pathname;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // We use a hash (/#/) to ensure that static hosts like GitHub Pages 
  // don't try to find a physical folder for the parameters
  return `${cleanBase}/#/A=${encodeURIComponent(recipient)}/B=${encodeURIComponent(sender)}`;
};
