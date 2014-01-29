var express = require('express');
var app = express();
app.use(express.bodyParser());

ipAddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


app.post('/gh_callback', function(res, request) {
  console.log("Payload : ", request.body.payload)
  console.log("Commit message: ", request.body.payload.commits[0].message)
});

app.listen(ipAddress, port);
