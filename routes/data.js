var request = require('request');

exports.sendData = (req, res) =>{

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    //var url = '192.168.100.245:8080/api/rest/tokenservice';
    var courseid = req.body.courseid;
    var forumid = req.body.id;
    var opcion = req.body.check
    if(opcion == "table"){
    var url ='http://192.168.100.245:8080/api/rest/public/process/vistaTabla?&minCourseid='+courseid+'&minForum='+forumid;
    //res.redirect('http://192.168.100.245:8080/api/rest/public/process/vistaTabla?minCourseid='+courseid+'&minForum='+forumid);
    res.redirect(url);
    }else{
    var url ='http://192.168.100.245:8080/api/rest/public/process/DescargaExcel?&minCourseid='+courseid+'&minForum='+forumid;
    //res.redirect('http://192.168.100.245:8080/api/rest/public/process/DescargaExcel?minCourseid='+courseid+'&minForum='+forumid);
    res.redirect(url);
    }
    
};

