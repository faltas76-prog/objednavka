const { jsPDF } = window.jspdf;
div.className = "order-card";
div.innerHTML = `
<strong>${order.customer}</strong><br>
Produkt: ${order.product}<br>
Množství: ${order.quantity || 0}<br>
Cena/kus: ${order.price || 0}<br>
Celkem: ${total} Kč<br>
<button onclick="deleteOrder(${index})">Smazat</button>
`;


ordersList.appendChild(div);
});
}


function deleteOrder(index) {
orders.splice(index, 1);
saveOrders();
renderOrders();
}


form.addEventListener("submit", function(e) {
e.preventDefault();


const formData = new FormData(form);
const newOrder = Object.fromEntries(formData.entries());


newOrder.quantity = Number(newOrder.quantity);
newOrder.price = Number(newOrder.price);


orders.push(newOrder);
saveOrders();
renderOrders();
form.reset();
});


// Export PDF
function exportPDF() {
const doc = new jsPDF();


doc.text("Seznam objednávek", 10, 10);


let y = 20;
orders.forEach((order, index) => {
const total = (order.quantity || 0) * (order.price || 0);


doc.text(`${index + 1}. ${order.customer} - ${order.product}`, 10, y);
y += 7;
doc.text(`Množství: ${order.quantity} | Cena: ${order.price} | Celkem: ${total} Kč`, 10, y);
y += 10;


if (y > 270) {
doc.addPage();
y = 10;
}
});


doc.save("objednavky.pdf");
}


// Nastavení názvu a loga


titleInput.addEventListener("input", () => {
appTitle.textContent = titleInput.value;
});


logoInput.addEventListener("input", () => {
logoPreview.src = logoInput.value;
});


renderOrders();
