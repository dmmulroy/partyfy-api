const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const server = require('./src/server');
const pkg = require('./package.json');

if (cluster.isMaster) {
  console.log(`${pkg.name} master (pid: ${process.pid}) started...`);

  for (let idx = 0; idx < numCPUs; idx++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`${pkg.name} worker (pid: ${worker.process.pid}) died`);
    console.log('Forking a new process...');

    cluster.fork();
  });
} else {
  server.listen(process.env.PORT || 4000, () =>
    console.log(`${pkg.name} worker (pid: ${process.pid}) started...`)
  );
}
