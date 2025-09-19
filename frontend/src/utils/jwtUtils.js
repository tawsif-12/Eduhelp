// Simple JWT token decoder (without verification - for client-side use only)
export const decodeJWT = (token) => {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Check if JWT token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Check if user has specific role
export const hasRole = (token, role) => {
  try {
    const decoded = decodeJWT(token);
    return decoded && decoded.userType === role;
  } catch (error) {
    return false;
  }
};

export default {
  decodeJWT,
  isTokenExpired,
  hasRole
};