const spreadsheetsID = "spreadsheetsID";
const listName = "listName";
const googleAPIsheetKEY = "googleAPIsheetKEY";

const colors = [
  "bg-red-500",
  "bg-yellow-400",
  "bg-green-600",
  "bg-sky-600",
  "bg-emerald-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-slate-600",
  "bg-lime-600",
  "bg-zinc-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-pink-600",
  "bg-rose-600",
];
let maxScore = 0;

class Team {
  constructor(name, data, id) {
    this.id = id;
    this.name = name;
    this.score = 0;

    data.forEach((value) => {
      this.score += value[0];
    });
    if (this.score > maxScore) maxScore = this.score;

    this.data = data;
  }
}

function printTeam(team) {
  let viewHeight = window.innerHeight * 0.5;
  let outHtml = `
    <div class="flex flex-col justify-end">
      <h2 class="text-xl">${team.name}</h2>
      <div class="${colors[team.id]} w-auto text-white flex justify-center items-end text-xl font-mono" style="height: ${
        viewHeight * (team.score / maxScore)
      }px; min-height: 2rem;">${team.score} b</div>
    </div>
  `;
  return outHtml;
}

async function render() {
  /* Fetch data */
  const data = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsID}/values/${listName}?key=${googleAPIsheetKEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.warn("Fetch warning", err));

  // console.log(data);

  let outHtml = ""; // output html string

  for (let col = 0; col < data.values[0].length; col += 2) {
    let log = new Array();
    for (let row = 1; row < data.values.length; ++row) {
      if (data.values[row][col] === undefined) break;
      log.push([parseInt(data.values[row][col]), data.values[row][col + 1]]);
    }
    /* Create a team */
    const team = new Team(data.values[0][col], log, col/2);
    console.log(team);

    /* Add team html string */
    outHtml += printTeam(team);
  }

  /* Redner data */
  const app = document.getElementById("app");
  app.innerHTML = outHtml;
}

render();
