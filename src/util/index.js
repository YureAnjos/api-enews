// Error with status
export class ErrorWS extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
