var request = require('request');

exports.getForums = (req, res) =>{

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    var url = req.body.url + '/webservice/rest/server.php?wsfunction=mod_forum_get_forums_by_courses&courseids[0]=' + req.body.id + '&moodlewsrestformat=json';
    var courseid = req.body.id;
    var arrayForums = [];
    var arrayWikis = [];
    var arrayAssigns = [];
    var options = {
            url: url,
            method: 'GET',
            headers: headers,
            qs: {
                'wstoken': req.body.token
            }
        }
    try{
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            var response = JSON.parse(body);
            for (let forum of response) {
                arrayForums.push({
                    forumid: forum.id,
                    forumname: forum.name,
                    courseid:courseid,
                });
            }
            //res.render('forums', {token:req.body.token, courseid:courseid, url:req.body.url,array:arrayForums, arrayW:arrayWikis});
            var optionsWiki = {
                url: req.body.url + '/webservice/rest/server.php?wsfunction=mod_wiki_get_wikis_by_courses&courseids[0]='+ courseid +'&moodlewsrestformat=json',
                method: 'GET',
                headers: headers,
                qs: {
                    'wstoken': req.body.token,
                    }
                }
                request(optionsWiki, (error, response, body) =>{
                    if (!error && response.statusCode == 200) {
                        var responseWiki = JSON.parse(body);
                        for (let wiki of responseWiki.wikis) {
                            arrayWikis.push({
                            wikiid: wiki.id,
                            wikiname: wiki.name,
                            courseid:courseid,
                        });
                        }
                        var optionsAssignment = {
                            url: req.body.url + '/webservice/rest/server.php?wsfunction=mod_assign_get_assignments&courseids[0]='+ courseid +'&moodlewsrestformat=json',
                            method: 'GET',
                            headers: headers,
                            qs: {
                                'wstoken': req.body.token,
                            }
                        }
                        request(optionsAssignment, (error, response, body) =>{
                            if (!error && response.statusCode == 200) {
                                var responseAssessment = JSON.parse(body);
                                console.log(responseAssessment);
                                if(responseAssessment.warnings[0]!=null){
                                    if(responseAssessment.warnings[0].warningcode=="2"){
                                        res.render('error');
                                    }
                                }else{
                                console.log(responseAssessment.courses[0])
                                var responseAssignment = responseAssessment.courses[0].assignments;
                                console.log(responseAssessment.courses[0].assignments);
                                for (let assign of responseAssignment) {
                                    arrayAssigns.push({
                                    assignid: assign.id,
                                    assignname: assign.name,
                                    assigncmid: assign.cmid,
                                    courseid:courseid,
                                    });
                                }
                                if(arrayWikis.length==0){
                                    arrayWikis.push({
                                        wikiid: 0,
                                        wikiname: "no data",
                                    })
                                }
                                if(arrayAssigns.length==0){
                                    arrayAssigns.push({
                                        assignid: 0,
                                        assignname: "no data",
                                    })
                                }
                                if(arrayForums.length==0){
                                    arrayForums.push({
                                        forumid: 0,
                                        forumname: "no data",
                                    })
                                }
                                res.render('forums', {token:req.body.token, courseid:courseid, url:req.body.url,array:arrayForums, arrayW:arrayWikis, arrayA:arrayAssigns});
                                }
                            }
                        });

                    }
                    //res.render('forums', {token:req.body.token, courseid:courseid, url:req.body.url,array:arrayForums, arrayW:arrayWikis, arrayA:arrayAssigns});    
                
                });
        }
    });
}catch(error){
    throw error;
}
}
//http://maquetagephi.tige.ior.etsit.upm.es/webservice/rest/server.php?wstoken=0d7d74e9370202ceecc09d63d97f5f40&wsfunction=mod_wiki_get_wikis_by_courses&courseids[0]=2&moodlewsrestformat=json