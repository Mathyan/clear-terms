import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackendSet {
  __backend: string;
  constructor() {
    this.__backend = 'http://127.0.0.1:3000';
  }
  getBackend() {
    return this.__backend;
  }
  setBackend(backend: string) {
    this.__backend = backend;
  }
}
