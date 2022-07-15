
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model order
 * 
 */
export type order = {
  id: string
  userId: string
  addressId: string
  status: OrderStatus
  carId: string
  offerId: string | null
}

/**
 * Model offer
 * 
 */
export type offer = {
  id: string
  status: OfferStatus
  amount: number
  userId: string
  carId: string
  valid: boolean
}

/**
 * Model chat
 * 
 */
export type chat = {
  id: string
  userId: string
  carId: string
}

/**
 * Model message
 * 
 */
export type message = {
  id: string
  buyer: boolean
  message: string
  chatId: string
  createdAt: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const OrderStatus: {
  PROCESSING: 'PROCESSING',
  DELIVERY: 'DELIVERY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUND: 'REFUND',
  UNPAID: 'UNPAID'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const OfferStatus: {
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  PROCESSING: 'PROCESSING'
};

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Orders
 * const orders = await prisma.order.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): PrismaPromise<Prisma.JsonObject>;

      /**
   * `prisma.order`: Exposes CRUD operations for the **order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.orderDelegate<GlobalReject>;

  /**
   * `prisma.offer`: Exposes CRUD operations for the **offer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offers
    * const offers = await prisma.offer.findMany()
    * ```
    */
  get offer(): Prisma.offerDelegate<GlobalReject>;

  /**
   * `prisma.chat`: Exposes CRUD operations for the **chat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chat.findMany()
    * ```
    */
  get chat(): Prisma.chatDelegate<GlobalReject>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.messageDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.0.0
   * Query Engine version: da41d2bb3406da22087b849f0e911199ba4fbf11
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    order: 'order',
    offer: 'offer',
    chat: 'chat',
    message: 'message'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ChatCountOutputType
   */


  export type ChatCountOutputType = {
    messages: number
  }

  export type ChatCountOutputTypeSelect = {
    messages?: boolean
  }

  export type ChatCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ChatCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ChatCountOutputType
    : S extends undefined
    ? never
    : S extends ChatCountOutputTypeArgs
    ?'include' extends U
    ? ChatCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ChatCountOutputType ? ChatCountOutputType[P] : never
  } 
    : ChatCountOutputType
  : ChatCountOutputType




  // Custom InputTypes

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ChatCountOutputType
     * 
    **/
    select?: ChatCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model order
   */


  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    addressId: string | null
    status: OrderStatus | null
    carId: string | null
    offerId: string | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    addressId: string | null
    status: OrderStatus | null
    carId: string | null
    offerId: string | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    addressId: number
    status: number
    carId: number
    offerId: number
    _all: number
  }


  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    addressId?: true
    status?: true
    carId?: true
    offerId?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    addressId?: true
    status?: true
    carId?: true
    offerId?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    addressId?: true
    status?: true
    carId?: true
    offerId?: true
    _all?: true
  }

  export type OrderAggregateArgs = {
    /**
     * Filter which order to aggregate.
     * 
    **/
    where?: orderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of orders to fetch.
     * 
    **/
    orderBy?: Enumerable<orderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: orderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` orders from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` orders.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs = {
    where?: orderWhereInput
    orderBy?: Enumerable<orderOrderByWithAggregationInput>
    by: Array<OrderScalarFieldEnum>
    having?: orderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }


  export type OrderGroupByOutputType = {
    id: string
    userId: string
    addressId: string
    status: OrderStatus
    carId: string
    offerId: string | null
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = PrismaPromise<
    Array<
      PickArray<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type orderSelect = {
    id?: boolean
    userId?: boolean
    addressId?: boolean
    status?: boolean
    carId?: boolean
    offer?: boolean | offerArgs
    offerId?: boolean
  }

  export type orderInclude = {
    offer?: boolean | offerArgs
  }

  export type orderGetPayload<
    S extends boolean | null | undefined | orderArgs,
    U = keyof S
      > = S extends true
        ? order
    : S extends undefined
    ? never
    : S extends orderArgs | orderFindManyArgs
    ?'include' extends U
    ? order  & {
    [P in TrueKeys<S['include']>]:
        P extends 'offer' ? offerGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'offer' ? offerGetPayload<S['select'][P]> | null :  P extends keyof order ? order[P] : never
  } 
    : order
  : order


  type orderCountArgs = Merge<
    Omit<orderFindManyArgs, 'select' | 'include'> & {
      select?: OrderCountAggregateInputType | true
    }
  >

  export interface orderDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Order that matches the filter.
     * @param {orderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends orderFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, orderFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'order'> extends True ? CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>> : CheckSelect<T, Prisma__orderClient<order | null >, Prisma__orderClient<orderGetPayload<T> | null >>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {orderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends orderFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, orderFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'order'> extends True ? CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>> : CheckSelect<T, Prisma__orderClient<order | null >, Prisma__orderClient<orderGetPayload<T> | null >>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {orderFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends orderFindManyArgs>(
      args?: SelectSubset<T, orderFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<order>>, PrismaPromise<Array<orderGetPayload<T>>>>

    /**
     * Create a Order.
     * @param {orderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
    **/
    create<T extends orderCreateArgs>(
      args: SelectSubset<T, orderCreateArgs>
    ): CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>>

    /**
     * Create many Orders.
     *     @param {orderCreateManyArgs} args - Arguments to create many Orders.
     *     @example
     *     // Create many Orders
     *     const order = await prisma.order.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends orderCreateManyArgs>(
      args?: SelectSubset<T, orderCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {orderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
    **/
    delete<T extends orderDeleteArgs>(
      args: SelectSubset<T, orderDeleteArgs>
    ): CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>>

    /**
     * Update one Order.
     * @param {orderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends orderUpdateArgs>(
      args: SelectSubset<T, orderUpdateArgs>
    ): CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>>

    /**
     * Delete zero or more Orders.
     * @param {orderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends orderDeleteManyArgs>(
      args?: SelectSubset<T, orderDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {orderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends orderUpdateManyArgs>(
      args: SelectSubset<T, orderUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {orderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
    **/
    upsert<T extends orderUpsertArgs>(
      args: SelectSubset<T, orderUpsertArgs>
    ): CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>>

    /**
     * Find zero or more Orders that matches the filter.
     * @param {orderFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const order = await prisma.order.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: orderFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Order.
     * @param {orderAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const order = await prisma.order.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: orderAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Order that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {orderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends orderFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, orderFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>>

    /**
     * Find the first Order that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {orderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends orderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, orderFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__orderClient<order>, Prisma__orderClient<orderGetPayload<T>>>

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {orderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends orderCountArgs>(
      args?: Subset<T, orderCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__orderClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    offer<T extends offerArgs = {}>(args?: Subset<T, offerArgs>): CheckSelect<T, Prisma__offerClient<offer | null >, Prisma__offerClient<offerGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * order base type for findUnique actions
   */
  export type orderFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
    /**
     * Filter, which order to fetch.
     * 
    **/
    where: orderWhereUniqueInput
  }

  /**
   * order: findUnique
   */
  export interface orderFindUniqueArgs extends orderFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * order base type for findFirst actions
   */
  export type orderFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
    /**
     * Filter, which order to fetch.
     * 
    **/
    where?: orderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of orders to fetch.
     * 
    **/
    orderBy?: Enumerable<orderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for orders.
     * 
    **/
    cursor?: orderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` orders from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` orders.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of orders.
     * 
    **/
    distinct?: Enumerable<OrderScalarFieldEnum>
  }

  /**
   * order: findFirst
   */
  export interface orderFindFirstArgs extends orderFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * order findMany
   */
  export type orderFindManyArgs = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
    /**
     * Filter, which orders to fetch.
     * 
    **/
    where?: orderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of orders to fetch.
     * 
    **/
    orderBy?: Enumerable<orderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing orders.
     * 
    **/
    cursor?: orderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` orders from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` orders.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OrderScalarFieldEnum>
  }


  /**
   * order create
   */
  export type orderCreateArgs = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
    /**
     * The data needed to create a order.
     * 
    **/
    data: XOR<orderCreateInput, orderUncheckedCreateInput>
  }


  /**
   * order createMany
   */
  export type orderCreateManyArgs = {
    /**
     * The data used to create many orders.
     * 
    **/
    data: Enumerable<orderCreateManyInput>
  }


  /**
   * order update
   */
  export type orderUpdateArgs = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
    /**
     * The data needed to update a order.
     * 
    **/
    data: XOR<orderUpdateInput, orderUncheckedUpdateInput>
    /**
     * Choose, which order to update.
     * 
    **/
    where: orderWhereUniqueInput
  }


  /**
   * order updateMany
   */
  export type orderUpdateManyArgs = {
    /**
     * The data used to update orders.
     * 
    **/
    data: XOR<orderUpdateManyMutationInput, orderUncheckedUpdateManyInput>
    /**
     * Filter which orders to update
     * 
    **/
    where?: orderWhereInput
  }


  /**
   * order upsert
   */
  export type orderUpsertArgs = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
    /**
     * The filter to search for the order to update in case it exists.
     * 
    **/
    where: orderWhereUniqueInput
    /**
     * In case the order found by the `where` argument doesn't exist, create a new order with this data.
     * 
    **/
    create: XOR<orderCreateInput, orderUncheckedCreateInput>
    /**
     * In case the order was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<orderUpdateInput, orderUncheckedUpdateInput>
  }


  /**
   * order delete
   */
  export type orderDeleteArgs = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
    /**
     * Filter which order to delete.
     * 
    **/
    where: orderWhereUniqueInput
  }


  /**
   * order deleteMany
   */
  export type orderDeleteManyArgs = {
    /**
     * Filter which orders to delete
     * 
    **/
    where?: orderWhereInput
  }


  /**
   * order findRaw
   */
  export type orderFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * order aggregateRaw
   */
  export type orderAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * order: findUniqueOrThrow
   */
  export type orderFindUniqueOrThrowArgs = orderFindUniqueArgsBase
      

  /**
   * order: findFirstOrThrow
   */
  export type orderFindFirstOrThrowArgs = orderFindFirstArgsBase
      

  /**
   * order without action
   */
  export type orderArgs = {
    /**
     * Select specific fields to fetch from the order
     * 
    **/
    select?: orderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: orderInclude | null
  }



  /**
   * Model offer
   */


  export type AggregateOffer = {
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  export type OfferAvgAggregateOutputType = {
    amount: number | null
  }

  export type OfferSumAggregateOutputType = {
    amount: number | null
  }

  export type OfferMinAggregateOutputType = {
    id: string | null
    status: OfferStatus | null
    amount: number | null
    userId: string | null
    carId: string | null
    valid: boolean | null
  }

  export type OfferMaxAggregateOutputType = {
    id: string | null
    status: OfferStatus | null
    amount: number | null
    userId: string | null
    carId: string | null
    valid: boolean | null
  }

  export type OfferCountAggregateOutputType = {
    id: number
    status: number
    amount: number
    userId: number
    carId: number
    valid: number
    _all: number
  }


  export type OfferAvgAggregateInputType = {
    amount?: true
  }

  export type OfferSumAggregateInputType = {
    amount?: true
  }

  export type OfferMinAggregateInputType = {
    id?: true
    status?: true
    amount?: true
    userId?: true
    carId?: true
    valid?: true
  }

  export type OfferMaxAggregateInputType = {
    id?: true
    status?: true
    amount?: true
    userId?: true
    carId?: true
    valid?: true
  }

  export type OfferCountAggregateInputType = {
    id?: true
    status?: true
    amount?: true
    userId?: true
    carId?: true
    valid?: true
    _all?: true
  }

  export type OfferAggregateArgs = {
    /**
     * Filter which offer to aggregate.
     * 
    **/
    where?: offerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of offers to fetch.
     * 
    **/
    orderBy?: Enumerable<offerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: offerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` offers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` offers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned offers
    **/
    _count?: true | OfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferMaxAggregateInputType
  }

  export type GetOfferAggregateType<T extends OfferAggregateArgs> = {
        [P in keyof T & keyof AggregateOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffer[P]>
      : GetScalarType<T[P], AggregateOffer[P]>
  }




  export type OfferGroupByArgs = {
    where?: offerWhereInput
    orderBy?: Enumerable<offerOrderByWithAggregationInput>
    by: Array<OfferScalarFieldEnum>
    having?: offerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferCountAggregateInputType | true
    _avg?: OfferAvgAggregateInputType
    _sum?: OfferSumAggregateInputType
    _min?: OfferMinAggregateInputType
    _max?: OfferMaxAggregateInputType
  }


  export type OfferGroupByOutputType = {
    id: string
    status: OfferStatus
    amount: number
    userId: string
    carId: string
    valid: boolean
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  type GetOfferGroupByPayload<T extends OfferGroupByArgs> = PrismaPromise<
    Array<
      PickArray<OfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferGroupByOutputType[P]>
            : GetScalarType<T[P], OfferGroupByOutputType[P]>
        }
      >
    >


  export type offerSelect = {
    id?: boolean
    status?: boolean
    amount?: boolean
    userId?: boolean
    carId?: boolean
    valid?: boolean
    order?: boolean | orderArgs
  }

  export type offerInclude = {
    order?: boolean | orderArgs
  }

  export type offerGetPayload<
    S extends boolean | null | undefined | offerArgs,
    U = keyof S
      > = S extends true
        ? offer
    : S extends undefined
    ? never
    : S extends offerArgs | offerFindManyArgs
    ?'include' extends U
    ? offer  & {
    [P in TrueKeys<S['include']>]:
        P extends 'order' ? orderGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'order' ? orderGetPayload<S['select'][P]> | null :  P extends keyof offer ? offer[P] : never
  } 
    : offer
  : offer


  type offerCountArgs = Merge<
    Omit<offerFindManyArgs, 'select' | 'include'> & {
      select?: OfferCountAggregateInputType | true
    }
  >

  export interface offerDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Offer that matches the filter.
     * @param {offerFindUniqueArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends offerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, offerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'offer'> extends True ? CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>> : CheckSelect<T, Prisma__offerClient<offer | null >, Prisma__offerClient<offerGetPayload<T> | null >>

    /**
     * Find the first Offer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {offerFindFirstArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends offerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, offerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'offer'> extends True ? CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>> : CheckSelect<T, Prisma__offerClient<offer | null >, Prisma__offerClient<offerGetPayload<T> | null >>

    /**
     * Find zero or more Offers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {offerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Offers
     * const offers = await prisma.offer.findMany()
     * 
     * // Get first 10 Offers
     * const offers = await prisma.offer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offerWithIdOnly = await prisma.offer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends offerFindManyArgs>(
      args?: SelectSubset<T, offerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<offer>>, PrismaPromise<Array<offerGetPayload<T>>>>

    /**
     * Create a Offer.
     * @param {offerCreateArgs} args - Arguments to create a Offer.
     * @example
     * // Create one Offer
     * const Offer = await prisma.offer.create({
     *   data: {
     *     // ... data to create a Offer
     *   }
     * })
     * 
    **/
    create<T extends offerCreateArgs>(
      args: SelectSubset<T, offerCreateArgs>
    ): CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>>

    /**
     * Create many Offers.
     *     @param {offerCreateManyArgs} args - Arguments to create many Offers.
     *     @example
     *     // Create many Offers
     *     const offer = await prisma.offer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends offerCreateManyArgs>(
      args?: SelectSubset<T, offerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Offer.
     * @param {offerDeleteArgs} args - Arguments to delete one Offer.
     * @example
     * // Delete one Offer
     * const Offer = await prisma.offer.delete({
     *   where: {
     *     // ... filter to delete one Offer
     *   }
     * })
     * 
    **/
    delete<T extends offerDeleteArgs>(
      args: SelectSubset<T, offerDeleteArgs>
    ): CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>>

    /**
     * Update one Offer.
     * @param {offerUpdateArgs} args - Arguments to update one Offer.
     * @example
     * // Update one Offer
     * const offer = await prisma.offer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends offerUpdateArgs>(
      args: SelectSubset<T, offerUpdateArgs>
    ): CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>>

    /**
     * Delete zero or more Offers.
     * @param {offerDeleteManyArgs} args - Arguments to filter Offers to delete.
     * @example
     * // Delete a few Offers
     * const { count } = await prisma.offer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends offerDeleteManyArgs>(
      args?: SelectSubset<T, offerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {offerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends offerUpdateManyArgs>(
      args: SelectSubset<T, offerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Offer.
     * @param {offerUpsertArgs} args - Arguments to update or create a Offer.
     * @example
     * // Update or create a Offer
     * const offer = await prisma.offer.upsert({
     *   create: {
     *     // ... data to create a Offer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Offer we want to update
     *   }
     * })
    **/
    upsert<T extends offerUpsertArgs>(
      args: SelectSubset<T, offerUpsertArgs>
    ): CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>>

    /**
     * Find zero or more Offers that matches the filter.
     * @param {offerFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const offer = await prisma.offer.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: offerFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Offer.
     * @param {offerAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const offer = await prisma.offer.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: offerAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Offer that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {offerFindUniqueOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends offerFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, offerFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>>

    /**
     * Find the first Offer that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {offerFindFirstOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends offerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, offerFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__offerClient<offer>, Prisma__offerClient<offerGetPayload<T>>>

    /**
     * Count the number of Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {offerCountArgs} args - Arguments to filter Offers to count.
     * @example
     * // Count the number of Offers
     * const count = await prisma.offer.count({
     *   where: {
     *     // ... the filter for the Offers we want to count
     *   }
     * })
    **/
    count<T extends offerCountArgs>(
      args?: Subset<T, offerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferAggregateArgs>(args: Subset<T, OfferAggregateArgs>): PrismaPromise<GetOfferAggregateType<T>>

    /**
     * Group by Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferGroupByArgs['orderBy'] }
        : { orderBy?: OfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for offer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__offerClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    order<T extends orderArgs = {}>(args?: Subset<T, orderArgs>): CheckSelect<T, Prisma__orderClient<order | null >, Prisma__orderClient<orderGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * offer base type for findUnique actions
   */
  export type offerFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
    /**
     * Filter, which offer to fetch.
     * 
    **/
    where: offerWhereUniqueInput
  }

  /**
   * offer: findUnique
   */
  export interface offerFindUniqueArgs extends offerFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * offer base type for findFirst actions
   */
  export type offerFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
    /**
     * Filter, which offer to fetch.
     * 
    **/
    where?: offerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of offers to fetch.
     * 
    **/
    orderBy?: Enumerable<offerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for offers.
     * 
    **/
    cursor?: offerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` offers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` offers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of offers.
     * 
    **/
    distinct?: Enumerable<OfferScalarFieldEnum>
  }

  /**
   * offer: findFirst
   */
  export interface offerFindFirstArgs extends offerFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * offer findMany
   */
  export type offerFindManyArgs = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
    /**
     * Filter, which offers to fetch.
     * 
    **/
    where?: offerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of offers to fetch.
     * 
    **/
    orderBy?: Enumerable<offerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing offers.
     * 
    **/
    cursor?: offerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` offers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` offers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OfferScalarFieldEnum>
  }


  /**
   * offer create
   */
  export type offerCreateArgs = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
    /**
     * The data needed to create a offer.
     * 
    **/
    data: XOR<offerCreateInput, offerUncheckedCreateInput>
  }


  /**
   * offer createMany
   */
  export type offerCreateManyArgs = {
    /**
     * The data used to create many offers.
     * 
    **/
    data: Enumerable<offerCreateManyInput>
  }


  /**
   * offer update
   */
  export type offerUpdateArgs = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
    /**
     * The data needed to update a offer.
     * 
    **/
    data: XOR<offerUpdateInput, offerUncheckedUpdateInput>
    /**
     * Choose, which offer to update.
     * 
    **/
    where: offerWhereUniqueInput
  }


  /**
   * offer updateMany
   */
  export type offerUpdateManyArgs = {
    /**
     * The data used to update offers.
     * 
    **/
    data: XOR<offerUpdateManyMutationInput, offerUncheckedUpdateManyInput>
    /**
     * Filter which offers to update
     * 
    **/
    where?: offerWhereInput
  }


  /**
   * offer upsert
   */
  export type offerUpsertArgs = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
    /**
     * The filter to search for the offer to update in case it exists.
     * 
    **/
    where: offerWhereUniqueInput
    /**
     * In case the offer found by the `where` argument doesn't exist, create a new offer with this data.
     * 
    **/
    create: XOR<offerCreateInput, offerUncheckedCreateInput>
    /**
     * In case the offer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<offerUpdateInput, offerUncheckedUpdateInput>
  }


  /**
   * offer delete
   */
  export type offerDeleteArgs = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
    /**
     * Filter which offer to delete.
     * 
    **/
    where: offerWhereUniqueInput
  }


  /**
   * offer deleteMany
   */
  export type offerDeleteManyArgs = {
    /**
     * Filter which offers to delete
     * 
    **/
    where?: offerWhereInput
  }


  /**
   * offer findRaw
   */
  export type offerFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * offer aggregateRaw
   */
  export type offerAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * offer: findUniqueOrThrow
   */
  export type offerFindUniqueOrThrowArgs = offerFindUniqueArgsBase
      

  /**
   * offer: findFirstOrThrow
   */
  export type offerFindFirstOrThrowArgs = offerFindFirstArgsBase
      

  /**
   * offer without action
   */
  export type offerArgs = {
    /**
     * Select specific fields to fetch from the offer
     * 
    **/
    select?: offerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: offerInclude | null
  }



  /**
   * Model chat
   */


  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  export type ChatMinAggregateOutputType = {
    id: string | null
    userId: string | null
    carId: string | null
  }

  export type ChatMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    carId: string | null
  }

  export type ChatCountAggregateOutputType = {
    id: number
    userId: number
    carId: number
    _all: number
  }


  export type ChatMinAggregateInputType = {
    id?: true
    userId?: true
    carId?: true
  }

  export type ChatMaxAggregateInputType = {
    id?: true
    userId?: true
    carId?: true
  }

  export type ChatCountAggregateInputType = {
    id?: true
    userId?: true
    carId?: true
    _all?: true
  }

  export type ChatAggregateArgs = {
    /**
     * Filter which chat to aggregate.
     * 
    **/
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     * 
    **/
    orderBy?: Enumerable<chatOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chats
    **/
    _count?: true | ChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMaxAggregateInputType
  }

  export type GetChatAggregateType<T extends ChatAggregateArgs> = {
        [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat[P]>
      : GetScalarType<T[P], AggregateChat[P]>
  }




  export type ChatGroupByArgs = {
    where?: chatWhereInput
    orderBy?: Enumerable<chatOrderByWithAggregationInput>
    by: Array<ChatScalarFieldEnum>
    having?: chatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatCountAggregateInputType | true
    _min?: ChatMinAggregateInputType
    _max?: ChatMaxAggregateInputType
  }


  export type ChatGroupByOutputType = {
    id: string
    userId: string
    carId: string
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  type GetChatGroupByPayload<T extends ChatGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatGroupByOutputType[P]>
            : GetScalarType<T[P], ChatGroupByOutputType[P]>
        }
      >
    >


  export type chatSelect = {
    id?: boolean
    userId?: boolean
    carId?: boolean
    messages?: boolean | messageFindManyArgs
    _count?: boolean | ChatCountOutputTypeArgs
  }

  export type chatInclude = {
    messages?: boolean | messageFindManyArgs
    _count?: boolean | ChatCountOutputTypeArgs
  }

  export type chatGetPayload<
    S extends boolean | null | undefined | chatArgs,
    U = keyof S
      > = S extends true
        ? chat
    : S extends undefined
    ? never
    : S extends chatArgs | chatFindManyArgs
    ?'include' extends U
    ? chat  & {
    [P in TrueKeys<S['include']>]:
        P extends 'messages' ? Array < messageGetPayload<S['include'][P]>>  :
        P extends '_count' ? ChatCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'messages' ? Array < messageGetPayload<S['select'][P]>>  :
        P extends '_count' ? ChatCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof chat ? chat[P] : never
  } 
    : chat
  : chat


  type chatCountArgs = Merge<
    Omit<chatFindManyArgs, 'select' | 'include'> & {
      select?: ChatCountAggregateInputType | true
    }
  >

  export interface chatDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Chat that matches the filter.
     * @param {chatFindUniqueArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends chatFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, chatFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'chat'> extends True ? CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>> : CheckSelect<T, Prisma__chatClient<chat | null >, Prisma__chatClient<chatGetPayload<T> | null >>

    /**
     * Find the first Chat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindFirstArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends chatFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, chatFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'chat'> extends True ? CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>> : CheckSelect<T, Prisma__chatClient<chat | null >, Prisma__chatClient<chatGetPayload<T> | null >>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chat.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends chatFindManyArgs>(
      args?: SelectSubset<T, chatFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<chat>>, PrismaPromise<Array<chatGetPayload<T>>>>

    /**
     * Create a Chat.
     * @param {chatCreateArgs} args - Arguments to create a Chat.
     * @example
     * // Create one Chat
     * const Chat = await prisma.chat.create({
     *   data: {
     *     // ... data to create a Chat
     *   }
     * })
     * 
    **/
    create<T extends chatCreateArgs>(
      args: SelectSubset<T, chatCreateArgs>
    ): CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>>

    /**
     * Create many Chats.
     *     @param {chatCreateManyArgs} args - Arguments to create many Chats.
     *     @example
     *     // Create many Chats
     *     const chat = await prisma.chat.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends chatCreateManyArgs>(
      args?: SelectSubset<T, chatCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Chat.
     * @param {chatDeleteArgs} args - Arguments to delete one Chat.
     * @example
     * // Delete one Chat
     * const Chat = await prisma.chat.delete({
     *   where: {
     *     // ... filter to delete one Chat
     *   }
     * })
     * 
    **/
    delete<T extends chatDeleteArgs>(
      args: SelectSubset<T, chatDeleteArgs>
    ): CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>>

    /**
     * Update one Chat.
     * @param {chatUpdateArgs} args - Arguments to update one Chat.
     * @example
     * // Update one Chat
     * const chat = await prisma.chat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends chatUpdateArgs>(
      args: SelectSubset<T, chatUpdateArgs>
    ): CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>>

    /**
     * Delete zero or more Chats.
     * @param {chatDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends chatDeleteManyArgs>(
      args?: SelectSubset<T, chatDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends chatUpdateManyArgs>(
      args: SelectSubset<T, chatUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Chat.
     * @param {chatUpsertArgs} args - Arguments to update or create a Chat.
     * @example
     * // Update or create a Chat
     * const chat = await prisma.chat.upsert({
     *   create: {
     *     // ... data to create a Chat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat we want to update
     *   }
     * })
    **/
    upsert<T extends chatUpsertArgs>(
      args: SelectSubset<T, chatUpsertArgs>
    ): CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>>

    /**
     * Find zero or more Chats that matches the filter.
     * @param {chatFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const chat = await prisma.chat.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: chatFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Chat.
     * @param {chatAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const chat = await prisma.chat.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: chatAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Chat that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {chatFindUniqueOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends chatFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, chatFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>>

    /**
     * Find the first Chat that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindFirstOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends chatFindFirstOrThrowArgs>(
      args?: SelectSubset<T, chatFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__chatClient<chat>, Prisma__chatClient<chatGetPayload<T>>>

    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chat.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends chatCountArgs>(
      args?: Subset<T, chatCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatAggregateArgs>(args: Subset<T, ChatAggregateArgs>): PrismaPromise<GetChatAggregateType<T>>

    /**
     * Group by Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatGroupByArgs['orderBy'] }
        : { orderBy?: ChatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for chat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__chatClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    messages<T extends messageFindManyArgs = {}>(args?: Subset<T, messageFindManyArgs>): CheckSelect<T, PrismaPromise<Array<message>>, PrismaPromise<Array<messageGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * chat base type for findUnique actions
   */
  export type chatFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
    /**
     * Filter, which chat to fetch.
     * 
    **/
    where: chatWhereUniqueInput
  }

  /**
   * chat: findUnique
   */
  export interface chatFindUniqueArgs extends chatFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * chat base type for findFirst actions
   */
  export type chatFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
    /**
     * Filter, which chat to fetch.
     * 
    **/
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     * 
    **/
    orderBy?: Enumerable<chatOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chats.
     * 
    **/
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chats.
     * 
    **/
    distinct?: Enumerable<ChatScalarFieldEnum>
  }

  /**
   * chat: findFirst
   */
  export interface chatFindFirstArgs extends chatFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * chat findMany
   */
  export type chatFindManyArgs = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
    /**
     * Filter, which chats to fetch.
     * 
    **/
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     * 
    **/
    orderBy?: Enumerable<chatOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chats.
     * 
    **/
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ChatScalarFieldEnum>
  }


  /**
   * chat create
   */
  export type chatCreateArgs = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
    /**
     * The data needed to create a chat.
     * 
    **/
    data: XOR<chatCreateInput, chatUncheckedCreateInput>
  }


  /**
   * chat createMany
   */
  export type chatCreateManyArgs = {
    /**
     * The data used to create many chats.
     * 
    **/
    data: Enumerable<chatCreateManyInput>
  }


  /**
   * chat update
   */
  export type chatUpdateArgs = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
    /**
     * The data needed to update a chat.
     * 
    **/
    data: XOR<chatUpdateInput, chatUncheckedUpdateInput>
    /**
     * Choose, which chat to update.
     * 
    **/
    where: chatWhereUniqueInput
  }


  /**
   * chat updateMany
   */
  export type chatUpdateManyArgs = {
    /**
     * The data used to update chats.
     * 
    **/
    data: XOR<chatUpdateManyMutationInput, chatUncheckedUpdateManyInput>
    /**
     * Filter which chats to update
     * 
    **/
    where?: chatWhereInput
  }


  /**
   * chat upsert
   */
  export type chatUpsertArgs = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
    /**
     * The filter to search for the chat to update in case it exists.
     * 
    **/
    where: chatWhereUniqueInput
    /**
     * In case the chat found by the `where` argument doesn't exist, create a new chat with this data.
     * 
    **/
    create: XOR<chatCreateInput, chatUncheckedCreateInput>
    /**
     * In case the chat was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<chatUpdateInput, chatUncheckedUpdateInput>
  }


  /**
   * chat delete
   */
  export type chatDeleteArgs = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
    /**
     * Filter which chat to delete.
     * 
    **/
    where: chatWhereUniqueInput
  }


  /**
   * chat deleteMany
   */
  export type chatDeleteManyArgs = {
    /**
     * Filter which chats to delete
     * 
    **/
    where?: chatWhereInput
  }


  /**
   * chat findRaw
   */
  export type chatFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * chat aggregateRaw
   */
  export type chatAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * chat: findUniqueOrThrow
   */
  export type chatFindUniqueOrThrowArgs = chatFindUniqueArgsBase
      

  /**
   * chat: findFirstOrThrow
   */
  export type chatFindFirstOrThrowArgs = chatFindFirstArgsBase
      

  /**
   * chat without action
   */
  export type chatArgs = {
    /**
     * Select specific fields to fetch from the chat
     * 
    **/
    select?: chatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: chatInclude | null
  }



  /**
   * Model message
   */


  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    buyer: boolean | null
    message: string | null
    chatId: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    buyer: boolean | null
    message: string | null
    chatId: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    buyer: number
    message: number
    chatId: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    buyer?: true
    message?: true
    chatId?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    buyer?: true
    message?: true
    chatId?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    buyer?: true
    message?: true
    chatId?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs = {
    /**
     * Filter which message to aggregate.
     * 
    **/
    where?: messageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     * 
    **/
    orderBy?: Enumerable<messageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: messageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs = {
    where?: messageWhereInput
    orderBy?: Enumerable<messageOrderByWithAggregationInput>
    by: Array<MessageScalarFieldEnum>
    having?: messageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }


  export type MessageGroupByOutputType = {
    id: string
    buyer: boolean
    message: string
    chatId: string
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type messageSelect = {
    id?: boolean
    buyer?: boolean
    message?: boolean
    chat?: boolean | chatArgs
    chatId?: boolean
    createdAt?: boolean
  }

  export type messageInclude = {
    chat?: boolean | chatArgs
  }

  export type messageGetPayload<
    S extends boolean | null | undefined | messageArgs,
    U = keyof S
      > = S extends true
        ? message
    : S extends undefined
    ? never
    : S extends messageArgs | messageFindManyArgs
    ?'include' extends U
    ? message  & {
    [P in TrueKeys<S['include']>]:
        P extends 'chat' ? chatGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'chat' ? chatGetPayload<S['select'][P]> :  P extends keyof message ? message[P] : never
  } 
    : message
  : message


  type messageCountArgs = Merge<
    Omit<messageFindManyArgs, 'select' | 'include'> & {
      select?: MessageCountAggregateInputType | true
    }
  >

  export interface messageDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Message that matches the filter.
     * @param {messageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends messageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, messageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'message'> extends True ? CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>> : CheckSelect<T, Prisma__messageClient<message | null >, Prisma__messageClient<messageGetPayload<T> | null >>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends messageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, messageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'message'> extends True ? CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>> : CheckSelect<T, Prisma__messageClient<message | null >, Prisma__messageClient<messageGetPayload<T> | null >>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends messageFindManyArgs>(
      args?: SelectSubset<T, messageFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<message>>, PrismaPromise<Array<messageGetPayload<T>>>>

    /**
     * Create a Message.
     * @param {messageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
    **/
    create<T extends messageCreateArgs>(
      args: SelectSubset<T, messageCreateArgs>
    ): CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>>

    /**
     * Create many Messages.
     *     @param {messageCreateManyArgs} args - Arguments to create many Messages.
     *     @example
     *     // Create many Messages
     *     const message = await prisma.message.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends messageCreateManyArgs>(
      args?: SelectSubset<T, messageCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Message.
     * @param {messageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
    **/
    delete<T extends messageDeleteArgs>(
      args: SelectSubset<T, messageDeleteArgs>
    ): CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>>

    /**
     * Update one Message.
     * @param {messageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends messageUpdateArgs>(
      args: SelectSubset<T, messageUpdateArgs>
    ): CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>>

    /**
     * Delete zero or more Messages.
     * @param {messageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends messageDeleteManyArgs>(
      args?: SelectSubset<T, messageDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends messageUpdateManyArgs>(
      args: SelectSubset<T, messageUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {messageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
    **/
    upsert<T extends messageUpsertArgs>(
      args: SelectSubset<T, messageUpsertArgs>
    ): CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>>

    /**
     * Find zero or more Messages that matches the filter.
     * @param {messageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const message = await prisma.message.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: messageFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Message.
     * @param {messageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const message = await prisma.message.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: messageAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Message that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {messageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends messageFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, messageFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>>

    /**
     * Find the first Message that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends messageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, messageFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__messageClient<message>, Prisma__messageClient<messageGetPayload<T>>>

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends messageCountArgs>(
      args?: Subset<T, messageCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__messageClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    chat<T extends chatArgs = {}>(args?: Subset<T, chatArgs>): CheckSelect<T, Prisma__chatClient<chat | null >, Prisma__chatClient<chatGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * message base type for findUnique actions
   */
  export type messageFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
    /**
     * Filter, which message to fetch.
     * 
    **/
    where: messageWhereUniqueInput
  }

  /**
   * message: findUnique
   */
  export interface messageFindUniqueArgs extends messageFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * message base type for findFirst actions
   */
  export type messageFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
    /**
     * Filter, which message to fetch.
     * 
    **/
    where?: messageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     * 
    **/
    orderBy?: Enumerable<messageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for messages.
     * 
    **/
    cursor?: messageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of messages.
     * 
    **/
    distinct?: Enumerable<MessageScalarFieldEnum>
  }

  /**
   * message: findFirst
   */
  export interface messageFindFirstArgs extends messageFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * message findMany
   */
  export type messageFindManyArgs = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
    /**
     * Filter, which messages to fetch.
     * 
    **/
    where?: messageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     * 
    **/
    orderBy?: Enumerable<messageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing messages.
     * 
    **/
    cursor?: messageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * message create
   */
  export type messageCreateArgs = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
    /**
     * The data needed to create a message.
     * 
    **/
    data: XOR<messageCreateInput, messageUncheckedCreateInput>
  }


  /**
   * message createMany
   */
  export type messageCreateManyArgs = {
    /**
     * The data used to create many messages.
     * 
    **/
    data: Enumerable<messageCreateManyInput>
  }


  /**
   * message update
   */
  export type messageUpdateArgs = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
    /**
     * The data needed to update a message.
     * 
    **/
    data: XOR<messageUpdateInput, messageUncheckedUpdateInput>
    /**
     * Choose, which message to update.
     * 
    **/
    where: messageWhereUniqueInput
  }


  /**
   * message updateMany
   */
  export type messageUpdateManyArgs = {
    /**
     * The data used to update messages.
     * 
    **/
    data: XOR<messageUpdateManyMutationInput, messageUncheckedUpdateManyInput>
    /**
     * Filter which messages to update
     * 
    **/
    where?: messageWhereInput
  }


  /**
   * message upsert
   */
  export type messageUpsertArgs = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
    /**
     * The filter to search for the message to update in case it exists.
     * 
    **/
    where: messageWhereUniqueInput
    /**
     * In case the message found by the `where` argument doesn't exist, create a new message with this data.
     * 
    **/
    create: XOR<messageCreateInput, messageUncheckedCreateInput>
    /**
     * In case the message was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<messageUpdateInput, messageUncheckedUpdateInput>
  }


  /**
   * message delete
   */
  export type messageDeleteArgs = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
    /**
     * Filter which message to delete.
     * 
    **/
    where: messageWhereUniqueInput
  }


  /**
   * message deleteMany
   */
  export type messageDeleteManyArgs = {
    /**
     * Filter which messages to delete
     * 
    **/
    where?: messageWhereInput
  }


  /**
   * message findRaw
   */
  export type messageFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * message aggregateRaw
   */
  export type messageAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * message: findUniqueOrThrow
   */
  export type messageFindUniqueOrThrowArgs = messageFindUniqueArgsBase
      

  /**
   * message: findFirstOrThrow
   */
  export type messageFindFirstOrThrowArgs = messageFindFirstArgsBase
      

  /**
   * message without action
   */
  export type messageArgs = {
    /**
     * Select specific fields to fetch from the message
     * 
    **/
    select?: messageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: messageInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    addressId: 'addressId',
    status: 'status',
    carId: 'carId',
    offerId: 'offerId'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OfferScalarFieldEnum: {
    id: 'id',
    status: 'status',
    amount: 'amount',
    userId: 'userId',
    carId: 'carId',
    valid: 'valid'
  };

  export type OfferScalarFieldEnum = (typeof OfferScalarFieldEnum)[keyof typeof OfferScalarFieldEnum]


  export const ChatScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    carId: 'carId'
  };

  export type ChatScalarFieldEnum = (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    buyer: 'buyer',
    message: 'message',
    chatId: 'chatId',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type orderWhereInput = {
    AND?: Enumerable<orderWhereInput>
    OR?: Enumerable<orderWhereInput>
    NOT?: Enumerable<orderWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    addressId?: StringFilter | string
    status?: EnumOrderStatusFilter | OrderStatus
    carId?: StringFilter | string
    offer?: XOR<OfferRelationFilter, offerWhereInput> | null
    offerId?: StringNullableFilter | string | null
  }

  export type orderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    addressId?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    offer?: offerOrderByWithRelationInput
    offerId?: SortOrder
  }

  export type orderWhereUniqueInput = {
    id?: string
    offerId?: string
  }

  export type orderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    addressId?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    offerId?: SortOrder
    _count?: orderCountOrderByAggregateInput
    _max?: orderMaxOrderByAggregateInput
    _min?: orderMinOrderByAggregateInput
  }

  export type orderScalarWhereWithAggregatesInput = {
    AND?: Enumerable<orderScalarWhereWithAggregatesInput>
    OR?: Enumerable<orderScalarWhereWithAggregatesInput>
    NOT?: Enumerable<orderScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    addressId?: StringWithAggregatesFilter | string
    status?: EnumOrderStatusWithAggregatesFilter | OrderStatus
    carId?: StringWithAggregatesFilter | string
    offerId?: StringNullableWithAggregatesFilter | string | null
  }

  export type offerWhereInput = {
    AND?: Enumerable<offerWhereInput>
    OR?: Enumerable<offerWhereInput>
    NOT?: Enumerable<offerWhereInput>
    id?: StringFilter | string
    status?: EnumOfferStatusFilter | OfferStatus
    amount?: IntFilter | number
    userId?: StringFilter | string
    carId?: StringFilter | string
    valid?: BoolFilter | boolean
    order?: XOR<OrderRelationFilter, orderWhereInput> | null
  }

  export type offerOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
    valid?: SortOrder
    order?: orderOrderByWithRelationInput
  }

  export type offerWhereUniqueInput = {
    id?: string
  }

  export type offerOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
    valid?: SortOrder
    _count?: offerCountOrderByAggregateInput
    _avg?: offerAvgOrderByAggregateInput
    _max?: offerMaxOrderByAggregateInput
    _min?: offerMinOrderByAggregateInput
    _sum?: offerSumOrderByAggregateInput
  }

  export type offerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<offerScalarWhereWithAggregatesInput>
    OR?: Enumerable<offerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<offerScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    status?: EnumOfferStatusWithAggregatesFilter | OfferStatus
    amount?: IntWithAggregatesFilter | number
    userId?: StringWithAggregatesFilter | string
    carId?: StringWithAggregatesFilter | string
    valid?: BoolWithAggregatesFilter | boolean
  }

  export type chatWhereInput = {
    AND?: Enumerable<chatWhereInput>
    OR?: Enumerable<chatWhereInput>
    NOT?: Enumerable<chatWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    carId?: StringFilter | string
    messages?: MessageListRelationFilter
  }

  export type chatOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
    messages?: messageOrderByRelationAggregateInput
  }

  export type chatWhereUniqueInput = {
    id?: string
  }

  export type chatOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
    _count?: chatCountOrderByAggregateInput
    _max?: chatMaxOrderByAggregateInput
    _min?: chatMinOrderByAggregateInput
  }

  export type chatScalarWhereWithAggregatesInput = {
    AND?: Enumerable<chatScalarWhereWithAggregatesInput>
    OR?: Enumerable<chatScalarWhereWithAggregatesInput>
    NOT?: Enumerable<chatScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    carId?: StringWithAggregatesFilter | string
  }

  export type messageWhereInput = {
    AND?: Enumerable<messageWhereInput>
    OR?: Enumerable<messageWhereInput>
    NOT?: Enumerable<messageWhereInput>
    id?: StringFilter | string
    buyer?: BoolFilter | boolean
    message?: StringFilter | string
    chat?: XOR<ChatRelationFilter, chatWhereInput>
    chatId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
  }

  export type messageOrderByWithRelationInput = {
    id?: SortOrder
    buyer?: SortOrder
    message?: SortOrder
    chat?: chatOrderByWithRelationInput
    chatId?: SortOrder
    createdAt?: SortOrder
  }

  export type messageWhereUniqueInput = {
    id?: string
  }

  export type messageOrderByWithAggregationInput = {
    id?: SortOrder
    buyer?: SortOrder
    message?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
    _count?: messageCountOrderByAggregateInput
    _max?: messageMaxOrderByAggregateInput
    _min?: messageMinOrderByAggregateInput
  }

  export type messageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<messageScalarWhereWithAggregatesInput>
    OR?: Enumerable<messageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<messageScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    buyer?: BoolWithAggregatesFilter | boolean
    message?: StringWithAggregatesFilter | string
    chatId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type orderCreateInput = {
    id?: string
    userId: string
    addressId: string
    status?: OrderStatus
    carId: string
    offer?: offerCreateNestedOneWithoutOrderInput
  }

  export type orderUncheckedCreateInput = {
    id?: string
    userId: string
    addressId: string
    status?: OrderStatus
    carId: string
    offerId?: string | null
  }

  export type orderUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | OrderStatus
    carId?: StringFieldUpdateOperationsInput | string
    offer?: offerUpdateOneWithoutOrderNestedInput
  }

  export type orderUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | OrderStatus
    carId?: StringFieldUpdateOperationsInput | string
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type orderCreateManyInput = {
    id?: string
    userId: string
    addressId: string
    status?: OrderStatus
    carId: string
    offerId?: string | null
  }

  export type orderUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | OrderStatus
    carId?: StringFieldUpdateOperationsInput | string
  }

  export type orderUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | OrderStatus
    carId?: StringFieldUpdateOperationsInput | string
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type offerCreateInput = {
    id?: string
    status?: OfferStatus
    amount: number
    userId: string
    carId: string
    valid?: boolean
    order?: orderCreateNestedOneWithoutOfferInput
  }

  export type offerUncheckedCreateInput = {
    id?: string
    status?: OfferStatus
    amount: number
    userId: string
    carId: string
    valid?: boolean
    order?: orderUncheckedCreateNestedOneWithoutOfferInput
  }

  export type offerUpdateInput = {
    status?: EnumOfferStatusFieldUpdateOperationsInput | OfferStatus
    amount?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    order?: orderUpdateOneWithoutOfferNestedInput
  }

  export type offerUncheckedUpdateInput = {
    status?: EnumOfferStatusFieldUpdateOperationsInput | OfferStatus
    amount?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    order?: orderUncheckedUpdateOneWithoutOfferNestedInput
  }

  export type offerCreateManyInput = {
    id?: string
    status?: OfferStatus
    amount: number
    userId: string
    carId: string
    valid?: boolean
  }

  export type offerUpdateManyMutationInput = {
    status?: EnumOfferStatusFieldUpdateOperationsInput | OfferStatus
    amount?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    valid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type offerUncheckedUpdateManyInput = {
    status?: EnumOfferStatusFieldUpdateOperationsInput | OfferStatus
    amount?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    valid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type chatCreateInput = {
    id?: string
    userId: string
    carId: string
    messages?: messageCreateNestedManyWithoutChatInput
  }

  export type chatUncheckedCreateInput = {
    id?: string
    userId: string
    carId: string
    messages?: messageUncheckedCreateNestedManyWithoutChatInput
  }

  export type chatUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    messages?: messageUpdateManyWithoutChatNestedInput
  }

  export type chatUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    messages?: messageUncheckedUpdateManyWithoutChatNestedInput
  }

  export type chatCreateManyInput = {
    id?: string
    userId: string
    carId: string
  }

  export type chatUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
  }

  export type chatUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
  }

  export type messageCreateInput = {
    id?: string
    buyer?: boolean
    message: string
    chat: chatCreateNestedOneWithoutMessagesInput
    createdAt?: Date | string
  }

  export type messageUncheckedCreateInput = {
    id?: string
    buyer?: boolean
    message: string
    chatId: string
    createdAt?: Date | string
  }

  export type messageUpdateInput = {
    buyer?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    chat?: chatUpdateOneRequiredWithoutMessagesNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messageUncheckedUpdateInput = {
    buyer?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messageCreateManyInput = {
    id?: string
    buyer?: boolean
    message: string
    chatId: string
    createdAt?: Date | string
  }

  export type messageUpdateManyMutationInput = {
    buyer?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messageUncheckedUpdateManyInput = {
    buyer?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumOrderStatusFilter = {
    equals?: OrderStatus
    in?: Enumerable<OrderStatus>
    notIn?: Enumerable<OrderStatus>
    not?: NestedEnumOrderStatusFilter | OrderStatus
  }

  export type OfferRelationFilter = {
    is?: offerWhereInput | null
    isNot?: offerWhereInput | null
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type orderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    addressId?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    offerId?: SortOrder
  }

  export type orderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    addressId?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    offerId?: SortOrder
  }

  export type orderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    addressId?: SortOrder
    status?: SortOrder
    carId?: SortOrder
    offerId?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumOrderStatusWithAggregatesFilter = {
    equals?: OrderStatus
    in?: Enumerable<OrderStatus>
    notIn?: Enumerable<OrderStatus>
    not?: NestedEnumOrderStatusWithAggregatesFilter | OrderStatus
    _count?: NestedIntFilter
    _min?: NestedEnumOrderStatusFilter
    _max?: NestedEnumOrderStatusFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type EnumOfferStatusFilter = {
    equals?: OfferStatus
    in?: Enumerable<OfferStatus>
    notIn?: Enumerable<OfferStatus>
    not?: NestedEnumOfferStatusFilter | OfferStatus
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type OrderRelationFilter = {
    is?: orderWhereInput | null
    isNot?: orderWhereInput | null
  }

  export type offerCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
    valid?: SortOrder
  }

  export type offerAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type offerMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
    valid?: SortOrder
  }

  export type offerMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
    valid?: SortOrder
  }

  export type offerSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumOfferStatusWithAggregatesFilter = {
    equals?: OfferStatus
    in?: Enumerable<OfferStatus>
    notIn?: Enumerable<OfferStatus>
    not?: NestedEnumOfferStatusWithAggregatesFilter | OfferStatus
    _count?: NestedIntFilter
    _min?: NestedEnumOfferStatusFilter
    _max?: NestedEnumOfferStatusFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type MessageListRelationFilter = {
    every?: messageWhereInput
    some?: messageWhereInput
    none?: messageWhereInput
  }

  export type messageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type chatCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
  }

  export type chatMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
  }

  export type chatMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    carId?: SortOrder
  }

  export type ChatRelationFilter = {
    is?: chatWhereInput
    isNot?: chatWhereInput
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type messageCountOrderByAggregateInput = {
    id?: SortOrder
    buyer?: SortOrder
    message?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
  }

  export type messageMaxOrderByAggregateInput = {
    id?: SortOrder
    buyer?: SortOrder
    message?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
  }

  export type messageMinOrderByAggregateInput = {
    id?: SortOrder
    buyer?: SortOrder
    message?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type offerCreateNestedOneWithoutOrderInput = {
    create?: XOR<offerCreateWithoutOrderInput, offerUncheckedCreateWithoutOrderInput>
    connectOrCreate?: offerCreateOrConnectWithoutOrderInput
    connect?: offerWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: OrderStatus
  }

  export type offerUpdateOneWithoutOrderNestedInput = {
    create?: XOR<offerCreateWithoutOrderInput, offerUncheckedCreateWithoutOrderInput>
    connectOrCreate?: offerCreateOrConnectWithoutOrderInput
    upsert?: offerUpsertWithoutOrderInput
    disconnect?: boolean
    delete?: boolean
    connect?: offerWhereUniqueInput
    update?: XOR<offerUpdateWithoutOrderInput, offerUncheckedUpdateWithoutOrderInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type orderCreateNestedOneWithoutOfferInput = {
    create?: XOR<orderCreateWithoutOfferInput, orderUncheckedCreateWithoutOfferInput>
    connectOrCreate?: orderCreateOrConnectWithoutOfferInput
    connect?: orderWhereUniqueInput
  }

  export type orderUncheckedCreateNestedOneWithoutOfferInput = {
    create?: XOR<orderCreateWithoutOfferInput, orderUncheckedCreateWithoutOfferInput>
    connectOrCreate?: orderCreateOrConnectWithoutOfferInput
    connect?: orderWhereUniqueInput
  }

  export type EnumOfferStatusFieldUpdateOperationsInput = {
    set?: OfferStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type orderUpdateOneWithoutOfferNestedInput = {
    create?: XOR<orderCreateWithoutOfferInput, orderUncheckedCreateWithoutOfferInput>
    connectOrCreate?: orderCreateOrConnectWithoutOfferInput
    upsert?: orderUpsertWithoutOfferInput
    disconnect?: boolean
    delete?: boolean
    connect?: orderWhereUniqueInput
    update?: XOR<orderUpdateWithoutOfferInput, orderUncheckedUpdateWithoutOfferInput>
  }

  export type orderUncheckedUpdateOneWithoutOfferNestedInput = {
    create?: XOR<orderCreateWithoutOfferInput, orderUncheckedCreateWithoutOfferInput>
    connectOrCreate?: orderCreateOrConnectWithoutOfferInput
    upsert?: orderUpsertWithoutOfferInput
    disconnect?: boolean
    delete?: boolean
    connect?: orderWhereUniqueInput
    update?: XOR<orderUpdateWithoutOfferInput, orderUncheckedUpdateWithoutOfferInput>
  }

  export type messageCreateNestedManyWithoutChatInput = {
    create?: XOR<Enumerable<messageCreateWithoutChatInput>, Enumerable<messageUncheckedCreateWithoutChatInput>>
    connectOrCreate?: Enumerable<messageCreateOrConnectWithoutChatInput>
    createMany?: messageCreateManyChatInputEnvelope
    connect?: Enumerable<messageWhereUniqueInput>
  }

  export type messageUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<Enumerable<messageCreateWithoutChatInput>, Enumerable<messageUncheckedCreateWithoutChatInput>>
    connectOrCreate?: Enumerable<messageCreateOrConnectWithoutChatInput>
    createMany?: messageCreateManyChatInputEnvelope
    connect?: Enumerable<messageWhereUniqueInput>
  }

  export type messageUpdateManyWithoutChatNestedInput = {
    create?: XOR<Enumerable<messageCreateWithoutChatInput>, Enumerable<messageUncheckedCreateWithoutChatInput>>
    connectOrCreate?: Enumerable<messageCreateOrConnectWithoutChatInput>
    upsert?: Enumerable<messageUpsertWithWhereUniqueWithoutChatInput>
    createMany?: messageCreateManyChatInputEnvelope
    set?: Enumerable<messageWhereUniqueInput>
    disconnect?: Enumerable<messageWhereUniqueInput>
    delete?: Enumerable<messageWhereUniqueInput>
    connect?: Enumerable<messageWhereUniqueInput>
    update?: Enumerable<messageUpdateWithWhereUniqueWithoutChatInput>
    updateMany?: Enumerable<messageUpdateManyWithWhereWithoutChatInput>
    deleteMany?: Enumerable<messageScalarWhereInput>
  }

  export type messageUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<Enumerable<messageCreateWithoutChatInput>, Enumerable<messageUncheckedCreateWithoutChatInput>>
    connectOrCreate?: Enumerable<messageCreateOrConnectWithoutChatInput>
    upsert?: Enumerable<messageUpsertWithWhereUniqueWithoutChatInput>
    createMany?: messageCreateManyChatInputEnvelope
    set?: Enumerable<messageWhereUniqueInput>
    disconnect?: Enumerable<messageWhereUniqueInput>
    delete?: Enumerable<messageWhereUniqueInput>
    connect?: Enumerable<messageWhereUniqueInput>
    update?: Enumerable<messageUpdateWithWhereUniqueWithoutChatInput>
    updateMany?: Enumerable<messageUpdateManyWithWhereWithoutChatInput>
    deleteMany?: Enumerable<messageScalarWhereInput>
  }

  export type chatCreateNestedOneWithoutMessagesInput = {
    create?: XOR<chatCreateWithoutMessagesInput, chatUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: chatCreateOrConnectWithoutMessagesInput
    connect?: chatWhereUniqueInput
  }

  export type chatUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<chatCreateWithoutMessagesInput, chatUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: chatCreateOrConnectWithoutMessagesInput
    upsert?: chatUpsertWithoutMessagesInput
    connect?: chatWhereUniqueInput
    update?: XOR<chatUpdateWithoutMessagesInput, chatUncheckedUpdateWithoutMessagesInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumOrderStatusFilter = {
    equals?: OrderStatus
    in?: Enumerable<OrderStatus>
    notIn?: Enumerable<OrderStatus>
    not?: NestedEnumOrderStatusFilter | OrderStatus
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumOrderStatusWithAggregatesFilter = {
    equals?: OrderStatus
    in?: Enumerable<OrderStatus>
    notIn?: Enumerable<OrderStatus>
    not?: NestedEnumOrderStatusWithAggregatesFilter | OrderStatus
    _count?: NestedIntFilter
    _min?: NestedEnumOrderStatusFilter
    _max?: NestedEnumOrderStatusFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
    isSet?: boolean
  }

  export type NestedEnumOfferStatusFilter = {
    equals?: OfferStatus
    in?: Enumerable<OfferStatus>
    notIn?: Enumerable<OfferStatus>
    not?: NestedEnumOfferStatusFilter | OfferStatus
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedEnumOfferStatusWithAggregatesFilter = {
    equals?: OfferStatus
    in?: Enumerable<OfferStatus>
    notIn?: Enumerable<OfferStatus>
    not?: NestedEnumOfferStatusWithAggregatesFilter | OfferStatus
    _count?: NestedIntFilter
    _min?: NestedEnumOfferStatusFilter
    _max?: NestedEnumOfferStatusFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type offerCreateWithoutOrderInput = {
    id?: string
    status?: OfferStatus
    amount: number
    userId: string
    carId: string
    valid?: boolean
  }

  export type offerUncheckedCreateWithoutOrderInput = {
    id?: string
    status?: OfferStatus
    amount: number
    userId: string
    carId: string
    valid?: boolean
  }

  export type offerCreateOrConnectWithoutOrderInput = {
    where: offerWhereUniqueInput
    create: XOR<offerCreateWithoutOrderInput, offerUncheckedCreateWithoutOrderInput>
  }

  export type offerUpsertWithoutOrderInput = {
    update: XOR<offerUpdateWithoutOrderInput, offerUncheckedUpdateWithoutOrderInput>
    create: XOR<offerCreateWithoutOrderInput, offerUncheckedCreateWithoutOrderInput>
  }

  export type offerUpdateWithoutOrderInput = {
    status?: EnumOfferStatusFieldUpdateOperationsInput | OfferStatus
    amount?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    valid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type offerUncheckedUpdateWithoutOrderInput = {
    status?: EnumOfferStatusFieldUpdateOperationsInput | OfferStatus
    amount?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
    valid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type orderCreateWithoutOfferInput = {
    id?: string
    userId: string
    addressId: string
    status?: OrderStatus
    carId: string
  }

  export type orderUncheckedCreateWithoutOfferInput = {
    id?: string
    userId: string
    addressId: string
    status?: OrderStatus
    carId: string
  }

  export type orderCreateOrConnectWithoutOfferInput = {
    where: orderWhereUniqueInput
    create: XOR<orderCreateWithoutOfferInput, orderUncheckedCreateWithoutOfferInput>
  }

  export type orderUpsertWithoutOfferInput = {
    update: XOR<orderUpdateWithoutOfferInput, orderUncheckedUpdateWithoutOfferInput>
    create: XOR<orderCreateWithoutOfferInput, orderUncheckedCreateWithoutOfferInput>
  }

  export type orderUpdateWithoutOfferInput = {
    userId?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | OrderStatus
    carId?: StringFieldUpdateOperationsInput | string
  }

  export type orderUncheckedUpdateWithoutOfferInput = {
    userId?: StringFieldUpdateOperationsInput | string
    addressId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | OrderStatus
    carId?: StringFieldUpdateOperationsInput | string
  }

  export type messageCreateWithoutChatInput = {
    id?: string
    buyer?: boolean
    message: string
    createdAt?: Date | string
  }

  export type messageUncheckedCreateWithoutChatInput = {
    id?: string
    buyer?: boolean
    message: string
    createdAt?: Date | string
  }

  export type messageCreateOrConnectWithoutChatInput = {
    where: messageWhereUniqueInput
    create: XOR<messageCreateWithoutChatInput, messageUncheckedCreateWithoutChatInput>
  }

  export type messageCreateManyChatInputEnvelope = {
    data: Enumerable<messageCreateManyChatInput>
  }

  export type messageUpsertWithWhereUniqueWithoutChatInput = {
    where: messageWhereUniqueInput
    update: XOR<messageUpdateWithoutChatInput, messageUncheckedUpdateWithoutChatInput>
    create: XOR<messageCreateWithoutChatInput, messageUncheckedCreateWithoutChatInput>
  }

  export type messageUpdateWithWhereUniqueWithoutChatInput = {
    where: messageWhereUniqueInput
    data: XOR<messageUpdateWithoutChatInput, messageUncheckedUpdateWithoutChatInput>
  }

  export type messageUpdateManyWithWhereWithoutChatInput = {
    where: messageScalarWhereInput
    data: XOR<messageUpdateManyMutationInput, messageUncheckedUpdateManyWithoutMessagesInput>
  }

  export type messageScalarWhereInput = {
    AND?: Enumerable<messageScalarWhereInput>
    OR?: Enumerable<messageScalarWhereInput>
    NOT?: Enumerable<messageScalarWhereInput>
    id?: StringFilter | string
    buyer?: BoolFilter | boolean
    message?: StringFilter | string
    chatId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
  }

  export type chatCreateWithoutMessagesInput = {
    id?: string
    userId: string
    carId: string
  }

  export type chatUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    carId: string
  }

  export type chatCreateOrConnectWithoutMessagesInput = {
    where: chatWhereUniqueInput
    create: XOR<chatCreateWithoutMessagesInput, chatUncheckedCreateWithoutMessagesInput>
  }

  export type chatUpsertWithoutMessagesInput = {
    update: XOR<chatUpdateWithoutMessagesInput, chatUncheckedUpdateWithoutMessagesInput>
    create: XOR<chatCreateWithoutMessagesInput, chatUncheckedCreateWithoutMessagesInput>
  }

  export type chatUpdateWithoutMessagesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
  }

  export type chatUncheckedUpdateWithoutMessagesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    carId?: StringFieldUpdateOperationsInput | string
  }

  export type messageCreateManyChatInput = {
    id?: string
    buyer?: boolean
    message: string
    createdAt?: Date | string
  }

  export type messageUpdateWithoutChatInput = {
    buyer?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messageUncheckedUpdateWithoutChatInput = {
    buyer?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messageUncheckedUpdateManyWithoutMessagesInput = {
    buyer?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}