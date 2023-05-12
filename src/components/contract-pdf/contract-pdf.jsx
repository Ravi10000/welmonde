import React, { useEffect, useState } from "react";
import { fetchClientById } from "../../firebase/employee";
import ContractAll from "./contract-all";
import ContractPharmacy from "./contract-pharmacy";

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
  return (
    <>
      {isFetching ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : contract?.contractName === "pharmacy" ? (
        <ContractPharmacy client={client} contract={contract} />
      ) : (
        <ContractAll client={client} contract={contract} />
      )}
    </>
  );
}

export default ContractPdf;
