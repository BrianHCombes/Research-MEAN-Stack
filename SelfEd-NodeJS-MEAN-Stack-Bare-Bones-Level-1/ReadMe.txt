SelfEd Date: 		04/22/2017

SelfEd Title:           SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-1

SelfEd Objective:       To offer "Bare Bones" working MEAN stack examples.
                        Starting with a very primitive example and expanding 
                        to more complex examples. This SelfEd shows how to
                        exchange data between the Angular side (client) and
                        the server side (middleware using nodeJS)

SelfEd Catalyst:        Had a lot of trouble getting data retrieval
                        from a node server to an Angular app to work. After almost
                        three days of in depth investigation found out I
                        had a bad/old Express module. Upon installing an
                        up to date Express module, everything started to 
                        work.
                            04/29/2017 Note: Also see Server Launch Directions
                            below for the more sensible way to get your modules
                            up to date.
                        Note: After doing an npm install delete the Express
                        module from the node_modules directory and install
                        an up to date Express module as such:
                        < npm install express -g > 
                        You will need to copy and paste the Express module from
                        it's placed location as indicated by the CLI after it's
                        installed.
                        Reference the ReadMe.txt file in:
                        < SelfEd-NodeJS-MEAN-Stack-Tutorial-Exp_1 > for more 
                        details.
                        Now that I have a simple working example I want to
                        expand on this in consecutive examples. The bad
                        experience is the catalyst to make sure I have 
                        every stone turned over as I fill out my MEAN stack
                        knowledge base.
SelfEd References:
    
    https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
        (These SelfEds are based on the code structure offered by the scotch.io
        tutorial above. Credit also goes to the tutorial for being a helpful
        presentation on the subject of connecting the layers)
    https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4    
    https://github.com/scotch-io/node-todo
    https://www.tutorialspoint.com/nodejs/index.htm
    SelfEd-NodeJS-RESTful-API

*******************************************************************************
Server Launch Directions:
Assure nodeJS and an up-to-date Express module are installed. You can make sure
all your needed dependencies are up to date by setting up your package.json
file's dependencies as follows, for example, use the word < latest >:
< 
        "dependencies": {
            "ejs": "latest",
            "express": "latest"
        }
>
before you run < npm install >. Also, if you have to install a module after the
fact do it like this < npm install 'module_name' -- save >. The save part will
add that module to your dependency list in your package.json file automatically. 

From the CLI and the folder your server file is in:
Type and Enter: node myServerFilename.js
Copy and Paste the resultant URL (in the CLI) into your browser window.
The page should launch. 

Here's an example from the CLI:
Enter: node server.js
You should see: App listening on port 8080 -> Enter the following in your browser: 
            ------------------------------------- http://127.0.0.1:8080/index.html 
Copy and paste the URL into your browser 
*******************************************************************************

Process:

04/22/2017
Example publicA:
    Method: RESTful GET API - Return an object
    This is the opening example and is a primitive RESTful GET API. It is 
copied from < SelfEd-NodeJS-MEAN-Stack-Tutorial-Exp_1 >. 
It requests and retrieves a JSON object described in the RESTful API GET service
in the routes.js file.

Example publicB:
    Method: RESTful GET API - Return an array of objects
    This example is the same as publicA but accesses a JSON array file instead of
a local JSON object using the nodeJS File System API. There are some
deprecated functions still used in the examples at:
< https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm > so be sure to
go to the nodeJS API: < https://nodejs.org/api/fs.html > to use the up to date
functions.

Example publicC:
    Method: RESTful GET API - Return an object of objects
    This example accesses a JSON object file (instead on an JSON object array)
You just have to get the < name.value > pair properly specified. Regardless,
ng-repeat on the client side increments through and displays all the objects
in the file just like it does with the object array.

Example publicD:
    Method: RESTful GET API - Return an array of objects with passed 
            parameters appended.
    This example accesses a JSON array file of objects using the nodeJS File 
    System API. The unique feature with this example is that parameters 
    are also passed from the client side file < publicDcore.js > 
    to the RESTful GET service in the
    < publicDroutes.js > file. The first parameter is a primitive and the second
    parameter is an object. See file: < publicDcore.js > to see the 
    parameters as passed with the route in the RESTful GET API. The parameters
    received are then appended to the data object and returned to the client
    side for display. SelfEd: 
    < SelfEd-NodeJS-RESTful-API with file: server_Exp3.js> was very helpful
    in getting the parameters working.

Example publicE: (4/24/2017)
    Method: RESTful GET API - Adding a record. Accesses a collection of objects 
    from file < publicEJSON1.json > and also passes an object as a route 
    parameter from the client side from file: < publicEcore.js >. 
            The passed object is appended to the object collection and then 
    returned to the client for display and also the added object is added to the 
    file < publicEJSON1.json >.

    Since there is asynchronous behavior going on I had to use a callback
    function called < writeData(dataA) > at the end of the fs.readFile 
    method so things would take place in proper order. This is perhaps
    the first inkling on what is called < callback hell >. I know there are
    new options in Angular to avoid callback hell but I'm not sure about
    nodeJS.

    Meanwhile, notice I've accomplished a write file operation with the 
    < nodeJS file system > within the RESTful GET API. So that leaves me 
    unclear on the difference between GET and POST - Seems crazy but maybe 
    it's OK to always use GET between the client and the server and use all the 
    < nodeJS file system RESTful API > methods between the server and the 
    database! But I'm going to use the < RESTful POST API > method in the
    next example to see if I can tell a end result difference


Example publicF: (4/26/2017)
    Method: RESTful POST API - Adding a record. Accesses a collection of objects 
    from file < publicFJSON1.json > and also passes an object as a route 
    parameter from the client side from file: < publicFcore.js >. The only
    difference is from publicE is using POST instead of GET.
            OK, I just swapped out < GET > with < POST > and all works exactly
    the same as it did in publicE! Again, it seems the goto place for file and
    data work is the nodeJS file system. It is true I'm adding a record and
    retrieving data all at the same time.

Example publicG: (4/26/2017)
    Method: RESTful DELETE API - Deleting a record. Accesses a collection of objects 
    from file < publicFJSON1.json > and also passes an object as a route 
    parameter from the client side from file: < publicFcore.js >. The passed
    parameter is meant to be the record to be deleted. 
            In reality, it's the same as the previous two examples. I simply
    use the < delete > command within the < fs.readFile > method and
    specify a record to delete.  I changed the < RESTful API > to < app.delete >
    on the route side and to < $http.delete > on the client side. But I know
    I could have used GET or POST and still been able to get the same result.

Summary:
I think it's time to incorporate a database into the mix since I'm feeling
comfy with the client-server connection right now.
























