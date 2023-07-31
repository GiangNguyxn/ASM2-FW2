import { RouterProvider } from "react-router";
import "./App.css";

import { router } from "./router";
function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

{
  /* <Routes>
          <Route path="/" element={<BaseLayoutClient />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
          </Route>

          <Route path="/admin" element={<BaseLayoutAdmin />}>
            <Route index element={<ListProductPage />} />
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
          </Route>
        </Routes> */
}
