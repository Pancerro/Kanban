  const express = require('express');

  const app = express();

  app.use(express.static('./dist/kanban-app'));

  app.get('/*', (req, res) =>
      res.sendFile('index.html', { root: 'dist/kanban-app/' }),
  );

  app.listen(process.env.PORT || 8080);