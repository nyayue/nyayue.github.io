function opendc() {
    window.open('https://discord.com/users/835619561079963699', '_blank')   
};

function deletereply() {
    document.querySelectorAll("p.searchreply").forEach(del => del.remove());
};

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

async function getstats(summoner, tag, region) {

    let stats = {};
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
            let answer9 = document.createElement("p");
            let answer10 = document.creatElement("canvas");

            answer1.textContent = `${summoner}#${tag}'s Stats from the past 18 games:`;
            answer2.textContent = `Total Damage: ${stats.totaldamage}`;
            answer3.textContent = `Total True Damage: ${stats.totaltrue}`;
            answer4.textContent = `Total Physical Damage: ${stats.totalphysical}`;
            answer5.textContent = `Total Magic Damage: ${stats.totalmagic}`;
            answer6.textContent = `Average Damage: ${stats.avgdamage}`;
            answer7.textContent = `Average True Damage: ${stats.avgtrue}`;
            answer8.textContent = `Average Physical Damage: ${stats.avgphysical}`;
            answer9.textContent = `Average Magic Damage: ${stats.avgmagic}`;

            answer1.classList.add("searchreply", "searchreply1");
            answer2.classList.add("searchreply");
            answer3.classList.add("searchreply");
            answer4.classList.add("searchreply");
            answer5.classList.add("searchreply");
            answer6.classList.add("searchreply");
            answer7.classList.add("searchreply");
            answer8.classList.add("searchreply");
            answer9.classList.add("searchreply");
            answer10.classList.add("searchreply", "chart");

            answer10.id = "damageChart";

            answer = [answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10];
        } else {
            let answer1 = document.createElement("p");
            let answer2 = document.createElement("p");

            answer1.textContent = `Error searching for "${summoner}#${tag}"`;
            answer2.textContent = `${stats.error}`;
            answer1.classList.add("searchreply", "error", "searchreply1");
            answer2.classList.add("searchreply", "error");

            answer = [answer1, answer2]
        }
        answer.forEach(element => document.getElementById("reply").appendChild(element));
    } catch(err) {
            console.log("ERROR WHY??????????\n" + err);
    }
}

function resize() {
    document.getElementById("input").style.top = "5%";
    document.getElementById("reply").style.display = "block";
};

const search = document.getElementById("summonername");

search.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchss();
    }
  });
