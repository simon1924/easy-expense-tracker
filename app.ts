

class Account {

    accounts: { nome: string, bilancio: number }[] = [];


    constructor() {
        this.accounts = this.caricaAccounts();
        //console.log(`array degli account: ${this.accounts}`);
        console.log(this.accounts);
        this.creaCard(this.accounts);
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

    modificaCard() {

    }

    aggiungiAccount(account: string) {
        const seleziona = document.getElementById("acc")!;

        let aggiugni = `<option value="${account}">${account}</option>`;

        seleziona.innerHTML += aggiugni;
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