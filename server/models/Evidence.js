const createModel = require('./createModel');
module.exports = createModel('evidence', {
  "evidenceName": {
    "type": "string",
    "required": true
  },
  "evidenceType": {
    "type": "string",
    "required": true
  },
  "collectedDate": {
    "type": "date",
    "required": true
  },
  "caseNumber": {
    "type": "string",
    "required": true
  }
});
