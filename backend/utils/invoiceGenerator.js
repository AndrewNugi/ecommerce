import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `invoice_${order._id}.pdf`;
    const filePath = path.join("invoices", fileName);

    // Ensure invoices directory exists
    if (!fs.existsSync("invoices")) {
      fs.mkdirSync("invoices");
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add Header
    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.moveDown();

    // Add Order Details
    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Add Customer Info
    doc.text(`Customer: ${order.user.username}`);
    doc.text(`Email: ${order.user.email}`);
    doc.text(`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}`);
    doc.moveDown();

    // Add Order Items
    doc.text("Order Items:", { underline: true });
    order.orderItems.forEach((item) => {
      doc.text(`${item.qty} x ${item.name} - $${item.price.toFixed(2)}`);
    });
    doc.moveDown();

    // Add Total
    doc.text(`Total Price: $${order.totalPrice.toFixed(2)}`, { bold: true });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", (err) => reject(err));
  });
};

export default generateInvoice;
