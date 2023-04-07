const btnAdd = document.querySelector('.btn-add');
const btnClose = document.querySelector('.btn-close');
const form = document.querySelector('.fact-form');
const overlay = document.querySelector('.overlay');
const factsList = document.querySelector('.facts-list');

btnAdd.addEventListener('click', function () {
  form.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

btnClose.addEventListener('click', function () {
  form.classList.add('hidden');
  overlay.classList.add('hidden');
});

factsList.innerHTML = '';

async function loadData() {
  const res = await fetch(
    'https://gpurkfdwpahrgmcglvty.supabase.co/rest/v1/data',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwdXJrZmR3cGFocmdtY2dsdnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjg4OTUsImV4cCI6MTk4ODgwNDg5NX0.dTpFELWvDq5exBdGhzCzdTmoM1V7S986BC8Up7yTzEk',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwdXJrZmR3cGFocmdtY2dsdnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjg4OTUsImV4cCI6MTk4ODgwNDg5NX0.dTpFELWvDq5exBdGhzCzdTmoM1V7S986BC8Up7yTzEk',
      },
    }
  );

  const data = await res.json();
  createFactsList(data);
}

loadData();

function createFactsList(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact">
        <div class="fact-wrap">
        <div class="fact__header">
            <span class="fact__label">${fact.category}</span>
            <a class="fact__link" href="${fact.link}"></a>
        </div>
        <p class="fact__copy">
            ${fact.description}
        </p>
        </div>
        <div class="btn-wrap">
        <button class="btn-vote">
            <span class="vote-icon--like"></span>${fact.like}
        </button>
        <button class="btn-vote">
            <span class="vote-icon--dislike"></span>${fact.dislike}
        </button>
        </div>
    </li>`
  );

  const html = htmlArray.join('');
  factsList.insertAdjacentHTML('afterbegin', html);
}
