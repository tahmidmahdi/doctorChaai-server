//  cache middleware
// const cache = (req, res, next) => {
//   const {username} = req.params;
//   client.get(username, (err, data) => {
//     if (err) {
//       throw err;
//     }

//     if (data != null) {
//       res.json({
//         username: username,
//         repos: data,
//       });
//     } else {
//       next();
//     }
//   });
// };

// module.exports = cache;
