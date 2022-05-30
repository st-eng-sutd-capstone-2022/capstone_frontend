import React from 'react';
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom';

import './App.css';
import { useAuth } from './common/hooks/auth-hook';
import Login from './screens/auth/Login';
import Profile from './screens/profile/Profile';
import Map from './screens/map/Map';
import ResponsiveAppBar from './common/components/ResponsiveAppBar';
import Assign from './screens/assign/Assign';

const App = () => {
  // const {token, login, logout, userId} = useAuth()

  let routes;
  // if(token){
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //         {/* home route */}
  //       </Route>
  //       <Route path="/about" exact>
  //         <About/>
  //       </Route>
  //     </Switch>
  //   )
  // } else {
  //   routes = (
  //     <Switch>
  //       <Route path="/login" exact>
  //         <Login/>
  //       </Route>
  //       <Redirect to="/login"/>
  //     </Switch>
  //   )
  // }
  // return(
  //   <AuthContext.Provider value={{isLoggedIn: !!token, token:token, userId:userId, login:login, logout:logout}}>
  //     <Router>
  //       <MyNav/>
  //       <main>
  //         {routes}
  //       </main>
  //     </Router>
  //   </AuthContext.Provider>
  // );
  routes = (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/liveview" element={<Map/>}/>
      <Route path="assign" element={<Assign/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="*" element={<Navigate to ="/" />}/>
    </Routes>
  )
  return(
    <Router>
      <ResponsiveAppBar/>
      <main>
        {routes}
      </main>
    
    </Router>
  );

}

export default App;
