var express = require('express');
var app = express();
app.use(express.bodyParser());

ipAddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
port = process.env.OPENSHIFT_NODEJS_PORT || 1234;

terminator = function(sig){
  if (typeof sig === "string") {
    console.log('%s: Received %s - terminating sample app ...',
           Date(Date.now()), sig);
    process.exit(1);
  }
  console.log('%s: Node server stopped.', Date(Date.now()) );
};


process.on('exit', function() { self.terminator(); });

// Removed 'SIGPIPE' from the list - bugz 852598.
['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function(element, index, array) {
    process.on(element, function() { self.terminator(element); });
});

app.post('/gh_callback', function(res, request) {
  console.log("Payload : ", request.body.payload)
  console.log("Commit message: ", request.body.payload.commits[0].message)
});


console.log(ipAddress, port);

app.listen(ipAddress, port);
