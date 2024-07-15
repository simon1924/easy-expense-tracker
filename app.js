var _a, _b;
var Account = /** @class */ (function () {
    function Account() {
        this.accounts = [];
        this.accounts = this.caricaAccounts();
        //console.log(`array degli account: ${this.accounts}`);
        console.log(this.accounts);
        this.creaCard(this.accounts);
        this.creaSelect(this.accounts);
    }
    Account.prototype.caricaAccounts = function () {
        var acc = JSON.parse(localStorage.getItem("accounts") || "[]");
        console.log(acc);
        return acc;
    };
    Account.prototype.cercaAccount = function (arr, nome) {
        // console.log(`lunghezza: ${arr.length}, nome: ${nome}`);
        var temp = 0;
        for (var i = 0; i < arr.length; i++) {
            if (nome == arr[i]["nome"]) {
                // console.log(`ciao: ${arr[i]["nome"]}, ${arr[i]["bilancio"]}`);
                // console.log(arr[i]);
                temp += 1;
            }
        }
        return temp;
    };
    Account.prototype.entrataUscita = function (nome, denaro) {
        var presenza = this.cercaAccount(this.accounts, nome);
        var temp = {
            "nome": nome,
            "bilancio": denaro
        };
        var arrTemp = [temp];
        console.log(presenza);
        if (presenza == 0) {
            this.accounts.push(temp);
            localStorage.setItem("accounts", JSON.stringify(this.accounts));
            this.creaCard(arrTemp);
        }
        else {
            for (var i = 0; i < this.accounts.length; i++) {
                if (nome == this.accounts[i]["nome"]) {
                    // console.log(`ciao: ${this.accounts[i]["nome"]}, ${this.accounts[i]["bilancio"]}`);
                    this.accounts[i]["bilancio"] += denaro;
                    // console.log(this.accounts[i]);
                    localStorage.setItem("accounts", JSON.stringify(this.accounts));
                    document.getElementById(nome).innerHTML = this.accounts[i]["bilancio"];
                }
            }
        }
        console.log(this.accounts);
    };
    Account.prototype.creaCard = function (arr) {
        console.log("ciao da creaCard");
        var seleziona = document.querySelector(".card-container");
        arr.forEach(function (item) {
            var contenuto = "<div class=\"card-css\">\n                <h5>".concat(item.nome, "</h5>\n                <p id=\"").concat(item.nome, "\">").concat(item.bilancio, "</h5>\n        \n                </div>");
            seleziona.innerHTML += contenuto;
        });
    };
    Account.prototype.creaSelect = function (arr) {
        var divSelect = document.getElementById("divSelect");
        var selectList = document.createElement("select");
        selectList.id = "acc";
        selectList.className = "prima";
        divSelect.appendChild(selectList);
        arr.forEach(function (item) {
            var option = document.createElement("option");
            option.value = item.nome;
            option.text = item.nome;
            selectList.appendChild(option);
        });
    };
    Account.prototype.aggiungiAccount = function (account) {
        var array = [];
        for (var i = 0; i < this.accounts.length; i++) {
            array.push(this.accounts[i]["nome"]);
        }
        console.log(array);
        //const presente: boolean = array.includes(account);
        if (!(array.indexOf(account) !== -1)) {
            var temporaneo = {
                "nome": account,
                "bilancio": 0
            };
            this.accounts.push(temporaneo);
            var seleziona = document.getElementById("acc");
            var aggiugni = "<option value=\"".concat(account, "\">").concat(account, "</option>");
            seleziona.innerHTML += aggiugni;
            localStorage.setItem("accounts", JSON.stringify(this.accounts));
            var selezionaContainer = document.querySelector(".card-container");
            var contenuto = "<div class=\"card-css\">\n                <h5>".concat(account, "</h5>\n                <p id=\"").concat(account, "\"></h5>\n            \n                </div>");
            selezionaContainer.innerHTML += contenuto;
            //bisgona creare le card di quelli che si aggiungono
        }
    };
    Account.prototype.ripulisci = function () {
        if (confirm("ripulire gli account?")) {
            this.accounts = [];
            //console.log(this.accounts);
            document.querySelector(".card-container").innerHTML = "";
            localStorage.clear();
        }
    };
    return Account;
}());
;
var operazioni = new Account();
(_a = document.getElementById("aggiungiAccount")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var temp = document.getElementById("accountInput").value;
    operazioni.aggiungiAccount(temp);
});
function numero(stringa) {
    var pattern = /^-?\d*\.?\d+$/;
    //
    ///^[0-9]+$/
    return pattern.test(stringa);
}
var bottone = document.getElementById("invia");
bottone === null || bottone === void 0 ? void 0 : bottone.addEventListener("click", function (e) {
    //let opzione: string = (document.getElementById("selezione") as HTMLSelectElement).value;
    var acc = document.getElementById("acc").value;
    var quantita = String(document.getElementById("quantita").value);
    var controllo = numero(quantita);
    var quantitaNumero;
    if (controllo) {
        quantitaNumero = parseFloat(quantita);
        console.log(acc, quantitaNumero);
        operazioni.entrataUscita(acc, quantitaNumero);
    }
    else {
        console.log("errore");
    }
});
(_b = document.getElementById("ripulisci")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    operazioni.ripulisci();
});
