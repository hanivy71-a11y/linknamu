import { MongoClient } from "mongodb";

// 개발 서버의 핫 리로드마다 새 연결이 생기지 않도록 클라이언트를 전역에 캐시한다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 반환한다. 이때 클릭 수 집계만 꺼지고 페이지는 그대로 동작한다. */
export function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo.mongoClientPromise;
}
