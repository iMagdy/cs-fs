export default class Model {

  set collection(collectionObj) {
    this._collection = collectionObj;
  }

  get collection() {
    return this.collectionObj;
  }

  /**
   * @summary Find the documents in a collection that match the selector.
   * @locus Server
   * @method find
   * @memberOf Server.Model
   * @instance
   * @param {MongoSelector} [selector] A query describing the documents to find
   * @param {Object} [options]
   * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)
   * @param {Number} options.skip Number of results to skip at the beginning
   * @param {Number} options.limit Maximum number of results to return
   * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
   * @param {Boolean} options.reactive (Client only) Default `true`; pass `false` to disable reactivity
   * @param {Function} options.transform Overrides `transform` on the  [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
   * @param {Boolean} options.disableOplog (Server only) Pass true to disable oplog-tailing on this query. This affects the way server processes calls to `observe` on this query. Disabling the oplog can be useful when working with data that updates in large batches.
   * @param {Number} options.pollingIntervalMs (Server only) When oplog is disabled (through the use of `disableOplog` or when otherwise not available), the frequency (in milliseconds) of how often to poll this query when observing on the server. Defaults to 10000ms (10 seconds).
   * @param {Number} options.pollingThrottleMs (Server only) When oplog is disabled (through the use of `disableOplog` or when otherwise not available), the minimum time (in milliseconds) to allow between re-polling when observing on the server. Increasing this will save CPU and mongo load at the expense of slower updates to users. Decreasing this is not recommended. Defaults to 50ms.
   * @returns {Mongo.Cursor}
   */
  find(selector = {}, options = {}) {
    return this._collection.find(selector, options);
  }


  /**
   * @summary Finds the first document that matches the selector, as ordered by sort and skip options. Returns `undefined` if no matching document is found.
   * @locus Server
   * @method findOne
   * @memberOf Server.Model
   * @instance
   * @param {MongoSelector} [selector] A query describing the documents to find
   * @param {Object} [options]
   * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)
   * @param {Number} options.skip Number of results to skip at the beginning
   * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
   * @param {Boolean} options.reactive (Client only) Default true; pass false to disable reactivity
   * @param {Function} options.transform Overrides `transform` on the [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
   * @returns {Object}
   */
  findOne(selector = {}, options = {}) {
    return this._collection.findOne(selector, options);
  }

  /**
   * @summary Insert a document in the collection.  Returns its unique _id.
   * @locus Server
   * @method  insert
   * @memberOf Server.Model
   * @instance
   * @param {Object} doc The document to insert. May not yet have an _id attribute, in which case Meteor will generate one for you.
   */
  insert(doc) {
    return new Promise((resolve, reject) => {
      this._collection.insert(doc, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  /**
   * @summary Modify one or more documents in the collection. Returns the number of matched documents.
   * @locus Server
   * @method update
   * @memberOf Server.Model
   * @instance
   * @param {MongoSelector} selector Specifies which documents to modify
   * @param {MongoModifier} modifier Specifies how to modify the documents
   * @param {Object} [options]
   * @param {Boolean} options.multi True to modify all matching documents; false to only modify one of the matching documents (the default).
   * @param {Boolean} options.upsert True to insert a document if no matching documents are found.
   */
  update(selector, modifier, options = {}) {
    return new Promise((resolve, reject) => {
      this._collection.update(selector, modifier, options, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  /**
   * @summary Modify one or more documents in the collection, or insert one if no matching documents were found. Returns an object with keys `numberAffected` (the number of documents modified)  and `insertedId` (the unique _id of the document that was inserted, if any).
   * @locus Server
   * @param {MongoSelector} selector Specifies which documents to modify
   * @param {MongoModifier} modifier Specifies how to modify the documents
   * @param {Object} [options]
   * @param {Boolean} options.multi True to modify all matching documents; false to only modify one of the matching documents (the default).
   */
  upsert(selector, modifier, options = {}) {
    return new Promise((resolve, reject) => {
      this._collection.upsert(selector, modifier, options, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  /**
   * @summary Remove documents from the collection
   * @locus Server
   * @method remove
   * @memberOf Server.Model
   * @instance
   * @param {MongoSelector} selector Specifies which documents to remove
   */
  remove(selector) {
    return new Promise((resolve, reject) => {
      this._collection.remove(selector, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  /**
   * @summary Returns the [`Collection`](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html) object corresponding to this collection from the [npm `mongodb` driver module](https://www.npmjs.com/package/mongodb) which is wrapped by `Mongo.Collection`.
   * @locus Server
   */
  rawCollection() {
    return this._collection.rawCollection();
  }

  /**
   * @summary Returns the [`Db`](http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html) object corresponding to this collection's database connection from the [npm `mongodb` driver module](https://www.npmjs.com/package/mongodb) which is wrapped by `Mongo.Collection`.
   * @locus Server
   */
  rawDatabase() {
    return this._collection.rawDatabase();
  }

}
