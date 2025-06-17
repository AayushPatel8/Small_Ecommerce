import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
    const newUser = useSelector((state)=>state.products.newUser);

    return !newUser?<Outlet />:<Navigate to='/profile' />
}
 
export default ProtectedRoutes;