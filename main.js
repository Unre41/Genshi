document.getElementById("calc").classList.add("hidden");


let pers = [...document.getElementsByClassName("character-cell")];

pers.forEach(char => {
    char.addEventListener("click", function(){openCalc(char)})
});

var currentChar;
var elemToClone = document.getElementById("weapons-table-tr").cloneNode(true);
var table = document.getElementById("table-body");
table.removeChild(table.children[0])

function openCalc(pers) {
    if (weaponsJSON == undefined) {
        alert("ЖДИ НАХУЙ НЕ ЗАГРУЗИЛОСЬ ЕЩЕ")
        return
    }

    
    currentChar = charsJSON.find(x => x.id == pers.children[0].children[0].getAttribute("src").slice(25, -4))

    var rusName = currentChar.name
    var engName = currentChar.id

    
    var heroSelectedImg = document.getElementById("hero-img")
    var heroSelectedName = document.getElementById("char-name")

    heroSelectedImg.setAttribute("src", 'static/images/characters/full/' + engName + '.png')
    heroSelectedName.innerText = rusName

    attackDMG.innerText = Math.floor(currentChar.atk[96])
    weaponDMG.innerText = 0

    document.getElementById("container").classList.add("hidden")
    document.getElementById("calc").classList.remove("hidden")
    
    loadWeapons()
}

function loadWeapons() {

    
    console.log()


    weapons.forEach(weapon => {
        
        
        

        if (weaponsJSON[weapon].type != currentChar.weapon) return;

        elemToClone.children[0].children[0].setAttribute("src", "static/images/weapons/" + weaponsJSON[weapon].id + ".png")
        elemToClone.children[1].innerText = weaponsJSON[weapon].name
        elemToClone.children[2].setAttribute("class", "weapon-rarity")
        elemToClone.children[2].classList.add('r' + weaponsJSON[weapon].rarity)
        elemToClone.setAttribute('id', weapon)
        elemToClone.children[3].innerText = Math.floor(weaponsJSON[weapon].atk[weaponsJSON[weapon].atk.length - 1])

        

        table.appendChild(elemToClone.cloneNode(true))
        

    });
    
    
}

function selectWeapon() {
    console.log("weapon selected")
}





var homeButton = document.getElementById("home-button");

homeButton.addEventListener("click", () => {
    document.getElementById("container").classList.remove("hidden")
    document.getElementById("calc").classList.add("hidden")

    while (table.firstChild) {
        console.log(table.firstChild)
        table.removeChild(table.lastChild);
    }
})

var range = document.getElementById("level-range")
var rangeWeapon = document.getElementById("level-range-weapon")

var rangeOuter = document.getElementById("current-level") - 6
var rangeWeaponOuter = document.getElementById("current-weapon-level")
ё
var attackDMG = document.getElementById("attack-dmg")
var weaponDMG = document.getElementById("weapon-dmg")


rangeOuter.innerText = range.value;
rangeWeaponOuter.innerText = rangeWeapon.value;

range.oninput = function() {
    rangeOuter.innerText = this.value;
    attackDMG.innerText = Math.floor(currentChar.atk[this.value])
}

rangeWeapon.oninput = function() {
    rangeWeaponOuter.innerText = this.value;
}


var chars = ['albedo','aloy','amber','arataki_itto','barbara','beidou','bennett','chongyun','diluc','diona','eula','fischl','ganyu','gorou','hu_tao','jean','kaedehara_kazuha','kaeya','kamisato_ayaka','kamisato_ayato','keqing','klee','kujou_sara','lisa','mona','ningguang','noelle','qiqi','raiden_shogun','razor','rosaria','sangonomiya_kokomi','sayu','shenhe','sucrose','tartaglia','thoma','traveler_anemo','traveler_geo','traveler_electro','venti','xiangling','xiao','xingqiu','xinyan','yae_miko','yanfei','yoimiya','yun_jin','zhongli'];
var weapons = ['dull_blade','silver_sword','cool_steel','harbinger_of_dawn','travelers_handy_sword','dark_iron_sword','fillet_blade','skyrider_sword','favonius_sword','the_flute','sacrificial_sword','royal_longsword','lions_roar','prototype_rancour','iron_sting','blackcliff_longsword','the_black_sword','the_alley_flash','sword_of_descension','festering_desire','amenoma_kageuchi','cinnabar_spindle','aquila_favonia','skyward_blade','freedom-sworn','summit_shaper','primordial_jade_cutter','mistsplitter_reforged','haran_geppaku_futsu','waster_greatsword','old_mercs_pal','ferrous_shadow','bloodtainted_greatsword','white_iron_greatsword','quartz','debate_club','skyrider_greatsword','favonius_greatsword','the_bell','sacrificial_greatsword','royal_greatsword','rainslasher','prototype_archaic','whiteblind','blackcliff_slasher','serpent_spine','lithic_blade','snow-tombed_starsilver','luxurious_sea-lord','katsuragikiri_nagamasa','akuoumaru','skyward_pride','wolfs_gravestone','song_of_broken_pines','the_unforged','redhorn_stonethresher','beginners_protector','iron_point','white_tassel','halberd','black_tassel','the_flagstaff','dragons_bane','prototype_starglitter','crescent_pike','blackcliff_pole','deathmatch','lithic_spear','favonius_lance','royal_spear','dragonspine_spear','kitain_cross_spear','the_catch','wavebreakers_fin','staff_of_homa','skyward_spine','vortex_vanquisher','primordial_jade_winged-spear','calamity_queller','engulfing_lightning','apprentices_notes','pocket_grimoire','magic_guide','thrilling_tales_of_dragon_slayers','otherworldly_story','emerald_orb','twin_nephrite','amber_bead','favonius_codex','the_widsith','sacrificial_fragments','royal_grimoire','solar_pearl','prototype_amber','mappa_mare','blackcliff_agate','eye_of_perception','wine_and_song','frostbearer','dodoco_tales','hakushin_ring','oathsworn_eye','skyward_atlas','lost_prayer_to_the_sacred_winds','memory_of_dust','everlasting_moonglow','kaguras_verity','hunters_bow','seasoned_hunters_bow','raven_bow','sharpshooters_oath','recurve_bow','slingshot','messenger','ebony_bow','favonius_warbow','the_stringless','sacrificial_bow','royal_bow','rust','prototype_crescent','compound_bow','blackcliff_warbow','the_viridescent_hunt','alley_hunter','mitternachts_waltz','windblume_ode','hamayumi','predator','mouuns_moon','skyward_harp','amos_bow','elegy_for_the_end','polar_star','thundering_pulse']
var requestURL = 'src/data/'

var charsJSON = []
var weaponsJSON

for (let i = 0; i < chars.length; i++) {
    fetch(requestURL + 'characterData/' + chars[i] + '.json').then(function(response) {
        response.json().then(function(text) {
          charsJSON[i] = text;
        });
    });
}

fetch( requestURL + 'weapons/ru.json').then(function(response) {
    response.json().then(function(text) {
      weaponsJSON = text;      
    });
});

