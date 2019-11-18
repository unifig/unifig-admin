import request from '@/utils/request'

function groupBuyingAdd(data){
    return request ({
        url:'/rm/pmsGroupBuying/create',
        method: 'POST',
        data: data
    })
}

function groupBuyingList(data){
    return request ({
        url:'/rm/pmsGroupBuying/list?'+data,
        method: 'GET'
    })
}

function groupBuyingUpdate(data){
    return request ({
        url:'/rm/pmsGroupBuying/update',
        method: 'POST',
        data: data
    })
}

function getGoodsInfo (id){
    return request ({
        url:'/rm/client/product/'+id,
        method: 'GET'
    })
}
function format(time,format){
    var format = format?format:'yyyy-MM-dd HH:mm:ss';
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' :'') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g,function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

function formatDate(time){
    var date = new Date(time);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds(); 
    return Y+M+D+h+m+s;
}

export {
    groupBuyingAdd,
    groupBuyingList,
    groupBuyingUpdate,
    getGoodsInfo,
    format,
    formatDate
}
