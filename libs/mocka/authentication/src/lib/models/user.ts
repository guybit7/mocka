import { Schema, Document, model, Model } from 'mongoose';
import { RoleDocument } from './role';

export interface IUser {
  email: string;
  password: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleDocument['_id']; // Reference to Role
  token: string;
  refreshToken: string;
  lastLogin: Date;
  isVerified: boolean;
}

export interface UserDocument extends IUser, Document {}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  token: { type: String },
  refreshToken: { type: String },
  lastLogin: { type: Date },
  isVerified: { type: Boolean, default: false },
});

const User = model<UserDocument, UserModel>('Users', userSchema);

export default User;

// userSchema.methods.addToCart = function (product) {
//   const cartProductIndex = this.cart.items.findIndex(cp => {
//     return cp.productId.toString() === product._id.toString();
//   });
//   let newQuantity = 1;
//   const updatedCartItems = [...this.cart.items];

//   if (cartProductIndex >= 0) {
//     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//     updatedCartItems[cartProductIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: product._id,
//       quantity: newQuantity,
//     });
//   }
//   const updatedCart = {
//     items: updatedCartItems,
//   };
//   this.cart = updatedCart;
//   return this.save();
// };
