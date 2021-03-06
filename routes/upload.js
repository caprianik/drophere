// Generated by CoffeeScript 1.4.0
var fs, is_valid, service;

service = require('../lib/service.js');

fs = require('fs');

is_valid = function(file) {
  var ALLOWED_TYPES, MAX_UPLOAD_SIZE;
  MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
  ALLOWED_TYPES = 'text/.*|image/.*';
  if (file.type.match(ALLOWED_TYPES) && file.size <= MAX_UPLOAD_SIZE) {
    return true;
  } else {
    return false;
  }
};

exports.upload = function(req, res) {
  var file, resp, ret_val, s, subtype, type, _ref;
  file = req.files.file;
  if (!is_valid(file)) {
    resp = {
      error: true,
      filename: file.name,
      message: 'Currently only text and image files less than 5MB are supported'
    };
    res.send(resp);
  }
  _ref = file.type.split("/", 1), type = _ref[0], subtype = _ref[1];
  if (type === 'image') {
    s = new service.ImgurService;
  } else {
    s = new service.PastebinService;
  }
  return ret_val = s.dispatch(file, function(error, filename, url, message) {
    resp = {
      error: error,
      filename: filename,
      url: url,
      message: message
    };
    return res.send(resp);
  });
};
