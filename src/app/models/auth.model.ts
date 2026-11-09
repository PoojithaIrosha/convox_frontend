export type SocialProvider = 'google' | 'microsoft';

export interface LoginRequest {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterRequest {
  fullName: string;
  company: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken?: string;
  expiresIn?: number;
  user: {
    id: string;
    email: string;
    fullName: string;
    workspaceId: string;
  };
}

export interface ResetTokenInfo {
  email: string;
}
