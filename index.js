var express = require("express")
var bodyParser = require("body-parser")
require('dotenv').config();
const ejs = require("ejs");

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'));
/* app.use(bodyParser.urlencoded({
    extended:true
})) */

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
//const {URI} = process.env;
let mongoose = require('mongoose');
mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connecting to Database"));

var courseSchema = new mongoose.Schema({
    CourseId: {type: String},
    courseName: {type: String},
    topic: {type: String}
},{collection: 'courses'}
);

var Course = mongoose.model("Course", courseSchema);



app.get("/", async (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    const allCourses = await Course.find().distinct('courseName'); 
      try {
        console.log("Sent CourseID to index.ejs");
        return res.render("index", { courses: allCourses, coursesdb: Course });
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
    
  })


app.post('/course', urlencodedParser, async function(req,res){
    var selectedcourse = req.body.courseselecting;
    console.log('selected course is:'+selectedcourse);
    if (selectedcourse){
        const topics_prob = await Course.find({courseName: selectedcourse},{ _id:0, topic:1});
        const tupleString = topics_prob[0].topic;
      
        // Remove the surrounding parentheses from the string
        const cleanedString = tupleString.replace(/[()']/g, '');

        // Split the cleaned string into topics and values parts
        const [topicsPart, valuesPart] = cleanedString.split('], [');

        // Remove the leading square bracket from topicsPart
        const topics = topicsPart.slice(1).split(', ');

        // Parse the values part into an array
        const values = valuesPart.split(', ').map(parseFloat);

        // Combine the topics and values arrays into an array of arrays
        const arrayResult = [topics, values];

        console.log(topics);


        res.render("topics", { selectedcourse: selectedcourse, topicsofcourse: topics, probsofcourse: values});
      //res.send(topic);
  }
})

app.listen(3000);
  

console.log("listening on PORT 3000");    