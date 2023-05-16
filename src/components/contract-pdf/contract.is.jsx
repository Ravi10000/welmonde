import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  section: {
    flexGrow: 1,
    fontSize: "10px",
    fontFamily: "Times-Roman",
  },
  content: {
    marginTop: 100,
    marginBottom: 75,
    marginLeft: 60,
    marginRight: 60,
    height: "100%",
    // border: "1px solid red",
  },
  highlight: {
    fontWeight: "semibold",
  },
  center: {
    textAlign: "center",
  },
  margin: {
    margin: "10px 0",
  },
  listItem: {
    marginTop: 5,
    marginHorizontal: "10px",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  captilaze: {
    textTransform: "capitalize",
  },
  heading: {
    fontSize: "14px",
  },
  headingUnderline: {
    fontSize: "14px",
    borderBottom: "2px solid black",
    textAlign: "center",
  },
});

function ContractIs({ client, contract }) {
  const addedOnDate = new Date(
    contract?.agreement?.createdAt
  ).toLocaleDateString();
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/is-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <Text style={{ ...styles.heading, ...styles.center }}>
                INTERNATIONAL SERVICE CONTRACT
              </Text>
              <Text style={{ margin: 20 }}>
                This Agreement was entered into on the {addedOnDate} by and
                between:
              </Text>
              <Text style={{ marginHorizontal: 10 }}>
                Welmonde Health Care Private Limited, a Private Limited Company
                having its registered office at, 71-72, Jyoti Nivas College
                Road, 5th Block, Koramangala, Bangalore-560034. Represented by
                LAXMI, Director (International Business) and here in after
                referred to as the First Party:
              </Text>
              <Text style={{ margin: 5, textAlign: "center" }}>And</Text>
              <Text style={{ margin: 10 }}>
                {" " + contract?.agreement?.businessName}, is located at
                {contract?.agreement?.clientAddress + " "}
                represented by {contract?.agreement?.representativeName},
                authorized Signatory and hereinafter referred to as second
                Party.
              </Text>

              <Text style={{ fontSize: "12px", marginVertical: 10 }}>
                WITNESSETH:
              </Text>
              <View style={{ gap: 5 }}>
                <Text>
                  Whereas the First Party is in the business of providing
                  curative and Preventive Health Care and other Medical Services
                  to its members/customers like healthcare services including
                  surgeries and critical care, wellness services including
                  wellness tourism, digital fitness platform, e-pharmacy,
                  alternate medicine, veterinary medicine, nursing services and
                  many more. Whereas the Second Party is in ……………………. Whereas as
                  a matter of good gesture, various services are provided by the
                  First Party in its business, although it is not obliged to,
                  and they include the following
                </Text>
                <View style={styles.listItem}>
                  <Text>a. </Text>
                  <Text>
                    Providing specified consultations with several doctors
                    approved and listed by the First Party and at the cost of
                    the First Party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>b. </Text>
                  <Text>
                    Providing specified health check-ups and treatments
                    diagnostic centres/hospitals/clinics or client locations
                    which are approved and listed by the First Party and at the
                    cost of the First Party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>c. </Text>
                  <Text>
                    Providing any treatments or procedures which our registered
                    doctor recommends with the consent of the customer.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>d. </Text>
                  <Text>
                    Providing wellness services according to the customer's need
                    and preferences.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>e. </Text>
                  <Text>Providing nursing services</Text>
                </View>
                <View style={styles.listItem}>
                  <Text>f. </Text>
                  <Text>
                    Providing accommodation, airport transfers, Forex services,
                    translation services, and cultural tourism packages.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>g. </Text>
                  <Text>Proving Medical visa if needed.</Text>
                </View>
                <Text style={{ marginTop: 10 }}>
                  Whereas both parties mutually benefit from this contract in as
                  much as the members customers of the second Party would get
                  service from the first Party. Whereas the parties have
                  finalized the terms and thought it fit to reduce the terms so
                  agreed upon between them into writing.
                </Text>
              </View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                NOW THIS AGREEMENT WITNESSETH AS FOLLOWS
              </Text>
              <View style={styles.listItem}>
                <Text>1. </Text>
                <Text>
                  The first Party shall give services to the customer member of
                  the second Party as agreed under the Schedule of this
                  agreement with the First Party upon a mail communication or
                  through online communication
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>2. </Text>
                <Text>
                  The first party will provide a written communication or
                  confirm the appointment online using the Welmonde user
                  interface as confirmation for such appointments or in case of
                  any changes in the appointment the same shall be communicated
                  to the second party through E-Mail or using the Welmonde user
                  interface and vice-versa.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>3. </Text>
                <Text>
                  Once the appointment is confirmed, the first Party shall not
                  refuse the service to any member/customer of the second Party
                  However, during emergencies, an appointment can be
                  re-scheduled with the consent of the member/customer and/or
                  the second Party
                </Text>
              </View>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/is-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <View style={styles.listItem}>
                <Text>4. </Text>
                <Text>
                  The first party should not share the prices agreed with the
                  second party agreed under this agreement with the
                  customer/member of the second party. In case of any such
                  disclosures, the second party holds the right to hold the
                  payments of the first party and vice-versa.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>5. </Text>
                <Text>
                  First Party also agrees to co-brand with the second Party to
                  render medical services for corporate customers/member of the
                  second party which may deem fit for the first party and with
                  the mutual agreement between both parties by the means of
                  E-mail communication.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>6. </Text>
                <Text>
                  The relationship between the members/customers of the First
                  Party and the Second party shall be the same relation that
                  would and if the members/customers of the second Party had
                  independently approached the first Party.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>7. </Text>
                <Text>
                  The validity of this agreement shall be for a period of 3
                  years from the date of signing extending to the last day of
                  that calendar month Either Party will have the right to
                  terminate the agreement by giving at least 30 days' notice in
                  writing, clearly mentioning their intention to end the
                  agreement to the ether Party. In the event of termination and
                  abandonment thereof, this Agreement shall become void and
                  shall have no effect, without any liability on the part of any
                  of the parties or their directors, officers, or shareholders
                  in respect of this Agreement.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>8. </Text>
                <Text>
                  In the event of any dispute, the difference of opinion
                  whatever may at any time arise between the parties in respect
                  of anything contained in this agreement or as to the use,
                  rights, and liabilities, and entitlement or to the
                  interpretation of any terms of this agreement, the same shall
                  be referred to the arbitration of person(s) acceptable to both
                  the parties and the decision shall be final and binding on
                  both the parties.
                </Text>
              </View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                INDEMNITY CLAUSE:
              </Text>
              <View style={styles.listItem}>
                <Text>1. </Text>
                <Text>
                  The first Party hereby agrees that any liability arising due
                  to any default or negligence in providing or performing the
                  Medical services shall be borne exclusively by the first Party
                  who alone shall be responsible for the defect and/or
                  deficiencies in rendering such Medical services.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>2. </Text>
                <Text>
                  The First Party will handle issues that arise during the
                  facilitation of services like Health appointments,
                  misunderstanding of offers, and issues that are out of the
                  scope of the Second Party.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>3. </Text>
                <Text>
                  The First Party shall have the right to participate as a
                  party, along with the Second Party or otherwise, in all
                  actions, suits, claims and demands brought or made against it
                  in respect of anything done or purported to be done by the
                  Second Party in connection with any of the services under
                  these Terms.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>4. </Text>
                <Text>
                  The first Party shall be solely responsible for the medical
                  services to be rendered to the Customer/member of the second
                  Party, the second Party shall not be liable in any manner
                  whatsoever for the standards of quality, accuracy, or rates
                  charged by the first Party and/or any other aspect of any
                  service provided to any Customer/member of the second Party by
                  the first Party. The first Party hereby agrees to indemnify,
                  defend and hold harmless the second Party, it's present and
                  former officers, directors, employees, agents, and affiliates
                  from and against any losses, claims, damages, liabilities,
                  costs, or expenses (including reasonable attorney's fees and
                  expenses of investigation) incurred by the second Party in
                  relation to the medical services provided by the first Party
                  to any Customer/member of the second Party Member.
                </Text>
              </View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: "14px",
                  // textAlign: "center",
                }}
              >
                Prices and payment terms
              </Text>
              <Text>
                The first party is liable to pay of the total bill that spend by
                the client or member of second party in the cause of the event
                and it should be paid on completion of the service and payment
                done by client or member of second party and payment should be
                given through the agreed bank account of second party and first
                party shall not have any liability if the second party
                additionally charged from their client for the other services
                provided by the second party.
              </Text>
              <Text style={{ marginTop: 10 }}>
                If client is paying to second party for any service providing by
                first party in advance, second party should transfer that amount
                to first party after deducting their within 24 hours.
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/is-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <Text style={{ marginVertical: 20 }}>
                IN WITNESS WHEREOF, both the parties have executed this
                agreement by affixing their signatures on the day, month, and
                year first above mentioned in the presence of the following
                witnesses at Bangalore
              </Text>
              <View style={{ marginVertical: 10 }}>
                <View style={{ alignItems: "flex-start" }}>
                  <Text style={styles.headingUnderline}>WITNESSES:</Text>
                </View>
                <View style={styles.listItem}>
                  <Text>1. </Text>
                  <Text>FIRST PARTY:</Text>
                </View>
                <View style={{ ...styles.listItem, marginTop: 80 }}>
                  <Text>1. </Text>
                  <Text>SECOND PARTY:</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ContractIs;

<Page style={styles.page}>
  <View style={styles.section}>
    <Image src="/is-pdf-bg.png" style={styles.backgroundImage} />
    <View style={styles.content}></View>
  </View>
</Page>;
