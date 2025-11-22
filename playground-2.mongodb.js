// `JPORTFOLIO_TEST` 데이터베이스를 그대로 `JPORTFOLIO` 데이터베이스로 복사하는 스크립트입니다.

use(`JPORTFOLIO_TEST`);

// 데이터베이스 이름 설정
const sourceDbName = "JPORTFOLIO_TEST";
const targetDbName = "JPORTFOLIO";

// 소스 데이터베이스의 모든 컬렉션을 반복
db.getSiblingDB(sourceDbName).getCollectionNames().forEach(function(collectionName) {
		// 소스 컬렉션에서 모든 문서를 가져옴
		const documents = db.getSiblingDB(sourceDbName).getCollection(collectionName).find().toArray();
		db.getSiblingDB(targetDbName).getCollection(collectionName).insertMany(documents);
		print(`Copied ${documents.length} documents to collection: ${collectionName}`);
});

print(`Database copy from ${sourceDbName} to ${targetDbName} completed.`);