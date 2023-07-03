import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { sha256 } from "js-sha256";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import SCM from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const MyPDF = () => {
  const pdfRef = useRef(null);
  const [pdf, setpdf] = useState(null);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/-4e5fsDjluNgzUNf9u0nNElwVvNV2QYq"
  );
  const wallet = new ethers.Wallet(
    "9950025c546ede2c2bb22c6dd3b984efe4f7622c4e22eb26f7facffad32e099b",
    provider
  );
  const contract = new ethers.Contract(
    "0x54e6b4cf490695FEcdBd5206D007Ba352E5C35B6",
    SCM.abi,
    wallet
  );

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
      <Navbar />
      <div>
        <input type="file" accept=".pdf" onChange={handlePDFInputChange} />
      </div>

      <button onClick={check}>Upload</button>
    </>
  );
};

export default MyPDF;
