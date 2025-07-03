import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainOutlet from '../OutLate/MainOutlet/MainOutlet';
import ErrorPage from '../Components/Page/ErrorPage/ErrorPage';
import Home from '../Components/Page/Home/Home/Home';
import Shop from '../Components/Page/Shop/Shop/Shop';
import Register from '../Components/Page/Register/Register';
import Login from '../Components/Page/Login/Login';
import Secret from '../Sheard/Secret/Secret';
import PrivetRouts from './PrivetRouts';
import DetailseProduct from '../Components/DetailseProduct/DetailseProduct';
import Dashboard from '../OutLate/Dashboard/Dashboard';
import Carts from '../Components/Page/Dashboard/Carts/Carts';
import AllUsers from '../Components/Page/Dashboard/AllUsers/AllUsers';
import AdminRouts from './AdminRouts';
import MyProducts from '../Components/Page/Dashboard/MyProducts/MyProducts';
import SellerRouts from './SellerRouts';
import AddProducts from '../Components/Page/Dashboard/AddProducts/AddProducts';
import ManageMedicinesSeeler from '../Components/Page/Dashboard/ManageMedicinesSeeler/ManageMedicinesSeeler';
import AllProductsAdmin from '../Components/Page/Dashboard/AllProductsAdmin/AllProductsAdmin';
import SellerInformation from '../Components/Page/Dashboard/SellerInformation/SellerInformation';
import EditProduct from '../Components/Page/Dashboard/AllProductsAdmin/EditProduct';
import Payments from '../Components/Page/Dashboard/Payments/Payments';
import PaymentsHistory from '../Components/Page/Dashboard/PaymentsHistory/PaymentsHistory';
import SellerPaymentsHistory from '../Components/Page/Dashboard/SellerPaymentsHistory/SellerPaymentsHistory';
import AdminHome from '../Components/Page/Dashboard/AdminHome/AdminHome';
import UserHome from '../Components/Page/Dashboard/UserHome/UserHome';
import SellerHome from '../Components/Page/Dashboard/SellerHome/SellerHome';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainOutlet></MainOutlet>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/secret',
                element: <PrivetRouts><Secret></Secret></PrivetRouts>
            },
            {
                path: '/products/:id',
                element: <DetailseProduct></DetailseProduct>,
                loader: ({ params }) =>
                    fetch(`https://medicine-server-ten.vercel.app/products/${params.id}`)
                        .then((response) => response.json()),
                
            },
            
        ]
    },
    {
        path: 'dashboard',
        element : <PrivetRouts><Dashboard></Dashboard></PrivetRouts>,
        children : [
            {
                path : 'carts',
                element : <PrivetRouts><Carts></Carts></PrivetRouts>
            },
            {
                path : 'payments',
                element : <Payments></Payments>
            },
            {
                path : 'userHome',
                element : <UserHome></UserHome>
            },
            {
                path : 'paymentsHistory',
                element : <PaymentsHistory></PaymentsHistory>
            },
            // admin routs
            {
                path : 'allusers',
                element : <AdminRouts><AllUsers></AllUsers></AdminRouts>
            },
            {
                path : 'allProducts',
                element : <AdminRouts><AllProductsAdmin></AllProductsAdmin></AdminRouts>
            },
            {
                path : 'adminHome',
                element : <AdminRouts><AdminHome></AdminHome></AdminRouts>
            },
            {
                path : 'sellerInformation',
                element : <AdminRouts><SellerInformation></SellerInformation></AdminRouts>
            },
            {
                path : 'updateItem/:id',
                element : <AdminRouts><EditProduct></EditProduct></AdminRouts>,
                loader : ({params})=> fetch(`https://medicine-server-ten.vercel.app/products/${params.id}`)
            },
            // seller routs
            {
                path : 'myProducts',
                element : <SellerRouts><MyProducts></MyProducts></SellerRouts>
            },
            {
                path : 'manageMedicines',
                element : <SellerRouts><ManageMedicinesSeeler></ManageMedicinesSeeler></SellerRouts>
            },
            {
                path : 'sellerHome',
                element : <SellerRouts><SellerHome></SellerHome></SellerRouts>
            },
            {
                path : 'sellerPaymentsHistory',
                element : <SellerRouts><SellerPaymentsHistory></SellerPaymentsHistory></SellerRouts>
            },
            {
                path : 'addProduct',
                element : <SellerRouts><AddProducts></AddProducts></SellerRouts>
            }
        ]
    }
])

export default Router;