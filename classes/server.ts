import express  from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets';

export default class Server {

  private static _instance: Server;

  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  public httpServer: http.Server;
  
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server( this.app );
    this.io = socketIO( this.httpServer );
    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || ( this._instance = new this() );
  }

  private escucharSockets () {
    console.log('escuchar sockets');
    this.io.on('connection', (client) => {
      console.log('Cliente conectado');

      // Mensajes
      socket.mensaje( client, this.io );

      // Desconectar
      socket.desconectar( client );

      // client.on('disconnect', () => {
      //   console.log('cliente desconectado');
      // });
    });
  }

  start( callback?: Function ) {
    // this.app.listen( this.port, callback);
    this.httpServer.listen( this.port, callback );
  }
}
