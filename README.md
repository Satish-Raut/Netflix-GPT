
# CinemaFriend 🎬

A movie browsing and recommendation app built with React and deployed on Netlify.

## 🚀 Live Preview

Check out the live version of the app here:  
👉 [https://cinemafriend.netlify.app]

## 🛠️ Tech Stack

- React.js
- Redux Toolkit
- Tailwind CSS
- Firebase (for authentication)
- TMDB API (for movie data)
- Netlify (for deployment)

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
- 🪲 Bug Fix: User Profile (`displayName`and`photoURL`) Not Updating Immediately in Redux Store
- 🪲 Bug Fix: Redirecting Based on Authentication State
- Add Hardcoded values to the constant file
- Get access to the TMDB API Key
- Fetching data form the TMDB movie list API
- Custom Hook form NowPlaying Movies
- Create Movie Slice
- Update store With Movie Data
- Planning for Main & Secondary Container
- Fetch Data for Trailer Video
- Update store with the Trailer Video
- Embeded the Youtube Video & make it Autoplay , mute
- Build Secondary Content
- Build Movie List
- Build Movie Card
- TMDB image CDN URL
- usePopularMovies() Hook for popular movies data from TMDB API
- useTopRatedMovies() Hook for Top Rated movies data from TMDB API
- useUpcomingMovies() Hook for Upcoming movies data from TMDB API
- Build GPT Search Page with GPT Search Bar
- Implement Multi-Language Feature
- Get Movie recommendation from the AI (GEMINI API)
- Process the movie data and send to TMDB api to fetch the movie details.
- Store the Movie Details in Redux store

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

# 3. `🪲 Bug Fix: User Profile (`displayName`and`photoURL`) Not Updating Immediately in Redux Store`

## Problem Description

- When a new user signs up using `createUserWithEmailAndPassword`, their profile details (`displayName`, `photoURL`) are updated using `updateProfile`.
- However, after signup, the Redux store only contains the **default Firebase user object** (with empty `displayName` and `photoURL`).
- The updated profile fields appear **only after refreshing the page** or re-triggering `onAuthStateChanged`.

---

## Root Cause

- `updateProfile()` updates the user object **asynchronously** on Firebase servers.
- The `auth.currentUser` object in memory does not always refresh immediately after calling `updateProfile`.
- `onAuthStateChanged` only fires when **auth state** changes (sign-in, sign-out, token refresh), not when profile fields are updated.
- As a result, Redux receives stale data right after signup.

---

## Fixing Steps

### ✅ Step 1: Update Redux Store Manually After `updateProfile`

Right after `updateProfile` succeeds, destructure the updated user object and dispatch it to Redux.

````js
updateProfile(auth.currentUser, {
  displayName: name.current.value,
  photoURL: "https://avatars.githubusercontent.com/u/148804426?v=4",
})
  .then(() => {
    // Forcefully push updated values to Redux
    const { uid, email, displayName, photoURL } = auth.currentUser;
    dispatch(addUser({ uid, email, displayName, photoURL }));

    toggleForm();
  })
  .catch((error) => {
    console.log(error);
    setErrorMsg(error.message);
  });

➡️ This ensures Redux has the latest profile data without waiting for a page reload.

### ✅ Step 2: Keep `onAuthStateChanged` in App.jsx

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(addUser({ uid, email, displayName, photoURL }));
        } else {
            dispatch(removeUser());
        }
    });
    }, []);

- Still needed to sync user state across sessions.
- But it won’t fire immediately after updateProfile.


# 4. `🪲# Bug Fix: Redirecting Based on Authentication State`

## Problem Description
- Earlier, users could manually type `/browse` in the URL even if they weren’t logged in, and still access the page.
- Similarly, when users were already logged in, they could manually navigate back to `/signin`, which should not be allowed.
- This caused a security and UX issue because routes were not **protected**.

---

## Root Cause
- The app was missing proper **auth state-based navigation control**.
- `onAuthStateChanged` was only updating the Redux store, but **no redirection logic** was applied at the same place.
- As a result, unauthorized users could bypass navigation restrictions manually.

---

## Fix Implemented

### ✅ Added Navigation Inside `onAuthStateChanged`
By moving the logic into `Header.jsx` (or a global component that always renders), we ensure navigation updates immediately when auth state changes:

```js
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const { uid, email, displayName, photoURL } = user;
      dispatch(addUser({ uid, email, displayName, photoURL }));
      navigate("/browse"); // ✅ Force authenticated users to browse
    } else {
      // User is signed out
      dispatch(removeUser());
      navigate("/signin"); // ✅ Redirect unauthenticated users
    }
  });
}, []);
`
````

# 5.  src={<https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}}>}

  autoplay=1 → plays automatically  
  mute=1 → muted (needed for autoplay)  
  controls=0 → hides player controls  
  loop=1 → makes it repeat  
  playlist=`${trailerKey}` → ensures looping works with a single video  

# 6. Implement The AI feature for Movie Recomandation using Gemini API

# 7. Promise.all

`Promise.all(iterable)` is a method that takes an **iterable** (usually an array) of promises and returns a **single promise** that:

- **Resolves** when **all** of the promises in the iterable are resolved.  
- The resolved value is an **array of results**, in the same order as the input promises.  
- **Rejects immediately** if **any one** of the promises rejects.  
- The rejection reason is the reason from the **first promise that rejects**.
