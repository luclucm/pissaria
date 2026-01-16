
let sceltaPizza = null;

document.querySelectorAll(".pizza").forEach(btn => {
    btn.addEventListener("click", () => {
        sceltaPizza = btn.dataset.pizza;
    });
});

document.getElementById("invia").addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;

    if (!nome || !sceltaPizza) {
        document.getElementById("status").textContent = "Compila tutti i campi!";
        return;
    }

    const data = { nome, pizza: sceltaPizza };

    const resp = await fetch("http://localhost:8080/salva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (resp.ok) {
        document.getElementById("status").textContent = "Ordine inviato!";
    } else {
        document.getElementById("status").textContent = "Errore nell'invio.";
    }
});
