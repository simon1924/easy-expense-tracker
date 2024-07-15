

class Account {

    accounts: { nome: string, bilancio: number }[] = [];


    constructor() {
        this.accounts = this.caricaAccounts();
        //console.log(`array degli account: ${this.accounts}`);
        console.log(this.accounts);
        this.creaCard(this.accounts);
        this.creaSelect(this.accounts);
    }


    caricaAccounts(): any[] {
        const acc = JSON.parse(localStorage.getItem("accounts") || "[]");
        console.log(acc);
        return acc
    }

    cercaAccount(arr: [], nome: string): number {
        // console.log(`lunghezza: ${arr.length}, nome: ${nome}`);
        let temp = 0;
        for (let i = 0; i < arr.length; i++) {
            if (nome == arr[i]["nome"]) {
                // console.log(`ciao: ${arr[i]["nome"]}, ${arr[i]["bilancio"]}`);
                // console.log(arr[i]);
                temp += 1;
            }
        }
        return temp;

    }

    entrataUscita(this, nome: string, denaro: number) {

        let presenza: number = this.cercaAccount(this.accounts, nome);

        let temp = {
            "nome": nome,
            "bilancio": denaro
        };

        let arrTemp = [temp];
        console.log(presenza);


        if (presenza == 0) {
            this.accounts.push(temp);
            localStorage.setItem("accounts", JSON.stringify(this.accounts))
            this.creaCard(arrTemp);
        }
        else {
            for (let i = 0; i < this.accounts.length; i++) {
                if (nome == this.accounts[i]["nome"]) {
                    // console.log(`ciao: ${this.accounts[i]["nome"]}, ${this.accounts[i]["bilancio"]}`);
                    this.accounts[i]["bilancio"] += denaro;
                    // console.log(this.accounts[i]);
                    localStorage.setItem("accounts", JSON.stringify(this.accounts));
                    document.getElementById(nome)!.innerHTML = this.accounts[i]["bilancio"];


                }
            }


        }

        console.log(this.accounts);


    }

    creaCard(arr) {
        console.log("ciao da creaCard");
        const seleziona = document.querySelector(".card-container")!;

        arr.forEach((item) => {

            let contenuto =
                `<div class="card-css">
                <h5>${item.nome}</h5>
                <p id="${item.nome}">${item.bilancio}</h5>
        
                </div>`;

            seleziona.innerHTML += contenuto;
        })
    }

    creaSelect(arr) {
        const divSelect = document.getElementById("divSelect")!;

        let selectList = document.createElement("select");
        selectList.id = "acc";
        selectList.className = "prima";

        divSelect.appendChild(selectList);

        arr.forEach(item => {
            let option = document.createElement("option");
            option.value = item.nome;
            option.text = item.nome;
            selectList.appendChild(option);
        })
    }

    aggiungiAccount(account) {

        let array: string[] = [];
        for (let i = 0; i < this.accounts.length; i++) {
            array.push(this.accounts[i]["nome"]);
        }
        console.log(array);

        //const presente: boolean = array.includes(account);
        if (!(array.indexOf(account) !== -1)) {

            let temporaneo =
            {
                "nome": account,
                "bilancio": 0
            };

            this.accounts.push(temporaneo);
            const seleziona = document.getElementById("acc")!;

            let aggiugni = `<option value="${account}">${account}</option>`;

            seleziona.innerHTML += aggiugni;
            localStorage.setItem("accounts", JSON.stringify(this.accounts));


            const selezionaContainer = document.querySelector(".card-container")!;




            let contenuto = `<div class="card-css">
                <h5>${account}</h5>
                <p id="${account}"></h5>
            
                </div>`;

            selezionaContainer.innerHTML += contenuto;

            //bisgona creare le card di quelli che si aggiungono

        }
    }

    ripulisci() {
        if (confirm("ripulire gli account?")) {
            this.accounts = [];
            //console.log(this.accounts);
            document.querySelector(".card-container")!.innerHTML = "";
            localStorage.clear();
        }
    }


};

let operazioni: Account = new Account();







document.getElementById("aggiungiAccount")?.addEventListener("click", () => {
    let temp: string = (document.getElementById("accountInput") as HTMLInputElement).value;

    operazioni.aggiungiAccount(temp);
})




function numero(stringa: string): boolean {
    const pattern = /^-?\d*\.?\d+$/;
    //
    ///^[0-9]+$/
    return pattern.test(stringa);
}



let bottone = document.getElementById("invia");
bottone?.addEventListener("click", (e: Event) => {

    //let opzione: string = (document.getElementById("selezione") as HTMLSelectElement).value;
    let acc: string = (document.getElementById("acc") as HTMLSelectElement).value;
    let quantita: string = String((document.getElementById("quantita") as HTMLInputElement).value);
    let controllo = numero(quantita);

    let quantitaNumero: number;

    if (controllo) {
        quantitaNumero = parseFloat(quantita);
        console.log(acc, quantitaNumero);
        operazioni.entrataUscita(acc, quantitaNumero);
    }
    else {
        console.log("errore")
    }


})


document.getElementById("ripulisci")?.addEventListener("click", () => {
    operazioni.ripulisci();
})