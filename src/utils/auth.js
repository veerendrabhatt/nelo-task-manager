/**
 * Authentication utility functions
 * Handles session storage for login state
 */

/**
 * Store user session in sessionStorage
 * @param {string} email - User email
 */
export const setSession = (email) => {
  sessionStorage.setItem('isAuthenticated', 'true');
  sessionStorage.setItem('userEmail', email);
};

/**
 * Check if user is authenticated
 * @returns {boolean} - Authentication status
 */
export const isAuthenticated = () => {
  return sessionStorage.getItem('isAuthenticated') === 'true';
};

/**
 * Get current user email
 * @returns {string|null} - User email or null
 */
export const getCurrentUser = () => {
  return sessionStorage.getItem('userEmail');
};

/**
 * Clear session (logout)
 */
export const clearSession = () => {
  sessionStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('userEmail');
};

/**
 * Validate login credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {boolean} - Validation result
 */
export const validateCredentials = (email, password) => {
  // Simple validation - in production, this would check against a backend
  // For demo purposes, accept any email/password combination
  return email && password && email.includes('@') && password.length >= 6;
};

