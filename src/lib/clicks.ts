import { getMongoClient } from "@/lib/mongodb";

// clicks 컬렉션 문서 형태: { _id: 링크 id, count: 누적 클릭 수 }
type ClickDoc = { _id: string; count: number };

async function clicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "linknamu").collection<ClickDoc>("clicks");
}

export async function incrementClick(linkId: string): Promise<boolean> {
  const collection = await clicksCollection();
  if (!collection) return false;
  await collection.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
  return true;
}

/** 링크 id별 클릭 수. DB가 없거나 연결에 실패하면 빈 객체를 반환해 페이지가 깨지지 않게 한다. */
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const collection = await clicksCollection();
    if (!collection) return {};
    const docs = await collection.find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("[clicks] 클릭 수를 불러오지 못했습니다:", error);
    return {};
  }
}
