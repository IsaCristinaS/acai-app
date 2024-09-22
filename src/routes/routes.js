import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Checkout from "../pages/Checkout/Checkout";
import PostPurchase from "../pages/PostPurchase/PostPurchase";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/post-purchase",
    element: <PostPurchase />,
  },
]);
