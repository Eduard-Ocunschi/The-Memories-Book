import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { getAuth, updateProfile } from "firebase/auth";

export const getPageData = async (userId) => {
  if (userId) {
    try {
      const docsRef = doc(db, "thememoriesbook", userId);
      const docSnap = await getDoc(docsRef);
      const res = docSnap.get("pages");
      console.log(res);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const savePageData = async (userId, pageObj) => {
  if (userId) {
    try {
      const docsRef = doc(db, "thememoriesbook", userId);
      const docsSnap = await getDoc(docsRef);
      if (docsSnap.exists()) {
        await updateDoc(docsRef, { pages: arrayUnion(pageObj) });
      } else {
        await setDoc(docsRef, { pages: arrayUnion(pageObj) });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
};

export const removePageData = async (userId, page) => {
  if (userId) {
    try {
      const docsRef = doc(db, "thememoriesbook", userId);
      return updateDoc(docsRef, { pages: arrayRemove(page) });
    } catch (error) {
      console.log(error);
      throw new Error("Could not write data to db");
    }
  }
};

export const changeUsername = async (newUsername) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, {
        displayName: newUsername,
      });
      console.log("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username: ", error.message);
    }
  }
};
