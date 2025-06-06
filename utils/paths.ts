export const getImagePath = (path: string) => {
  // Remove any leading slashes
  const cleanPath = path.replace(/^\/+/, '');
  return `/telia_e-shop/${cleanPath}`;
};
