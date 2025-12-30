# Keycloak Environment Variables Setup

## .env File Configuration

Create a `.env` file in the root directory of your project with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Keycloak Configuration
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=your-realm-name
VITE_KEYCLOAK_CLIENT_ID=your-client-id
```

## How to Find Your Keycloak Values

### 1. VITE_KEYCLOAK_URL
- **Default localhost value**: `http://localhost:8080`
- This is the base URL where your Keycloak server is running
- If you're running Keycloak on a different port, update accordingly
- **To verify**: Open `http://localhost:8080` in your browser - you should see the Keycloak welcome page

### 2. VITE_KEYCLOAK_REALM
- This is the **name** of the realm you created in Keycloak
- **To find it**: 
  1. Log into Keycloak Admin Console: `http://localhost:8080/admin`
  2. Look at the top-left dropdown - your realm name is displayed there
  3. Or go to the realm list and see all your realms
- **Example**: If you created a realm called "myapp", use `myapp`

### 3. VITE_KEYCLOAK_CLIENT_ID
- This is the **Client ID** you need to create/configure in your realm
- **To create a client**:
  1. Log into Keycloak Admin Console
  2. Select your realm
  3. Go to **Clients** → **Create client**
  4. Fill in:
     - **Client ID**: e.g., `ocr-dashboard` (this is what goes in .env)
     - **Client type**: `OpenID Connect`
  5. Click **Next**
  6. Configure:
     - **Client authentication**: `Off` (for public clients/SPA)
     - **Authorization**: `Off` (unless you need it)
     - **Authentication flow**: `Standard flow` ✅
     - **Direct access grants**: `On` (optional, for testing)
  7. Click **Next**
  8. **Important settings**:
     - **Valid redirect URIs**: 
       - `http://localhost:5173/*` (for Vite dev server)
       - `http://localhost:3000/*` (if using port 3000)
       - Add your production URL when deploying
     - **Web origins**: 
       - `http://localhost:5173`
       - `http://localhost:3000`
       - Add your production origin when deploying
  9. Click **Save**

### 4. VITE_API_BASE_URL
- This is your backend API base URL
- **Default**: `http://localhost:8000/api` (adjust based on your backend)
- Make sure your backend is configured to accept Bearer tokens from Keycloak

## Example .env File

Here's a complete example for localhost testing:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Keycloak Configuration (localhost)
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=master
VITE_KEYCLOAK_CLIENT_ID=ocr-dashboard
```

**Note**: Using `master` realm is fine for testing, but it's recommended to create a dedicated realm for your application.

## Testing Your Configuration

1. **Start your Keycloak server** (if not already running)
2. **Create/verify your client** in Keycloak Admin Console
3. **Create a test user**:
   - Go to **Users** → **Add user**
   - Set username and email
   - Go to **Credentials** tab → Set password
   - Disable "Temporary" if you want the password to persist
4. **Start your React app**: `npm run dev`
5. **You should be redirected to Keycloak login page**
6. **Login with your test user credentials**
7. **You should be redirected back to your app**

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**
   - Solution: Make sure your redirect URI in Keycloak client settings matches your app URL exactly
   - Check: `http://localhost:5173/*` (with wildcard) or `http://localhost:5173` (without)

2. **"CORS error"**
   - Solution: Add your app origin to "Web origins" in Keycloak client settings
   - Add: `http://localhost:5173`

3. **"Realm not found"**
   - Solution: Double-check the realm name in Keycloak Admin Console
   - Make sure it matches exactly (case-sensitive)

4. **"Client not found"**
   - Solution: Verify the Client ID exists in your realm
   - Check: Clients → Your client ID

5. **App doesn't redirect to login**
   - Check browser console for errors
   - Verify all environment variables are set correctly
   - Make sure Keycloak server is running

## Quick Test Checklist

- [ ] Keycloak server is running on `http://localhost:8080`
- [ ] Realm exists and is accessible
- [ ] Client is created with correct Client ID
- [ ] Valid redirect URIs are configured
- [ ] Web origins are configured
- [ ] Test user exists with password set
- [ ] `.env` file is created with correct values
- [ ] React app is running (`npm run dev`)

