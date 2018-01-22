SelfEd Date: 		07/31/2017

SelfEd Title:           SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-7-Production

SelfEd Objective:       To take the full stack integration achieved in 
                        SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-6 and
                        develop it into a demonstrable full stack
                        application utilizing a cloud server and provide
                        a webpage to access a db via said cloud server
                        for potential employers.

                        Note: This app may look quite different when I'm
                        all done.

SelfEd Catalyst:        July 29th 2017 (in a way) marks the end of the
                        "coast to coast" journey of navigating the MEAN stack.
                        See: SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-6 for
                        the finish line. From client side to cloud server 
                        db access and all middleware in between I have a 
                        reasonable set of SelfEds to refer to. Namely all the 
                        SelfEd-NodeJS-MEAN-Stack-Bare-Bones SelfEds of
                        which this one will be a production version. I'm 
                        ready for production.

SelfEd References:      SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-6



Process:

07/31/2017
    This SelfEd is starting as a copy of: 
    < SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-6 >. I will begin to fill it
    out such that it becomes a good demonstration for employers to look at.

    I'm going to work on the front end and create a presentable page. Not sure
    what DB operations to offer. I'll think about it.

08/01/2017
    Let it be known, when launching this app the opening < HTML > file is
    < publicMEANFindex.html > in the < publicMEANF > folder. The 
    < publicMEANF > folder is the same folder the < publicMEANFserver.js >
    file is launched from with the console entry of:
    < node publicMEANFserver.js > which launches the application. Then
    from the browser you enter the following to get the opening < HTML >
    to launch: < http://127.0.0.1:1337/publicMEANFindex.html >. But this is
    not the original intent. The < HTML > file in the < views > folder is the
    one that's supposed to launch by default

    So I'm trying to figure out why my opening < HTML > page in the < views >
    folder is not loading by default. Supposedly, the < app.get > code line
    in the < publicMEANFroutes.js > should be invoked by default. But it is
    not. This has been a bit of a mystery to me so I'm going to spend a little
    time figuring this out so I can garner a deeper understanding of 
    < http calls >

    Note: When the server file: < publicMEANFserver.js > is launched the
    location the file becomes the entrance point for:  < port 1337 > which
    is the current port configured in the code. Thus you can add the path
    to the url and get the opening < HTML > file in the < views > folder
    to launch. Here's is the path as currently working if I want to
    launch the opening < HTML > file in the views folder.:
    < http://127.0.0.1:1337/app/views/default-publicMEANFindex.html >

    I'm digging up some old SelfEds of dealing with this issue. Please refer
    to: < SelfEd-NodeJS-RESTful-API > and
    < https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm >

