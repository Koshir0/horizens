var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/afaqapp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'))

// SCHEMA SETUP
var afaqSchema = new mongoose.Schema({
   image: String,
   description: String
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String
 });

var Afaq = mongoose.model("Afaq", afaqSchema);

var User = mongoose.model("User", userSchema);


// Afaq.create(
//      {
          
//          image: "file:///C:/Users/koshi/Downloads/templated-intensify/images/afaqafteredit.png",
//          description: "Afaq logo."
         
//      },
//      function(err, afaq){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED Pic: ");
//           console.log(afaq);
//       }
//     });

// User.create(
//     {
            
//         username: "Afaqalreada",
//         password: "5g*#pXLYy9PxQ(jb"
        
//     },
//     function(err, username){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED username: ");
//             console.log(username);
//         }
//     });

    
app.get("/", function(req, res){
    // Get all campgrounds from DB
    Afaq.find({}, function(err, allAfaqs){
        if(err){
            console.log(err);
        } else {
         //    console.log(allAfaqs)
           res.render("index",{allAfaqs:allAfaqs});
        }
     });
    
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    username = req.body.username
    password = req.body.password
    if (username === "Afaqalreada" && password === "5g*#pXLYy9PxQ(jb"){
        res.render("addnewpic")
        // res.render("profile")

    } else{
        res.render("login")
    }
});

//galary - show all 
app.get("/galary", function(req, res){
    // Get all pics from DB
    Afaq.find({}, function(err, allAfaqs){
       if(err){
           console.log(err);
       } else {
        //    console.log(allAfaqs)
          res.render("galary",{allAfaqs:allAfaqs});
        //   res.render("galary");

       }
    });
});

// app.get("/addnewpic", function(req, res){
    
//    res.render("addnewpic")
    
// });
//NEW - show form to create new campground
app.post("/addnewpic", function(req, res){
    var image = req.body.image;
    var desc = req.body.description;
    var newPic = { image: image, description: desc}
    // Create a new pic and save to DB
    Afaq.create(newPic, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            Afaq.find({}, function(err, allAfaqs){
                if(err){
                    console.log(err);
                } else {
                 //    console.log(allAfaqs)
                   res.render("galary",{allAfaqs:allAfaqs});
         
                }
             });
            // console.log(newlyCreated)
        }
    });
});







// app.listen(3000, "localhost", function(){
//    console.log("The AfaqAlreada Server Has Started!");
// });

app.listen(process.env.PORT, process.env.IP);