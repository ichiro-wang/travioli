
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Follows
 * 
 */
export type Follows = $Result.DefaultSelection<Prisma.$FollowsPayload>
/**
 * Model Itinerary
 * 
 */
export type Itinerary = $Result.DefaultSelection<Prisma.$ItineraryPayload>
/**
 * Model ItineraryItem
 * 
 */
export type ItineraryItem = $Result.DefaultSelection<Prisma.$ItineraryItemPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FollowStatus: {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  unfollowed: 'unfollowed'
};

export type FollowStatus = (typeof FollowStatus)[keyof typeof FollowStatus]

}

export type FollowStatus = $Enums.FollowStatus

export const FollowStatus: typeof $Enums.FollowStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.follows`: Exposes CRUD operations for the **Follows** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follows.findMany()
    * ```
    */
  get follows(): Prisma.FollowsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itinerary`: Exposes CRUD operations for the **Itinerary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Itineraries
    * const itineraries = await prisma.itinerary.findMany()
    * ```
    */
  get itinerary(): Prisma.ItineraryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itineraryItem`: Exposes CRUD operations for the **ItineraryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItineraryItems
    * const itineraryItems = await prisma.itineraryItem.findMany()
    * ```
    */
  get itineraryItem(): Prisma.ItineraryItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

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
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
  : T extends Uint8Array
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Follows: 'Follows',
    Itinerary: 'Itinerary',
    ItineraryItem: 'ItineraryItem',
    Location: 'Location'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "follows" | "itinerary" | "itineraryItem" | "location"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Follows: {
        payload: Prisma.$FollowsPayload<ExtArgs>
        fields: Prisma.FollowsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>
          }
          findFirst: {
            args: Prisma.FollowsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>
          }
          findMany: {
            args: Prisma.FollowsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>[]
          }
          create: {
            args: Prisma.FollowsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>
          }
          createMany: {
            args: Prisma.FollowsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>[]
          }
          delete: {
            args: Prisma.FollowsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>
          }
          update: {
            args: Prisma.FollowsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>
          }
          deleteMany: {
            args: Prisma.FollowsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>[]
          }
          upsert: {
            args: Prisma.FollowsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowsPayload>
          }
          aggregate: {
            args: Prisma.FollowsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollows>
          }
          groupBy: {
            args: Prisma.FollowsGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowsGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowsCountArgs<ExtArgs>
            result: $Utils.Optional<FollowsCountAggregateOutputType> | number
          }
        }
      }
      Itinerary: {
        payload: Prisma.$ItineraryPayload<ExtArgs>
        fields: Prisma.ItineraryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItineraryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItineraryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>
          }
          findFirst: {
            args: Prisma.ItineraryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItineraryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>
          }
          findMany: {
            args: Prisma.ItineraryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>[]
          }
          create: {
            args: Prisma.ItineraryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>
          }
          createMany: {
            args: Prisma.ItineraryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItineraryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>[]
          }
          delete: {
            args: Prisma.ItineraryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>
          }
          update: {
            args: Prisma.ItineraryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>
          }
          deleteMany: {
            args: Prisma.ItineraryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItineraryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItineraryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>[]
          }
          upsert: {
            args: Prisma.ItineraryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryPayload>
          }
          aggregate: {
            args: Prisma.ItineraryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItinerary>
          }
          groupBy: {
            args: Prisma.ItineraryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItineraryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItineraryCountArgs<ExtArgs>
            result: $Utils.Optional<ItineraryCountAggregateOutputType> | number
          }
        }
      }
      ItineraryItem: {
        payload: Prisma.$ItineraryItemPayload<ExtArgs>
        fields: Prisma.ItineraryItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItineraryItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItineraryItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          findFirst: {
            args: Prisma.ItineraryItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItineraryItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          findMany: {
            args: Prisma.ItineraryItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>[]
          }
          create: {
            args: Prisma.ItineraryItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          createMany: {
            args: Prisma.ItineraryItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItineraryItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>[]
          }
          delete: {
            args: Prisma.ItineraryItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          update: {
            args: Prisma.ItineraryItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          deleteMany: {
            args: Prisma.ItineraryItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItineraryItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItineraryItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>[]
          }
          upsert: {
            args: Prisma.ItineraryItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          aggregate: {
            args: Prisma.ItineraryItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItineraryItem>
          }
          groupBy: {
            args: Prisma.ItineraryItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItineraryItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItineraryItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItineraryItemCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    follows?: FollowsOmit
    itinerary?: ItineraryOmit
    itineraryItem?: ItineraryItemOmit
    location?: LocationOmit
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    followedBy: number
    following: number
    createdItineraries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | UserCountOutputTypeCountFollowedByArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
    createdItineraries?: boolean | UserCountOutputTypeCountCreatedItinerariesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedItinerariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItineraryWhereInput
  }


  /**
   * Count Type ItineraryCountOutputType
   */

  export type ItineraryCountOutputType = {
    itineraryItems: number
  }

  export type ItineraryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itineraryItems?: boolean | ItineraryCountOutputTypeCountItineraryItemsArgs
  }

  // Custom InputTypes
  /**
   * ItineraryCountOutputType without action
   */
  export type ItineraryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryCountOutputType
     */
    select?: ItineraryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItineraryCountOutputType without action
   */
  export type ItineraryCountOutputTypeCountItineraryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItineraryItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    name: string | null
    bio: string | null
    password: string | null
    profilePic: string | null
    isPrivate: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    name: string | null
    bio: string | null
    password: string | null
    profilePic: string | null
    isPrivate: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    name: number
    bio: number
    password: number
    profilePic: number
    isPrivate: number
    isDeleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    name?: true
    bio?: true
    password?: true
    profilePic?: true
    isPrivate?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    name?: true
    bio?: true
    password?: true
    profilePic?: true
    isPrivate?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    name?: true
    bio?: true
    password?: true
    profilePic?: true
    isPrivate?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string
    name: string | null
    bio: string | null
    password: string
    profilePic: string
    isPrivate: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    name?: boolean
    bio?: boolean
    password?: boolean
    profilePic?: boolean
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    followedBy?: boolean | User$followedByArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    createdItineraries?: boolean | User$createdItinerariesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    name?: boolean
    bio?: boolean
    password?: boolean
    profilePic?: boolean
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    name?: boolean
    bio?: boolean
    password?: boolean
    profilePic?: boolean
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    name?: boolean
    bio?: boolean
    password?: boolean
    profilePic?: boolean
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "name" | "bio" | "password" | "profilePic" | "isPrivate" | "isDeleted" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | User$followedByArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    createdItineraries?: boolean | User$createdItinerariesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      followedBy: Prisma.$FollowsPayload<ExtArgs>[]
      following: Prisma.$FollowsPayload<ExtArgs>[]
      createdItineraries: Prisma.$ItineraryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      name: string | null
      bio: string | null
      password: string
      profilePic: string
      isPrivate: boolean
      isDeleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    followedBy<T extends User$followedByArgs<ExtArgs> = {}>(args?: Subset<T, User$followedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdItineraries<T extends User$createdItinerariesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdItinerariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly profilePic: FieldRef<"User", 'String'>
    readonly isPrivate: FieldRef<"User", 'Boolean'>
    readonly isDeleted: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.followedBy
   */
  export type User$followedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    where?: FollowsWhereInput
    orderBy?: FollowsOrderByWithRelationInput | FollowsOrderByWithRelationInput[]
    cursor?: FollowsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowsScalarFieldEnum | FollowsScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    where?: FollowsWhereInput
    orderBy?: FollowsOrderByWithRelationInput | FollowsOrderByWithRelationInput[]
    cursor?: FollowsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowsScalarFieldEnum | FollowsScalarFieldEnum[]
  }

  /**
   * User.createdItineraries
   */
  export type User$createdItinerariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    where?: ItineraryWhereInput
    orderBy?: ItineraryOrderByWithRelationInput | ItineraryOrderByWithRelationInput[]
    cursor?: ItineraryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItineraryScalarFieldEnum | ItineraryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Follows
   */

  export type AggregateFollows = {
    _count: FollowsCountAggregateOutputType | null
    _min: FollowsMinAggregateOutputType | null
    _max: FollowsMaxAggregateOutputType | null
  }

  export type FollowsMinAggregateOutputType = {
    followedById: string | null
    followingId: string | null
    status: $Enums.FollowStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FollowsMaxAggregateOutputType = {
    followedById: string | null
    followingId: string | null
    status: $Enums.FollowStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FollowsCountAggregateOutputType = {
    followedById: number
    followingId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FollowsMinAggregateInputType = {
    followedById?: true
    followingId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FollowsMaxAggregateInputType = {
    followedById?: true
    followingId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FollowsCountAggregateInputType = {
    followedById?: true
    followingId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FollowsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to aggregate.
     */
    where?: FollowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowsOrderByWithRelationInput | FollowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Follows
    **/
    _count?: true | FollowsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowsMaxAggregateInputType
  }

  export type GetFollowsAggregateType<T extends FollowsAggregateArgs> = {
        [P in keyof T & keyof AggregateFollows]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollows[P]>
      : GetScalarType<T[P], AggregateFollows[P]>
  }




  export type FollowsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowsWhereInput
    orderBy?: FollowsOrderByWithAggregationInput | FollowsOrderByWithAggregationInput[]
    by: FollowsScalarFieldEnum[] | FollowsScalarFieldEnum
    having?: FollowsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowsCountAggregateInputType | true
    _min?: FollowsMinAggregateInputType
    _max?: FollowsMaxAggregateInputType
  }

  export type FollowsGroupByOutputType = {
    followedById: string
    followingId: string
    status: $Enums.FollowStatus
    createdAt: Date
    updatedAt: Date
    _count: FollowsCountAggregateOutputType | null
    _min: FollowsMinAggregateOutputType | null
    _max: FollowsMaxAggregateOutputType | null
  }

  type GetFollowsGroupByPayload<T extends FollowsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowsGroupByOutputType[P]>
            : GetScalarType<T[P], FollowsGroupByOutputType[P]>
        }
      >
    >


  export type FollowsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followedById?: boolean
    followingId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follows"]>

  export type FollowsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followedById?: boolean
    followingId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follows"]>

  export type FollowsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followedById?: boolean
    followingId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follows"]>

  export type FollowsSelectScalar = {
    followedById?: boolean
    followingId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FollowsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"followedById" | "followingId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["follows"]>
  export type FollowsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followedBy?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FollowsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Follows"
    objects: {
      followedBy: Prisma.$UserPayload<ExtArgs>
      following: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      followedById: string
      followingId: string
      status: $Enums.FollowStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["follows"]>
    composites: {}
  }

  type FollowsGetPayload<S extends boolean | null | undefined | FollowsDefaultArgs> = $Result.GetResult<Prisma.$FollowsPayload, S>

  type FollowsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowsCountAggregateInputType | true
    }

  export interface FollowsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Follows'], meta: { name: 'Follows' } }
    /**
     * Find zero or one Follows that matches the filter.
     * @param {FollowsFindUniqueArgs} args - Arguments to find a Follows
     * @example
     * // Get one Follows
     * const follows = await prisma.follows.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowsFindUniqueArgs>(args: SelectSubset<T, FollowsFindUniqueArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Follows that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowsFindUniqueOrThrowArgs} args - Arguments to find a Follows
     * @example
     * // Get one Follows
     * const follows = await prisma.follows.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowsFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowsFindFirstArgs} args - Arguments to find a Follows
     * @example
     * // Get one Follows
     * const follows = await prisma.follows.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowsFindFirstArgs>(args?: SelectSubset<T, FollowsFindFirstArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follows that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowsFindFirstOrThrowArgs} args - Arguments to find a Follows
     * @example
     * // Get one Follows
     * const follows = await prisma.follows.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowsFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowsFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Follows
     * const follows = await prisma.follows.findMany()
     * 
     * // Get first 10 Follows
     * const follows = await prisma.follows.findMany({ take: 10 })
     * 
     * // Only select the `followedById`
     * const followsWithFollowedByIdOnly = await prisma.follows.findMany({ select: { followedById: true } })
     * 
     */
    findMany<T extends FollowsFindManyArgs>(args?: SelectSubset<T, FollowsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Follows.
     * @param {FollowsCreateArgs} args - Arguments to create a Follows.
     * @example
     * // Create one Follows
     * const Follows = await prisma.follows.create({
     *   data: {
     *     // ... data to create a Follows
     *   }
     * })
     * 
     */
    create<T extends FollowsCreateArgs>(args: SelectSubset<T, FollowsCreateArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Follows.
     * @param {FollowsCreateManyArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follows = await prisma.follows.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowsCreateManyArgs>(args?: SelectSubset<T, FollowsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Follows and returns the data saved in the database.
     * @param {FollowsCreateManyAndReturnArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follows = await prisma.follows.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Follows and only return the `followedById`
     * const followsWithFollowedByIdOnly = await prisma.follows.createManyAndReturn({
     *   select: { followedById: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowsCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Follows.
     * @param {FollowsDeleteArgs} args - Arguments to delete one Follows.
     * @example
     * // Delete one Follows
     * const Follows = await prisma.follows.delete({
     *   where: {
     *     // ... filter to delete one Follows
     *   }
     * })
     * 
     */
    delete<T extends FollowsDeleteArgs>(args: SelectSubset<T, FollowsDeleteArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Follows.
     * @param {FollowsUpdateArgs} args - Arguments to update one Follows.
     * @example
     * // Update one Follows
     * const follows = await prisma.follows.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowsUpdateArgs>(args: SelectSubset<T, FollowsUpdateArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Follows.
     * @param {FollowsDeleteManyArgs} args - Arguments to filter Follows to delete.
     * @example
     * // Delete a few Follows
     * const { count } = await prisma.follows.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowsDeleteManyArgs>(args?: SelectSubset<T, FollowsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Follows
     * const follows = await prisma.follows.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowsUpdateManyArgs>(args: SelectSubset<T, FollowsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows and returns the data updated in the database.
     * @param {FollowsUpdateManyAndReturnArgs} args - Arguments to update many Follows.
     * @example
     * // Update many Follows
     * const follows = await prisma.follows.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Follows and only return the `followedById`
     * const followsWithFollowedByIdOnly = await prisma.follows.updateManyAndReturn({
     *   select: { followedById: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowsUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Follows.
     * @param {FollowsUpsertArgs} args - Arguments to update or create a Follows.
     * @example
     * // Update or create a Follows
     * const follows = await prisma.follows.upsert({
     *   create: {
     *     // ... data to create a Follows
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Follows we want to update
     *   }
     * })
     */
    upsert<T extends FollowsUpsertArgs>(args: SelectSubset<T, FollowsUpsertArgs<ExtArgs>>): Prisma__FollowsClient<$Result.GetResult<Prisma.$FollowsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowsCountArgs} args - Arguments to filter Follows to count.
     * @example
     * // Count the number of Follows
     * const count = await prisma.follows.count({
     *   where: {
     *     // ... the filter for the Follows we want to count
     *   }
     * })
    **/
    count<T extends FollowsCountArgs>(
      args?: Subset<T, FollowsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FollowsAggregateArgs>(args: Subset<T, FollowsAggregateArgs>): Prisma.PrismaPromise<GetFollowsAggregateType<T>>

    /**
     * Group by Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowsGroupByArgs} args - Group by arguments.
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
      T extends FollowsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowsGroupByArgs['orderBy'] }
        : { orderBy?: FollowsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FollowsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Follows model
   */
  readonly fields: FollowsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Follows.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    followedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    following<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Follows model
   */
  interface FollowsFieldRefs {
    readonly followedById: FieldRef<"Follows", 'String'>
    readonly followingId: FieldRef<"Follows", 'String'>
    readonly status: FieldRef<"Follows", 'FollowStatus'>
    readonly createdAt: FieldRef<"Follows", 'DateTime'>
    readonly updatedAt: FieldRef<"Follows", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Follows findUnique
   */
  export type FollowsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where: FollowsWhereUniqueInput
  }

  /**
   * Follows findUniqueOrThrow
   */
  export type FollowsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where: FollowsWhereUniqueInput
  }

  /**
   * Follows findFirst
   */
  export type FollowsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowsOrderByWithRelationInput | FollowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowsScalarFieldEnum | FollowsScalarFieldEnum[]
  }

  /**
   * Follows findFirstOrThrow
   */
  export type FollowsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowsOrderByWithRelationInput | FollowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowsScalarFieldEnum | FollowsScalarFieldEnum[]
  }

  /**
   * Follows findMany
   */
  export type FollowsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowsOrderByWithRelationInput | FollowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Follows.
     */
    cursor?: FollowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    distinct?: FollowsScalarFieldEnum | FollowsScalarFieldEnum[]
  }

  /**
   * Follows create
   */
  export type FollowsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * The data needed to create a Follows.
     */
    data: XOR<FollowsCreateInput, FollowsUncheckedCreateInput>
  }

  /**
   * Follows createMany
   */
  export type FollowsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Follows.
     */
    data: FollowsCreateManyInput | FollowsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Follows createManyAndReturn
   */
  export type FollowsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * The data used to create many Follows.
     */
    data: FollowsCreateManyInput | FollowsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follows update
   */
  export type FollowsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * The data needed to update a Follows.
     */
    data: XOR<FollowsUpdateInput, FollowsUncheckedUpdateInput>
    /**
     * Choose, which Follows to update.
     */
    where: FollowsWhereUniqueInput
  }

  /**
   * Follows updateMany
   */
  export type FollowsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowsUpdateManyMutationInput, FollowsUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowsWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
  }

  /**
   * Follows updateManyAndReturn
   */
  export type FollowsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowsUpdateManyMutationInput, FollowsUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowsWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follows upsert
   */
  export type FollowsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * The filter to search for the Follows to update in case it exists.
     */
    where: FollowsWhereUniqueInput
    /**
     * In case the Follows found by the `where` argument doesn't exist, create a new Follows with this data.
     */
    create: XOR<FollowsCreateInput, FollowsUncheckedCreateInput>
    /**
     * In case the Follows was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowsUpdateInput, FollowsUncheckedUpdateInput>
  }

  /**
   * Follows delete
   */
  export type FollowsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
    /**
     * Filter which Follows to delete.
     */
    where: FollowsWhereUniqueInput
  }

  /**
   * Follows deleteMany
   */
  export type FollowsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to delete
     */
    where?: FollowsWhereInput
    /**
     * Limit how many Follows to delete.
     */
    limit?: number
  }

  /**
   * Follows without action
   */
  export type FollowsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follows
     */
    select?: FollowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follows
     */
    omit?: FollowsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowsInclude<ExtArgs> | null
  }


  /**
   * Model Itinerary
   */

  export type AggregateItinerary = {
    _count: ItineraryCountAggregateOutputType | null
    _min: ItineraryMinAggregateOutputType | null
    _max: ItineraryMaxAggregateOutputType | null
  }

  export type ItineraryMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItineraryMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItineraryCountAggregateOutputType = {
    id: number
    title: number
    description: number
    startDate: number
    endDate: number
    media: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItineraryMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItineraryMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItineraryCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    media?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItineraryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Itinerary to aggregate.
     */
    where?: ItineraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Itineraries to fetch.
     */
    orderBy?: ItineraryOrderByWithRelationInput | ItineraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItineraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Itineraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Itineraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Itineraries
    **/
    _count?: true | ItineraryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItineraryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItineraryMaxAggregateInputType
  }

  export type GetItineraryAggregateType<T extends ItineraryAggregateArgs> = {
        [P in keyof T & keyof AggregateItinerary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItinerary[P]>
      : GetScalarType<T[P], AggregateItinerary[P]>
  }




  export type ItineraryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItineraryWhereInput
    orderBy?: ItineraryOrderByWithAggregationInput | ItineraryOrderByWithAggregationInput[]
    by: ItineraryScalarFieldEnum[] | ItineraryScalarFieldEnum
    having?: ItineraryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItineraryCountAggregateInputType | true
    _min?: ItineraryMinAggregateInputType
    _max?: ItineraryMaxAggregateInputType
  }

  export type ItineraryGroupByOutputType = {
    id: string
    title: string
    description: string | null
    startDate: Date | null
    endDate: Date | null
    media: string[]
    ownerId: string
    createdAt: Date
    updatedAt: Date
    _count: ItineraryCountAggregateOutputType | null
    _min: ItineraryMinAggregateOutputType | null
    _max: ItineraryMaxAggregateOutputType | null
  }

  type GetItineraryGroupByPayload<T extends ItineraryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItineraryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItineraryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItineraryGroupByOutputType[P]>
            : GetScalarType<T[P], ItineraryGroupByOutputType[P]>
        }
      >
    >


  export type ItinerarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    media?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    itineraryItems?: boolean | Itinerary$itineraryItemsArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ItineraryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itinerary"]>

  export type ItinerarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    media?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itinerary"]>

  export type ItinerarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    media?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itinerary"]>

  export type ItinerarySelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    media?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItineraryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "startDate" | "endDate" | "media" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["itinerary"]>
  export type ItineraryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itineraryItems?: boolean | Itinerary$itineraryItemsArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ItineraryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItineraryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ItineraryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ItineraryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Itinerary"
    objects: {
      itineraryItems: Prisma.$ItineraryItemPayload<ExtArgs>[]
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      startDate: Date | null
      endDate: Date | null
      media: string[]
      ownerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["itinerary"]>
    composites: {}
  }

  type ItineraryGetPayload<S extends boolean | null | undefined | ItineraryDefaultArgs> = $Result.GetResult<Prisma.$ItineraryPayload, S>

  type ItineraryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItineraryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItineraryCountAggregateInputType | true
    }

  export interface ItineraryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Itinerary'], meta: { name: 'Itinerary' } }
    /**
     * Find zero or one Itinerary that matches the filter.
     * @param {ItineraryFindUniqueArgs} args - Arguments to find a Itinerary
     * @example
     * // Get one Itinerary
     * const itinerary = await prisma.itinerary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItineraryFindUniqueArgs>(args: SelectSubset<T, ItineraryFindUniqueArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Itinerary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItineraryFindUniqueOrThrowArgs} args - Arguments to find a Itinerary
     * @example
     * // Get one Itinerary
     * const itinerary = await prisma.itinerary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItineraryFindUniqueOrThrowArgs>(args: SelectSubset<T, ItineraryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Itinerary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryFindFirstArgs} args - Arguments to find a Itinerary
     * @example
     * // Get one Itinerary
     * const itinerary = await prisma.itinerary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItineraryFindFirstArgs>(args?: SelectSubset<T, ItineraryFindFirstArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Itinerary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryFindFirstOrThrowArgs} args - Arguments to find a Itinerary
     * @example
     * // Get one Itinerary
     * const itinerary = await prisma.itinerary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItineraryFindFirstOrThrowArgs>(args?: SelectSubset<T, ItineraryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Itineraries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Itineraries
     * const itineraries = await prisma.itinerary.findMany()
     * 
     * // Get first 10 Itineraries
     * const itineraries = await prisma.itinerary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itineraryWithIdOnly = await prisma.itinerary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItineraryFindManyArgs>(args?: SelectSubset<T, ItineraryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Itinerary.
     * @param {ItineraryCreateArgs} args - Arguments to create a Itinerary.
     * @example
     * // Create one Itinerary
     * const Itinerary = await prisma.itinerary.create({
     *   data: {
     *     // ... data to create a Itinerary
     *   }
     * })
     * 
     */
    create<T extends ItineraryCreateArgs>(args: SelectSubset<T, ItineraryCreateArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Itineraries.
     * @param {ItineraryCreateManyArgs} args - Arguments to create many Itineraries.
     * @example
     * // Create many Itineraries
     * const itinerary = await prisma.itinerary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItineraryCreateManyArgs>(args?: SelectSubset<T, ItineraryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Itineraries and returns the data saved in the database.
     * @param {ItineraryCreateManyAndReturnArgs} args - Arguments to create many Itineraries.
     * @example
     * // Create many Itineraries
     * const itinerary = await prisma.itinerary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Itineraries and only return the `id`
     * const itineraryWithIdOnly = await prisma.itinerary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItineraryCreateManyAndReturnArgs>(args?: SelectSubset<T, ItineraryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Itinerary.
     * @param {ItineraryDeleteArgs} args - Arguments to delete one Itinerary.
     * @example
     * // Delete one Itinerary
     * const Itinerary = await prisma.itinerary.delete({
     *   where: {
     *     // ... filter to delete one Itinerary
     *   }
     * })
     * 
     */
    delete<T extends ItineraryDeleteArgs>(args: SelectSubset<T, ItineraryDeleteArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Itinerary.
     * @param {ItineraryUpdateArgs} args - Arguments to update one Itinerary.
     * @example
     * // Update one Itinerary
     * const itinerary = await prisma.itinerary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItineraryUpdateArgs>(args: SelectSubset<T, ItineraryUpdateArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Itineraries.
     * @param {ItineraryDeleteManyArgs} args - Arguments to filter Itineraries to delete.
     * @example
     * // Delete a few Itineraries
     * const { count } = await prisma.itinerary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItineraryDeleteManyArgs>(args?: SelectSubset<T, ItineraryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Itineraries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Itineraries
     * const itinerary = await prisma.itinerary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItineraryUpdateManyArgs>(args: SelectSubset<T, ItineraryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Itineraries and returns the data updated in the database.
     * @param {ItineraryUpdateManyAndReturnArgs} args - Arguments to update many Itineraries.
     * @example
     * // Update many Itineraries
     * const itinerary = await prisma.itinerary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Itineraries and only return the `id`
     * const itineraryWithIdOnly = await prisma.itinerary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItineraryUpdateManyAndReturnArgs>(args: SelectSubset<T, ItineraryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Itinerary.
     * @param {ItineraryUpsertArgs} args - Arguments to update or create a Itinerary.
     * @example
     * // Update or create a Itinerary
     * const itinerary = await prisma.itinerary.upsert({
     *   create: {
     *     // ... data to create a Itinerary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Itinerary we want to update
     *   }
     * })
     */
    upsert<T extends ItineraryUpsertArgs>(args: SelectSubset<T, ItineraryUpsertArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Itineraries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryCountArgs} args - Arguments to filter Itineraries to count.
     * @example
     * // Count the number of Itineraries
     * const count = await prisma.itinerary.count({
     *   where: {
     *     // ... the filter for the Itineraries we want to count
     *   }
     * })
    **/
    count<T extends ItineraryCountArgs>(
      args?: Subset<T, ItineraryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItineraryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Itinerary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ItineraryAggregateArgs>(args: Subset<T, ItineraryAggregateArgs>): Prisma.PrismaPromise<GetItineraryAggregateType<T>>

    /**
     * Group by Itinerary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryGroupByArgs} args - Group by arguments.
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
      T extends ItineraryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItineraryGroupByArgs['orderBy'] }
        : { orderBy?: ItineraryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ItineraryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItineraryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Itinerary model
   */
  readonly fields: ItineraryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Itinerary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItineraryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itineraryItems<T extends Itinerary$itineraryItemsArgs<ExtArgs> = {}>(args?: Subset<T, Itinerary$itineraryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Itinerary model
   */
  interface ItineraryFieldRefs {
    readonly id: FieldRef<"Itinerary", 'String'>
    readonly title: FieldRef<"Itinerary", 'String'>
    readonly description: FieldRef<"Itinerary", 'String'>
    readonly startDate: FieldRef<"Itinerary", 'DateTime'>
    readonly endDate: FieldRef<"Itinerary", 'DateTime'>
    readonly media: FieldRef<"Itinerary", 'String[]'>
    readonly ownerId: FieldRef<"Itinerary", 'String'>
    readonly createdAt: FieldRef<"Itinerary", 'DateTime'>
    readonly updatedAt: FieldRef<"Itinerary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Itinerary findUnique
   */
  export type ItineraryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * Filter, which Itinerary to fetch.
     */
    where: ItineraryWhereUniqueInput
  }

  /**
   * Itinerary findUniqueOrThrow
   */
  export type ItineraryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * Filter, which Itinerary to fetch.
     */
    where: ItineraryWhereUniqueInput
  }

  /**
   * Itinerary findFirst
   */
  export type ItineraryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * Filter, which Itinerary to fetch.
     */
    where?: ItineraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Itineraries to fetch.
     */
    orderBy?: ItineraryOrderByWithRelationInput | ItineraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Itineraries.
     */
    cursor?: ItineraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Itineraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Itineraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Itineraries.
     */
    distinct?: ItineraryScalarFieldEnum | ItineraryScalarFieldEnum[]
  }

  /**
   * Itinerary findFirstOrThrow
   */
  export type ItineraryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * Filter, which Itinerary to fetch.
     */
    where?: ItineraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Itineraries to fetch.
     */
    orderBy?: ItineraryOrderByWithRelationInput | ItineraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Itineraries.
     */
    cursor?: ItineraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Itineraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Itineraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Itineraries.
     */
    distinct?: ItineraryScalarFieldEnum | ItineraryScalarFieldEnum[]
  }

  /**
   * Itinerary findMany
   */
  export type ItineraryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * Filter, which Itineraries to fetch.
     */
    where?: ItineraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Itineraries to fetch.
     */
    orderBy?: ItineraryOrderByWithRelationInput | ItineraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Itineraries.
     */
    cursor?: ItineraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Itineraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Itineraries.
     */
    skip?: number
    distinct?: ItineraryScalarFieldEnum | ItineraryScalarFieldEnum[]
  }

  /**
   * Itinerary create
   */
  export type ItineraryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * The data needed to create a Itinerary.
     */
    data: XOR<ItineraryCreateInput, ItineraryUncheckedCreateInput>
  }

  /**
   * Itinerary createMany
   */
  export type ItineraryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Itineraries.
     */
    data: ItineraryCreateManyInput | ItineraryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Itinerary createManyAndReturn
   */
  export type ItineraryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * The data used to create many Itineraries.
     */
    data: ItineraryCreateManyInput | ItineraryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Itinerary update
   */
  export type ItineraryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * The data needed to update a Itinerary.
     */
    data: XOR<ItineraryUpdateInput, ItineraryUncheckedUpdateInput>
    /**
     * Choose, which Itinerary to update.
     */
    where: ItineraryWhereUniqueInput
  }

  /**
   * Itinerary updateMany
   */
  export type ItineraryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Itineraries.
     */
    data: XOR<ItineraryUpdateManyMutationInput, ItineraryUncheckedUpdateManyInput>
    /**
     * Filter which Itineraries to update
     */
    where?: ItineraryWhereInput
    /**
     * Limit how many Itineraries to update.
     */
    limit?: number
  }

  /**
   * Itinerary updateManyAndReturn
   */
  export type ItineraryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * The data used to update Itineraries.
     */
    data: XOR<ItineraryUpdateManyMutationInput, ItineraryUncheckedUpdateManyInput>
    /**
     * Filter which Itineraries to update
     */
    where?: ItineraryWhereInput
    /**
     * Limit how many Itineraries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Itinerary upsert
   */
  export type ItineraryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * The filter to search for the Itinerary to update in case it exists.
     */
    where: ItineraryWhereUniqueInput
    /**
     * In case the Itinerary found by the `where` argument doesn't exist, create a new Itinerary with this data.
     */
    create: XOR<ItineraryCreateInput, ItineraryUncheckedCreateInput>
    /**
     * In case the Itinerary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItineraryUpdateInput, ItineraryUncheckedUpdateInput>
  }

  /**
   * Itinerary delete
   */
  export type ItineraryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
    /**
     * Filter which Itinerary to delete.
     */
    where: ItineraryWhereUniqueInput
  }

  /**
   * Itinerary deleteMany
   */
  export type ItineraryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Itineraries to delete
     */
    where?: ItineraryWhereInput
    /**
     * Limit how many Itineraries to delete.
     */
    limit?: number
  }

  /**
   * Itinerary.itineraryItems
   */
  export type Itinerary$itineraryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    where?: ItineraryItemWhereInput
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    cursor?: ItineraryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * Itinerary without action
   */
  export type ItineraryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Itinerary
     */
    select?: ItinerarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Itinerary
     */
    omit?: ItineraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryInclude<ExtArgs> | null
  }


  /**
   * Model ItineraryItem
   */

  export type AggregateItineraryItem = {
    _count: ItineraryItemCountAggregateOutputType | null
    _avg: ItineraryItemAvgAggregateOutputType | null
    _sum: ItineraryItemSumAggregateOutputType | null
    _min: ItineraryItemMinAggregateOutputType | null
    _max: ItineraryItemMaxAggregateOutputType | null
  }

  export type ItineraryItemAvgAggregateOutputType = {
    order: number | null
  }

  export type ItineraryItemSumAggregateOutputType = {
    order: number | null
  }

  export type ItineraryItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    order: number | null
    itineraryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItineraryItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    order: number | null
    itineraryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItineraryItemCountAggregateOutputType = {
    id: number
    name: number
    description: number
    media: number
    order: number
    itineraryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItineraryItemAvgAggregateInputType = {
    order?: true
  }

  export type ItineraryItemSumAggregateInputType = {
    order?: true
  }

  export type ItineraryItemMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    order?: true
    itineraryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItineraryItemMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    order?: true
    itineraryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItineraryItemCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    media?: true
    order?: true
    itineraryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItineraryItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItineraryItem to aggregate.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItineraryItems
    **/
    _count?: true | ItineraryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItineraryItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItineraryItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItineraryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItineraryItemMaxAggregateInputType
  }

  export type GetItineraryItemAggregateType<T extends ItineraryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItineraryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItineraryItem[P]>
      : GetScalarType<T[P], AggregateItineraryItem[P]>
  }




  export type ItineraryItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItineraryItemWhereInput
    orderBy?: ItineraryItemOrderByWithAggregationInput | ItineraryItemOrderByWithAggregationInput[]
    by: ItineraryItemScalarFieldEnum[] | ItineraryItemScalarFieldEnum
    having?: ItineraryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItineraryItemCountAggregateInputType | true
    _avg?: ItineraryItemAvgAggregateInputType
    _sum?: ItineraryItemSumAggregateInputType
    _min?: ItineraryItemMinAggregateInputType
    _max?: ItineraryItemMaxAggregateInputType
  }

  export type ItineraryItemGroupByOutputType = {
    id: string
    name: string
    description: string | null
    media: string[]
    order: number
    itineraryId: string
    createdAt: Date
    updatedAt: Date
    _count: ItineraryItemCountAggregateOutputType | null
    _avg: ItineraryItemAvgAggregateOutputType | null
    _sum: ItineraryItemSumAggregateOutputType | null
    _min: ItineraryItemMinAggregateOutputType | null
    _max: ItineraryItemMaxAggregateOutputType | null
  }

  type GetItineraryItemGroupByPayload<T extends ItineraryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItineraryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItineraryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItineraryItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItineraryItemGroupByOutputType[P]>
        }
      >
    >


  export type ItineraryItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    media?: boolean
    order?: boolean
    itineraryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | ItineraryItem$locationArgs<ExtArgs>
    itinerary?: boolean | ItineraryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itineraryItem"]>

  export type ItineraryItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    media?: boolean
    order?: boolean
    itineraryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    itinerary?: boolean | ItineraryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itineraryItem"]>

  export type ItineraryItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    media?: boolean
    order?: boolean
    itineraryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    itinerary?: boolean | ItineraryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itineraryItem"]>

  export type ItineraryItemSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    media?: boolean
    order?: boolean
    itineraryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItineraryItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "media" | "order" | "itineraryId" | "createdAt" | "updatedAt", ExtArgs["result"]["itineraryItem"]>
  export type ItineraryItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | ItineraryItem$locationArgs<ExtArgs>
    itinerary?: boolean | ItineraryDefaultArgs<ExtArgs>
  }
  export type ItineraryItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itinerary?: boolean | ItineraryDefaultArgs<ExtArgs>
  }
  export type ItineraryItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itinerary?: boolean | ItineraryDefaultArgs<ExtArgs>
  }

  export type $ItineraryItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItineraryItem"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs> | null
      itinerary: Prisma.$ItineraryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      media: string[]
      order: number
      itineraryId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["itineraryItem"]>
    composites: {}
  }

  type ItineraryItemGetPayload<S extends boolean | null | undefined | ItineraryItemDefaultArgs> = $Result.GetResult<Prisma.$ItineraryItemPayload, S>

  type ItineraryItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItineraryItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItineraryItemCountAggregateInputType | true
    }

  export interface ItineraryItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItineraryItem'], meta: { name: 'ItineraryItem' } }
    /**
     * Find zero or one ItineraryItem that matches the filter.
     * @param {ItineraryItemFindUniqueArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItineraryItemFindUniqueArgs>(args: SelectSubset<T, ItineraryItemFindUniqueArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItineraryItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItineraryItemFindUniqueOrThrowArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItineraryItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItineraryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItineraryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemFindFirstArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItineraryItemFindFirstArgs>(args?: SelectSubset<T, ItineraryItemFindFirstArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItineraryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemFindFirstOrThrowArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItineraryItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItineraryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItineraryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItineraryItems
     * const itineraryItems = await prisma.itineraryItem.findMany()
     * 
     * // Get first 10 ItineraryItems
     * const itineraryItems = await prisma.itineraryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itineraryItemWithIdOnly = await prisma.itineraryItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItineraryItemFindManyArgs>(args?: SelectSubset<T, ItineraryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItineraryItem.
     * @param {ItineraryItemCreateArgs} args - Arguments to create a ItineraryItem.
     * @example
     * // Create one ItineraryItem
     * const ItineraryItem = await prisma.itineraryItem.create({
     *   data: {
     *     // ... data to create a ItineraryItem
     *   }
     * })
     * 
     */
    create<T extends ItineraryItemCreateArgs>(args: SelectSubset<T, ItineraryItemCreateArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItineraryItems.
     * @param {ItineraryItemCreateManyArgs} args - Arguments to create many ItineraryItems.
     * @example
     * // Create many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItineraryItemCreateManyArgs>(args?: SelectSubset<T, ItineraryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItineraryItems and returns the data saved in the database.
     * @param {ItineraryItemCreateManyAndReturnArgs} args - Arguments to create many ItineraryItems.
     * @example
     * // Create many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItineraryItems and only return the `id`
     * const itineraryItemWithIdOnly = await prisma.itineraryItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItineraryItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItineraryItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItineraryItem.
     * @param {ItineraryItemDeleteArgs} args - Arguments to delete one ItineraryItem.
     * @example
     * // Delete one ItineraryItem
     * const ItineraryItem = await prisma.itineraryItem.delete({
     *   where: {
     *     // ... filter to delete one ItineraryItem
     *   }
     * })
     * 
     */
    delete<T extends ItineraryItemDeleteArgs>(args: SelectSubset<T, ItineraryItemDeleteArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItineraryItem.
     * @param {ItineraryItemUpdateArgs} args - Arguments to update one ItineraryItem.
     * @example
     * // Update one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItineraryItemUpdateArgs>(args: SelectSubset<T, ItineraryItemUpdateArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItineraryItems.
     * @param {ItineraryItemDeleteManyArgs} args - Arguments to filter ItineraryItems to delete.
     * @example
     * // Delete a few ItineraryItems
     * const { count } = await prisma.itineraryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItineraryItemDeleteManyArgs>(args?: SelectSubset<T, ItineraryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItineraryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItineraryItemUpdateManyArgs>(args: SelectSubset<T, ItineraryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItineraryItems and returns the data updated in the database.
     * @param {ItineraryItemUpdateManyAndReturnArgs} args - Arguments to update many ItineraryItems.
     * @example
     * // Update many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItineraryItems and only return the `id`
     * const itineraryItemWithIdOnly = await prisma.itineraryItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItineraryItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ItineraryItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItineraryItem.
     * @param {ItineraryItemUpsertArgs} args - Arguments to update or create a ItineraryItem.
     * @example
     * // Update or create a ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.upsert({
     *   create: {
     *     // ... data to create a ItineraryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItineraryItem we want to update
     *   }
     * })
     */
    upsert<T extends ItineraryItemUpsertArgs>(args: SelectSubset<T, ItineraryItemUpsertArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItineraryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemCountArgs} args - Arguments to filter ItineraryItems to count.
     * @example
     * // Count the number of ItineraryItems
     * const count = await prisma.itineraryItem.count({
     *   where: {
     *     // ... the filter for the ItineraryItems we want to count
     *   }
     * })
    **/
    count<T extends ItineraryItemCountArgs>(
      args?: Subset<T, ItineraryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItineraryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItineraryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ItineraryItemAggregateArgs>(args: Subset<T, ItineraryItemAggregateArgs>): Prisma.PrismaPromise<GetItineraryItemAggregateType<T>>

    /**
     * Group by ItineraryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemGroupByArgs} args - Group by arguments.
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
      T extends ItineraryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItineraryItemGroupByArgs['orderBy'] }
        : { orderBy?: ItineraryItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ItineraryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItineraryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItineraryItem model
   */
  readonly fields: ItineraryItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItineraryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItineraryItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends ItineraryItem$locationArgs<ExtArgs> = {}>(args?: Subset<T, ItineraryItem$locationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    itinerary<T extends ItineraryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItineraryDefaultArgs<ExtArgs>>): Prisma__ItineraryClient<$Result.GetResult<Prisma.$ItineraryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItineraryItem model
   */
  interface ItineraryItemFieldRefs {
    readonly id: FieldRef<"ItineraryItem", 'String'>
    readonly name: FieldRef<"ItineraryItem", 'String'>
    readonly description: FieldRef<"ItineraryItem", 'String'>
    readonly media: FieldRef<"ItineraryItem", 'String[]'>
    readonly order: FieldRef<"ItineraryItem", 'Int'>
    readonly itineraryId: FieldRef<"ItineraryItem", 'String'>
    readonly createdAt: FieldRef<"ItineraryItem", 'DateTime'>
    readonly updatedAt: FieldRef<"ItineraryItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItineraryItem findUnique
   */
  export type ItineraryItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem findUniqueOrThrow
   */
  export type ItineraryItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem findFirst
   */
  export type ItineraryItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItineraryItems.
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItineraryItems.
     */
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * ItineraryItem findFirstOrThrow
   */
  export type ItineraryItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItineraryItems.
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItineraryItems.
     */
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * ItineraryItem findMany
   */
  export type ItineraryItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItems to fetch.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItineraryItems.
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * ItineraryItem create
   */
  export type ItineraryItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ItineraryItem.
     */
    data: XOR<ItineraryItemCreateInput, ItineraryItemUncheckedCreateInput>
  }

  /**
   * ItineraryItem createMany
   */
  export type ItineraryItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItineraryItems.
     */
    data: ItineraryItemCreateManyInput | ItineraryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItineraryItem createManyAndReturn
   */
  export type ItineraryItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * The data used to create many ItineraryItems.
     */
    data: ItineraryItemCreateManyInput | ItineraryItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItineraryItem update
   */
  export type ItineraryItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ItineraryItem.
     */
    data: XOR<ItineraryItemUpdateInput, ItineraryItemUncheckedUpdateInput>
    /**
     * Choose, which ItineraryItem to update.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem updateMany
   */
  export type ItineraryItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItineraryItems.
     */
    data: XOR<ItineraryItemUpdateManyMutationInput, ItineraryItemUncheckedUpdateManyInput>
    /**
     * Filter which ItineraryItems to update
     */
    where?: ItineraryItemWhereInput
    /**
     * Limit how many ItineraryItems to update.
     */
    limit?: number
  }

  /**
   * ItineraryItem updateManyAndReturn
   */
  export type ItineraryItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * The data used to update ItineraryItems.
     */
    data: XOR<ItineraryItemUpdateManyMutationInput, ItineraryItemUncheckedUpdateManyInput>
    /**
     * Filter which ItineraryItems to update
     */
    where?: ItineraryItemWhereInput
    /**
     * Limit how many ItineraryItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItineraryItem upsert
   */
  export type ItineraryItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ItineraryItem to update in case it exists.
     */
    where: ItineraryItemWhereUniqueInput
    /**
     * In case the ItineraryItem found by the `where` argument doesn't exist, create a new ItineraryItem with this data.
     */
    create: XOR<ItineraryItemCreateInput, ItineraryItemUncheckedCreateInput>
    /**
     * In case the ItineraryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItineraryItemUpdateInput, ItineraryItemUncheckedUpdateInput>
  }

  /**
   * ItineraryItem delete
   */
  export type ItineraryItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter which ItineraryItem to delete.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem deleteMany
   */
  export type ItineraryItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItineraryItems to delete
     */
    where?: ItineraryItemWhereInput
    /**
     * Limit how many ItineraryItems to delete.
     */
    limit?: number
  }

  /**
   * ItineraryItem.location
   */
  export type ItineraryItem$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * ItineraryItem without action
   */
  export type ItineraryItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type LocationSumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    itineraryItemId: string | null
    city: string | null
    country: string | null
    address: string | null
    lat: number | null
    lng: number | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    itineraryItemId: string | null
    city: string | null
    country: string | null
    address: string | null
    lat: number | null
    lng: number | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    itineraryItemId: number
    city: number
    country: number
    address: number
    lat: number
    lng: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type LocationSumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    itineraryItemId?: true
    city?: true
    country?: true
    address?: true
    lat?: true
    lng?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    itineraryItemId?: true
    city?: true
    country?: true
    address?: true
    lat?: true
    lng?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    itineraryItemId?: true
    city?: true
    country?: true
    address?: true
    lat?: true
    lng?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    itineraryItemId: string
    city: string | null
    country: string | null
    address: string | null
    lat: number | null
    lng: number | null
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itineraryItemId?: boolean
    city?: boolean
    country?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    itineraryItem?: boolean | ItineraryItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itineraryItemId?: boolean
    city?: boolean
    country?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    itineraryItem?: boolean | ItineraryItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itineraryItemId?: boolean
    city?: boolean
    country?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    itineraryItem?: boolean | ItineraryItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    itineraryItemId?: boolean
    city?: boolean
    country?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "itineraryItemId" | "city" | "country" | "address" | "lat" | "lng", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itineraryItem?: boolean | ItineraryItemDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itineraryItem?: boolean | ItineraryItemDefaultArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itineraryItem?: boolean | ItineraryItemDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      itineraryItem: Prisma.$ItineraryItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      itineraryItemId: string
      city: string | null
      country: string | null
      address: string | null
      lat: number | null
      lng: number | null
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
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
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itineraryItem<T extends ItineraryItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItineraryItemDefaultArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly itineraryItemId: FieldRef<"Location", 'String'>
    readonly city: FieldRef<"Location", 'String'>
    readonly country: FieldRef<"Location", 'String'>
    readonly address: FieldRef<"Location", 'String'>
    readonly lat: FieldRef<"Location", 'Float'>
    readonly lng: FieldRef<"Location", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    name: 'name',
    bio: 'bio',
    password: 'password',
    profilePic: 'profilePic',
    isPrivate: 'isPrivate',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FollowsScalarFieldEnum: {
    followedById: 'followedById',
    followingId: 'followingId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FollowsScalarFieldEnum = (typeof FollowsScalarFieldEnum)[keyof typeof FollowsScalarFieldEnum]


  export const ItineraryScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    media: 'media',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItineraryScalarFieldEnum = (typeof ItineraryScalarFieldEnum)[keyof typeof ItineraryScalarFieldEnum]


  export const ItineraryItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    media: 'media',
    order: 'order',
    itineraryId: 'itineraryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItineraryItemScalarFieldEnum = (typeof ItineraryItemScalarFieldEnum)[keyof typeof ItineraryItemScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    itineraryItemId: 'itineraryItemId',
    city: 'city',
    country: 'country',
    address: 'address',
    lat: 'lat',
    lng: 'lng'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'FollowStatus'
   */
  export type EnumFollowStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FollowStatus'>
    


  /**
   * Reference to a field of type 'FollowStatus[]'
   */
  export type ListEnumFollowStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FollowStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    profilePic?: StringFilter<"User"> | string
    isPrivate?: BoolFilter<"User"> | boolean
    isDeleted?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    followedBy?: FollowsListRelationFilter
    following?: FollowsListRelationFilter
    createdItineraries?: ItineraryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    name?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    password?: SortOrder
    profilePic?: SortOrder
    isPrivate?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    followedBy?: FollowsOrderByRelationAggregateInput
    following?: FollowsOrderByRelationAggregateInput
    createdItineraries?: ItineraryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    profilePic?: StringFilter<"User"> | string
    isPrivate?: BoolFilter<"User"> | boolean
    isDeleted?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    followedBy?: FollowsListRelationFilter
    following?: FollowsListRelationFilter
    createdItineraries?: ItineraryListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    name?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    password?: SortOrder
    profilePic?: SortOrder
    isPrivate?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    profilePic?: StringWithAggregatesFilter<"User"> | string
    isPrivate?: BoolWithAggregatesFilter<"User"> | boolean
    isDeleted?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FollowsWhereInput = {
    AND?: FollowsWhereInput | FollowsWhereInput[]
    OR?: FollowsWhereInput[]
    NOT?: FollowsWhereInput | FollowsWhereInput[]
    followedById?: StringFilter<"Follows"> | string
    followingId?: StringFilter<"Follows"> | string
    status?: EnumFollowStatusFilter<"Follows"> | $Enums.FollowStatus
    createdAt?: DateTimeFilter<"Follows"> | Date | string
    updatedAt?: DateTimeFilter<"Follows"> | Date | string
    followedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FollowsOrderByWithRelationInput = {
    followedById?: SortOrder
    followingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    followedBy?: UserOrderByWithRelationInput
    following?: UserOrderByWithRelationInput
  }

  export type FollowsWhereUniqueInput = Prisma.AtLeast<{
    followedById_followingId?: FollowsFollowedByIdFollowingIdCompoundUniqueInput
    AND?: FollowsWhereInput | FollowsWhereInput[]
    OR?: FollowsWhereInput[]
    NOT?: FollowsWhereInput | FollowsWhereInput[]
    followedById?: StringFilter<"Follows"> | string
    followingId?: StringFilter<"Follows"> | string
    status?: EnumFollowStatusFilter<"Follows"> | $Enums.FollowStatus
    createdAt?: DateTimeFilter<"Follows"> | Date | string
    updatedAt?: DateTimeFilter<"Follows"> | Date | string
    followedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "followedById_followingId">

  export type FollowsOrderByWithAggregationInput = {
    followedById?: SortOrder
    followingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FollowsCountOrderByAggregateInput
    _max?: FollowsMaxOrderByAggregateInput
    _min?: FollowsMinOrderByAggregateInput
  }

  export type FollowsScalarWhereWithAggregatesInput = {
    AND?: FollowsScalarWhereWithAggregatesInput | FollowsScalarWhereWithAggregatesInput[]
    OR?: FollowsScalarWhereWithAggregatesInput[]
    NOT?: FollowsScalarWhereWithAggregatesInput | FollowsScalarWhereWithAggregatesInput[]
    followedById?: StringWithAggregatesFilter<"Follows"> | string
    followingId?: StringWithAggregatesFilter<"Follows"> | string
    status?: EnumFollowStatusWithAggregatesFilter<"Follows"> | $Enums.FollowStatus
    createdAt?: DateTimeWithAggregatesFilter<"Follows"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Follows"> | Date | string
  }

  export type ItineraryWhereInput = {
    AND?: ItineraryWhereInput | ItineraryWhereInput[]
    OR?: ItineraryWhereInput[]
    NOT?: ItineraryWhereInput | ItineraryWhereInput[]
    id?: StringFilter<"Itinerary"> | string
    title?: StringFilter<"Itinerary"> | string
    description?: StringNullableFilter<"Itinerary"> | string | null
    startDate?: DateTimeNullableFilter<"Itinerary"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Itinerary"> | Date | string | null
    media?: StringNullableListFilter<"Itinerary">
    ownerId?: StringFilter<"Itinerary"> | string
    createdAt?: DateTimeFilter<"Itinerary"> | Date | string
    updatedAt?: DateTimeFilter<"Itinerary"> | Date | string
    itineraryItems?: ItineraryItemListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ItineraryOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    media?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    itineraryItems?: ItineraryItemOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
  }

  export type ItineraryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItineraryWhereInput | ItineraryWhereInput[]
    OR?: ItineraryWhereInput[]
    NOT?: ItineraryWhereInput | ItineraryWhereInput[]
    title?: StringFilter<"Itinerary"> | string
    description?: StringNullableFilter<"Itinerary"> | string | null
    startDate?: DateTimeNullableFilter<"Itinerary"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Itinerary"> | Date | string | null
    media?: StringNullableListFilter<"Itinerary">
    ownerId?: StringFilter<"Itinerary"> | string
    createdAt?: DateTimeFilter<"Itinerary"> | Date | string
    updatedAt?: DateTimeFilter<"Itinerary"> | Date | string
    itineraryItems?: ItineraryItemListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ItineraryOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    media?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItineraryCountOrderByAggregateInput
    _max?: ItineraryMaxOrderByAggregateInput
    _min?: ItineraryMinOrderByAggregateInput
  }

  export type ItineraryScalarWhereWithAggregatesInput = {
    AND?: ItineraryScalarWhereWithAggregatesInput | ItineraryScalarWhereWithAggregatesInput[]
    OR?: ItineraryScalarWhereWithAggregatesInput[]
    NOT?: ItineraryScalarWhereWithAggregatesInput | ItineraryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Itinerary"> | string
    title?: StringWithAggregatesFilter<"Itinerary"> | string
    description?: StringNullableWithAggregatesFilter<"Itinerary"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Itinerary"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Itinerary"> | Date | string | null
    media?: StringNullableListFilter<"Itinerary">
    ownerId?: StringWithAggregatesFilter<"Itinerary"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Itinerary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Itinerary"> | Date | string
  }

  export type ItineraryItemWhereInput = {
    AND?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    OR?: ItineraryItemWhereInput[]
    NOT?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    id?: StringFilter<"ItineraryItem"> | string
    name?: StringFilter<"ItineraryItem"> | string
    description?: StringNullableFilter<"ItineraryItem"> | string | null
    media?: StringNullableListFilter<"ItineraryItem">
    order?: IntFilter<"ItineraryItem"> | number
    itineraryId?: StringFilter<"ItineraryItem"> | string
    createdAt?: DateTimeFilter<"ItineraryItem"> | Date | string
    updatedAt?: DateTimeFilter<"ItineraryItem"> | Date | string
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    itinerary?: XOR<ItineraryScalarRelationFilter, ItineraryWhereInput>
  }

  export type ItineraryItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    media?: SortOrder
    order?: SortOrder
    itineraryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    itinerary?: ItineraryOrderByWithRelationInput
  }

  export type ItineraryItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    itineraryId_order?: ItineraryItemItineraryIdOrderCompoundUniqueInput
    AND?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    OR?: ItineraryItemWhereInput[]
    NOT?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    name?: StringFilter<"ItineraryItem"> | string
    description?: StringNullableFilter<"ItineraryItem"> | string | null
    media?: StringNullableListFilter<"ItineraryItem">
    order?: IntFilter<"ItineraryItem"> | number
    itineraryId?: StringFilter<"ItineraryItem"> | string
    createdAt?: DateTimeFilter<"ItineraryItem"> | Date | string
    updatedAt?: DateTimeFilter<"ItineraryItem"> | Date | string
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    itinerary?: XOR<ItineraryScalarRelationFilter, ItineraryWhereInput>
  }, "id" | "itineraryId_order">

  export type ItineraryItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    media?: SortOrder
    order?: SortOrder
    itineraryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItineraryItemCountOrderByAggregateInput
    _avg?: ItineraryItemAvgOrderByAggregateInput
    _max?: ItineraryItemMaxOrderByAggregateInput
    _min?: ItineraryItemMinOrderByAggregateInput
    _sum?: ItineraryItemSumOrderByAggregateInput
  }

  export type ItineraryItemScalarWhereWithAggregatesInput = {
    AND?: ItineraryItemScalarWhereWithAggregatesInput | ItineraryItemScalarWhereWithAggregatesInput[]
    OR?: ItineraryItemScalarWhereWithAggregatesInput[]
    NOT?: ItineraryItemScalarWhereWithAggregatesInput | ItineraryItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ItineraryItem"> | string
    name?: StringWithAggregatesFilter<"ItineraryItem"> | string
    description?: StringNullableWithAggregatesFilter<"ItineraryItem"> | string | null
    media?: StringNullableListFilter<"ItineraryItem">
    order?: IntWithAggregatesFilter<"ItineraryItem"> | number
    itineraryId?: StringWithAggregatesFilter<"ItineraryItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ItineraryItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ItineraryItem"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    itineraryItemId?: StringFilter<"Location"> | string
    city?: StringNullableFilter<"Location"> | string | null
    country?: StringNullableFilter<"Location"> | string | null
    address?: StringNullableFilter<"Location"> | string | null
    lat?: FloatNullableFilter<"Location"> | number | null
    lng?: FloatNullableFilter<"Location"> | number | null
    itineraryItem?: XOR<ItineraryItemScalarRelationFilter, ItineraryItemWhereInput>
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    itineraryItemId?: SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    itineraryItem?: ItineraryItemOrderByWithRelationInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    itineraryItemId?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    city?: StringNullableFilter<"Location"> | string | null
    country?: StringNullableFilter<"Location"> | string | null
    address?: StringNullableFilter<"Location"> | string | null
    lat?: FloatNullableFilter<"Location"> | number | null
    lng?: FloatNullableFilter<"Location"> | number | null
    itineraryItem?: XOR<ItineraryItemScalarRelationFilter, ItineraryItemWhereInput>
  }, "id" | "itineraryItemId">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    itineraryItemId?: SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    itineraryItemId?: StringWithAggregatesFilter<"Location"> | string
    city?: StringNullableWithAggregatesFilter<"Location"> | string | null
    country?: StringNullableWithAggregatesFilter<"Location"> | string | null
    address?: StringNullableWithAggregatesFilter<"Location"> | string | null
    lat?: FloatNullableWithAggregatesFilter<"Location"> | number | null
    lng?: FloatNullableWithAggregatesFilter<"Location"> | number | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy?: FollowsCreateNestedManyWithoutFollowedByInput
    following?: FollowsCreateNestedManyWithoutFollowingInput
    createdItineraries?: ItineraryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy?: FollowsUncheckedCreateNestedManyWithoutFollowedByInput
    following?: FollowsUncheckedCreateNestedManyWithoutFollowingInput
    createdItineraries?: ItineraryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: FollowsUpdateManyWithoutFollowedByNestedInput
    following?: FollowsUpdateManyWithoutFollowingNestedInput
    createdItineraries?: ItineraryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: FollowsUncheckedUpdateManyWithoutFollowedByNestedInput
    following?: FollowsUncheckedUpdateManyWithoutFollowingNestedInput
    createdItineraries?: ItineraryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowsCreateInput = {
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy: UserCreateNestedOneWithoutFollowedByInput
    following: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowsUncheckedCreateInput = {
    followedById: string
    followingId: string
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FollowsUpdateInput = {
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: UserUpdateOneRequiredWithoutFollowedByNestedInput
    following?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowsUncheckedUpdateInput = {
    followedById?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowsCreateManyInput = {
    followedById: string
    followingId: string
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FollowsUpdateManyMutationInput = {
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowsUncheckedUpdateManyInput = {
    followedById?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryCreateInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    itineraryItems?: ItineraryItemCreateNestedManyWithoutItineraryInput
    owner: UserCreateNestedOneWithoutCreatedItinerariesInput
  }

  export type ItineraryUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    itineraryItems?: ItineraryItemUncheckedCreateNestedManyWithoutItineraryInput
  }

  export type ItineraryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itineraryItems?: ItineraryItemUpdateManyWithoutItineraryNestedInput
    owner?: UserUpdateOneRequiredWithoutCreatedItinerariesNestedInput
  }

  export type ItineraryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itineraryItems?: ItineraryItemUncheckedUpdateManyWithoutItineraryNestedInput
  }

  export type ItineraryCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItineraryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemCreateInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutItineraryItemInput
    itinerary: ItineraryCreateNestedOneWithoutItineraryItemsInput
  }

  export type ItineraryItemUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    itineraryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationUncheckedCreateNestedOneWithoutItineraryItemInput
  }

  export type ItineraryItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutItineraryItemNestedInput
    itinerary?: ItineraryUpdateOneRequiredWithoutItineraryItemsNestedInput
  }

  export type ItineraryItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    itineraryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUncheckedUpdateOneWithoutItineraryItemNestedInput
  }

  export type ItineraryItemCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    itineraryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItineraryItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    itineraryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    id?: string
    city?: string | null
    country?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
    itineraryItem: ItineraryItemCreateNestedOneWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    itineraryItemId: string
    city?: string | null
    country?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    itineraryItem?: ItineraryItemUpdateOneRequiredWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itineraryItemId?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type LocationCreateManyInput = {
    id?: string
    itineraryItemId: string
    city?: string | null
    country?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    itineraryItemId?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FollowsListRelationFilter = {
    every?: FollowsWhereInput
    some?: FollowsWhereInput
    none?: FollowsWhereInput
  }

  export type ItineraryListRelationFilter = {
    every?: ItineraryWhereInput
    some?: ItineraryWhereInput
    none?: ItineraryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FollowsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItineraryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    password?: SortOrder
    profilePic?: SortOrder
    isPrivate?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    password?: SortOrder
    profilePic?: SortOrder
    isPrivate?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    password?: SortOrder
    profilePic?: SortOrder
    isPrivate?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumFollowStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowStatus | EnumFollowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowStatusFilter<$PrismaModel> | $Enums.FollowStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FollowsFollowedByIdFollowingIdCompoundUniqueInput = {
    followedById: string
    followingId: string
  }

  export type FollowsCountOrderByAggregateInput = {
    followedById?: SortOrder
    followingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FollowsMaxOrderByAggregateInput = {
    followedById?: SortOrder
    followingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FollowsMinOrderByAggregateInput = {
    followedById?: SortOrder
    followingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumFollowStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowStatus | EnumFollowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowStatusWithAggregatesFilter<$PrismaModel> | $Enums.FollowStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFollowStatusFilter<$PrismaModel>
    _max?: NestedEnumFollowStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ItineraryItemListRelationFilter = {
    every?: ItineraryItemWhereInput
    some?: ItineraryItemWhereInput
    none?: ItineraryItemWhereInput
  }

  export type ItineraryItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItineraryCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    media?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItineraryMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItineraryMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type ItineraryScalarRelationFilter = {
    is?: ItineraryWhereInput
    isNot?: ItineraryWhereInput
  }

  export type ItineraryItemItineraryIdOrderCompoundUniqueInput = {
    itineraryId: string
    order: number
  }

  export type ItineraryItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    media?: SortOrder
    order?: SortOrder
    itineraryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItineraryItemAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ItineraryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    order?: SortOrder
    itineraryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItineraryItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    order?: SortOrder
    itineraryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItineraryItemSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ItineraryItemScalarRelationFilter = {
    is?: ItineraryItemWhereInput
    isNot?: ItineraryItemWhereInput
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    itineraryItemId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    itineraryItemId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    itineraryItemId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FollowsCreateNestedManyWithoutFollowedByInput = {
    create?: XOR<FollowsCreateWithoutFollowedByInput, FollowsUncheckedCreateWithoutFollowedByInput> | FollowsCreateWithoutFollowedByInput[] | FollowsUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowedByInput | FollowsCreateOrConnectWithoutFollowedByInput[]
    createMany?: FollowsCreateManyFollowedByInputEnvelope
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
  }

  export type FollowsCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowsCreateWithoutFollowingInput, FollowsUncheckedCreateWithoutFollowingInput> | FollowsCreateWithoutFollowingInput[] | FollowsUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowingInput | FollowsCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowsCreateManyFollowingInputEnvelope
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
  }

  export type ItineraryCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ItineraryCreateWithoutOwnerInput, ItineraryUncheckedCreateWithoutOwnerInput> | ItineraryCreateWithoutOwnerInput[] | ItineraryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ItineraryCreateOrConnectWithoutOwnerInput | ItineraryCreateOrConnectWithoutOwnerInput[]
    createMany?: ItineraryCreateManyOwnerInputEnvelope
    connect?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
  }

  export type FollowsUncheckedCreateNestedManyWithoutFollowedByInput = {
    create?: XOR<FollowsCreateWithoutFollowedByInput, FollowsUncheckedCreateWithoutFollowedByInput> | FollowsCreateWithoutFollowedByInput[] | FollowsUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowedByInput | FollowsCreateOrConnectWithoutFollowedByInput[]
    createMany?: FollowsCreateManyFollowedByInputEnvelope
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
  }

  export type FollowsUncheckedCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowsCreateWithoutFollowingInput, FollowsUncheckedCreateWithoutFollowingInput> | FollowsCreateWithoutFollowingInput[] | FollowsUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowingInput | FollowsCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowsCreateManyFollowingInputEnvelope
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
  }

  export type ItineraryUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ItineraryCreateWithoutOwnerInput, ItineraryUncheckedCreateWithoutOwnerInput> | ItineraryCreateWithoutOwnerInput[] | ItineraryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ItineraryCreateOrConnectWithoutOwnerInput | ItineraryCreateOrConnectWithoutOwnerInput[]
    createMany?: ItineraryCreateManyOwnerInputEnvelope
    connect?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FollowsUpdateManyWithoutFollowedByNestedInput = {
    create?: XOR<FollowsCreateWithoutFollowedByInput, FollowsUncheckedCreateWithoutFollowedByInput> | FollowsCreateWithoutFollowedByInput[] | FollowsUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowedByInput | FollowsCreateOrConnectWithoutFollowedByInput[]
    upsert?: FollowsUpsertWithWhereUniqueWithoutFollowedByInput | FollowsUpsertWithWhereUniqueWithoutFollowedByInput[]
    createMany?: FollowsCreateManyFollowedByInputEnvelope
    set?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    disconnect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    delete?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    update?: FollowsUpdateWithWhereUniqueWithoutFollowedByInput | FollowsUpdateWithWhereUniqueWithoutFollowedByInput[]
    updateMany?: FollowsUpdateManyWithWhereWithoutFollowedByInput | FollowsUpdateManyWithWhereWithoutFollowedByInput[]
    deleteMany?: FollowsScalarWhereInput | FollowsScalarWhereInput[]
  }

  export type FollowsUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowsCreateWithoutFollowingInput, FollowsUncheckedCreateWithoutFollowingInput> | FollowsCreateWithoutFollowingInput[] | FollowsUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowingInput | FollowsCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowsUpsertWithWhereUniqueWithoutFollowingInput | FollowsUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowsCreateManyFollowingInputEnvelope
    set?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    disconnect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    delete?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    update?: FollowsUpdateWithWhereUniqueWithoutFollowingInput | FollowsUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowsUpdateManyWithWhereWithoutFollowingInput | FollowsUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowsScalarWhereInput | FollowsScalarWhereInput[]
  }

  export type ItineraryUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ItineraryCreateWithoutOwnerInput, ItineraryUncheckedCreateWithoutOwnerInput> | ItineraryCreateWithoutOwnerInput[] | ItineraryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ItineraryCreateOrConnectWithoutOwnerInput | ItineraryCreateOrConnectWithoutOwnerInput[]
    upsert?: ItineraryUpsertWithWhereUniqueWithoutOwnerInput | ItineraryUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ItineraryCreateManyOwnerInputEnvelope
    set?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    disconnect?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    delete?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    connect?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    update?: ItineraryUpdateWithWhereUniqueWithoutOwnerInput | ItineraryUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ItineraryUpdateManyWithWhereWithoutOwnerInput | ItineraryUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ItineraryScalarWhereInput | ItineraryScalarWhereInput[]
  }

  export type FollowsUncheckedUpdateManyWithoutFollowedByNestedInput = {
    create?: XOR<FollowsCreateWithoutFollowedByInput, FollowsUncheckedCreateWithoutFollowedByInput> | FollowsCreateWithoutFollowedByInput[] | FollowsUncheckedCreateWithoutFollowedByInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowedByInput | FollowsCreateOrConnectWithoutFollowedByInput[]
    upsert?: FollowsUpsertWithWhereUniqueWithoutFollowedByInput | FollowsUpsertWithWhereUniqueWithoutFollowedByInput[]
    createMany?: FollowsCreateManyFollowedByInputEnvelope
    set?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    disconnect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    delete?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    update?: FollowsUpdateWithWhereUniqueWithoutFollowedByInput | FollowsUpdateWithWhereUniqueWithoutFollowedByInput[]
    updateMany?: FollowsUpdateManyWithWhereWithoutFollowedByInput | FollowsUpdateManyWithWhereWithoutFollowedByInput[]
    deleteMany?: FollowsScalarWhereInput | FollowsScalarWhereInput[]
  }

  export type FollowsUncheckedUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowsCreateWithoutFollowingInput, FollowsUncheckedCreateWithoutFollowingInput> | FollowsCreateWithoutFollowingInput[] | FollowsUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowsCreateOrConnectWithoutFollowingInput | FollowsCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowsUpsertWithWhereUniqueWithoutFollowingInput | FollowsUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowsCreateManyFollowingInputEnvelope
    set?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    disconnect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    delete?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    connect?: FollowsWhereUniqueInput | FollowsWhereUniqueInput[]
    update?: FollowsUpdateWithWhereUniqueWithoutFollowingInput | FollowsUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowsUpdateManyWithWhereWithoutFollowingInput | FollowsUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowsScalarWhereInput | FollowsScalarWhereInput[]
  }

  export type ItineraryUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ItineraryCreateWithoutOwnerInput, ItineraryUncheckedCreateWithoutOwnerInput> | ItineraryCreateWithoutOwnerInput[] | ItineraryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ItineraryCreateOrConnectWithoutOwnerInput | ItineraryCreateOrConnectWithoutOwnerInput[]
    upsert?: ItineraryUpsertWithWhereUniqueWithoutOwnerInput | ItineraryUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ItineraryCreateManyOwnerInputEnvelope
    set?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    disconnect?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    delete?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    connect?: ItineraryWhereUniqueInput | ItineraryWhereUniqueInput[]
    update?: ItineraryUpdateWithWhereUniqueWithoutOwnerInput | ItineraryUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ItineraryUpdateManyWithWhereWithoutOwnerInput | ItineraryUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ItineraryScalarWhereInput | ItineraryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFollowedByInput = {
    create?: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedByInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type EnumFollowStatusFieldUpdateOperationsInput = {
    set?: $Enums.FollowStatus
  }

  export type UserUpdateOneRequiredWithoutFollowedByNestedInput = {
    create?: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedByInput
    upsert?: UserUpsertWithoutFollowedByInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowedByInput, UserUpdateWithoutFollowedByInput>, UserUncheckedUpdateWithoutFollowedByInput>
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type ItineraryCreatemediaInput = {
    set: string[]
  }

  export type ItineraryItemCreateNestedManyWithoutItineraryInput = {
    create?: XOR<ItineraryItemCreateWithoutItineraryInput, ItineraryItemUncheckedCreateWithoutItineraryInput> | ItineraryItemCreateWithoutItineraryInput[] | ItineraryItemUncheckedCreateWithoutItineraryInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutItineraryInput | ItineraryItemCreateOrConnectWithoutItineraryInput[]
    createMany?: ItineraryItemCreateManyItineraryInputEnvelope
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedItinerariesInput = {
    create?: XOR<UserCreateWithoutCreatedItinerariesInput, UserUncheckedCreateWithoutCreatedItinerariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedItinerariesInput
    connect?: UserWhereUniqueInput
  }

  export type ItineraryItemUncheckedCreateNestedManyWithoutItineraryInput = {
    create?: XOR<ItineraryItemCreateWithoutItineraryInput, ItineraryItemUncheckedCreateWithoutItineraryInput> | ItineraryItemCreateWithoutItineraryInput[] | ItineraryItemUncheckedCreateWithoutItineraryInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutItineraryInput | ItineraryItemCreateOrConnectWithoutItineraryInput[]
    createMany?: ItineraryItemCreateManyItineraryInputEnvelope
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ItineraryUpdatemediaInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ItineraryItemUpdateManyWithoutItineraryNestedInput = {
    create?: XOR<ItineraryItemCreateWithoutItineraryInput, ItineraryItemUncheckedCreateWithoutItineraryInput> | ItineraryItemCreateWithoutItineraryInput[] | ItineraryItemUncheckedCreateWithoutItineraryInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutItineraryInput | ItineraryItemCreateOrConnectWithoutItineraryInput[]
    upsert?: ItineraryItemUpsertWithWhereUniqueWithoutItineraryInput | ItineraryItemUpsertWithWhereUniqueWithoutItineraryInput[]
    createMany?: ItineraryItemCreateManyItineraryInputEnvelope
    set?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    disconnect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    delete?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    update?: ItineraryItemUpdateWithWhereUniqueWithoutItineraryInput | ItineraryItemUpdateWithWhereUniqueWithoutItineraryInput[]
    updateMany?: ItineraryItemUpdateManyWithWhereWithoutItineraryInput | ItineraryItemUpdateManyWithWhereWithoutItineraryInput[]
    deleteMany?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedItinerariesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedItinerariesInput, UserUncheckedCreateWithoutCreatedItinerariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedItinerariesInput
    upsert?: UserUpsertWithoutCreatedItinerariesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedItinerariesInput, UserUpdateWithoutCreatedItinerariesInput>, UserUncheckedUpdateWithoutCreatedItinerariesInput>
  }

  export type ItineraryItemUncheckedUpdateManyWithoutItineraryNestedInput = {
    create?: XOR<ItineraryItemCreateWithoutItineraryInput, ItineraryItemUncheckedCreateWithoutItineraryInput> | ItineraryItemCreateWithoutItineraryInput[] | ItineraryItemUncheckedCreateWithoutItineraryInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutItineraryInput | ItineraryItemCreateOrConnectWithoutItineraryInput[]
    upsert?: ItineraryItemUpsertWithWhereUniqueWithoutItineraryInput | ItineraryItemUpsertWithWhereUniqueWithoutItineraryInput[]
    createMany?: ItineraryItemCreateManyItineraryInputEnvelope
    set?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    disconnect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    delete?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    update?: ItineraryItemUpdateWithWhereUniqueWithoutItineraryInput | ItineraryItemUpdateWithWhereUniqueWithoutItineraryInput[]
    updateMany?: ItineraryItemUpdateManyWithWhereWithoutItineraryInput | ItineraryItemUpdateManyWithWhereWithoutItineraryInput[]
    deleteMany?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
  }

  export type ItineraryItemCreatemediaInput = {
    set: string[]
  }

  export type LocationCreateNestedOneWithoutItineraryItemInput = {
    create?: XOR<LocationCreateWithoutItineraryItemInput, LocationUncheckedCreateWithoutItineraryItemInput>
    connectOrCreate?: LocationCreateOrConnectWithoutItineraryItemInput
    connect?: LocationWhereUniqueInput
  }

  export type ItineraryCreateNestedOneWithoutItineraryItemsInput = {
    create?: XOR<ItineraryCreateWithoutItineraryItemsInput, ItineraryUncheckedCreateWithoutItineraryItemsInput>
    connectOrCreate?: ItineraryCreateOrConnectWithoutItineraryItemsInput
    connect?: ItineraryWhereUniqueInput
  }

  export type LocationUncheckedCreateNestedOneWithoutItineraryItemInput = {
    create?: XOR<LocationCreateWithoutItineraryItemInput, LocationUncheckedCreateWithoutItineraryItemInput>
    connectOrCreate?: LocationCreateOrConnectWithoutItineraryItemInput
    connect?: LocationWhereUniqueInput
  }

  export type ItineraryItemUpdatemediaInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocationUpdateOneWithoutItineraryItemNestedInput = {
    create?: XOR<LocationCreateWithoutItineraryItemInput, LocationUncheckedCreateWithoutItineraryItemInput>
    connectOrCreate?: LocationCreateOrConnectWithoutItineraryItemInput
    upsert?: LocationUpsertWithoutItineraryItemInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutItineraryItemInput, LocationUpdateWithoutItineraryItemInput>, LocationUncheckedUpdateWithoutItineraryItemInput>
  }

  export type ItineraryUpdateOneRequiredWithoutItineraryItemsNestedInput = {
    create?: XOR<ItineraryCreateWithoutItineraryItemsInput, ItineraryUncheckedCreateWithoutItineraryItemsInput>
    connectOrCreate?: ItineraryCreateOrConnectWithoutItineraryItemsInput
    upsert?: ItineraryUpsertWithoutItineraryItemsInput
    connect?: ItineraryWhereUniqueInput
    update?: XOR<XOR<ItineraryUpdateToOneWithWhereWithoutItineraryItemsInput, ItineraryUpdateWithoutItineraryItemsInput>, ItineraryUncheckedUpdateWithoutItineraryItemsInput>
  }

  export type LocationUncheckedUpdateOneWithoutItineraryItemNestedInput = {
    create?: XOR<LocationCreateWithoutItineraryItemInput, LocationUncheckedCreateWithoutItineraryItemInput>
    connectOrCreate?: LocationCreateOrConnectWithoutItineraryItemInput
    upsert?: LocationUpsertWithoutItineraryItemInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutItineraryItemInput, LocationUpdateWithoutItineraryItemInput>, LocationUncheckedUpdateWithoutItineraryItemInput>
  }

  export type ItineraryItemCreateNestedOneWithoutLocationInput = {
    create?: XOR<ItineraryItemCreateWithoutLocationInput, ItineraryItemUncheckedCreateWithoutLocationInput>
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutLocationInput
    connect?: ItineraryItemWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ItineraryItemUpdateOneRequiredWithoutLocationNestedInput = {
    create?: XOR<ItineraryItemCreateWithoutLocationInput, ItineraryItemUncheckedCreateWithoutLocationInput>
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutLocationInput
    upsert?: ItineraryItemUpsertWithoutLocationInput
    connect?: ItineraryItemWhereUniqueInput
    update?: XOR<XOR<ItineraryItemUpdateToOneWithWhereWithoutLocationInput, ItineraryItemUpdateWithoutLocationInput>, ItineraryItemUncheckedUpdateWithoutLocationInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFollowStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowStatus | EnumFollowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowStatusFilter<$PrismaModel> | $Enums.FollowStatus
  }

  export type NestedEnumFollowStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowStatus | EnumFollowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowStatus[] | ListEnumFollowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowStatusWithAggregatesFilter<$PrismaModel> | $Enums.FollowStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFollowStatusFilter<$PrismaModel>
    _max?: NestedEnumFollowStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FollowsCreateWithoutFollowedByInput = {
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    following: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowsUncheckedCreateWithoutFollowedByInput = {
    followingId: string
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FollowsCreateOrConnectWithoutFollowedByInput = {
    where: FollowsWhereUniqueInput
    create: XOR<FollowsCreateWithoutFollowedByInput, FollowsUncheckedCreateWithoutFollowedByInput>
  }

  export type FollowsCreateManyFollowedByInputEnvelope = {
    data: FollowsCreateManyFollowedByInput | FollowsCreateManyFollowedByInput[]
    skipDuplicates?: boolean
  }

  export type FollowsCreateWithoutFollowingInput = {
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy: UserCreateNestedOneWithoutFollowedByInput
  }

  export type FollowsUncheckedCreateWithoutFollowingInput = {
    followedById: string
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FollowsCreateOrConnectWithoutFollowingInput = {
    where: FollowsWhereUniqueInput
    create: XOR<FollowsCreateWithoutFollowingInput, FollowsUncheckedCreateWithoutFollowingInput>
  }

  export type FollowsCreateManyFollowingInputEnvelope = {
    data: FollowsCreateManyFollowingInput | FollowsCreateManyFollowingInput[]
    skipDuplicates?: boolean
  }

  export type ItineraryCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    itineraryItems?: ItineraryItemCreateNestedManyWithoutItineraryInput
  }

  export type ItineraryUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    itineraryItems?: ItineraryItemUncheckedCreateNestedManyWithoutItineraryInput
  }

  export type ItineraryCreateOrConnectWithoutOwnerInput = {
    where: ItineraryWhereUniqueInput
    create: XOR<ItineraryCreateWithoutOwnerInput, ItineraryUncheckedCreateWithoutOwnerInput>
  }

  export type ItineraryCreateManyOwnerInputEnvelope = {
    data: ItineraryCreateManyOwnerInput | ItineraryCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type FollowsUpsertWithWhereUniqueWithoutFollowedByInput = {
    where: FollowsWhereUniqueInput
    update: XOR<FollowsUpdateWithoutFollowedByInput, FollowsUncheckedUpdateWithoutFollowedByInput>
    create: XOR<FollowsCreateWithoutFollowedByInput, FollowsUncheckedCreateWithoutFollowedByInput>
  }

  export type FollowsUpdateWithWhereUniqueWithoutFollowedByInput = {
    where: FollowsWhereUniqueInput
    data: XOR<FollowsUpdateWithoutFollowedByInput, FollowsUncheckedUpdateWithoutFollowedByInput>
  }

  export type FollowsUpdateManyWithWhereWithoutFollowedByInput = {
    where: FollowsScalarWhereInput
    data: XOR<FollowsUpdateManyMutationInput, FollowsUncheckedUpdateManyWithoutFollowedByInput>
  }

  export type FollowsScalarWhereInput = {
    AND?: FollowsScalarWhereInput | FollowsScalarWhereInput[]
    OR?: FollowsScalarWhereInput[]
    NOT?: FollowsScalarWhereInput | FollowsScalarWhereInput[]
    followedById?: StringFilter<"Follows"> | string
    followingId?: StringFilter<"Follows"> | string
    status?: EnumFollowStatusFilter<"Follows"> | $Enums.FollowStatus
    createdAt?: DateTimeFilter<"Follows"> | Date | string
    updatedAt?: DateTimeFilter<"Follows"> | Date | string
  }

  export type FollowsUpsertWithWhereUniqueWithoutFollowingInput = {
    where: FollowsWhereUniqueInput
    update: XOR<FollowsUpdateWithoutFollowingInput, FollowsUncheckedUpdateWithoutFollowingInput>
    create: XOR<FollowsCreateWithoutFollowingInput, FollowsUncheckedCreateWithoutFollowingInput>
  }

  export type FollowsUpdateWithWhereUniqueWithoutFollowingInput = {
    where: FollowsWhereUniqueInput
    data: XOR<FollowsUpdateWithoutFollowingInput, FollowsUncheckedUpdateWithoutFollowingInput>
  }

  export type FollowsUpdateManyWithWhereWithoutFollowingInput = {
    where: FollowsScalarWhereInput
    data: XOR<FollowsUpdateManyMutationInput, FollowsUncheckedUpdateManyWithoutFollowingInput>
  }

  export type ItineraryUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ItineraryWhereUniqueInput
    update: XOR<ItineraryUpdateWithoutOwnerInput, ItineraryUncheckedUpdateWithoutOwnerInput>
    create: XOR<ItineraryCreateWithoutOwnerInput, ItineraryUncheckedCreateWithoutOwnerInput>
  }

  export type ItineraryUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ItineraryWhereUniqueInput
    data: XOR<ItineraryUpdateWithoutOwnerInput, ItineraryUncheckedUpdateWithoutOwnerInput>
  }

  export type ItineraryUpdateManyWithWhereWithoutOwnerInput = {
    where: ItineraryScalarWhereInput
    data: XOR<ItineraryUpdateManyMutationInput, ItineraryUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ItineraryScalarWhereInput = {
    AND?: ItineraryScalarWhereInput | ItineraryScalarWhereInput[]
    OR?: ItineraryScalarWhereInput[]
    NOT?: ItineraryScalarWhereInput | ItineraryScalarWhereInput[]
    id?: StringFilter<"Itinerary"> | string
    title?: StringFilter<"Itinerary"> | string
    description?: StringNullableFilter<"Itinerary"> | string | null
    startDate?: DateTimeNullableFilter<"Itinerary"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Itinerary"> | Date | string | null
    media?: StringNullableListFilter<"Itinerary">
    ownerId?: StringFilter<"Itinerary"> | string
    createdAt?: DateTimeFilter<"Itinerary"> | Date | string
    updatedAt?: DateTimeFilter<"Itinerary"> | Date | string
  }

  export type UserCreateWithoutFollowedByInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    following?: FollowsCreateNestedManyWithoutFollowingInput
    createdItineraries?: ItineraryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutFollowedByInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    following?: FollowsUncheckedCreateNestedManyWithoutFollowingInput
    createdItineraries?: ItineraryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutFollowedByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
  }

  export type UserCreateWithoutFollowingInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy?: FollowsCreateNestedManyWithoutFollowedByInput
    createdItineraries?: ItineraryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy?: FollowsUncheckedCreateNestedManyWithoutFollowedByInput
    createdItineraries?: ItineraryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserUpsertWithoutFollowedByInput = {
    update: XOR<UserUpdateWithoutFollowedByInput, UserUncheckedUpdateWithoutFollowedByInput>
    create: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowedByInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowedByInput, UserUncheckedUpdateWithoutFollowedByInput>
  }

  export type UserUpdateWithoutFollowedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    following?: FollowsUpdateManyWithoutFollowingNestedInput
    createdItineraries?: ItineraryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    following?: FollowsUncheckedUpdateManyWithoutFollowingNestedInput
    createdItineraries?: ItineraryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: FollowsUpdateManyWithoutFollowedByNestedInput
    createdItineraries?: ItineraryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: FollowsUncheckedUpdateManyWithoutFollowedByNestedInput
    createdItineraries?: ItineraryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ItineraryItemCreateWithoutItineraryInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutItineraryItemInput
  }

  export type ItineraryItemUncheckedCreateWithoutItineraryInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationUncheckedCreateNestedOneWithoutItineraryItemInput
  }

  export type ItineraryItemCreateOrConnectWithoutItineraryInput = {
    where: ItineraryItemWhereUniqueInput
    create: XOR<ItineraryItemCreateWithoutItineraryInput, ItineraryItemUncheckedCreateWithoutItineraryInput>
  }

  export type ItineraryItemCreateManyItineraryInputEnvelope = {
    data: ItineraryItemCreateManyItineraryInput | ItineraryItemCreateManyItineraryInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCreatedItinerariesInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy?: FollowsCreateNestedManyWithoutFollowedByInput
    following?: FollowsCreateNestedManyWithoutFollowingInput
  }

  export type UserUncheckedCreateWithoutCreatedItinerariesInput = {
    id?: string
    email: string
    username: string
    name?: string | null
    bio?: string | null
    password: string
    profilePic?: string
    isPrivate?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followedBy?: FollowsUncheckedCreateNestedManyWithoutFollowedByInput
    following?: FollowsUncheckedCreateNestedManyWithoutFollowingInput
  }

  export type UserCreateOrConnectWithoutCreatedItinerariesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedItinerariesInput, UserUncheckedCreateWithoutCreatedItinerariesInput>
  }

  export type ItineraryItemUpsertWithWhereUniqueWithoutItineraryInput = {
    where: ItineraryItemWhereUniqueInput
    update: XOR<ItineraryItemUpdateWithoutItineraryInput, ItineraryItemUncheckedUpdateWithoutItineraryInput>
    create: XOR<ItineraryItemCreateWithoutItineraryInput, ItineraryItemUncheckedCreateWithoutItineraryInput>
  }

  export type ItineraryItemUpdateWithWhereUniqueWithoutItineraryInput = {
    where: ItineraryItemWhereUniqueInput
    data: XOR<ItineraryItemUpdateWithoutItineraryInput, ItineraryItemUncheckedUpdateWithoutItineraryInput>
  }

  export type ItineraryItemUpdateManyWithWhereWithoutItineraryInput = {
    where: ItineraryItemScalarWhereInput
    data: XOR<ItineraryItemUpdateManyMutationInput, ItineraryItemUncheckedUpdateManyWithoutItineraryInput>
  }

  export type ItineraryItemScalarWhereInput = {
    AND?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
    OR?: ItineraryItemScalarWhereInput[]
    NOT?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
    id?: StringFilter<"ItineraryItem"> | string
    name?: StringFilter<"ItineraryItem"> | string
    description?: StringNullableFilter<"ItineraryItem"> | string | null
    media?: StringNullableListFilter<"ItineraryItem">
    order?: IntFilter<"ItineraryItem"> | number
    itineraryId?: StringFilter<"ItineraryItem"> | string
    createdAt?: DateTimeFilter<"ItineraryItem"> | Date | string
    updatedAt?: DateTimeFilter<"ItineraryItem"> | Date | string
  }

  export type UserUpsertWithoutCreatedItinerariesInput = {
    update: XOR<UserUpdateWithoutCreatedItinerariesInput, UserUncheckedUpdateWithoutCreatedItinerariesInput>
    create: XOR<UserCreateWithoutCreatedItinerariesInput, UserUncheckedCreateWithoutCreatedItinerariesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedItinerariesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedItinerariesInput, UserUncheckedUpdateWithoutCreatedItinerariesInput>
  }

  export type UserUpdateWithoutCreatedItinerariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: FollowsUpdateManyWithoutFollowedByNestedInput
    following?: FollowsUpdateManyWithoutFollowingNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedItinerariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    profilePic?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: FollowsUncheckedUpdateManyWithoutFollowedByNestedInput
    following?: FollowsUncheckedUpdateManyWithoutFollowingNestedInput
  }

  export type LocationCreateWithoutItineraryItemInput = {
    id?: string
    city?: string | null
    country?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
  }

  export type LocationUncheckedCreateWithoutItineraryItemInput = {
    id?: string
    city?: string | null
    country?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
  }

  export type LocationCreateOrConnectWithoutItineraryItemInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutItineraryItemInput, LocationUncheckedCreateWithoutItineraryItemInput>
  }

  export type ItineraryCreateWithoutItineraryItemsInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutCreatedItinerariesInput
  }

  export type ItineraryUncheckedCreateWithoutItineraryItemsInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItineraryCreateOrConnectWithoutItineraryItemsInput = {
    where: ItineraryWhereUniqueInput
    create: XOR<ItineraryCreateWithoutItineraryItemsInput, ItineraryUncheckedCreateWithoutItineraryItemsInput>
  }

  export type LocationUpsertWithoutItineraryItemInput = {
    update: XOR<LocationUpdateWithoutItineraryItemInput, LocationUncheckedUpdateWithoutItineraryItemInput>
    create: XOR<LocationCreateWithoutItineraryItemInput, LocationUncheckedCreateWithoutItineraryItemInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutItineraryItemInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutItineraryItemInput, LocationUncheckedUpdateWithoutItineraryItemInput>
  }

  export type LocationUpdateWithoutItineraryItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type LocationUncheckedUpdateWithoutItineraryItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ItineraryUpsertWithoutItineraryItemsInput = {
    update: XOR<ItineraryUpdateWithoutItineraryItemsInput, ItineraryUncheckedUpdateWithoutItineraryItemsInput>
    create: XOR<ItineraryCreateWithoutItineraryItemsInput, ItineraryUncheckedCreateWithoutItineraryItemsInput>
    where?: ItineraryWhereInput
  }

  export type ItineraryUpdateToOneWithWhereWithoutItineraryItemsInput = {
    where?: ItineraryWhereInput
    data: XOR<ItineraryUpdateWithoutItineraryItemsInput, ItineraryUncheckedUpdateWithoutItineraryItemsInput>
  }

  export type ItineraryUpdateWithoutItineraryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutCreatedItinerariesNestedInput
  }

  export type ItineraryUncheckedUpdateWithoutItineraryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemCreateWithoutLocationInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    itinerary: ItineraryCreateNestedOneWithoutItineraryItemsInput
  }

  export type ItineraryItemUncheckedCreateWithoutLocationInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    itineraryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItineraryItemCreateOrConnectWithoutLocationInput = {
    where: ItineraryItemWhereUniqueInput
    create: XOR<ItineraryItemCreateWithoutLocationInput, ItineraryItemUncheckedCreateWithoutLocationInput>
  }

  export type ItineraryItemUpsertWithoutLocationInput = {
    update: XOR<ItineraryItemUpdateWithoutLocationInput, ItineraryItemUncheckedUpdateWithoutLocationInput>
    create: XOR<ItineraryItemCreateWithoutLocationInput, ItineraryItemUncheckedCreateWithoutLocationInput>
    where?: ItineraryItemWhereInput
  }

  export type ItineraryItemUpdateToOneWithWhereWithoutLocationInput = {
    where?: ItineraryItemWhereInput
    data: XOR<ItineraryItemUpdateWithoutLocationInput, ItineraryItemUncheckedUpdateWithoutLocationInput>
  }

  export type ItineraryItemUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itinerary?: ItineraryUpdateOneRequiredWithoutItineraryItemsNestedInput
  }

  export type ItineraryItemUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    itineraryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowsCreateManyFollowedByInput = {
    followingId: string
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FollowsCreateManyFollowingInput = {
    followedById: string
    status?: $Enums.FollowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItineraryCreateManyOwnerInput = {
    id?: string
    title: string
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    media?: ItineraryCreatemediaInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FollowsUpdateWithoutFollowedByInput = {
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    following?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowsUncheckedUpdateWithoutFollowedByInput = {
    followingId?: StringFieldUpdateOperationsInput | string
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowsUncheckedUpdateManyWithoutFollowedByInput = {
    followingId?: StringFieldUpdateOperationsInput | string
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowsUpdateWithoutFollowingInput = {
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedBy?: UserUpdateOneRequiredWithoutFollowedByNestedInput
  }

  export type FollowsUncheckedUpdateWithoutFollowingInput = {
    followedById?: StringFieldUpdateOperationsInput | string
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowsUncheckedUpdateManyWithoutFollowingInput = {
    followedById?: StringFieldUpdateOperationsInput | string
    status?: EnumFollowStatusFieldUpdateOperationsInput | $Enums.FollowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itineraryItems?: ItineraryItemUpdateManyWithoutItineraryNestedInput
  }

  export type ItineraryUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itineraryItems?: ItineraryItemUncheckedUpdateManyWithoutItineraryNestedInput
  }

  export type ItineraryUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    media?: ItineraryUpdatemediaInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemCreateManyItineraryInput = {
    id?: string
    name: string
    description?: string | null
    media?: ItineraryItemCreatemediaInput | string[]
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItineraryItemUpdateWithoutItineraryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutItineraryItemNestedInput
  }

  export type ItineraryItemUncheckedUpdateWithoutItineraryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUncheckedUpdateOneWithoutItineraryItemNestedInput
  }

  export type ItineraryItemUncheckedUpdateManyWithoutItineraryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    media?: ItineraryItemUpdatemediaInput | string[]
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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