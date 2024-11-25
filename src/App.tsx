import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  ProductCreatePage,
  ProductPage,
  PurchasePage,
} from "./pages";
import { Layout } from "./components/shared";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="create" element={<ProductCreatePage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="purchase/:productId" element={<PurchasePage />} />
      </Routes>
    </Layout>
  );
}
export default App;
