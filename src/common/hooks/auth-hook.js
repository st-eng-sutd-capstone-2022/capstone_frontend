import {useState, useCallback, useEffect} from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [tokenExpirationTime, setTokenExpirationTime] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid,token, expirationDate)=>{
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate||new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);
    setTokenExpirationTime(tokenExpirationDate);
    localStorage.setItem("userData",JSON.stringify({userId:uid, token:token, expiration:tokenExpirationDate.toISOString()}));
  },[]);

  const logout = useCallback(()=>{
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    localStorage.removeItem("userData");
  },[]);

  useEffect(()=>{
    if(token && tokenExpirationTime){
      //this will get time in milliseconds
      const remainingTime = tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer =setTimeout(logout, remainingTime);
    } else{
      clearTimeout(logoutTimer);
    }
  },[token, logout, tokenExpirationTime]);

  //useEffect only runs after the render cycle
  //so we would have alr rendered in the un-authenicated state, then run this useEffect
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  },[login]);

  return {token, login, logout, userId}
};