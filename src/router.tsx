import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";

import ListProductPage from "./pages/admin/ListProductPage";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { BaseLayoutAdmin, BaseLayoutClient } from "./components";
import CartPage from "./pages/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayoutClient />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
  {
    path: "/admin",
    element: <BaseLayoutAdmin />,
    children: [
      { index: true, element: <Navigate to="products" /> },
      { path: "products", element: <ListProductPage /> },
      { path: "products/add", element: <AddProductPage /> },
      { path: "products/:id/edit", element: <EditProductPage /> },
    ],
  },
  {
    path: "*",
    element: <div>NOT FOUND</div>,
  },
]);
