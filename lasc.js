/*
    READING THIS CODE MIGHT CAUSE YOU SEVER HEADACHE!
    YOU HAVE BEEN WARNED!




*/

function opendc() {
    window.open('https://discord.com/users/835619561079963699', '_blank')   
};

function deletereply() {
    document.querySelectorAll(".searchreply").forEach(del => del.remove());
};

function loadChart(p, m, t) {
  const ctx = document.getElementById('damageChart').getContext('2d');
  const damageChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Physical', 'Magic', 'True'],
      datasets: [{
        data: [p, m, t],
        backgroundColor: ['#FF6384', '#36A2EB', '#ffffff'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

function searchss() {

    const input = search.value.trim();

    if (input !== "") {
        const region = document.getElementById("region").value;
        const name = document.getElementById("summonername").value;

        const amount = (name.match(/#/g) || []).length;
  
        if (amount === 1) {
            const parts = name.split("#");
  
            const summoner = parts[0];
            const tag = parts[1];

            if(summoner && tag) {
                deletereply();
                resize();
                getstats(summoner, tag, region)
            }
        }
    }
}

function toggle() {

    if(state == true) {
        state = false;
        document.getElementById("toggle").textContent = "Total Stats";
        document.getElementById("total").textContent = stats.totaldamage;
        document.getElementById("physical").textContent = stats.totalphysical;
        document.getElementById("magic").textContent = stats.totalmagic;
        document.getElementById("true").textContent = stats.totaltrue;
        document.querySelectorAll(".statText").forEach(text =>
          text.textContent = text.textContent.replace("Average", "Total")
        )
    } else {
        state = true;
        document.getElementById("toggle").textContent = "Average Stats";
        document.getElementById("total").textContent = stats.avgdamage;
        document.getElementById("physical").textContent = stats.avgphysical;
        document.getElementById("magic").textContent = stats.avgmagic;
        document.getElementById("true").textContent = stats.avgtrue;
        document.querySelectorAll(".statText").forEach(text =>
          text.textContent = text.textContent.replace("Total", "Average")
        )
    }
}

function deleteLoad() {
    document.querySelectorAll(".loading").forEach(del => del.remove());
}

function fetching() {
    let loading = document.createElement("p");
    let gif = document.createElement ("img");

    loading.textContent = "Fetching Stats...";
    gif.src = "./img/loading.gif";


    loading.classList.add("loading");
    gif.classList.add("loading");

    document.getElementById("reply").appendChild(loading, gif);
}

async function getstats(summoner, tag, region) {

    fetching();

    let answer = [];
    try {
        const values = await fetch(`https://lascv2.tgyue.workers.dev/?summoner=${summoner}&tag=${tag}&region=${region}`)

        stats = await values.json()
        console.log(stats);

        if(!stats.error) {

          let answer1 = document.createElement("p");
          let answer2 = document.createElement("p");
          let answer3 = document.createElement("p");
          let answer4 = document.createElement("p");
          let answer5 = document.createElement("p");
          let answer6 = document.createElement("p");
          let answer7 = document.createElement("p");
          let answer8 = document.createElement("p");
          let answer101 = document.createElement("canvas");
          let answer102 = document.createElement("canvas");
          let button = document.createElement("button");
          let br = document.createElement("br");

          answer1.innerHTML = `${summoner}#${tag}'s Stats from the past ${stats.games} games:</br>`;
          answer2.innerHTML = `<p class="statText">Total Damage: </p><span class="stat" id="total">${stats.totaldamage}</span></br>`;
          answer3.innerHTML = `<p class="statText">Total Physical Damage: </p><span class="stat" id="physical">${stats.totalphysical}</span></br>`;
          answer4.innerHTML = `<p class="statText">Total Magic Damage: </p><span class="stat" id="magic">${stats.totalmagic}</span></br>`;
          answer5.innerHTML = `<p class="statText">Total True Damage: </p><span class="stat" id="true">${stats.totaltrue}</span></br>`;
          answer6.innerHTML = `<p class="statText">Highest Damage dealt: </p><span class="stat2">${stats.highest}</span></br>`;
          answer7.innerHTML = `<p class="statText">Lowest Damage dealt: </p><span class="stat2">${stats.lowest}</span></br>`;
          answer8.innerHTML = `<p class="statText">% of All Damage dealt: </p><span class="stat2">${Math.floor(stats.totaldamage / stats.alldamage *1000) / 10}%</span>`
          button.textContent = "Total Stats";

          answer1.classList.add("searchreply", "searchreply1");
          answer2.classList.add("searchreply");
          answer3.classList.add("searchreply");
          answer4.classList.add("searchreply");
          answer5.classList.add("searchreply");
          answer6.classList.add("searchreply");
          answer7.classList.add("searchreply");
          answer8.classList.add("searchreply");
          answer101.classList.add("searchreply", "chart");
          answer102.classList.add("searchreply", "chart2");
          button.classList.add("toggle", "searchreply");

          answer101.id = "damageChart";
          answer102.id = "compareChart";
          button.id = "toggle";
          button.onclick = toggle;

          answer = [answer1, answer2, answer3, answer4, answer5, br, answer6, answer7, answer8, answer101, answer102, button];

          deleteLoad()            

          answer.forEach(element => document.getElementById("reply").appendChild(element));

          loadChart(stats.totalphysical, stats.totalmagic, stats.totaltrue);
          loadChart2(stats.totaldamage, stats.alldamage - stats.totaldamage);
        } else {
          let answer1 = document.createElement("p");
          let answer2 = document.createElement("p");

          answer1.textContent = `Error searching for "${summoner}#${tag}"`;
          answer2.textContent = `${stats.error}`;
          answer1.classList.add("searchreply", "error", "searchreply1");
          answer2.classList.add("searchreply", "error");

          answer = [answer1, answer2]

          deleteLoad()

          answer.forEach(element => document.getElementById("reply").appendChild(element));
        }
    } catch(err) {
      console.log("ERROR WHY?????????? qwq ;-; :(\n" + err);
    }
}

function resize() {
    document.getElementById("input").style.top = "5%";
    document.getElementById("reply").style.display = "block";
};

function loadChart2(you, other) {
  const ctx = document.getElementById('compareChart').getContext('2d');
  const damageChart= new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Your Damage', 'All Other Players Damage'],
      datasets: [{
        data: [you, other],
        backgroundColor: ['#a0ffa0', '#999999'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

let state = false; // is total

let stats = {};

const search = document.getElementById("summonername");

search.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchss();
    }
  });