08/02/2017
    OK, I've done enough experimentation and figured out a few things 
    about < HTTP get requests >. By refering to my SelfEd:
    < SelfEd-NodeJS-RESTful-API > and the tutorial at:
    < https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm >
    and < HTTP get > requests in the express API at:
    < http://expressjs.com/en/api.html#app.get > I have determined my code
    has an error or at least an improper path description in the
    < app.get(path,callback) > line of code.

    First of all, it's mostly about the < path > argument that I was using.
    Here's the code I was using in the < publicMEANFroutes.js > routes file:
    <
        app.get('../views/publicMEANFindex.html', function(req, res) {
                console.log("making in here B");
		// res.sendFile('C:/School/SelfEd/SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-2/public_html/publicMEANF/publicMEANFindex.html'); // load the single view file (angular will handle the page changes on the front-end)
                res.sendFile('../views/publicMEANFindex.html'); // load the single view file (angular will handle the page changes on the front-end)
                console.log("making in here B");
	});
    >
    I swear it's from one of the tutorials but the:
    < '../views/publicMEANFindex.html' > part, which is the path part in the:
    < app.get('../views/publicMEANFindex.html', function(req, res) > part of the
    code is flawed. Among other things it's a relative path expression and
    seems invalid as per everything I've seen so far and per the API at:
    < http://expressjs.com/en/api.html#app.get >
    
08/03/2017
    ***************************************************************************
    *****                          AHA!                                   *****
    *****                Routing HTTP GET Requests                        *****
    ***************************************************************************

    I've figured enough out to be able to apply < HTTP get > requests to opening
    an app. Per the:
    < app.get('../views/publicMEANFindex.html', function(req, res) {.... >
    line above. Which as shown doesn't work. Here's what works and which file(s)
    are accessed:
    
    Browser entry of: < http://127.0.0.1:1337/publicMEANFindex.html > and
    subsequent route response per the following < get > configuration in
    route file: < publicMEANFroutes.js > when < app.get >is:
    <  app.get('/', function(req, res) {.... >
    The < root > slash: < / > defaults and loads the publicMEANFindex.html file 
    located in the same folder as the server file < publicMEANFserver.js >.
    In fact, the < app.get > function is not even executed and is ignored 
    because my 
    < console.log > message in the function is not displayed.
    Note: makes sense when considering < '/' > is not the same as:
    < /publicMEANFroutes.js > of which is entered into the browser. 
    
    And similarly, if you simply < comment out > the entire < app.get > request
    code you get the same result when entering:
    < < http://127.0.0.1:1337/publicMEANFindex.html > in the browser. Seems
    there's a default to the root and you get the publicMEANFindex.html
    file located in the root directory ie the same folder as the server file
    is in.

    But to launch the same HTML file from the < views > folder:
    Browser entry of: < http://127.0.0.1:1337/publicMEANFindex.html > and
    subsequent route response per the following < get > configuration in
    route file: < publicMEANFroutes.js > when the < app.get > code line is:
    <  app.get('/publicMEANFindex.html', function(req, res) {.... >
    The path < '/publicMEANFindex.html' > is a match and the 
    < app.get > function is satisfied and the specified file as 
    referenced in the < res.sendFile > line of code is launched. In this case,
    That would be the < publicMEANFindex.html > located in the
    < views > folder. This is supposed to be the proper behavior for
    launching the app. 

08/04/2017    
    LET IT BE KNOWN!
    You can launch the HTML file from any folder without the need for the
    < app.get() > code in the < publicMEANFroutes.js > file
    as long as you specify the path relative to the root.
    Remember, the < root > is that folder or location from which the server
    file was launched. And as a refresher in this case the server file:
    < publicMEANFserver.js > was launched as such:
    < C:\School\SelfEd\SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-7-Production\public_html\publicMEANF>node publicMEANFserver.js >
    and that makes the < publicMEANF > folder the < root >. Now of course you
    must know the < port > the server is listening on. This is specified in 
    the server code and/or in the supporting configuration files such as a 
    < development.js > or < production.js > file. So it would seem the port
    < listening > location is the folder which the server was launched from.
    Given that, the following browser entry launches the:
    < publicMEANFindex.html > file which is located in the < views > folder.
    And the browser entry to launch without the < app.get > code is:
    < http://127.0.0.1:1337/app/views/publicMEANFindex.html >. Now,
    think of the < http://127.0.0.1:1337 > as the < root > and/or from a file
    system perspective the root folder is < publicMEANF >.
 
    Oh, and I believe I mentioned it earlier but you can make the path in
    < app.get > file anything you want. For example, say you wrote this:
    < app.get('/WTF/SouthernBell/Hottie', function(req, res) { >
    and entered in the browser:
    < http://127.0.0.1:1337/WTF/SouthernBell/Hottie >. The path is a 
    match and the code in the < app.get() > function executes and the 
    specified file in the res.sendFile() function is launched which of
    course is the < publicMEANFindex.html > file.

08/06/2017
    Seems like eons since my last entry. I'm pretty much working on the
    front end now developing my demo full stack application for reference
    on my resume. My just resolved issue as of last night was how to
    return a string using ng-repeat and have it interpreted as 
    HTML code. For example the < HTML entity > of < &#10004; > is a 
    checkmark. 

    After some weird behavior I finally got a checkmark to show on my app.
    It seemed I'd get flaky renders, sometimes Angular things would work
    then not at all. Based on a search I found the following topic:
    < https://stackoverflow.com/questions/26064309/decode-html-entity-in-angular-js >
    Thus I included a new library called < sanitize > 
    per the Angular API on the < ng-bind-html > at:
    < https://docs.angularjs.org/api/ng/directive/ngBindHtml >
    of:

    ***************************************************************************
    Note:! ->   It's 08/20/2017 and the talk about snapshot below is problematic
                Keep reading through though for the resolution
    ***************************************************************************

    < <script src="//code.angularjs.org/snapshot/angular-sanitize.js"></script> >
    That's when the behavior seemed to get weird.

    So per the example at:
    < https://docs.angularjs.org/api/ng/directive/ngBindHtml > I simply
    updated my core Angular library as well to:
    < <script src="//code.angularjs.org/snapshot/angular.min.js"></script> >.
    And all seems to work well now. 

08/07/2017

    ***************************************************************************
    *****                           AHA!                                  *****
    *****              NO! This is not an AHA (read on)                   *****
    ***************************************************************************

    To avoid weird behavior that can creep into your app when adding 
    libraries, the go to Angular libraries are (which the API uses) at:
    < https://code.angularjs.org/snapshot/ >. This < snapshot > directory
    appears to contain all the newest most "up to date-est" AngularJS
    libraries.
 
08/08/2017
    Well I found out the best way (and the way I was already doing it) to
    display multiple object properties in multiple columns using ng-repeat 
    is to create one object per row with each object having the needed number
    of properties to fill the columns across the row.

08/11/2017
    Unfortunately, I spent a day or so solving an unexpected problem.
    In the process of including the Angular library of < ngSanitize > I
    utilized the latest Angular libraries using 
    < https://code.angularjs.org/snapshot >. So I changed the sources to:
    < https://code.angularjs.org/snapshot/angular.min.js > and
    < https://code.angularjs.org/snapshot/angular-sanitize.js > thinking 
    the < snapshot > content would always be the latest.
    ****************************************************************************
    ************************* THIS WAS BAD!!! **********************************
    ****************************************************************************
    Suddenly, my DB data was NOT being returned. Turns out the current 
    < snapshot >
    of Angular DOESN'T work with my code! So I went back to the libraries 
    sourced by google at 
    < https://developers.google.com/speed/libraries/#angularjs > and through
    elimination found the newest version that works is < Angular ver 1.5.11 >.
    The following src link works good.
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.11/angular.min.js"></script>
    BUT!!the newer < Angular 1.6.x > stuff does not work. That's crazy
    because my code is so simple it should have no problem with newer versions,
    but it does. However, Google says avoid "automatic versions" and use
    exact versions only because, Google says, things can change. For more
    go to: < https://developers.google.com/speed/libraries/#troubleshooting >
 
08/15/2017
    I have an interview coming up with the: < United States Antarctic Program >
    so I was migrating this SelfEd to the cloud server I set up through 
    < Go Daddy > in the slim chance I'll get a show and tell. For starters, 
    I had to change the < path > in the < app.get > code section to 
    < res.sendFile('/home/bitnami/myproject/bb6e/publicMEANF/publicMEANFindex.html'); >
    to reflect the proper < absolute path > on the cloud server. This is in the
    < publicMEANFroutes.js > file.

    These are the files I had to change:
     < publicMEANFroutes.js >           changed the res.sendFile line (see above)
     < dbMEANF.server.model.js >        changed the < db collection > name ( but has the same schema )
     < dbMEANF.server.controller.js >   changed the < db collection > name since referenced by < dbMEANF.server.model.js >
     < development.js >                 changed the < db > property. (see below)

    About changing the < development.js > file (which technically should
    eventually be renamed < production.js > and the environment variable
    set to < production >) and aside from changing the port number to the
    proper port is notable because it sets the 
    < db property > which must include a user with permissions. For all
    the details about this refer to all the problems and solutions I dealt
    with in < SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-6 > and documented in
    the ReadMe.txt file - refer to log dates starting at 07/17/2017 and 
    especially at 07/26/2017 and 07/27/2017.

    ***************************************************************************
    *****                           AHA!                                  *****
    *****        Files to change in a migration (see above)               *****
    ***************************************************************************

08/17/2017
    The interview went well. I can tell I'm gaining ground with interviewees 
    in that I know much more about what they need me to know. Corey Anthony
    at USAP interviewed me and it was a great interview. We talked more like 
    friends and had a few laughs, not canned laughter but honest laughs. I 
    knew everything he was looking for. I believe his only concern was did
    I know all this long enough. And that's a fair concern. Certainly I don't
    have all this locked in muscle memory yet but I do believe my documentation
    of all my travails gives my a ready resource to refer to should any actual
    job challenges he throws at me were to challenge me.

    Meanwhile, back to my production project here. I've run into an unexpected
    problem with querying the Mongo DB. Not for < reading > or < writing > but
    for < deleting > and < finding one > operations. It seems, when a < # >
    sign is part of the data the < query > component of these operations fails.
    The < # > seems to behave as a separator in the given data string and thus 
    what was entered as the query is truncated by the < # >. For example,
    If I have a document with msgA equal to < Test#Query > and I enter
    < Test#Query > to delete it, it will arrive at the delete operation in the
    < dbMEANF.server.controller.js > as < Test >. This is before actual 
    < delete > operation takes place so it has something to do with my
    RESTful services.

08/18/2017
    I decided I need to know more about header fields. I typed < http headers >
    into my browser and found a good starting reference at:
    < https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Field_values >
    But as I review this I realize there are missing pieces. For example the
    < req.query > property value is displayed but it's not part of the listed
    < HTTP header fields > so where does it come from??
    Note: In file: < dbMEANF.server.controllers.js > I have numerous 
    < console.log > outputs as part of each < HTTP request >. These will show
    at the console output from where the server was launched. 

08/20/2017
    Referring back to the 08/17/2017 log entry, the problem with having
    a < # > sign in a < delete > query string is 

08/23/2017
    Have fixed the problem with the < # > sign. Recall when a < # > sign was
    part of the document data the application would fail to delete that
    particular record. Reason is, an HTTP < DELETE > method appends the
    query to the end of the URI. There are two < DELETE > configurations 
    to do this. 
    
    DELETE configuration #1
    The first is by sending the delete query as a < parameter >. Thus the
    < DELETE > method argument would look like: < url/myquerystring > as in 
    the following example: 
    < $http({method:"DELETE", url:"/api/todos/del/urlparam/dataToDelete"}) >
    where < dataToDelete > in the url path is a stringified object of the 
    particular < name/value > pair defining the query value. As you can see
    the < dataToDelete > is appended to and becomes part of the < url >. This
    is a recipe for trouble if you have < ? > or < # > characters in the 
    query. You'll get the following error at the console:
    < SyntaxError: Unexpected end of JSON input >. This is because the < ? >
    is treated as a < url > special character which marking the end of the
    < url > and the beginning of a parameter being passed. So you don't want
    a < ? > to be part the query if passing as a parameter. You have the same
    problem with < # >. In a browser, the < # > is seen as a fragment marker
    and is often used to to direct a web page away from its top and down to
    a section of the web page.

    DELETE configuration #2
    The second is by sending the delete query as a < req.query > property. You
    do this by adding a < ? > to the end of the < url > when making the
    < $HTTP > call. You also add the query itself to the end of the < url >
    just after the < ? >. For example:
    < $http({ method:"DELETE", url:"/api/todos/delDoc/req/?" + dataToDelete; })
    Note: You don't have to stringify the query when using the < req.query >
    property. So because of the < ? > at the end of the url the < DELETE >
    method assigns the query to the < req.query > property. The process appends
    the query to the end of the < url> and passes it. Upon reception, the
    first < ? > encountered in the < url > marks the beginning of the 
    < req.query > property and as such doesn't care about any additional < ? >s.
    Thus having a < ? > in the query is OK. The delete operation works.
    However, it still won't work if a < # > is in the query string. It's still
    seen as a fragment marker. So this delete configuration has a pitfall also.

    DELETE configuration #3
    The third is by sending the delete query via a < POST >. It would seem
    the < POST > method is perfect for a delete operation because the query
    is sent as the < req.body > property which is NOT part of the < url > in
    any way shape or form. It's in the body of the < $HTTP DELETE service > 
    so it's safe to have any manner of characters in the query. However, the
    query needs to be properly formated as a JSON object. Prior to this
    understanding about a properly formated object for the < req.body >
    property I was getting the following error:
    <    
    SyntaxError: Unexpected token q
        at parse (C:\School\SelfEd\SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-7-Production\public_html\node_modules\body-parser\lib\types\json.js:83:15)
        at C:\School\SelfEd\SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-7-Production\public_html\node_modules\body-parser\lib\read.js:116:18
        at invokeCallback (C:\School\SelfEd\SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-7-Production\public_html\node_modules\raw-body\index.js:262:16)
        at done (C:\School\SelfEd\SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-7-Production\public_html\node_modules\raw-body\index.js:251:7)
        at IncomingMessage.onEnd (C:\School\SelfEd\SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-7-Production\public_html\node_modules\raw-body\index.js:307:7)
        at emitNone (events.js:86:13)
        at IncomingMessage.emit (events.js:185:7)
        at endReadableNT (_stream_readable.js:974:12)
        at _combinedTickCallback (internal/process/next_tick.js:80:11)
        at process._tickCallback (internal/process/next_tick.js:104:9)
    >
    Now I'm able to send any manner of characters in a query

    ***************************************************************************
    *****                           AHA!                                  *****
    *****            Using POST to do a delete operation                  *****
    ***************************************************************************

    See < DELETE configuration #1, #2, #3 > above for the whole challenge I
    faced to assure a query string with special characters can be sent via
    an < $HTTP > service to delete a document.

    I have since successfully deleted all known documents with special
    characters using the < POST > method. It seems this is the way to do it.
    
08/28/2017
    With that accomplished, I'm realizing I may be able to stick with a 
    < DELETE > or a < GET > method and still find documents with special 
    characters. It would seem I can select and "ride" a query on my own 
    configuration objects including < req.body > on a < DELETE > or a < GET >.
    Note: < req.body > is the < data > property on the client side. What
    has me considering this is the < Angular API > discussion at:
    < https://docs.angularjs.org/api/ng/service/$http#usage >. I'm investigating
    now and will try it out on the < GET > query I do to access a single
    document. At this juncture I'm working with file:
    < publicMEANFindex_Exp0.html >.

08/30/2017
    So the notion I can add my own config object still seems limited to what
    RESTful service I'm working with. So far I'm finding that sending a
    query object as a property of < req.body > is the way to go. But it
    seems that's only doable using < POST >. Fine, then that's the way it 
    shall be, for now.


