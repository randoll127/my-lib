import mysql  from 'mysql';
let pool;
let initDB = function(config){
    pool=mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database:'lu_model'
    });
};

let __getPool = function(){
    if(!pool) initDB();
    return pool;
};

let execute=function(sql,callback){
    __getPool().getConnection(function(err,conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err, vals, fields);
            });
        }
    });
};

/*
 * format 1:
 * connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
 if (error) throw error;
 // ...
 });

 format 2:
 var post  = {id: 1, title: 'Hello MySQL'};
 var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
 if (error) throw error;
 // Neat!
 });
 * */
let executeBatch=function(sqls,callback) {

    if(arguments.length==2){
        __executeBatch.apply(this,arguments);
    }else if(arguments.length==3){
        __executeBatch2.apply(this,arguments);
    }else{

    }
};

let __executeBatch = function(sqls,callback){
    __getPool().getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                callback(err);
                return;
            }
            sqls.forEach(function(_sql){
                console.log(_sql);
                connection.query(_sql, function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            callback(error);
                        });
                    }
                });
            });

            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        connection.release();
                        callback(err);
                    });
                }else{
                    connection.release();
                    callback('更新成功');
                }
            });
        });
    });
}

let __executeBatch2 = function(sqls,params,callback){
    __getPool().getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                callback(err);
                return;
            }
            sqls.forEach(function(_sql,i){
                console.log(_sql,params[i]);
                connection.query(_sql,params[i],function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            callback(error);
                        });
                    }
                });
            });

            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        connection.release();
                        callback(err);
                    });
                }else {
                    connection.release();
                    callback('更新成功');
                }
            });
        });
    });
}


export default {
    initDB,execute,executeBatch
}