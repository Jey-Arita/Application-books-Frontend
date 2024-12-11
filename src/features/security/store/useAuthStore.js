import { create } from "zustand";
import { loginAsync } from "../../../shared/actions/auth/auth.action";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    roles: [],
    membresia: null,
    refreshToken: null,
    isAuthenticated: false,
    message: "",
    error: false,
    login: async (form) => {
      const {status, data, message, } = await loginAsync(form);
      
      if (status) {
        const decodedJwt = jwtDecode(data.token);
        const roles = decodedJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? [];
        const membresia = decodedJwt["Membresia"] ?? null;
        set({
          error: false,
          user: {
            email: data.email,
            tokenExpiration: data.tokenExpiration,
          },
          token: data.token,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
          message: message,
          roles: typeof roles === "string" ? [roles] : roles,
          membresia: membresia,
        });
  
        localStorage.setItem('user', JSON.stringify(get().user ?? {}));
        localStorage.setItem('token', get().token);
        localStorage.setItem('refreshToken', get().refreshToken);

        return;
      }
  
      set({message: message, error: true});
      return;
    },
    setSession: (user, token, refreshToken) => {
      set({user: user, token: token, refreshToken: refreshToken, isAuthenticated: true});
      localStorage.setItem('user', JSON.stringify(get().user ?? {}));
      localStorage.setItem('token', get().token);
      localStorage.setItem('refreshToken', get().refreshToken);
    },
    logout: () => {
      set({user: null, token: null, refreshToken: null, isAuthenticated: false, error: false, message: '', roles: [], membresia: null,})
      localStorage.clear();
    },
    validateAuthentication: () => {
      const token = localStorage.getItem('token') ?? '';
  
      if(token === '') {
        set({isAuthenticated: false});
        return ;
      } else {
        try{
          const decodeJwt = jwtDecode(token);
          const currenTime = Math.floor(Date.now()/1000);
          if(decodeJwt.exp < currenTime) {
            console.log('Token expirado');
            set({isAuthenticated: false});
            return;
          }
  
          const roles = decodeJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? [];
          const membresia = decodeJwt["Membresia"] ?? null;
          set({isAuthenticated: true , roles: typeof(roles) === 'string' ? [roles] : roles, membresia: membresia});
        } catch(error) {
          console.error(error);
          set({isAuthenticated: false})
        }
      }
    },
  }));
  