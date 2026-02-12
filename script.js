document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("orderForm");
  const ordersList = document.getElementById("ordersList");
  const titleInput = document.getElementById("titleInput");
  const logoInput = document.getElementById("logoInput");
  const appTitle = document.getElementById("appTitle");
  const logoPreview = document.getElementById("logoPreview");
  const pdfBtn = document.getElementById("pdfBtn");

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

  window.deleteOrder = function(index) {
    orders.splice(index, 1);
    saveOrders();
    renderOrders();
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fd = new FormData(form);
    const newOrder = Object.fromEntries(fd.entries());

    newOrder.quantity = Number(newOrder.quantity);
    newOrder.price = Number(newOrder.price);

    orders.push(newOrder);
    saveOrders();
    renderOrders();
    form.reset();
  });

  pdfBtn.addEventListener("click", function () {
    if (!window.jspdf) {
      alert("PDF knihovna se nenačetla.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Seznam objednávek", 10, 10);

    let y = 20;

    orders.forEach((order, i) => {
      const total = (order.quantity || 0) * (order.price || 0);

      doc.text(`${i + 1}. ${order.customer} - ${order.product}`, 10, y);
      y += 7;
      doc.text(`Množství: ${order.quantity}  Cena: ${order.price}  Celkem: ${total} Kč`, 10, y);
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("objednavky.pdf");
  });

  titleInput.addEventListener("input", () => {
    appTitle.textContent = titleInput.value || "Evidence objednávek";
  });

  logoInput.addEventListener("input", () => {
    if (logoInput.value.trim() !== "") {
      logoPreview.src = logoInput.value;
    }
  });

  renderOrders();
});
