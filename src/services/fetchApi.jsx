import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

const fetchProducts = async () => {
  const productRef = collection(db, "products");
  let data = [];
  const querySnapshot = await getDocs(productRef);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

const fetchProductById = async (id) => {
  const docRef = doc(db, "products", id);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
};

const addProductToCart = async (product) => {
  const docRef = doc(db, "carts", product.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const existingProduct = docSnap.data();
    Swal.fire({
      title: "Success!",
      icon: "success",
      text: "Product added to cart successfully",
    });
    return await setDoc(
      docRef,
      {
        ...existingProduct,
        quantity: existingProduct.quantity + product.quantity,
      },
      { merge: true }
    );
  } else {
    Swal.fire({
      title: "Success!",
      icon: "success",
      text: "Product added to cart successfully",
    });
    return await setDoc(docRef, product, { merge: true });
  }
};

const fetchCarts = async () => {
  const cartRef = collection(db, "carts");
  let data = [];
  const querySnapshot = await getDocs(cartRef);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

const updateCart = async ({ id, cart }) => {
  const docRef = doc(db, "carts", id);
  return await updateDoc(docRef, cart);
};

const deleteCart = async (id) => {
  await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this product from your cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been removed from your cart.",
        icon: "success",
      });
      const docRef = doc(db, "carts", id);
      return await deleteDoc(docRef);
    }
  });
};

const checkoutCarts = async (cart) => {
  const docRef = doc(db, "carts", cart.id);

  const productRef = doc(db, "products", cart.id);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    const productData = productSnap.data();
    const newStock = productData.stock - cart.quantity;

    await updateDoc(productRef, {
      stock: newStock,
      updatedAt: new Date().toISOString(),
    });

    await deleteDoc(docRef);
  }

  return Swal.fire({
    title: "Success!",
    text: "Your checkout is successful!",
    icon: "success",
  });
};

export {
  fetchProducts,
  fetchProductById,
  addProductToCart,
  fetchCarts,
  updateCart,
  deleteCart,
  checkoutCarts,
};
