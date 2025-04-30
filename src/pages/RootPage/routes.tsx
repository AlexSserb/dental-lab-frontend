import { AdminOperationsPage } from "pages/admin/AdminOperationsPage";
import { AdminOrderListPage } from "pages/admin/AdminOrderListPage";
import { AdminOrderPage } from "pages/admin/AdminOrderPage";
import { AssignOperationsPage } from "pages/admin/AssignOperationsPage";
import { OrderProcessingPage } from "pages/admin/OrderProcessingPage";
import { LoginPage } from "pages/auth/LoginPage";
import { ProfilePage } from "pages/auth/ProfilePage";
import { RegistrationPage } from "pages/auth/RegistrationPage";
import { CreateOrderPage } from "pages/physician/CreateOrderPage";
import { PhysicianOrderListPage } from "pages/physician/PhysicianOrderListPage";
import { TechOperationsPage } from "pages/tech/TechOperationsPage";
import { TechSchedulePage } from "pages/tech/TechSchedulePage";
import { Route, Routes } from "react-router-dom";
import { SchedulePage } from "../admin/SchedulePage";
import { OrdersContextProvider } from "../../contexts/OrdersContext/OrdersContext.tsx";

export const routesUnauthorized = (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
);

export const routesPhysician = (
    <Routes>
        <Route path="/" element={<PhysicianOrderListPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
    </Routes>
);

export const routesTech = (
    <Routes>
        <Route path="/" element={<TechOperationsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/schedule" element={<TechSchedulePage />} />
    </Routes>
);

export const routesAdmin = (
    <OrdersContextProvider>
        <Routes>
            <Route path="/" element={<AdminOrderListPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order" element={<AdminOrderPage />} />
            <Route
                path="/operations-for-work"
                element={<AdminOperationsPage />}
            />
            <Route path="/tech-schedule" element={<TechSchedulePage />} />
            <Route path="/process-order" element={<OrderProcessingPage />} />
            <Route path="/assign-operations" element={<AssignOperationsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
    </OrdersContextProvider>
);
