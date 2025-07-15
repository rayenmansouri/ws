#!/bin/sh

checkIfExist() {
  path="$1"
  if [ -z "$path" ]; then
    echo "Path is empty."
    exit 1
  fi
  if [ ! -f "$path" ]; then
    echo "File does not exist. $path"
    exit 1
  fi
}

basePath="$(pwd)/src/scripts"

checkIfExist "$basePath/fixIsIncludeInGradeBookInClassType.ts"
checkIfExist "$basePath/migrateRoles.ts"
checkIfExist "$basePath/migrateHomeworkNotif.ts"
checkIfExist "$basePath/addDueDateToHomework.ts"
checkIfExist "$basePath/addEtablishmentTitle.ts"
checkIfExist "$basePath/initAdminImpersantion.ts"
checkIfExist "$basePath/migrateDeletedUsers.ts"
checkIfExist "$basePath/fixCounter.ts"
checkIfExist "$basePath/initTeacherRoles.ts"
checkIfExist "$basePath/initializeDescriptionForTransactions.ts"
checkIfExist "$basePath/addDraftWeeklySchedule.ts"
checkIfExist "$basePath/recalculateInvoices.ts"
checkIfExist "$basePath/addOxfordToMasterSchool.ts"
checkIfExist "$basePath/addExamGrade.ts"

npm run executor -- --scriptName addOxfordToMasterSchool &&
npm run executor -- --scriptName fixIsIncludeInGradeBookInClassType &&
npm run executor -- --scriptName migrateRoles &&
npm run executor -- --scriptName migrateHomeworkNotif &&
npm run executor -- --scriptName addDueDateToHomework &&
npm run executor -- --scriptName addEtablishmentTitle &&
npm run executor -- --scriptName initAdminImpersantion &&
npm run executor -- --scriptName migrateDeletedUsers &&
npm run executor -- --scriptName fixCounter &&
npm run executor -- --scriptName initTeacherRoles &&
npm run executor -- --scriptName initializeDescriptionForTransactions &&
npm run executor -- --scriptName addDraftWeeklySchedule &&
npm run executor -- --scriptName addExamGrade --scriptArgs insertExamGrade &&
npm run executor -- --scriptName recalculateInvoices &&
npm run executor -- --scriptName migrateOxfordToCentral
 