// app/utils/mongodb.util.js
const { MongoClient } = require("mongodb");

class MongoDB {
  static client = null;

  // SỬA: dùng "static async connect(uri) { ... }" thay vì "static connect = async (uri) => {"
  static async connect(uri) {
    // nếu đã có client và còn sống thì dùng lại
    if (MongoDB.client && MongoDB.client.topology && !MongoDB.client.topology.isDestroyed()) {
      return MongoDB.client;
    }

    // dùng cách an toàn cho driver mới
    MongoDB.client = new MongoClient(uri, {});
    await MongoDB.client.connect();
    return MongoDB.client;
  }
}

module.exports = MongoDB;
