import request from 'superagent'
export const REQUEST_START = 'REQUEST_START';//request start

function requestStart(url) {
    return {
        type: REQUEST_START,
        url
    }
}

export function fetch(url,callback) {
    return function (dispatch) {
        dispatch(requestStart(url))
        return  request.get(url).withCredentials().end(function(err, res){
            if(!err) {
                dispatch(callback(url, res.body))
            }else{

            }
        });

    }
}


export function post(url,body,callback,type) {
    return function (dispatch) {
        dispatch(requestStart(url));
        return  request.post(url).type(type||'form')
            .send(body)
            .end(function(err, res){
            if(!err) {
                dispatch(callback(url, res.body))
            }else{

            }
        });
    }
}



export function postJSON(url,body,callback) {
    return post(url,body,callback,'json');
}