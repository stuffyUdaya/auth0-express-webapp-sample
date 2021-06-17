var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

router.get('/profile', (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
