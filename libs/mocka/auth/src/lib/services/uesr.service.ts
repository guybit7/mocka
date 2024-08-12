import mongoose from 'mongoose';
import User, { IUser as UserType } from '../models/user';
import bcrypt from 'bcrypt';

export class UserService {
  public static async createDefaultUser() {
    try {
      const user = new User({
        email: 'admin',
        password: await bcrypt.hash('admin123', 10),
        fullName: 'admin',
        username: 'admin',
        createdAt: new Date(),
        role: 'admin',
        isVerified: true,
      });
      user.save();
    } catch (err) {
      console.log(err);
    }
  }

  public static async findById(id: string): Promise<UserType | null> {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Error finding user by id', ${error.message}`);
    }
  }

  public static async create(body: any): Promise<UserType | null> {
    try {
      return await User.create(body);
    } catch (error) {
      throw new Error(`Error create userhfu', ${error.message}`);
    }
  }

  public static async findOne() {
    try {
      return await User.findOne();
    } catch (error) {
      throw new Error(`Error findOne', ${error.message}`);
    }
  }

  public static async clearIsUnVerifiedUsers() {
    try {
      const gracePeriodHours = 10; // Define the grace period - 10 min
      const gracePeriodMillis = gracePeriodHours * 60 * 60 * 1000;
      const cutoffDate = new Date(Date.now() - gracePeriodMillis);
      const result = await User.deleteMany({
        isVerified: false,
        createdAt: { $lte: cutoffDate },
      });
      console.log(`Deleted ${result.deletedCount} is un verified users`);
    } catch (error) {
      throw new Error(`Error Clear Is UnVerified Users', ${error.message}`);
    }
  }
  // public static async find(term): Promise<MockType[] | null> {
  //   console.log(`find mock service: ${term}`);
  //   try {
  //     return await Mock.find({
  //       // $or: [{ name: { $regex: term, $options: 'i' } }],
  //     }); //.skip(0).limit(1);
  //   } catch (error) {
  //     throw new Error(`Error finding mocks', ${error.message}`);
  //   }
  // }

  // public static async findByName(name: string): Promise<MockType | null> {
  //   try {
  //     return await Mock.findOne({ name });
  //   } catch (error) {
  //     throw new Error(`Error finding mock by name', ${error.message}`);
  //   }
  // }

  // public static async create(body: any): Promise<MockType | null> {
  //   try {
  //     return await Mock.create(body);
  //   } catch (error) {
  //     throw new Error(`Error finding mock by name', ${error.message}`);
  //   }
  // }

  // public static async update(body: any): Promise<MockType | null> {
  //   try {
  //     const res = await Mock.findByIdAndUpdate(body._id, body, { new: true });
  //     return res;
  //   } catch (error) {
  //     throw new Error(`Error update', ${error.message}`);
  //   }
  // }

  // public static async delete(id: any): Promise<any> {
  //   try {
  //     console.log(id);
  //     return await Mock.deleteOne({ _id: id });
  //   } catch (error) {
  //     throw new Error(`Error finding mock by name', ${error.message}`);
  //   }
  // }

  // public static async deleteAll(ids: []): Promise<any> {
  //   try {
  //     //   const objectIds = ids.map(id => {
  //     // if (!mongoose.Types.ObjectId.isValid(id)) {
  //     //   throw new Error(`Invalid ID forma: ${id}`);
  //     // }
  //     // return id;
  //     // return  mongoose.Types.ObjectId(id);
  //     //   });
  //     const res = await Mock.deleteMany({ _id: { $in: ids } });
  //     return res;
  //   } catch (error) {
  //     throw new Error(`Error finding mock by name', ${error.message}`);
  //   }
  // }
}
