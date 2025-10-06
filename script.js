
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureweight = document.getElementById("weight");
const creatureheight = document.getElementById("height");
const creaturetypes = document.getElementById("types");
const hpSpan = document.getElementById("hp");
const attackSpan = document.getElementById("attack");
const defenseSpan = document.getElementById("defense");
const spAttackSpan= document.getElementById("special-attack");
const spDefenseSpan = document.getElementById("special-defense");
const speedSpan = document.getElementById("speed");
const specialContainer = document.getElementById("special");
specialContainer.innerHTML = "";


const fetchCreature = async (query) => {
    try {
        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`);
        if (!res.ok) { // Si la criatura no existe
            alert("Creature not found");
            return;
        }
        const data = await res.json();
        showCreature(data);
    } catch (err) {
        console.error(err);
    }
};



searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    fetchCreature(query);
});


const showCreature=(creature)=>{
    const {height,id,name,special,stats,types,weight} = creature

    creatureName.textContent=name
    creatureId.textContent=`#${id}`
    creatureweight.textContent=weight
    specialContainer.innerHTML = ""; // limpiar antes
    const specialArr = Array.isArray(special) ? special : [special];
    specialArr.forEach(sp => {
        const p = document.createElement("p");
        p.textContent = `${sp.name}: ${sp.description}`;
        specialContainer.appendChild(p);
    });
    creatureheight.textContent=height
    creaturetypes.innerHTML = ""; // limpiar entre búsquedas
    types.forEach(t => {
        const span = document.createElement("span");
        span.textContent = t.name.toUpperCase();
        creaturetypes.appendChild(span);
    });
    stats.forEach(stat => {
    const name = stat.name.toLowerCase();
    switch(name){
        case "hp": 
            hpSpan.textContent = stat.base_stat; 
            break;
        case "attack": 
            attackSpan.textContent = stat.base_stat; 
            break;
        case "defense": 
            defenseSpan.textContent = stat.base_stat; 
            break;
        case "special-attack": 
            spAttackSpan.textContent = stat.base_stat; 
            break;
        case "special-defense": 
            spDefenseSpan.textContent = stat.base_stat; 
            break;
        case "speed": 
            speedSpan.textContent = stat.base_stat; 
            break;
    }
});

}