// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL4UTaF3obiDswEHhHGcCM0R58QnaGsb0",
  authDomain: "quiz-app-for-fmp.firebaseapp.com",
  projectId: "quiz-app-for-fmp",
  storageBucket: "quiz-app-for-fmp.appspot.com",
  messagingSenderId: "124332727603",
  appId: "1:124332727603:web:7d07e620337a0a9594f246",
  measurementId: "G-G3EYRZ77Y6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

var quiz = [
  {
    question: 'Who invented Java Programming?',
    opt1: 'Dennis Ritchie',
    opt2: 'Guido van Rossum',
    opt3: 'Bjarne Stroustrup',
    opt4: 'James Gosling',
    correctAns: 'James Gosling'
  },
  {
    question: 'Is Java case sensitive?',
    opt1: 'True',
    opt2: 'False',
    opt3: 'May be true or false',
    opt4: 'Depends on Compiler',
    correctAns: 'True'
  },
  {
    question: 'Java was publicly released in?',
    opt1: '26-05-1995',
    opt2: '27-05-1995',
    opt3: '29-05-1997',
    opt4: '30-03-1998',
    correctAns: '27-05-1995'
  }
];

var questionElement = document.getElementById('quiz-box');
var optionsElement = document.getElementById('options');
var NextButton = document.getElementById('Next');

var currentQuestionIndex = 0;
var score = 0;

function loadQuestion() {
  questionElement.textContent = quiz[currentQuestionIndex].question;
  optionsElement.innerHTML = '';
  for (var i = 1; i <= 4; i++) {
    var option = quiz[currentQuestionIndex]['opt' + i];
    var optionElement = document.createElement('button');
    optionElement.textContent = option;
    optionElement.setAttribute('value', option);
    optionElement.addEventListener('click', handleAnswer);
    optionsElement.appendChild(optionElement);
  }
}

function handleAnswer(event) {
  var selectedOption = event.target.value;
  if (selectedOption === quiz[currentQuestionIndex].correctAns) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    loadQuestion();
  } else {
    showResult();
    // After the quiz is completed, send the data to the Realtime Database
    sendDataToDatabase();
  }
}

function showResult() {
  questionElement.textContent = 'Quiz Completed!';
  optionsElement.innerHTML = '';
  var resultElement = document.createElement('p');
  resultElement.textContent = 'Your score: ' + score + '/' + quiz.length;
  optionsElement.appendChild(resultElement);
}

NextButton.addEventListener('click', loadQuestion);


function sendDataToDatabase() {

  const quizRef = ref(database, 'quizzes');

  set(quizRef, quiz);
}


loadQuestion();
