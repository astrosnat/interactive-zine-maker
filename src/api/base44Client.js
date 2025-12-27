import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "694e73d07f0b0290b4d0fe04", 
  requiresAuth: true // Ensure authentication is required for all operations
});
