import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/admin/Login';
import IndexPage from './pages/index';
import FrontProducts from './pages/front/FrontProducts';
import ProductDetail from './pages/front/ProductDetail';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import NotFound from './pages/NotFound';
import AdminProducts from './pages/admin/Products';
import Articles from './pages/admin/Articles';
import Coupons from './pages/admin/Coupons';
import Orders from './pages/admin/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<IndexPage />} />
				<Route path="/products" element={<FrontProducts />} />
				<Route path="/product/:id" element={<ProductDetail />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<AdminLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Navigate to="/admin/products" replace />} />
					<Route path="products" element={<AdminProducts />} />
					<Route path="articles" element={<Articles />} />
					<Route path="coupons" element={<Coupons />} />
					<Route path="orders" element={<Orders />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
