import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './Admin';
import CustomerPage from './CustomerPage';
import PublicElement from './PublicElement';
import Customer from './Customer';
import AdminElement from './AdminElement';
import ProfileOverview from './ProfileOverview';
import DataFetcherComponent from './DataFetcherComponent';
import ShopOverview from './ShopOverview';
import Appointments from './Appoitments';
import CarShopProfile from './CarShopProfile';
import AddService from './AddService';
import EditCarShopService from './EditCarShopService';
import AppointmentRequests from './AppointmentRequests';
import LeaveFeedback from './LeaveFeedback';


function App() {
    const CURRENT_USER_TYPE = localStorage.getItem("userRole");
    const isAuth = localStorage.getItem("isAuth");

    const redirectMe = () =>{
      console.log(CURRENT_USER_TYPE);
      console.log(isAuth);
      if(isAuth == 'true'){
        if(CURRENT_USER_TYPE == '1'){
          return <Navigate to="/admin"/>
        }else if(CURRENT_USER_TYPE == '2'){
          return <Navigate to="/customer"/>
        }
      }else{
        return <Navigate to="/login"/>
      }

    }
    

    return (
            <Router>
                <Routes>
                    <Route path="/" element={redirectMe()}/>
                    <Route path="/admin" element={<AdminElement children={<Admin />} role={CURRENT_USER_TYPE}></AdminElement>}></Route>
                    <Route path="/customer" element={<CustomerPage children={<Customer />} role={CURRENT_USER_TYPE}></CustomerPage>}></Route>
                    <Route path="/login" element={<PublicElement><LoginPage /></PublicElement>}></Route>
                    <Route path="/customer/myprofile" element={<ProfileOverview/>}></Route>
                    <Route path="/customer/carshops" element={<DataFetcherComponent/>}></Route>
                    <Route path="/customer/carshop" element={<ShopOverview/>}></Route>
                    <Route path="/customer/appoitments" element={<Appointments/>}></Route>
                    <Route path="/admin/myprofile" element={<CarShopProfile/>}></Route>
                    <Route path="/admin/carshopdetails/addservice" element={<AddService/>}></Route>
                    <Route path='/admin/carshopdetails/editcarshopservice' element={<EditCarShopService/>}></Route>
                    <Route path='/admin/appoitments' element={<AppointmentRequests/>}></Route>
                    <Route path='customer/leavefeedback' element={<LeaveFeedback/>}></Route>
                </Routes>
            </Router>
    );
}

export default App;
