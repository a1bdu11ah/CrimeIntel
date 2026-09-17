const createModel = require('./createModel');
module.exports = createModel('personnel', {
  "name": {
    "type": "string",
    "required": true
  },
  "rank": {
    "type": "string",
    "required": true
  },
  "department": {
    "type": "string",
    "required": true
  },
  "contactNumber": {
    "type": "string",
    "required": true
  }
});
