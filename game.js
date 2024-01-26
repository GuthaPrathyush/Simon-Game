let level = 1;
let colors = ['R', 'G', 'B', 'Y'];
let colorsContainer = [document.querySelector("#red"), document.querySelector("#green"), document.querySelector("#blue"), document.querySelector("#yellow")];
let Sequence = [];
let playing = false;



const Sequencing = index => {
    let time = (100-level)*5;
    return new Promise((resolve, reject) => {
        colorsContainer[index].classList.add(`active${index}`);
        setTimeout(() => {
            colorsContainer[index].classList.remove(`active${index}`);
        }, time);
        setTimeout(() => {
            resolve();
        }, time*2);
    });
}



document.getElementById("start").addEventListener("click", async () => {
    if(!playing) {
        resetMem();
        do {
            getColor();
            console.log(Sequence);
            await makeSequence();
            await Play().catch(() => {
                document.querySelector("#Level").textContent = `Game Over! Your Score is ${level}`;
            });
            if(!playing) {
                break;
            }
            level++;
            document.querySelector("#Level").textContent = `Level ${level}`;
            await waitForASec();
        }while(playing);
    }
});

async function waitForASec() {
    return new Promise((resolve, reject) => {
        let time = (100-level)*5;
        setTimeout(() => {
            resolve();
        }, time);
    })
}

function getColor() {
    let rand = Math.floor(Math.random()*4);
    Sequence.push(colors[rand]);
}

function resetMem() {
    level = 1;
    document.querySelector("#Level").textContent = `Level ${level}`;
    document.querySelector("#Level").style.visibility = "visible";
    Sequence = [];
    playing = true;
    document.querySelector("#start").textContent = "Restart";
}

async function makeSequence() {
    return new Promise(async (resolve, reject) => {
        let time = (100 - level) * 5;
        time /= 2;
        for (let color of Sequence) {
            for (let i = 0; i < 4; i++) {
                await isEqual(color, i);
            }
        }
        resolve();
    });
}


async function Play() {
    return new Promise((resolve, reject) => {
        let userIndex=0;
        document.querySelectorAll(".box").forEach(box => {
            box.addEventListener("click", function() {
                if(this.getAttribute("Color") === Sequence[userIndex]) {
                    userIndex++;
                    if(userIndex == Sequence.length) {
                        userIndex = 0;
                        resolve();
                    }
                }
                else {
                    playing = false;
                    reject();
                }
            });
        });
        console.log(userIndex);
    });
}

async function isEqual(color, index) {
    if(color === colors[index]) {
        await Sequencing(index);
    }
}
