const krmivoSelect = document.getElementById("krmivo");
const kgInput = document.getElementById("kg");
const cenaInput = document.getElementById("cena");
const vyslednaCena = document.getElementById("vysledna-cena");
const checkboxes = document.querySelectorAll(".checkbox");
const overit = document.getElementById("overit");
const castkaInput = document.getElementById("castka");
const vysledek = document.getElementById("vysledek");
const regexJmeno = document.getElementById("email");
const errorMessage = document.getElementById('error-message');

function updatePrice() {
    let cenaZaKg = parseFloat(krmivoSelect.value) || 0;
    let mnozstviKg = parseFloat(kgInput.value) || 0;

    let upravenaCena = cenaZaKg * mnozstviKg;

    upravenaCena = calculateCheckboxPrice(upravenaCena);

    upravenaCena = calculateDoprava(upravenaCena);

    cenaInput.value = upravenaCena.toFixed(2) + " Kč";
    vyslednaCena.value = upravenaCena.toFixed(2) + " Kč";
}


function calculateCheckboxPrice(upravenaCena) {
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const value = parseFloat(checkbox.value);
        
            if (value !== 500) {
                upravenaCena += upravenaCena * (value / 100);
            } else {
                upravenaCena += value;
            }
        }
    });
    return upravenaCena;
}

function calculateDoprava(upravenaCena) {
    const doprava = document.querySelector('input[name="doprava"]:checked');
    if (doprava) {
        upravenaCena += parseFloat(doprava.value);
    }
    return upravenaCena;
}


kgInput.addEventListener("input", updatePrice);
krmivoSelect.addEventListener("change", updatePrice);
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updatePrice);
});
document.querySelectorAll('input[name="doprava"]').forEach((radio) => {
    radio.addEventListener("change", updatePrice);
});

krmivoSelect.addEventListener("change", updatePrice);
kgInput.addEventListener("input", updatePrice);
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updatePrice);
});
document.querySelectorAll('input[name="doprava"]').forEach((radio) => {
    radio.addEventListener("change", updatePrice);
});

overit.addEventListener("click", () => {
    const vyslednaCenaHodnota = parseFloat(vyslednaCena.value) || 0;
    const castka = parseFloat(castkaInput.value) || 0;

    if (castka >= vyslednaCenaHodnota) {
        vysledek.textContent = "Můžete si dovolit tuto objednávku!";
    } else {
        vysledek.textContent = "Nemáte dostatek prostředků.";
    }
});
const checkRegex = /^[a-zA-Z0-9]+$/;
document.addEventListener('change', ()=>{
    const email = regexJmeno.value;

    if (checkRegex.test(email)) {
        errorMessage.textContent = "";
    } else {
        errorMessage.textContent = "Neplatný e-mail. Ujistěte se, že jméno obsahuje pouze písmena a číslice.";
    }
})
