import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { authState } from "./redux/action";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authState());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
