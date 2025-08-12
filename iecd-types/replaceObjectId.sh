sed -i 's/ObjectId/string/g' ./js-dist/index.d.ts
sed -i 's/ObjectId/string/g' ./js-dist/index.d.mts

sed -i 's/Date;/string;/g' ./js-dist/index.d.ts
sed -i 's/Date;/string;/g' ./js-dist/index.d.mts
sed -i 's/Date |/string |/g' ./js-dist/index.d.mts
sed -i 's/Date |/string |/g' ./js-dist/index.d.ts