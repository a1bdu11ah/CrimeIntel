const createModel = require('./createModel');
module.exports = createModel('criminals', {
  "name": {
    "type": "string",
    "required": true
  },
  "age": {
    "type": "number",
    "required": true
  },
  "gender": {
    "type": "string",
    "required": true
  },
  "address": {
    "type": "string",
    "required": true
  },
  "crimeType": {
    "type": "string",
    "required": true
  },
  "arrestDate": {
    "type": "date",
    "required": true
  }
});
