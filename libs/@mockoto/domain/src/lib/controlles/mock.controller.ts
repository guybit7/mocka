import { Router, Request, Response } from 'express';
import { MockService } from '../services';
import { MockDto } from '../dtos/mock.dto';
import { authMiddleware } from '@mockoto/authentication';

export class MockController {
  router = Router();
  constructor() {
    this.initRoutes();
    this.router.use(authMiddleware);
  }

  private initRoutes() {
    this.router.get('/getAll', this.find.bind(this));
    this.router.get('/:id', this.findById.bind(this));
    this.router.post('/findByName', this.findByName.bind(this));
    this.router.post('', this.create.bind(this));
    this.router.post('/findQuery', this.findQuery.bind(this));
    this.router.put('', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
    this.router.delete('/all', this.deleteAll.bind(this));
    this.router.delete('', this.deleteItems.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async findById(req: Request, res: Response) {
    console.log(`fetch ${req.params.id}`);
    const r = await MockService.findById(req.params.id);
    res.json(r);
  }

  private async find(req: Request, res: Response) {
    console.log(req.query.groupId);
    const groupId = req.query.groupId;
    const r = await MockService.find(req.query.search, groupId);
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
    res.json(mockDto);
  }

  private async create(req: Request, res: Response) {
    const result = await MockService.create(req.body);
    console.log(`create a new mock - id`);
    res.json(result);
  }

  private async findQuery(req: Request, res: Response) {
    console.log(req.body.endpoint);
    const result = await MockService.findQuery(req.body.groupId, req.body.endpoint);
    res.json(result);
  }

  private async update(req: Request, res: Response) {
    const result = await MockService.update(req.body);
    res.json(result);
  }

  private async delete(req: Request, res: Response) {
    const result = await MockService.delete(req.params.id);
    res.json(result);
  }

  private async deleteItems(req: Request, res: Response) {
    console.log(req.body.id);
    const result = await MockService.deleteAll(req.body.id);
    res.status(200).json(result);
  }

  private async deleteAll(req: Request, res: Response) {
    res.status(200);
  }
}
