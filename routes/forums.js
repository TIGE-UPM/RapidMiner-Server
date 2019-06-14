var request = require('request');

exports.getForums = (req, res) =>{

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    var url = req.body.url + '/webservice/rest/server.php?wsfunction=mod_forum_get_forums_by_courses&courseids[0]=' + req.body.id + '&moodlewsrestformat=json';
    var courseid = req.body.id;
    var options = {
            url: url,
            method: 'GET',
            headers: headers,
            qs: {
                'wstoken': req.body.token
            }
        }
        // Start the request
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            var arrayForums = [];
            var response = JSON.parse(body);
            for (let forum of response) {
                arrayForums.push({
                    forumid: forum.id,
                    forumname: forum.name,
                    courseid:courseid,
                });
            }
            res.render('forums', {token:req.body.token, courseid:courseid, url:req.body.url,array:arrayForums});
        }
    });
}
