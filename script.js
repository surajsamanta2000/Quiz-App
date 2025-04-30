let customQuestions = [];

function addQuestion() {
  const question = document.getElementById("question").value.trim();
  const option1 = document.getElementById("option1").value.trim();
  const option2 = document.getElementById("option2").value.trim();
  const option3 = document.getElementById("option3").value.trim();
  const correct = document.getElementById("correct").value.trim();

  if (!question || !option1 || !option2 || !option3 || !correct) {
    alert("Please fill all fields");
    return;
  }

  const options = [option1, option2, option3];
  customQuestions.push({ question, options, answer: correct });

  // Clear fields
  document.getElementById("question").value = "";
  document.getElementById("option1").value = "";
  document.getElementById("option2").value = "";
  document.getElementById("option3").value = "";
  document.getElementById("correct").value = "";

  alert("✅ Question added!");
}

function startQuiz() {
  if (customQuestions.length === 0) {
    alert("Please add at least one question.");
    return;
  }

  document.getElementById("formSection").style.display = "none";
  document.getElementById("quizSection").style.display = "block";
  loadQuiz();
}

function loadQuiz() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  customQuestions.forEach((q, index) => {
    const quizHTML = `
      <div class="mb-4">
        <h5 class="text-primary">${index + 1}. ${q.question}</h5>
        ${q.options
          .map(
            (option) =>
              `<div><label><input type="radio" name="q${index}" value="${option}" /> ${option}</label></div>`
          )
          .join("")}
      </div>
    `;
    container.innerHTML += quizHTML;
  });
}

function submitQuiz() {
  let score = 0;

  customQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  const result = document.getElementById("result");
  result.classList.remove("d-none");
  result.innerText = `🎯 You scored ${score} out of ${customQuestions.length}`;
}
