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

var cssobj = [
    {
      question: "What does CSS stand for?",
      hopt: [
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
      ],
      c_option: "Cascading Style Sheets"
    },
    {
      question: "Which CSS property is used to change the background color of an element?",
      hopt: ["Color", "Background-color", "Text-color", "Background"],
      c_option: "Background-color"
    },
    {
      question: "Which CSS property is used to set the text color of an element?",
      hopt: ["Color", "Text-color", "Font-color", "Text"],
      c_option: "Color"
    },
    {
      question: "Which CSS property is used to set the font size of an element?",
      hopt: ["Font-size", "Text-size", "Font-style", "Size"],
      c_option: "Font-size"
    },
    {
      question: "Which CSS property is used to set the margin around an element?",
      hopt: ["Margin", "Padding", "Border", "Spacing"],
      c_option: "Margin"
    }
  ];

  var mark = 0;
  var obj
  var indexval=0
  var cssques = document.getElementById("cssques");
  var myquestion = document.getElementById("myquestion");
  var answer = document.getElementById("answer");
  var total_ques = document.getElementById("total_ques");
  var score = document.getElementById("result");
  var T_score = document.getElementById("T_score");
  var back = document.getElementById("Back");
  var Next = document.getElementById("Next");
  back.disabled=false

  var obj
  var indexval=0
  function cssquiz() {
    // Generate a new unique key
    var cssQuizRef = push(ref(database, "cssquiz/"));
    var cssQuizKey = cssQuizRef.key;
     
    // Get the question object based on the current question index
     obj = cssobj[indexval]; // Replace 0 with the actual question index you want to push
  
    // Set the question object at the new location using the generated key
    set(ref(database, `cssquiz/${cssQuizKey}`), cssobj)
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
  function nextbtn() {
    indexval++
    back.disabled = false

    if (indexval == cssobj.length) {
        yscore()
        console.log("hello")
    }
    cssquiz()
}
Next.addEventListener('click',nextbtn)

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
    cssquiz()
})
var playbtn
function yscore() {
    cssques.classList.add("hide")
    score.style.display = "block"

    var markgain=push(ref(database,"score/"))
    var tscore_id=markgain.key
    set(ref(database,`score/ ${tscore_id}`),mark)
    T_score.innerHTML=mark
    Next.style.display = "none"

    playbtn = document.createElement("button");
    playbtn.classList.add("playbtn");
    playbtn.innerHTML = "Play Again";

    playbtn.addEventListener('click', function () {
        window.location.href = "./quiz1.html";
    });

    score.appendChild(playbtn);
}



  cssquiz()