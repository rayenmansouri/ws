sed -i 's/ObjectId/string/g' ./dist/index.d.ts
sed -i 's/ObjectId/string/g' ./dist/index.d.mts

sed -i 's/Date;/string;/g' ./dist/index.d.ts
sed -i 's/Date;/string;/g' ./dist/index.d.mts
sed -i 's/Date |/string |/g' ./dist/index.d.mts
sed -i 's/Date |/string |/g' ./dist/index.d.ts