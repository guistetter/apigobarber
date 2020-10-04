// Com está configuracao rodamos a fila em outro 'node'
// abro outro terminal e rodo node/src queue.js
import 'dotenv/config';
import Queue from './lib/Queue';

Queue.processQueue();
