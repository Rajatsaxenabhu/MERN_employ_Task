import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  showEmployeeForm: boolean;
  showEmployeeList: boolean;
  homepage: boolean;
  loading:boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  showEmployeeForm: false,
  showEmployeeList: false,
  homepage: true,
  loading:true
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
    },
    toggleLoading: (state, action: PayloadAction<{ value: boolean; }>) => {
      state.loading = action.payload.value;
    },
  },
});

export const { setCredentials, logout,toggleEmployeeForm, toggleEmployeeList,toggleHomepage,toggleLoading } = authSlice.actions;
export default authSlice.reducer;
