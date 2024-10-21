import { Router, Request, Response } from 'express';

export class BaseController<T> {
  protected router = Router();
  protected service: any; // Service should be defined in subclasses

  constructor(service: any) {
    this.service = service;
  }

  protected initRoutes() {
    this.router.get('/getAll', this.findAll.bind(this));
    this.router.get('/:id', this.findById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  protected async findById(req: Request, res: Response) {
    try {
      const result = await this.service.getById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  protected async findAll(req: Request, res: Response) {
    try {
      const result = await this.service.getAll();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  protected async create(req: Request, res: Response) {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  protected async update(req: Request, res: Response) {
    try {
      const result = await this.service.update(req.body._id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  protected async delete(req: Request, res: Response) {
    try {
      const result = await this.service.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
