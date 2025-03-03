export interface User {
    id: string;
    email: string;
    name?: string; 
    token?: string;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface SignupCredentials extends LoginCredentials {
    name?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  