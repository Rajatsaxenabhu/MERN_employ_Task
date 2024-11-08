import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  showEmployeeForm: boolean;
  showEmployeeList: boolean;
  homepage: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  showEmployeeForm: false,
  showEmployeeList: false,
  homepage: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: string;}>) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated=true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated=false;
      Cookies.remove('token'); 
    },
    toggleEmployeeForm: (state) => {
      state.showEmployeeForm = true
      state.showEmployeeList = false;
      state.homepage = false 
    },
    toggleEmployeeList: (state) => {
      state.showEmployeeList = true
      state.showEmployeeForm = false;
      state.homepage = false 
    },  
    toggleHomepage: (state) => {
      state.homepage = true
      state.showEmployeeForm = false;
      state.showEmployeeList = false;
    }  
  },
});

export const { setCredentials, logout,toggleEmployeeForm, toggleEmployeeList,toggleHomepage } = authSlice.actions;
export default authSlice.reducer;
