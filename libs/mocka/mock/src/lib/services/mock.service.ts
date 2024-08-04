import Mock, { Mock as MockType } from '../models/mock';
import mongoose from 'mongoose';

export class MockService {
  public static async findById(id: string): Promise<MockType | null> {
    try {
      return await Mock.findById(id);
    } catch (error) {
      throw new Error(`Error finding mock by id', ${error.message}`);
    }
  }

  public static async find(term): Promise<MockType[] | null> {
    console.log(`find mock service: ${term}`);
    try {
      return await Mock.find({
        // $or: [{ name: { $regex: term, $options: 'i' } }],
      }); //.skip(0).limit(1);
    } catch (error) {
      throw new Error(`Error finding mocks', ${error.message}`);
    }
  }

  public static async findByName(name: string): Promise<MockType | null> {
    try {
      return await Mock.findOne({ name });
    } catch (error) {
      throw new Error(`Error finding mock by name', ${error.message}`);
    }
  }

  public static async create(body: any): Promise<MockType | null> {
    try {
      return await Mock.create(body);
    } catch (error) {
      throw new Error(`Error finding mock by name', ${error.message}`);
    }
  }

  public static async update(body: any): Promise<MockType | null> {
    try {
      const res = await Mock.findByIdAndUpdate(body._id, body, { new: true });
      return res;
    } catch (error) {
      throw new Error(`Error update', ${error.message}`);
    }
  }

  public static async delete(id: any): Promise<any> {
    try {
      console.log(id);
      return await Mock.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(`Error finding mock by name', ${error.message}`);
    }
  }

  public static async deleteAll(ids: []): Promise<any> {
    try {
      //   const objectIds = ids.map(id => {
      // if (!mongoose.Types.ObjectId.isValid(id)) {
      //   throw new Error(`Invalid ID forma: ${id}`);
      // }
      // return id;
      // return  mongoose.Types.ObjectId(id);
      //   });
      const res = await Mock.deleteMany({ _id: { $in: ids } });
      return res;
    } catch (error) {
      throw new Error(`Error finding mock by name', ${error.message}`);
    }
  }
}
