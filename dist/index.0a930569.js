function Calculator(form, summary1) {
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };
    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        accounting: form.querySelector("#accounting"),
        terminal: form.querySelector("#terminal")
    };
    this.summary = {
        list: summary1.querySelector("ul"),
        items: summary1.querySelector("ul").children,
        total: {
            container: summary1.querySelector("#total-price"),
            price: summary1.querySelector(".total__price") // tohle je cena
        }
    };
}
/* Vytvoříme metodu, která bude zpracovávat změny v polích pro zadání hodnot. Tato metoda se bude nazývat inputEvent. */ Calculator.prototype.inputEvent = function(e1) {
    const id1 = e1.currentTarget.id // tohle je id inputu, ktery se zmenil
    ;
    const value = e1.currentTarget.value // tohle je hodnota inputu, ktery se zmenil
    ;
    const singlePrice1 = this.prices[id1] // tohle je cena za jednu vec
    ;
    const totalPrice1 = singlePrice1 * value // tohle je vypocet celkove ceny
    ;
};
/* Vytvoříme metodu, která bude aktualizovat souhrn. Tato metoda se bude nazývat updateSummary. */ Calculator.prototype.updateSummary = function(id1, calc1, total1, callback1) {
    const summary1 = this.summary.list.querySelector(`[data-id="${id1}"]`) // Tento kód hledá v elementu this.summary.list první podřízený element, který má atribut data-id rovnající se hodnotě proměnné id.
    ;
    const summaryCalc1 = summary1.querySelector("item__calc") // summaryCalc bude odkazovat na první element <div class="item__calc">Calculation 1</div> uvnitř elementu summary.
    ;
    const summaryTotal1 = summary1.querySelector(".item__price") // summaryTotal bude odkazovat na první element <div class="item__total">Total 1</div> uvnitř elementu summary.
    ;
};
summary.classList.add("open") // prida tridu, ktera zobrazi soucet
;
//prvky, ktere jsme vyhledali pomoci updateSummary, aktualizujeme jejich textovou hodnotu:
if (summaryCalc !== null) summaryCalc.innerText = calc // tohle je cena mezivysledku
;
summaryTotal.innerText = "$" + total // tohle je cena s dolarem
;
if (typeof callback === "function") callback(summary, summaryCalc, summaryTotal) // zavolame callback
;
this.updateSummary(id, value + " * $" + singlePrice, totalPrice, function(item, calc1, total1) {
    /* Musíme potvrdit:
   pokud zadaná hodnota není menší než 0. Pokud ano, zadáme příslušnou zprávu
   pokud pole není prázdné. Pokud ano, skryjeme ji odebráním opentřídy */ if (value < 0) {
        calc1.innerHTML = null;
        total1.innerText = "Please enter a positive number";
    }
    if (value.length === 0) item.classList.remove("open");
});
/* ROLETKA zpracování vlastního výběru. Tato metoda se bude nazývat selectEvent. Na samém začátku nastavíme toggletřídu open 
na hlavní prvek select, který jsme našli dříve a máme uložený v this.form.packageklíči. 
Každé kliknutí tedy otevře nebo zavře výběrové pole.*/ Calculator.prototype.selectEvent = function(e1) {
    this.form.package.classList.toggle("open"); // tohle je toggle, ktery zobrazi nebo skryje vyber
};
/* Protože je toto pole nestandardní, musíme k extrakci hodnot, které nás zajímají, použít nestandardní metody.
V tomto případě používáme, e.targetprotože nás zajímá, na co jsme přesně klikli a ne co spustilo naši funkci (bublání události). 
Proto zkontrolujeme, zda hodnota in datasetnašeho prvku není undefined. Pokud takový dataset existuje, znamená to,
že jsme klikli na konkrétní liz našeho selektoru a můžeme s ním něco dále dělat.
Extrahujeme hodnotu a text:*/ const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : ""; // znamena to ze se kliklo na konkretni polozku a zobrazi se jeji hodnota, pokud ne, zobrazi se prazdny retezec
const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package"; // znamena to ze se kliklo na konkretni polozku a zobrazi se jeji text, pokud ne, zobrazi se "Choose package"
// Poté přidejte podmínku pro kontrolu, zda je délka hodnoty větší než 0.
if (value.length > 0) {
    this.form.package.dataset.value = value; // tohle je hodnota
    this.form.package.querySelector(".select__input").innerText = text; // tohle je text
    this.updateSummary("package", text, this.prices.package[value]); // tohle je aktualizace souhrnu
}
/* ZASKRTAVACI POLICKA. Tato metoda se bude nazývat checkboxEvent. */ Calculator.prototype.checkboxEvent = function(e1) {
    const checkbox = e1.currentTarget; // tohle je checkbox, ktery se zmenil
    const id1 = checkbox.id; // tohle je id checkboxu, ktery se zmenil
    const checked = checkbox.checked; // tohle je hodnota checkboxu, ktery se zmenil
    /* Poté přidejte podmínku, která zkontroluje, zda je checkbox zaškrtnutý. 
    Pokud ano, zavoláme metodu updateSummary s parametry id, text a cenu. */ this.updateSummary(id1, undefined, this.prices[id1], function(item) {
        if (!checked) item.classList.remove("open");
    });
};
/* Nyní přidejte posluchače událostí pro všechny pole formuláře. */ // NASLOUCHACI UDALOSTI
Calculator.prototype.addEvents = function() {
    this.form.products.addEventListener("change", this.inputEvent.bind(this)); // tohle je udalost, ktera se zavola, kdyz se zmeni hodnota inputu
    this.form.products.addEventListener("keyup", this.inputEvent.bind(this));
    this.form.orders.addEventListener("change", this.inputEvent.bind(this));
    this.form.orders.addEventListener("keyup", this.inputEvent.bind(this));
    /* vyber */ this.form.package.addEventListener("click", this.selectEvent.bind(this)); // tohle je udalost, ktera se zavola, kdyz se klikne na vyber
    /* checkbox */ this.form.accounting.addEventListener("change", this.checkboxEvent.bind(this)); // tohle je udalost, ktera se zavola, kdyz se zmeni hodnota checkboxu
    this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
    /*spustit addEvents */ this.addEvents(); // tohle spusti udalosti
    /* metodu, která aktualizuje a spočítá součet celé kalkulačky. Tato metoda se bude nazývat updateTotal. */ Calculator.prototype.updateTotal = function() {
        const show = this.summary.list.querySelectorAll(".open").length > 0; // tohle je zobrazeni souctu
        if (show) {
            /* prvek je zobrazen, musíme se postarat o řadu výpočtů. Vytáhneme každý prvek formuláře jeden po druhém: */ const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products; // tohle je soucet produktu
            const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders; // tohle je soucet objednavek
            const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value]; // tohle je cena balicku    
            const accounting = this.form.accounting.checked ? this.prices.accounting : 0; // cena za accounting
            const terminal = this.form.terminal.checked ? this.prices.terminal : 0; // cena za terminal
            // zadat soucet vsech cen do daneho prvku:
            this.summary.total.price.innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal); // tohle je celkovy soucet
            this.summary.total.container.classList.add("open"); // tohle je zobrazeni
        } else this.summary.total.container.classList.remove("open"); // tohle je skryti
    };
};

//# sourceMappingURL=index.0a930569.js.map
