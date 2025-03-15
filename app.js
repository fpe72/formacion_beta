// Simulación de usuarios (para desarrollo)
const users = {
    "trabajador": "password123"
};

// Contenido formativo (8 capítulos)
const chapters = [
    "Capítulo 1: Introducción a la seguridad alimentaria",
    "Capítulo 2: Normativas legales",
    "Capítulo 3: Manipulación de alimentos",
    "Capítulo 4: Almacenamiento",
    "Capítulo 5: Higiene personal",
    "Capítulo 6: Control de plagas",
    "Capítulo 7: Auditorías",
    "Capítulo 8: Casos prácticos"
];

// Examen (preguntas y respuestas)
const exam = [
    {
        question: "¿Es obligatorio el uso de guantes en la manipulación de alimentos?",
        answers: ["Sí", "No"],
        correct: 1 // Índice de la respuesta correcta (No)
    },
    {
        question: "¿Cada cuánto tiempo debe renovarse el certificado?",
        answers: ["1 año", "2 años", "5 años"],
        correct: 0
    }
];

let currentChapter = 0;

// Función de login básico
function login() {
    const password = document.getElementById("password").value;
    if (password === users.trabajador) {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("content-section").classList.remove("hidden");
        loadChapter();
    } else {
        document.getElementById("login-error").textContent = "Contraseña incorrecta";
    }
}

// Carga capítulos
function loadChapter() {
    document.getElementById("chapter-content").textContent = chapters[currentChapter];
    updateProgress();
}

// Actualiza barra de progreso
function updateProgress() {
    const progress = (currentChapter + 1) / chapters.length * 100;
    document.getElementById("progress").style.width = `${progress}%`;
}

// Siguiente capítulo
function nextChapter() {
    currentChapter++;
    if (currentChapter < chapters.length) {
        loadChapter();
    } else {
        document.getElementById("content-section").classList.add("hidden");
        document.getElementById("exam-section").classList.remove("hidden");
        loadExam();
    }
}

// Carga preguntas del examen
function loadExam() {
    const container = document.getElementById("question-container");
    container.innerHTML = exam.map((q, index) => `
        <div class="question">
            <p>${index + 1}. ${q.question}</p>
            ${q.answers.map((a, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${i}">
                    ${a}
                </label>
            `).join("")}
        </div>
    `).join("");
}

// Enviar examen
function submitExam() {
    let correctAnswers = 0;
    exam.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            correctAnswers++;
        }
    });

    const resultElement = document.getElementById("result");
    if (correctAnswers >= exam.length * 0.8) { // 80% para aprobar
        resultElement.textContent = "¡Aprobado! Generando diploma...";
        // Generar diploma (simulación)
        setTimeout(() => alert("Diploma descargado"), 1000);
    } else {
        resultElement.textContent = "Reprueba. Inténtalo de nuevo.";
    }
}
