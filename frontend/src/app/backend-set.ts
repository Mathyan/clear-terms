export class BackendSet {
  __backend: string;
  constructor() {
    this.__backend = 'http://localhost:3000';
  }
  getBackend() {
    return this.__backend;
  }
  setBackend(backend: string) {
    this.__backend = backend;
  }
}
