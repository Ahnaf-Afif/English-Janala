const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  for (let word of words) {
    console.log(word);
    const div = document.createElement("div");
    div.innerHTML = `<p>Cat</p>`;
    wordContainer.append(div);
  }
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                        <img src="./assets/fa-book-open.png" alt="" /> Lesson - ${lesson.level_no}
                        </button>`;

    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
