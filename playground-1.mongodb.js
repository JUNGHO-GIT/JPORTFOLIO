use(`JPORTFOLIO_TEST`);

const collections = [
	`Skills`,
	`Projects`,
	`Portfolios`,
	`Admin`,
	`About`
];

// 해당 컬렉션 맨앞글자를 소문자로 변경
db.getCollectionNames().forEach((collectionName) => {
	const collection = db.getCollection(collectionName);
	if (collection) {
		const newCollectionName = collectionName.charAt(0).toLowerCase() + collectionName.slice(1);
		db.renameCollection(collectionName, newCollectionName);
	}
});