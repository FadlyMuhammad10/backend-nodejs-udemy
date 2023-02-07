class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // add 'message' a property
    this.code = errorCode;
  }
}

module.exports = HttpError;
