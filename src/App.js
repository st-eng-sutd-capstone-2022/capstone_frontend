import React from 'react';
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom';

import './App.css';
import { useAuth } from './common/hooks/auth-hook';
import { AuthContext } from './common/context/auth-context';
import Login from './screens/auth/Login';
import Profile from './screens/profile/Profile';
import Map from './screens/map/Map';
import ResponsiveAppBar from './common/components/ResponsiveAppBar';
import Assign from './screens/assign/Assign';
import AssignBoatForm from './screens/assign/AssignBoatForm';
import AssignLocationForm from './screens/assign/AssignLocationForm';
import CreateAccount from './screens/profile/CreateAccount';
import AppInstructions from './screens/profile/AppInstructions';
import ChangePassword from './screens/profile/ChangePassword';
import ActivityWrapperWithDrawer from './screens/activity/ActivityWrapperWithDrawer';

const App = () => {
  const {token, login, logout} = useAuth()

  let routes;
  if(token){
    routes = (
      <Routes>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/change-password" element={<ChangePassword/>}/>
        <Route path='/profile/create-account' element={<CreateAccount/>}/>
        <Route path='/profile/instruction' element={<AppInstructions/>}/>
        <Route path="/liveview" element={<Map/>}/>
        <Route path="/assign" element={<Assign/>}/>
        <Route path="/assign/boat/:boatId" element={<AssignBoatForm/>}/>
        <Route path="/assign/location/:locationId" element={<AssignLocationForm/>}/>
        <Route path="/activitylog" element={<ActivityWrapperWithDrawer/>}/>
        <Route path="*" element={<Navigate to ="/liveview" />}/>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Navigate to ="/login" />}/>
      </Routes>
    )
  }
  return(
    <AuthContext.Provider value={{isLoggedIn: !!token, token:token, login:login, logout:logout}}>
      <Router>
        <ResponsiveAppBar/>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );


}

export default App;
