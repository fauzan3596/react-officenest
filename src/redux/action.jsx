import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "./productsSlice";
import { auth, db, googleProvider } from "../config/firebase";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { logout, userFailure, userStart, userSuccess } from "./userSlice";

const productRef = collection(db, "products");

const extractedUserData = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  phoneNumber: user.phoneNumber,
});

const googleLogin = () => async (dispatch) => {
  dispatch(userStart());
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    dispatch(userSuccess(extractedUserData(user)));
  } catch (error) {
    dispatch(userFailure(error));
  }
};

const authState = () => (dispatch) => {
  dispatch(userStart());
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(userSuccess(extractedUserData(user)));
    } else {
      dispatch(logout());
    }
  });
};

const login = (email, password) => async (dispatch) => {
  dispatch(userStart());
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    dispatch(userSuccess(extractedUserData(user)));
  } catch (error) {
    dispatch(userFailure(error));
  }
};

const register = (email, password) => async (dispatch) => {
  dispatch(userStart());
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    dispatch(userSuccess(extractedUserData(user)));
  } catch (error) {
    dispatch(userFailure(error));
  }
};

const logoutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
};

const getProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    let data = [];
    const querySnapshot = await getDocs(productRef);
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error));
  }
};

const addProduct = (payload) => async () => {
  try {
    const newProduct = {
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(productRef, newProduct);
    if (docRef) {
      Swal.fire({
        title: "Success!",
        text: "New product added successfully",
        icon: "success",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
};

const deleteProduct = (id) => async () => {
  try {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
};

const updateProduct = (id, payload) => async () => {
  try {
    const docRef = doc(db, "products", id);
    const updatedData = await updateDoc(docRef, {
      ...payload,
      updatedAt: new Date().toISOString(),
    });
    Swal.fire({
      title: "Success!",
      text: "Product updated successfully",
      icon: "success",
    });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
};

export {
  getProducts,
  googleLogin,
  authState,
  login,
  register,
  logoutUser,
  addProduct,
  deleteProduct,
  updateProduct,
};
