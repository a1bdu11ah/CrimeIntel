const createModel = require('./createModel');
module.exports = createModel('cases', {
  "caseNumber": {
    "type": "string",
    "required": true
  },
  "caseType": {
    "type": "string",
    "required": true
  },
  "status": {
    "type": "string",
    "required": true
  },
  "assignedOfficer": {
    "type": "string",
    "required": true
  },
  "courtDate": {
    "type": "date",
    "required": true
  }
});
