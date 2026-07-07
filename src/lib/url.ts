export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Fallback for SSR/server-side if ever needed
  return process.env.VITE_PUBLIC_URL || "https://birthdaybloom.vercel.app";
};

export const getSurpriseUrl = (id: string) => {
  return `${getBaseUrl()}/s/${id}`;
};
