import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      return null;
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  /**
   * This is my own implementation of cursor-based pagination. Can be improved or replace with a better optimized one.
   * It fetches limit + 1 results. Results[0] will be the nextStartIndex, Results[limit] will determine whether there is a next page.
   * Supports Forward pagination
   * @argument {startIndex:Types.ObjectId | null, limit:number  }
   * @returns {results: DocumentType[], nextPage: string | null}
   */
  async paginationQuery({
    startIndex,
    limit,
  }: {
    startIndex: Types.ObjectId | null;
    limit: number;
  }): Promise<{ results: TDocument[]; nextPage: string | boolean }> {
    //db.users.find({_id: {$gte:ObjectId("62c9558efd02e4d9552fdb1e")}}).limit(2)

    let nextPage: string | boolean;

    let results: TDocument[];
    //if this is the first index, return the first $limit+1 documents
    
    if (startIndex) {
      //returns documents including the startIndex doc.
      results = await this.model
        .find({ _id: { $gte: startIndex } })
        .limit(limit + 1);
    } else {
      results = await this.model.find().limit(limit + 1);
    }
    //check if there is a next page
    if (results.length > limit) {
      nextPage = results[limit]._id.toHexString();
    } else {
      nextPage = false;
    }
    return {
      results,
      nextPage,
    };
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
