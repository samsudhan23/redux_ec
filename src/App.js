// import Counter from './features/counter/Counter';
// import Users from './features/users/Users';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/login/Login";
import Registration from "./components/registration/registration";

function App() {
    return (
        <main>
            {/* <Counter /> */}
            {/* <Users /> */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </main>
    )

}

export default App;
