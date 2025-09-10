
## Netflix GPT

- Create React + Vite App
- Configure Tailwind CSS
- implement Header
- Routing Setup
- Login form
- Sign Up form
- Form Validation
- useRef Hook
- `Firebase Setup`
- Deplying the project to the production
- Create SignUp user Account
- Create the SignUp feature
- Created Redux Store with `userSlice`
- `onAuthStateChanged(auth, callback)` → Subscribes to authentication state changes and invokes the callback whenever the user signs in, signs out, or the ID token changes.

## From `Firebase`

- `createUserWithEmailAndPassword` for Sign Up.
- `updateProfile` for profile Update with `displayName` & `photoUrl`.
- `signInWithEmailAndPassword` for Sign In.
- `onAuthStateChanged` for Capturing the Auth State changes.
- `export const auth = getAuth();` gives us one authentication instance.

## Configuration

- (React + Vite) `npm create vite@latest`
- (Tailwind CSS and It's Configurations) `npm install tailwindcss @tailwindcss/vite`
- (React Router)

## Notes

# 1. `Why does a user remain signed in after a page reload even if the Redux store value is removed?`

Answer:
👉 Firebase persists the user session in `local storage` by default. So even if you remove the user from Redux, on page reload Firebase still considers the user signed in. If the Redux store is not synced with Firebase’s auth state, Redux starts empty and the UI may behave incorrectly.

`Fixing this issue:` Using the Firebase `signOut api` it get solved.

# 2. `What getAuth() does?`

    When you use:
    ```
    import { getAuth } from "firebase/auth";
    export const auth = getAuth();
    ```

👉 getAuth() creates (or fetches) an authentication instance that is linked to your Firebase app.
This auth object is like your gateway to all Firebase Authentication features — sign-in, sign-out, user info, managing sessions, etc.

👉`In Short`: export const auth = getAuth(); gives you one authentication instance connected to your Firebase project. You then pass it into functions like signInWithEmailAndPassword, signOut, etc., to control all authentication-related features in your app.
