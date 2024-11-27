import { BaseService } from '@mockoto/common';
import { Request, Response, Router } from 'express';

//@Deprecated
export class BaseController<T> {
  protected router = Router();

  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  protected initRoutes() {
    this.router.get('/getAll', this.findAll.bind(this));
    this.router.get('/:id', this.findById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/', this.update.bind(this));
    // this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  public getRouter(): Router {
    return this.router;
  }

  /**
   * Fetch all records.
   */
  protected async findAll(req: Request, res: Response) {
    try {
      const tenantId = this.getTenantId(req);
      console.log(tenantId);
      const result = await this.service.findAll(tenantId);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Fetch a record by ID.
   */
  protected async findById(req: Request, res: Response) {
    try {
      const tenantId = this.getTenantId(req);
      const { id } = req.params;
      const result = await this.service.findById(tenantId, id);
      if (!result) {
        res.status(404).json({ message: 'Resource not found' });
        return;
      }
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Create a new record.
   */
  protected async create(req: Request, res: Response) {
    try {
      const tenantId = this.getTenantId(req);
      const result = await this.service.create(tenantId, req.body);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Update an existing record.
   */
  protected async update(req: Request, res: Response) {
    try {
      const tenantId = this.getTenantId(req);
      const { id } = req.body._id;
      const result = await this.service.update(tenantId, id, req.body);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Delete a record by ID.
   */
  protected async delete(req: Request, res: Response) {
    try {
      const tenantId = this.getTenantId(req);
      const { id } = req.params;
      await this.service.delete(tenantId, id);
      res.status(204).send(); // No content
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Extract tenant ID from the request.
   */
  protected getTenantId(req: Request): string {
    const tenantId = (req as any).tenantId;
    if (!tenantId) {
      throw new Error('Tenant ID is required [controller]');
    }
    return tenantId;
  }

  /**
   * Handle errors by sending a response with the appropriate status and message.
   */
  protected handleError(res: Response, error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'An unexpected error occurred' });
  }
}
