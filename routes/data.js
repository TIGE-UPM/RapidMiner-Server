var request = require('request');

exports.sendData = (req, res) =>{

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    //var url = '192.168.100.245:8080/api/rest/tokenservice';
    var courseid = req.body.courseid;
    var forumid = req.body.id;
    var url ='192.168.100.245:8080/api/rest/public/process/TotalOp-Server-WS?&minCourseid='+courseid+'&minForum='+forumid;
    res.redirect('http://192.168.100.245:8080/api/rest/public/process/TotalOp-Server-WS?minCourseid='+courseid+'&minForum='+forumid);
};