const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  for (let btn of lessonBtns) {
    btn.classList.remove("active");
  }
};

const loadLevelWord = (id) => {
  removeActive();
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");

      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  console.log(details.data);
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
                          <div class="">
                              <h2 class="text-2xl font-bold">
                                ${word.word} (  <i class="fa-solid fa-microphone-lines"></i> :  ${word.pronunciation})
                              </h2>
                              </div>
                              <div class="">
                                <h2 class="font-bold">Meaning</h2>
                                <p>
                                  ${word.meaning}
                                </p>
                              </div>
                              <div class="">
                                <h2 class="font-bold">Sentence</h2>
                                <p>
                                  ${word.sentence}
                                </p>
                              </div>
                              <div class="">
                                <h2 class="text-2xl font-bold">Synonym</h2>
                                <span class="btn">syn1</span>
                                <span class="btn">syn2</span>
                                <span class="btn">syn3</span>
                        </div>
                          `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `<div
                                    class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla"
                                    >
                                    <img class = "mx-auto" src = "./assets/alert-error.png" />
                                    <p class="text-xl font-medium text-gray-600">
                                        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                                    </p>
                                    <p class="font-bold text-2xl">নেক্সট Lesson এ যান।</p>
                                </div>`;
  }

  for (let word of words) {
    console.log(word);
    const div = document.createElement("div");
    div.innerHTML = /* html */ `<div
                        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
                        >
                        <h2 class="font-bold text-2xl">${word.word ? word.word : "No Data Found"} </h2>
                        <p class="font-semibold">Meaning /Pronunciation</p>
                        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "No Meaning Found"} /
                         ${word.pronunciation ? word.pronunciation : "No Pronunciation Found"}"</div>
                        <div class="flex justify-between items-center">
                            <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                            <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                            <i class="fa-solid fa-volume-high"></i>
                            </button>
                        </div>
                    </div>`;
    wordContainer.append(div);
  }
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = /* html */ `<button id='lesson-btn-${lesson.level_no}' onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                        <img src="./assets/fa-book-open.png" alt="" /> Lesson - ${lesson.level_no}
                        </button>`;

    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
