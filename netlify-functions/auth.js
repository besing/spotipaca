exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: `${JSON.stringify(context, null, 2)}\nEnv CLIENT_ID: ${
      process.env.REACT_APP_SPOTIFY_CLIENT_ID
    }`
  });
};
