import { EventEmitter } from 'events';
import { ZodSchema } from 'zod';

export class ZodEmitter<T> {
  emitter: EventEmitter;
  schema: ZodSchema<T>;

  constructor(schema: ZodSchema<T>) {
    this.emitter = new EventEmitter();
    this.schema = schema;
  }

  emit(event: T) {
    this.schema.parse(event);
    this.emitter.emit('update', event);
  }

  on(listener: (event: T) => void) {
    this.emitter.on('update', listener);
  }

  off(listener: (event: T) => void) {
    this.emitter.off('update', listener);
  }
}
