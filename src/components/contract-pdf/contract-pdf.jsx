import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles
const internalStyles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  section: {
    margin: 20,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
function ContractPdf({ contract }) {
  console.log({ contract });
  const date = new Date(contract?.agreement?.createdAt).toDateString();
  const time = new Date(contract?.agreement?.createdAt).toLocaleTimeString();
  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={internalStyles.page}>
          <View style={internalStyles.section}>
            <Text>contract Type: {contract?.contractName}</Text>
            <Text>client Name: {contract?.agreement?.clientName}</Text>
            <Text>Business Name: {contract?.agreement?.businessName}</Text>
            <Text>
              Representative Name: {contract?.agreement?.representativeName}
            </Text>
            <Text>Client Address: {contract?.agreement?.clientAddress}</Text>
            <Text>
              Date & Time: {date}, {time}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default ContractPdf;
