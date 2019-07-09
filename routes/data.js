var request = require('request');
var mysql = require('mysql');

exports.sendData = async (req, res) =>{
    var courseid = req.body.courseid;
    var forumid = req.body.foros[1];
    var wikiid = req.body.wikis[1];
    var assignid = 0;
    var cmid=0;
    var itemid=0;
    for(let i=0; i<req.body.assigns[1].length; i++ ){
      if(req.body.assigns[1][i]==','){
        var str2= '';
        for(let j=i+1; j<req.body.assigns[1].length; j++){
          str2+= req.body.assigns[1][j]  
          cmid = parseInt(str2, 10) 
        }
        break;
      }
      var str1 = '';
      str1+= req.body.assigns[1][i]
      assignid = parseInt(str1, 10) 
    }
    var contextForo = 0; //minContextForo
    var contextWiki = 0; //minContextWiki
    var instanceForo = 0; //minContextForo
    var instanceWiki = 0; 
    var contextItem = 0;
    var opcion = req.body.check

getInstanceForo(function(dataForo){
  instanceForo = dataForo;
  getInstanceWiki(function(dataWiki){
    instanceWiki = dataWiki;
    getContextForo(courseid, instanceForo, forumid, function(dataContextForo){
      contextForo = dataContextForo;
      getContextWiki(courseid, instanceWiki, wikiid, function(dataContextWiki){
        contextWiki = dataContextWiki;
        getInstanceAssign(cmid, function(dataInstanceAssign){
          var instanceAssign=dataInstanceAssign;
          getItemAssign(instanceAssign, function(dataItemAssign){
            itemid=dataItemAssign;
            var headers = {
              'User-Agent': 'Super Agent/0.0.1',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
            //var url = '192.168.100.245:8080/api/rest/tokenservice';
            if(opcion == "table"){
              var url ='http://192.168.100.245:8080/api/rest/public/process/vistaTabla?&minCourseid='+courseid+'&minForum='+forumid+'&minContextForo='+contextForo+'&minContextWiki='+contextWiki+'&minPracticaId='+assignid+'&minItemId='+itemid;
              //res.redirect('http://192.168.100.245:8080/api/rest/public/process/vistaTabla?minCourseid='+courseid+'&minForum='+forumid);
              res.redirect(url);
            }else{
              var url ='http://192.168.100.245:8080/api/rest/public/process/DescargaExcel?&minCourseid='+courseid+'&minForum='+forumid+'&minContextForo='+contextForo+'&minContextWiki='+contextWiki+'&minPracticaId='+assignid+'&minItemId='+itemid;
              //res.redirect('http://192.168.100.245:8080/api/rest/public/process/DescargaExcel?minCourseid='+courseid+'&minForum='+forumid);
              res.redirect(url);
            }
          });
        });
      });
    });
  });
});

    
};

getInstanceForo = (callback)=>{
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
      }

      callback(result[0].id); 
   }
);
connection.end();
}

getInstanceWiki = (callback)=>{
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

var query = connection.query('SELECT id FROM mdl_modules WHERE name = "wiki"', function(error, result){
      if(error){
         throw error;
      }
         callback(result[0].id);  
   }
);
connection.end();
}

getContextForo = (courseid, instanceForo, forumid, callback)=>{
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

var query = connection.query('SELECT id FROM mdl_course_modules WHERE course = ? AND module = ? AND instance = ?', [courseid, instanceForo ,forumid] ,function(error, result){
      if(error){
         throw error;
      }
      callback(result[0].id)
   }
);
connection.end();
}

getContextWiki = (courseid, instanceWiki ,wikiid, callback)=>{
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

var query = connection.query('SELECT id FROM mdl_course_modules WHERE course = ? AND module = ? AND instance = ?', [courseid, instanceWiki ,wikiid] ,function(error, result){
      if(error){
         throw error;
      }
      callback(result[0].id)

   }
);
connection.end();
}

getInstanceAssign = (cmid, callback)=>{
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

var query = connection.query('SELECT instance FROM mdl_course_modules WHERE id = ?', [cmid] ,function(error, result){
      if(error){
         throw error;
      }
      callback(result[0].instance)

   }
);
connection.end();
}
getItemAssign = (instanceAssign, callback)=>{
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

var query = connection.query('SELECT id FROM mdl_grade_items WHERE itemmodule = ? AND iteminstance = ?', ["assign", instanceAssign] ,function(error, result){
      if(error){
         throw error;
      }
      callback(result[0].id)

   }
);
connection.end();
}