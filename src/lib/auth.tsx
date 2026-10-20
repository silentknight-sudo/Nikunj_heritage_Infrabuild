/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import { DEFAULT_ADMIN_EMAIL, checkIsAdmin, upsertUserProfile } from "./firestore";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (e: string, p: string) => Promise<User | null>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

function describeAuthError(err: any): string {
  switch (err?.code) {
    case "auth/unauthorized-domain":
      return `Sign-in is not enabled for ${window.location.hostname}. Add this domain under Firebase Console → Authentication → Settings → Authorized domains.`;
    case "auth/network-request-failed":
      return "Network error during sign-in. Please check your connection and try again.";
    case "auth/operation-not-allowed":
      return "Google sign-in is disabled for this Firebase project.";
    default:
      return `Sign-in failed${err?.code ? ` (${err.code})` : ""}. Please try again.`;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Surface errors from a redirect-based sign-in (used when popups are blocked)
    getRedirectResult(auth).catch((err) => {
      console.error("Google redirect sign-in failed:", err);
      toast.error(describeAuthError(err));
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        const isDefaultAdmin = currentUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL;
        if (isDefaultAdmin) {
          setIsAdmin(true);
        }

        // Profile sync is best-effort; it must never block the admin check
        try {
          await upsertUserProfile({
            uid: currentUser.uid,
            email: currentUser.email || "",
            displayName: currentUser.displayName || "",
            photoURL: currentUser.photoURL || "",
            providerId: currentUser.providerData?.[0]?.providerId || "password"
          });
        } catch (err) {
          console.warn("User profile sync failed:", err);
        }

        if (!isDefaultAdmin) {
          const privileged = await checkIsAdmin(currentUser.uid);
          setIsAdmin(privileged);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      // onAuthStateChanged takes over loading/admin state once the popup resolves
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      if (e?.code === "auth/popup-blocked" || e?.code === "auth/operation-not-supported-in-this-environment") {
        await signInWithRedirect(auth, provider);
        return;
      }
      if (e?.code === "auth/popup-closed-by-user" || e?.code === "auth/cancelled-popup-request") {
        return;
      }
      console.error("Google Auth popup failed:", e);
      toast.error(describeAuthError(e));
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const privileged = cred.user.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL || await checkIsAdmin(cred.user.uid);
      setIsAdmin(privileged);
      return cred.user;
    } catch (e) {
      console.error("Email login failed:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });
      await upsertUserProfile({
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName: name,
        photoURL: cred.user.photoURL || "",
        providerId: cred.user.providerData?.[0]?.providerId || "password"
      });
      setUser({ ...cred.user, displayName: name });
    } catch (e) {
      console.error("Email signup failed:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
    } catch (e) {
      console.error("Signout failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        loginWithGoogle,
        loginWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
