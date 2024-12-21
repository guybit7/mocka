export interface User {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  isVerified: boolean;
}
