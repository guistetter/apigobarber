import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import sentryConfig from './config/sentry';
import routes from './routes';

import 'express-async-errors';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig, {
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express(this.server),
      ],

      tracesSampleRate: 1.0,
    });

    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(Sentry.Handlers.tracingHandler());

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

export default new App().server;
