const server = require('./src/server');
const pkg = require('./package.json');

server.listen(process.env.PORT || 4000, () =>
  console.log(`${pkg.name} running on port ${process.env.PORT || 4000}`)
);
