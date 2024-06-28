var _a, _b;
var Account = /** @class */ (function () {
    function Account() {
        this.accounts = [];
        this.accounts = this.caricaAccounts();
        console.log("array degli account: ".concat(this.accounts));
    }
    Account.prototype.caricaAccounts = function () {
        var _a;
        // @ts-ignore
        var acc = (_a = JSON.parse(localStorage.getItem("accounts"))) !== null && _a !== void 0 ? _a : [];
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
        // console.log(presenza);
        if (presenza == 0) {
            this.accounts.push(temp);
            localStorage.setItem("account", JSON.stringify(this.accounts));
            this.creaCard(arrTemp);
        }
        else {
            for (var i = 0; i < this.accounts.length; i++) {
                if (nome == this.accounts[i]["nome"]) {
                    // console.log(`ciao: ${this.accounts[i]["nome"]}, ${this.accounts[i]["bilancio"]}`);
                    this.accounts[i]["bilancio"] += denaro;
                    // console.log(this.accounts[i]);
                }
            }
        }
        console.log(this.accounts);
    };
    Account.prototype.creaCard = function (arr) {
        var seleziona = document.querySelector(".card-container");
        arr.forEach(function (item) {
            var contenuto = "<div class=\"card-css\">\n        <h5>".concat(item.nome, "</h5>\n        <p>").concat(item.bilancio, "</h5>\n        \n        </div>");
            seleziona.innerHTML += contenuto;
        });
    };
    Account.prototype.modificaCard = function () {
    };
    Account.prototype.aggiungiAccount = function (account) {
        var seleziona = document.getElementById("acc");
        var aggiugni = "<option value=\"".concat(account, "\">").concat(account, "</option>");
        seleziona.innerHTML += aggiugni;
    };
    Account.prototype.ripulisci = function () {
        this.accounts = [];
        console.log(this.accounts);
        document.querySelector(".card-container").innerHTML = "";
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
        //console.log(quantitaNumero);
        operazioni.entrataUscita(acc, quantitaNumero);
    }
    else {
        console.log("errore");
    }
});
(_b = document.getElementById("ripulisci")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    operazioni.ripulisci();
});
