import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./components/dashboard/productsList/ProductsList";
import Products from "./components/products/Products";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import { Provider } from 'react-redux';


export const success = (msg) => toast.success(msg);
export const error = (msg) => toast.error(msg ? msg : 'Something went wrong.');

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/dashboard" element={<ProductsList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position='top-right'
        />
      </div>
    </Provider>
  )
}

export default App;
