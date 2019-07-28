'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() +uuid()+ path.extname(file.originalname));
//   }
// });


// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  var filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  var extname = filetypes.test(_path2.default.extname(file.originalname).toLowerCase());
  // Check mime
  var mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init Upload
var upload = (0, _multer2.default)({
  storage: _multer2.default.memoryStorage(),
  limits: { fileSize: 1000000 },
  fileFilter: function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('productimages', 6);

exports.default = upload;
//# sourceMappingURL=index.js.map