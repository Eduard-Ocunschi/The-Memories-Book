import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";

export const getPageData = async (userId) => {
  console.log(">>>>>>", userId);
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
        // docSnap.data() will be undefined in this case
        await setDoc(docsRef, { pages: arrayUnion(pageObj) });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
};

export const removePageData = async (userId, pageId) => {
  if (userId) {
    try {
      const docsRef = doc(db, "thememoriesbook", userId);
      await updateDoc(docsRef, { pages: arrayRemove(pageId) });
    } catch (error) {
      console.log(error);
      throw new Error("Could not write data to db");
    }
  }
};
