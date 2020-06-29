

import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');

        this.cnn= mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : 'ChonChon1575',
            database : 'node_db'
          });

        this.conectarDB();
    }


    public static get instance(){
        return this._instance  || (this._instance = new this());
    }


    public static ejecutarQuery( query: string, callback: Function){
        this.instance.cnn.query(query, (error, results: Object[], fields) => {
            if (error) {
                console.log("Error en query",error);
                return callback(error);
            };
            if (results.length === 0){
                callback('El registro solicitado no existe');
            } else {
                callback(null,results);
            }
          });
    }

    private conectarDB(){
        this.cnn.connect( (err: mysql.MysqlError) => {
            if ( err ) {
                console.log(err.message);
                return;
            }
            this.conectado=true;
            console.log('Base de datos conectada')
        });

    }



}