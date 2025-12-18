const generateRandomSalt = () => {
  return Math.random().toString(36).substring(2, 8);
};

const SALT = import.meta.env.VITE_SALT;

export const encodeId = (id) => {
  const randomSalt = generateRandomSalt();
  const payload = `${randomSalt}${SALT}${id}`;
  return window.btoa(payload);
};

export const decodeId = (encoded) => {
  try {
    const parts = window.atob(encoded).split(SALT);
    if (parts.length < 2) return null;
    
    return parts[1];
  } catch (e) {
    console.error("Decoding failed:", e);
    return null;
  }
};