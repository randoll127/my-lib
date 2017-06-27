import chai from 'chai';
import request from 'superagent'


let expect = chai.expect;

describe('superAgent功能测试',function(){
    it('get请求', function(done) {
        var url = 'http://localhost:3001/mc/api/get-basic-type';

        request.get(url).end(function(err, res){
            if(!err) {
                console.log(typeof res.body);
                done();
            }
        });

    });
    it('post请求', function(done) {
        var url = 'http://localhost:3001/mc/api/add-props';
        request.post(url).type('form')
            .send({name:"test22",type:2,optional:0,lu_model_id:11})
            .end(function(err, res) {
            if (!err){
                console.log( typeof res.body);
                done();
            }
        });
    });
    it('update请求', function(done) {
        var url = 'http://localhost:3001/mc/api/update-props';
        request.post(url).type('form')
            .send({name:"updateTest",type:3,optional:0,lu_model_id:11,id:6})
            .end(function(err, res) {
                if (!err){
                    console.log( typeof res.body);
                    done();
                }
            });
    });
})


