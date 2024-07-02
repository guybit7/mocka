import Mock, { Mock as MockType} from "../models/mock";


export class MockService {

    public static async findById(id: string): Promise<MockType | null> {
        try {
            return await Mock.findById(id);
        } catch (error) {
            throw new Error(`Error finding mock by id', ${error.message}`)
        }
    }

    public static async find(): Promise<MockType[] | null> {
        try {
            return await Mock.find();
        } catch (error) {
            throw new Error(`Error finding mocks', ${error.message}`)
        }
    }

    public static async findByName(name: string): Promise<MockType | null> {
        try {
            return await Mock.findOne({name});
        } catch (error) {
            throw new Error(`Error finding mock by name', ${error.message}`)
        } 
    }
    
    public static async create(body: any): Promise<MockType | null> {
        try {
            return await Mock.create(body);
        } catch (error) {
            throw new Error(`Error finding mock by name', ${error.message}`)
        } 
    }

    public static async update(body: any): Promise<MockType | null> {
        try {
            console.log(body);
            return await Mock.findByIdAndUpdate(body._id, body, {new: true});
        } catch (error) {
            throw new Error(`Error update', ${error.message}`)
        } 
    }

    public static async delete(id: any): Promise<any> {
        try {
            console.log(id)
            return await Mock.deleteOne({_id: id});
        } catch (error) {
            throw new Error(`Error finding mock by name', ${error.message}`)
        } 
    }
}