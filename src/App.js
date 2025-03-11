// import Counter from './features/counter/Counter';
// import Users from './features/users/Users';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./components/login/Login";
import Registration from "./components/registration/registration";
import Products from "./pages/products/Products";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <main>
            {/* <Counter /> */}
            {/* <Users /> */}
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                    </Route>
                </Routes>
            </Router>
        </main>
    )

}

export default App;
