import React from "react";
import jsPDF from "jspdf";
import img1 from "../images/logito.png";
import { useParams, Link } from "react-router-dom";

const PDFGenerator = () => {
  const { nombre, fechaentrada, fechasalida, total, comprobante } = useParams();
  const generatePDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.setTextColor(44, 62, 80);
    pdf.text("Las cascadas", 20, 30);
    pdf.addImage(img1, "PNG", 140, 10, 60, 22);

    pdf.setFontSize(16);
    pdf.setTextColor(44, 62, 80);

    pdf.text(`Comprobante de Transacción: ${comprobante}`, 20, 60);
    pdf.setFontSize(12);

    pdf.text(`Hola ${nombre} nos alegra verte por aqui.`, 20, 70);

    pdf.text(`Fecha entrada: ${fechaentrada}`, 20, 90);

    pdf.text(`Fecha salida: ${fechasalida}`, 20, 110);

    pdf.text(`Monto $:${total}`, 20, 130);

    pdf.line(20, 150, 190, 150);

    pdf.setTextColor(44, 62, 80);
    pdf.text("¡Gracias por tu compra!", 80, 160);

    pdf.save("comprobante.pdf");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#2c3e50", margin: "30px" }}>
        ¡Gracias por preferirnos en Las Cascadas!
      </h2>
      <p style={{ textAlign: "center", color: "#2c3e50" }}>
        Te agradecemos por tu preferencia. A continuación, puedes generar tu
        comprobante de transacción.
      </p>
      <button
        onClick={generatePDF}
        style={{
          backgroundColor: "#3498db",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
          fontSize: "16px",
          margin: "20px",
          textAlign: "center",
        }}
      >
        Generar Comprobante
      </button>
    </div>
  );
};

export default PDFGenerator;
