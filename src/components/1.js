import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { sha256 } from "js-sha256";
import { useGlobalContext } from "../context";
import Navbar2 from "./Navbar2";

const MyPDF = () => {
  const { account, setAccount, contract, setContract, provider, setProvider } =
    useGlobalContext();
  const pdfRef = useRef(null);
  const [pdf, setpdf] = useState(null);

  const handlePDFInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const actualPdfContent = reader.result;
        console.log(typeof actualPdfContent);
        console.log(actualPdfContent);

        const actualPdfHash = sha256(actualPdfContent);
        console.log(actualPdfHash);
        setpdf(actualPdfHash);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  console.log(pdf);
  async function check() {
    const hashcheck = await contract.pdfHash(pdf);
    if (hashcheck) {
      console.log("Success");
    } else {
      console.log("Fail");
    }
  }

  return (
    <>
      <Navbar2 />
      <div>
        <input type="file" accept=".pdf" onChange={handlePDFInputChange} />
      </div>

      <button onClick={check}>Upload</button>
    </>
  );
};

export default MyPDF;
//8eb4f988e348e7ddec1b82c29e71421ce158d1fbbf64c450ef44dda72110ad4f
