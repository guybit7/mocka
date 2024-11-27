import { NextFunction, Response, Router } from 'express';
import { BaseService } from '../services/base.service';

export abstract class BaseController<T> {
  protected router = Router();
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.get('/getAll', this.findAll.bind(this));
    this.router.get('/:id', this.findById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.post('/findByName', this.findByName.bind(this));
    this.router.put('/', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
    this.router.delete('/all', this.deleteAll.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  protected async findAll(req: any, res: Response, next: NextFunction) {
    try {
      console.log('findAll', req.tenantId);

      const tenantId = this.getTenantId(req);
      const result = await this.service.findAll(tenantId);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  protected async findById(req: any, res: Response, next: NextFunction) {
    try {
      const tenantId = this.getTenantId(req);
      const result = await this.service.findById(tenantId, req.params.id);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  protected async findByName(req: any, res: Response, next: NextFunction) {
    try {
      const tenantId = this.getTenantId(req);
      const { name } = req.body;
      const result = await this.service.findByName(tenantId, name);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  protected async create(req: any, res: Response, next: NextFunction) {
    try {
      const tenantId = this.getTenantId(req);
      const result = await this.service.create(tenantId, req.body);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  protected async update(req: any, res: Response, next: NextFunction) {
    try {
      const tenantId = this.getTenantId(req);
      const result = await this.service.update(tenantId, req.body._id, req.body);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  protected async delete(req: any, res: Response, next: NextFunction) {
    try {
      const tenantId = this.getTenantId(req);
      const result = await this.service.delete(tenantId, req.params.id);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private async deleteAll(req: Request, res: Response) {
    try {
      const tenantId = this.getTenantId(req);
      const result = await this.service.deleteAll(tenantId);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private getTenantId(req: any): string {
    if (!req.tenantId) {
      throw new Error('Tenant ID is missing');
    }
    return req.tenantId;
  }

  private handleError(res: Response, error: any) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
