const createModel = require('./createModel');
module.exports = createModel('firs', {
  "firNumber": {
    "type": "string",
    "required": true
  },
  "date": {
    "type": "date",
    "required": true
  },
  "policeStation": {
    "type": "string",
    "required": true
  },
  "complainantName": {
    "type": "string",
    "required": true
  },
  "crimeType": {
    "type": "string",
    "required": true
  },
  "description": {
    "type": "string",
    "required": false
  },
  "status": {
    "type": "string",
    "required": false,
    "default": "Open"
  }
});
