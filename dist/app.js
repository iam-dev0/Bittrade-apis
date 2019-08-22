'use strict';

var express = require('express');
var morgan = require('morgan');
var app = express();
var cors = require('cors');
var expressValidator = require('express-validator');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var _require = require('./database'),
    mongoose = _require.mongoose;

/**
 * S E T T I N G S
 */


app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
/**
 * M I D D L E W A R E S
 */
app.use(morgan('dev'));
app.use(express.json());
// app.use(expressValidator())
app.use(cors());

/**
 * R O U T E S
 */
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/user', require('./routes/users.routes'));
app.use('/api/card', require('./routes/card.routes'));
// app.use('/api/clients', require('./routes/clients.routes'));
// app.use('/api/suppliers', require('./routes/suppliers.routes'));
/**
 * S T A R T I N G   S E R V E R
 */

app.listen(app.get('port'), function (error) {
  if (error) {
    console.log('Error on server: ', err);
  } else {
    console.log('Server on port', app.get('port'));
  }
});

/** this ends this file
* server/index
**/
//# sourceMappingURL=app.js.map