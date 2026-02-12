const form = document.getElementById("orderForm");
const ordersList = document.getElementById("ordersList");
const titleInput = document.getElementById("titleInput");
const logoInput = document.getElementById("logoInput");
const appTitle = document.getElementById("appTitle");
const logoPreview = document.getElementById("logoPreview");


let orders = JSON.parse(localStorage.getItem("orders_db")) || [];


function saveOrders() {
localStorage.setItem("orders_db", JSON.stringify(orders));
}


function renderOrders() {
ordersList.innerHTML = "";


orders.forEach((order, index) => {
const total = (order.quantity || 0) * (order.price || 0);


const div = document.createElement("div");
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


// Nastavení názvu a loga


titleInput.addEventListener("input", () => {
appTitle.textContent = titleInput.value;
});


logoInput.addEventListener("input", () => {
logoPreview.src = logoInput.value;
});


renderOrders();
