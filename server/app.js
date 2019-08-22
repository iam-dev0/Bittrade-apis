
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const { mongoose } = require('./database');

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
app.use('/api-docs',require("./routes/documentation.route"));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/user', require('./routes/users.routes'));
app.use('/api/card', require('./routes/card.routes'));
// app.use('/api/clients', require('./routes/clients.routes'));
// app.use('/api/suppliers', require('./routes/suppliers.routes'));
/**
 * S T A R T I N G   S E R V E R
 */

app.listen(app.get('port'), (error) => {
    if (error)
    {
        console.log('Error on server: ',err);
    } 
    else {
        console.log('Server on port', app.get('port'));
    }
});

/** this ends this file
* server/index
**/
