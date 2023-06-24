import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase,ref,set,push,onValue,get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhHUQpCM0S8uceoc1hzS1AQkebxp1ql7E",
  authDomain: "quiz-database-d4ee0.firebaseapp.com",
  projectId: "quiz-database-d4ee0",
  storageBucket: "quiz-database-d4ee0.appspot.com",
  messagingSenderId: "1043518986510",
  appId: "1:1043518986510:web:57b4979763cb5a6a221f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

var homeSection = document.getElementById("homeSection")
var htmlques = document.getElementById("htmlques")
var myquestion = document.getElementById("myquestion")
var answer = document.getElementById("answer")
var next = document.getElementById("next")
var back = document.getElementById("Back")
var total_ques = document.getElementById("total_ques")
var score = document.getElementById("result")
var T_score = document.getElementById("T_score")
var htmlbtn=document.getElementById("htmlbtn")
back.disabled = true
// html quiz object
var htmlobj = [
    {
        question: "What does HTML stand for ?",
        hopt: ["a) Hyper Text Markup Language", "b) Home Tool Markup Language", "c) Hyperlinks and Text Markup Language", "d) High Tech Markup Language"],
        c_option: "a) Hyper Text Markup Language"
    },
    {
        question: "Which HTML element is used to define the main heading of a document ?",
        hopt: ["a) h1", "b) header", "c) heading", "d) main"],
        c_option: "a) h1"
    },
    {
        question: "Which attribute is used to specify a unique identifier for an HTML element ?",
        hopt: ["a) class", "b) id", "c) name", "d) src"],
        c_option: "b) id"
    },
    {
        question: "How do you create a hyperlink in HTML",
        hopt: ["a) link", "b) a", " c) hyperlink", " d) url"],
        c_option: "b) a"
    },
    {
        question: "Which tag is used to insert an image in HTML",
        hopt: ["a) img", "b) image", "c) picture", "d) src"],
        c_option: "a) img"
    },
]
var indexval=0
var obj
function htmlquiz() {
    homeSection.style.display = "none";
    htmlques.style.display = "block";
    // Generate a new unique key
    var newQuizRef = push(ref(database, "htmlquiz/"));
    var newQuizKey = newQuizRef.key;
     
    // Get the question object based on the current question index
     obj = htmlobj[indexval]; // Replace 0 with the actual question index you want to push
  
    // Set the question object at the new location using the generated key
    set(ref(database, `htmlquiz/${newQuizKey}`), htmlobj)
      .then(() => {
       myquestion.innerHTML=obj.question
       total_ques.innerHTML=indexval+1
       answer.innerHTML = ""
    for (var i = 0; i < obj.hopt.length; i++) {
        //  console.log(obj.hopt[i])
        answer.innerHTML += `<div class="col-sm-12 col-lg-8">
        <div class="w-100 optionbtn">
        <button class=" btn myoption btn mb-3 w-75" onclick="checkAns('${obj.c_option}','${obj.hopt[i]}')"> ${obj.hopt[i]} </button>
        </div>   
    </div>`
    }
      })
      
  }
  
  htmlbtn.addEventListener("click", htmlquiz);
  
// var indexval = 0
// var obj, option

function nextbtn() {
    indexval++
    back.disabled = false

    if (indexval == htmlobj.length) {
        yscore()
        console.log("hello")
    }
    htmlquiz()
}
next.addEventListener('click',nextbtn)

var mark = 0
window.checkAns=function(a,b){
    var submitref=push(ref(database,"yourAns/"))
    var submit_id=submitref.key
    set(ref(database, `yourAns/${submit_id}`),b)
    if(a==b){
        mark=mark+1
        console.log(mark)
    }
    nextbtn()
}

back.addEventListener('click', function () {
    indexval--
    if (indexval == 0) {
        back.disabled = true
    }
    htmlquiz()
})
var playbtn
function yscore() {
    htmlques.classList.add("hide")
    score.style.display = "block"

    var markgain=push(ref(database,"score/"))
    var tscore_id=markgain.key
    set(ref(database,`score/ ${tscore_id}`),mark)
    T_score.innerHTML=mark
    next.style.display = "none"

    playbtn = document.createElement("button");
    playbtn.classList.add("playbtn");
    playbtn.innerHTML = "Play Again";

    playbtn.addEventListener('click', function () {
        window.location.href = "./quiz1.html";
    });

    score.appendChild(playbtn);
}





