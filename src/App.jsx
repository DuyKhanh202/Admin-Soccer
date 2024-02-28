import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/pages/Login/Login";
import Signup from "./Auth/pages/Signup/Signup";
import AdminLayout from "./admin/AdminLayout";
import AdminUser from "./admin/AdminUser/AdminUser";
import AdminSoccerBooking from "./admin/AdminSoccerBooking/AdminSoccerBooking";
import AdminSoccerField from "./admin/AdminSoccerField";
import AdminEmployee from "./admin/AdminEmployee/AdminEmployee";
import AdminEquipment from "./admin/AdminEquipment/AdminEquipment";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ĐĂNG NHẬP */}
                <Route path="/" element={<Login/>} />

                {/* ĐĂNG KÝ */}
                <Route path="/sign-up" element={<Signup/>}/>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="soccerbookingmanage" element={<AdminSoccerBooking/>}/>
                    <Route path="accountmanage" element={<AdminUser/>}/>
                    <Route path="soccerfieldmanage" element={<AdminSoccerField/>}/>
                    <Route path="employeemanage" element={<AdminEmployee/>}/> 
                    <Route path="equipmentmanage" element={<AdminEquipment/>}/>
                </Route>
            </Routes>

        </BrowserRouter>
    )
}

export default App