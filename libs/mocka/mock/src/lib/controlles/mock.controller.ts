import { Router, Request, Response } from 'express';
import { MockService } from '../services';
import { MockDto } from '../dtos/mock.dto';

export class MockController {
  router = Router();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/getAll', this.find.bind(this));
    this.router.get('/:id', this.findById.bind(this));
    this.router.post('/findByName', this.findByName.bind(this));
    this.router.post('', this.create.bind(this));
    this.router.put('', this.update.bind(this));
    this.router.delete('', this.delete.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async findById(req: Request, res: Response) {
    const r = await MockService.findById(req.params.id);
    res.json(r);
  }

  private async find(req: Request, res: Response) {
    const r = await MockService.find();
    setTimeout(() => {
      res.json(r);
    }, 500);
  }

  private async findByName(req: Request, res: Response) {
    console.log('findByName');
    const { name } = req.body;
    const result = await MockService.findByName(name);
    let mockDto: MockDto;
    if (result !== null) {
      mockDto = new MockDto(result.name, result.value);
    }
    console.log(mockDto);
    res.json(mockDto);
  }

  private async create(req: Request, res: Response) {
    const result = await MockService.create(req.body);
    res.json(result);
  }

  private async update(req: Request, res: Response) {
    const result = await MockService.update(req.body);
    res.json(result);
  }

  private async delete(req: Request, res: Response) {
    const result = await MockService.delete(req.body.id);
    res.json(result);
  }
}
