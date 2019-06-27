var request = require('request');
var mysql = require('mysql');

exports.sendData = (req, res) =>{
    var courseid = req.body.courseid;
    var forumid = req.body.foros[1];
    var wikiid = req.body.wikis[1];
    var contextForo = 0; //minContextForo
    var contextWiki = 0; //minContextWiki
    var instanceForo = 0; //minContextForo
    var instanceWiki = 0; 
    var opcion = req.body.check
var connection = mysql.createConnection({
   host: '138.100.21.3',
   user: 'gephiuser',
   password: 'gephi34A',
   database: 'gephi',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
var query = connection.query('SELECT id FROM mdl_modules WHERE name = "forum"', function(error, result){
      if(error){
         throw error;
      }else{
         instanceForo = result[0].id;
         console.log(instanceForo);   
      }
   }
);
var query = connection.query('SELECT id FROM mdl_modules WHERE name = "wiki"', function(error, result){
      if(error){
         throw error;
      }else{
         instanceWiki = result[0].id;
         console.log(instanceWiki);   
      }
   }
);
var query = connection.query('SELECT id FROM mdl_course_modules', function(error, result){
      console.log(query)
      if(error){
         throw error;
      }else{
         contextForo = result;
            console.log(contextForo);
      }
   }
);
var query = connection.query('SELECT id FROM mdl_course_modules', function(error, result){
      console.log(query)
      if(error){
         throw error;
      }else{
         contextWiki = result;
            console.log(contextWiki);
      }
   }
);
connection.end();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    //var url = '192.168.100.245:8080/api/rest/tokenservice';
    if(opcion == "table"){
    var url ='http://192.168.100.245:8080/api/rest/public/process/vistaTabla?&minCourseid='+courseid+'&minForum='+forumid+'&minContextForo='+contextForo+'&minContextWiki='+contextWiki;
    //res.redirect('http://192.168.100.245:8080/api/rest/public/process/vistaTabla?minCourseid='+courseid+'&minForum='+forumid);
    res.redirect(url);
    }else{
    var url ='http://192.168.100.245:8080/api/rest/public/process/DescargaExcel?&minCourseid='+courseid+'&minForum='+forumid+'&minContextForo='+contextForo+'&minContextWiki='+contextWiki;
    //res.redirect('http://192.168.100.245:8080/api/rest/public/process/DescargaExcel?minCourseid='+courseid+'&minForum='+forumid);
    res.redirect(url);
    }
    
};
//http://maquetagephi.tige.ior.etsit.upm.es/webservice/rest/server.php?wstoken=0d7d74e9370202ceecc09d63d97f5f40&wsfunction=core_course_get_contents&courseid=2&moodlewsrestformat=json