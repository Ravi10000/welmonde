import React, { useEffect, useState } from "react";
import { fetchClientById } from "../../firebase/employee";
import ContractAll from "./contract-all";
import ContractPharmacy from "./contract-pharmacy";
import ContractMou from "./contract-mou";
import ContractIS from "./contract.is";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page } from "react-pdf";

// Create Document Component
function ContractPdf({ contract }) {
  const [client, setClient] = useState(null);
  console.log({ contract, client });
  const [isFetching, setIsFetching] = useState(false);
  async function handleFetchClient() {
    setIsFetching(true);
    try {
      const res = await fetchClientById(contract?.agreement?.clientId);
      console.log({ res });
      setClient(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    handleFetchClient();
  }, []);
  let pdf = <></>;
  if (isFetching)
    pdf = (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  else if (contract?.contractName === "pharmacy")
    pdf = <ContractPharmacy client={client} contract={contract} />;
  else if (contract?.contractName === "hospital(mou)")
    pdf = <ContractMou client={client} contract={contract} />;
  else if (contract?.contractName === "international service")
    pdf = <ContractIS client={client} contract={contract} />;
  else pdf = <ContractAll client={client} contract={contract} />;
  // else
  //   pdf = (
  //     <PDFDownloadLink
  //       document={<ContractAll client={client} contract={contract} />}
  //     >
  //       {({ url, loading }) => {
  //         return loading ? (
  //           <p>loading...</p>
  //         ) : (
  //           <Document file={url} renderMode="svg">
  //             <Page pageNumber={1} scale={1} />
  //           </Document>
  //         );
  //       }}
  //     </PDFDownloadLink>
  //   );
  // else
  //   pdf = (
  //     <BlobProvider
  //       document={<ContractAll client={client} contract={contract} />}
  //     >
  //       {({ blob, url, loading }) => {
  //         console.log({ blob, url, loading });
  //         return loading ? (
  //           <div className="loader-container">
  //             <div className="loader"></div>
  //           </div>
  //         ) : (
  //           <Document
  //             file={url}
  //             // onLoadSuccess={(pdf) => console.log({ pdf, blob })}
  //             renderMode="canvas"
  //           >
  //             <Page pageNumber={1} width={window.innerWidth} />
  //           </Document>
  //         );
  //       }}
  //     </BlobProvider>
  //   );
  return (
    <>
      {/* {pdf} */}
      {isFetching ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        pdf
      )}
    </>
  );
}

export default ContractPdf;
