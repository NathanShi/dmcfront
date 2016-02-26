#!/usr/bin/env node

var jsonServer = require('json-server');
var request = require('ajax-request');
// Returns an Express server
var server = jsonServer.create();
// Set default middlewares (logger, static, cors and no-cache)
//server.use(jsonServer.defaults());
server.use(jsonServer.defaults());
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/company_services': '/services',
    '/company_components': '/components',
    '/companies/:id/company_services' : '/companies/:id/services',
    '/companies/:id/company_components' : '/companies/:id/components',
    '/following_discussions' : '/discussions',
    '/follow_people_discussions' : '/discussions',
    '/popular_discussions' : '/discussions',
    '/projects/:id/following_discussions' : '/projects/:id/discussions',
    '/projects/create' : '/projects',
    '/discussions/create' : '/discussions',
    '/tasks/create' : '/tasks',
    '/members' : '/profiles?_embed=profile_reviews',
    '/my-tasks' : '/tasks',
    '/my-services' : '/services',
    '/follow-company-services' : '/services',
    '/market/popular_services': '/services',
    '/market/new_services': '/services',
    '/market/services': '/services',
    '/market/components': '/services',
    '/companies/:id/new': '/companies/:id/services',
    '/company/follow': '/following_companies',
    '/company/unfollow/:id': '/following_companies/:id',
    '/company_featured/:id/position': '/company_featured/:id',
    '/company_featured/add': '/company_featured',
    '/company_featured/:id': '/company_featured/:id',
    '/projects/:projectId/accept/:memberId': '/projects_members/:memberId',
    '/projects/:projectId/reject/:memberId': '/projects_members/:memberId'
    // '/update-user-notification-item/:id' : '/user-notification-items/:id'
}));

server.get('/getChildren', function (req, res) {

    var data = (req.query ? req.query : null);
    var url = data.url;
    if(url) {
        delete data.url;
        if (data) {
            if (Array.isArray(data.path)) {
                for (var i in data.path) {
                    data.path[i] = parseInt(data.path[i]);
                }
            } else {
                data.path = [parseInt(data.path)];
            }
        }
        var query = ( data ? '?data=' + JSON.stringify(data) : '');
        request({
            url: url + '/getChildren' + query,
            method: 'GET',
            json: true
        }, function (err, response, body) {
            res.json(body);
        });
    }else{
        res.json({status : "error", msg : "Wrong url"});
    }
});

server.get('/getModel', function(req, res){
    var data = (req.query ? req.query : null);
    var url = data.url;
    if(url) {
        delete data.url;
        if (data) {
            if (Array.isArray(data.path)) {
                for (var i in data.path) {
                    data.path[i] = parseInt(data.path[i]);
                }
            } else {
                data.path = [parseInt(data.path)];
            }
        }
        var query = ( data ? '?data=' + JSON.stringify(data) : '');
        request({
            url: url+'/getModel' + query,
            method: 'GET',
            json: true
        }, function (err, response, body) {
            res.json(body);
        });
    }else{
        res.json({status : "error", msg : "Wrong url"});
    }
});


server.get('/runModel', function(req, res){
    var interface = req.query.interface;
    interface = JSON.parse(interface);
    var url = (req.query.url ? req.query.url : 'http://ec2-52-33-38-232.us-west-2.compute.amazonaws.com:8080/DOMEApiServicesV7');
    request({
        url: url+'/runModel?queue=DOME_Model_Run_TestQueue&data='+JSON.stringify(interface),
        method: 'POST',
        json : true
    }, function(err, response, body) {
        res.json(body);
    });
});

// Returns an Express router
var port = 3000;
var router = jsonServer.router('db.json');
//router.render = function (req, res) {
//    var path = req._parsedUrl.pathname;
//    var method = req.method;
//    switch(path){
//        case '/services':
//            if(method == "GET"){
//                buildGetServices(res,res.locals.data,req.query);
//            }else{
//                res.json(res.locals.data);
//            }
//            break;
//        default:
//            res.json(res.locals.data);
//            break;
//    }
//};
//
//function buildGetServices(res,data,query){
//    var ids = [];
//    for(var i in data) ids.push("serviceId="+data[i].id);
//    request({
//        url: "http://localhost:3000/service_runs?_order=ASC&_sort=status&"+ids.join('&'),
//        method: 'GET',
//        json : true
//    }, function(err, response, body) {
//        for(var i=0;i<data.length;i++){
//            data[i].currentStatus = null;
//            for(var j=0;j<body.length;j++){
//                if(body[j].serviceId == data[i].id){
//                    data[i].currentStatus = body[j];
//                    body.splice(j,1);
//                    break;
//                }
//            }
//            if(!data[i].currentStatus && query.currentStatus_ne == 'null'){
//                data.splice(i,1);
//                i--;
//            }
//        }
//        res.json(data);
//    });
//}

server.use(router);

server.listen(port,function(){
    console.log('Created JSON server and Listening on http://localhost:'+port);
});
