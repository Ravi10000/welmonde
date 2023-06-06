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
    marginLeft: 40,
    marginRight: 40,
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

function ContractMou({ client, contract }) {
  // const addedOnDate = new Date(
  //   contract?.agreement?.createdAt
  // ).toLocaleDateString();
  const addedOnDate = contract?.agreement?.createdAt.toDate().toDateString();
  return (
    // <PDFViewer>
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/mou-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <Text style={{ ...styles.heading, ...styles.center }}>
                MEMORANDUM OF UNDERSTANDING
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
              <Text style={{ margin: 5 }}>
                Definitions: Unless repugnant to the context or meaning thereof,
                the capitalized terms defined herein shall have the following
                meaning:
              </Text>
              <View style={styles.listItem}>
                <Text>1.</Text>
                <Text>
                  Health Package: Means the healthcare packages devised to
                  provide a mix of services including individual procedures
                  (medical procedure or intervention, or treatment) and/or
                  Diagnostic Services.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>2.</Text>
                <Text>
                  Service: Care delivery activities to provide emergency and
                  non-emergency medical care to the customers/members of the
                  first party.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>3.</Text>
                <Text>
                  Treatment: Means the provision, coordination, or management of
                  healthcare and related services byone or more healthcare
                  providers, including the coordination or management of
                  healthcare by a healthcare provider with a third party;
                  consultation between healthcare providers relating to a
                  patient; or the referral of a patient for healthcare from one
                  healthcare provider to another.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>4.</Text>
                <Text>
                  Ayurveda: A balance between body, mind, spirit, and social
                  wellbeing.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>5.</Text>
                <Text>
                  Consultation: Means a consultation which takes place between a
                  patient and a licensed physician for the purpose of
                  determining what medical examinations or procedures, if any,
                  are appropriate.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>6.</Text>
                <Text>
                  Customer: Any person uses the services and avails for the
                  discounts, or purchases a package offered available on the
                  Welmonde User Interface.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>7.</Text>
                <Text>
                  Member: Shall mean any person who has purchased a package
                  offered on the Welmonde User Interface.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>8.</Text>
                <Text>
                  Welmonde User Interface: Shall mean the system program that
                  governs the means by which a user of an electronic device or
                  computer interacts with the electronic device or computer, and
                  includes the appearance, position and functionality of the
                  startup screen, program launcher, and other common interface
                  elements such as menus, buttons and dialog boxes, as well as
                  the applications bundled with the system program, through
                  which Welmonde Health Care Private Limited offers and carries
                  out its services.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>9.</Text>
                <Text>
                  Privilege Card: A card issued to Welmonde Customers upon their
                  first purchase of a package offered on the Welmonde User
                  Interface.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>10.</Text>
                <Text>
                  Medical tourism includes the services of, Pre-Arrival Medical
                  Opinion & Treatment, Visa Assistance, Travel Arrangement,
                  Comfortable Pleasant Stay etc.
                </Text>
              </View>
              <Text style={{ fontSize: "12px", marginVertical: 10 }}>
                WITNESSETH:
              </Text>
              <View style={{ gap: 5 }}>
                <Text>
                  Whereas the First Party is in the business of providing
                  Preventive HealthCare and other Medical Services to its
                  members/customers;
                </Text>
                <Text>
                  Whereas the Second Party is in Healthcare Services having its
                  business across India
                </Text>
                <Text>
                  Whereas as a matter of good gesture, various services are
                  provided by the First Party in its business, although it is
                  not obliged to, and they include the following
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>a. </Text>
                <Text>
                  Providing specified consultations with me or several doctors
                  approved and listed by the First Party and at the cost of the
                  First Party.
                </Text>
              </View>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/mou-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <View style={styles.listItem}>
                <Text>b. </Text>
                <Text>
                  Providing specified health check-ups and treatments diagnostic
                  centres/hospitals/clinics/customer and/or client locations
                  which are approved and listed by the First Party and at the
                  cost of the First Party.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>c. </Text>
                <Text>
                  Providing any treatments as and when required by the customer
                  of the first party upon the advice of the consultant of the
                  second party or any other consultant who is a registered
                  medical practitioner.
                </Text>
              </View>
              <View style={{ marginVertical: 10, gap: 10 }}>
                <Text>
                  Whereas the present agreement is concerned with the provision
                  of facilities referred to in Clause A and B supra
                </Text>
                <Text>
                  Whereas the Second Party in one of the Medical facilities has
                  its own pharmacy approved and listed by the First Party for
                  the purpose of providing medicine to the members/customers of
                  the First Party,
                </Text>
                <Text>
                  Whereas both parties mutually benefit from this contract in as
                  much as the members customers of the First Party would get
                  service from the Second Party and the Second Party gets an
                  opportunity to give service and get paid for the service so
                  rendered and also be known by a larger number of people which
                  would, in turn, help them become more popular,
                </Text>
                <Text>
                  Whereas although the First Party would be making payments to
                  the Second Party for the services rendered by the Second Party
                  to the member's customers of the First Party strictly in
                  accordance with the terms of this agreement and strictly in
                  conformity with and limited to what is stated in the Schedule
                  hereunder, it is very clearly understood that except to the
                  extent of liability to make payment for services to be
                  rendered by the Second Party to the members/customers of the
                  First Party, the First Party shall have no other obligation or
                  liability whatsoever and
                </Text>
                <Text>
                  Whereas the parties have finalized the terms and thought it
                  fit to reduce the terms so agreed upon between them into
                  writing.
                </Text>
              </View>
              <Text style={{ ...styles.heading, textAlign: "center" }}>
                NOW THIS AGREEMENT WITNESSETH AS FOLLOWS
              </Text>
              <View style={{ marginVertical: 10 }}>
                <View style={styles.listItem}>
                  <Text>1. </Text>
                  <Text>
                    Customer/member of the First Party means & includes the
                    member/customer, a corporate client of the First Party & his
                    family members.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>2. </Text>
                  <Text>
                    The Second Party shall give services to the customer member
                    of the first party as agreed under the Schedule 1of this
                    agreement with the First Party upon a mail communication or
                    through online communication.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>3. </Text>
                  <Text>
                    The Second party will provide a written communication or
                    confirm the appointment online using the Welmonde user
                    interface as confirmation for such appointments or in case
                    of any changes in the appointment the same shall be
                    communicated to the first party through E-Mail or using the
                    Welmonde user interface.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>4. </Text>
                  <Text>
                    The First party will issue a privilege card to the member
                    customer of the First party which will be presented in the
                    centre on the date of the appointment.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>5. </Text>
                  <Text>
                    The appointments for the services to be delivered by the
                    Second Party shall be predetermined by the first party on
                    behalf of its member/customer or through an agent of the
                    First Party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>6. </Text>
                  <Text>
                    Once the appointment is confirmed, the Second Party shall
                    not refuse the service to any member/customer of the First
                    Party However, during emergencies, an appointment can be
                    re-scheduled with the consent of the member/customer and/or
                    the First Party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>7. </Text>
                  <Text>
                    First Party will provide the second party with a user
                    interface to which the second party can upload all the test
                    results or any such documents related to the services
                    rendered by the second party including but not limited to
                    health check reports, medical prescriptions, advice sheets
                    and any other such documents deemed relevant.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>8. </Text>
                  <Text>
                    The second party will upload the test results in the user
                    interface provided by the First party failing on which the
                    payments for the particular health checks will be blocked by
                    the First party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>9. </Text>
                  <Text>
                    First Party will be issuing a privilege card to the customer
                    member of the first party which will be submitted to the
                    second party on the day of the appointment or in case the
                    customer member of the first party wants to avail of any
                    medical services from the second party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>10. </Text>
                  <Text>
                    Upon the submission of such card by the customer/member of
                    the first party the second party hereby agrees to provide
                    with discount as per schedule 2 mentioned in this agreement.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>11. </Text>
                  <Text>
                    Second Party is to provide the first party with the
                    appointment schedule of the medical practitioners of the
                    second party and upload such data in the user interface
                    provided by the first party so as to provide appointments to
                    the customer/member of the first party by means of the
                    online or offline channel.
                  </Text>
                </View>
              </View>
            </View>
            {/* //content */}
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/mou-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <View style={{ marginVertical: 10 }}>
                <View style={styles.listItem}>
                  <Text>12. </Text>
                  <Text>
                    Second Party to provide dedicated customer care personnel
                    for handling any queries or clarifications of the first
                    party and also in case of escalations or any other queries
                    related to services.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>13. </Text>
                  <Text>
                    The First Party shall make payment as per the schedule
                    hereunder within a period of 15 days from the date of the
                    invoice along with the details of the health checks upon due
                    validation by the First Party or any other agency appointed
                    for the same.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>14. </Text>
                  <Text>
                    The Second party should not share the prices agreed with the
                    First party agreed under this agreement with the
                    customer/member of the first party. In case of any such
                    disclosures, the first party holds the right to hold the
                    payments of the second party for such services rendered.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>15. </Text>
                  <Text>
                    Second Party also agrees to co-brand with the First Party to
                    render medical services for corporate customers/member of
                    the first party which may deem fit for the second party and
                    with the mutual agreement between both parties by the means
                    of E-mail communication or addendum to this agreement.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>16. </Text>
                  <Text>
                    The inter-se relationship of the customers of the First
                    Party and the Second Party is on the basis that there is a
                    direct contract between them and the First Party shall have
                    no role to play in the consultation sought by the
                    member/customer of the First Party and consultation given by
                    the Second Party except to the extent of making payment as
                    per this agreement subject to maximum liability as mentioned
                    in the schedule hereunder.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>17. </Text>
                  <Text>
                    While the First Party has approved and listed several
                    medical facilities, it is the choice of the member/customer
                    of the First Party to visit any of the listed medical
                    facilities for service and it is made clear that First Party
                    has neither introduced nor made any statements whatsoever
                    with respect to the Second Party and as such the
                    inter-relationship between the member/customer of the First
                    Party and the Second Party is totally and absolutely
                    independent of the First Party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>18. </Text>
                  <Text>
                    It is permissible for the Second Party to give such advice
                    to the member customer of the First Party as the Second
                    Party may think fit and consequent upon such advice if any
                    service rendered by the Second Party beyond what is
                    contemplated in the Schedule or if such service were to cost
                    any amount in excess of the maximum liability fixed under
                    this agreement, it shall be a matter between the Second
                    Party and the members/customers of the First Party and the
                    First Party shall not be answerable to the same.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>19. </Text>
                  <Text>
                    The maximum liability of the First Party regarding any
                    liability arising out of any Sample Sourced and presented to
                    the Second Party shall be to the extent of making payment as
                    mentioned in the Schedule and under no circumstances and for
                    no reason the liability shall increase.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>20. </Text>
                  <Text>
                    The Schedule to this agreement may be read as part and
                    parcel of this agreement and it gives inter alia, the
                    details of the facilities/consultations/checks to be given
                    by the Second Party to the member/customer of the First
                    Party and the amount payable to the Second Party by the
                    First Party for services so rendered.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>21. </Text>
                  <Text>
                    The validity of this agreement shall be for a period of 3
                    years from the date of signing extending to the last day of
                    that calendar month Either Party will have the right to
                    terminate the agreement by giving at least 30 days' notice
                    in writing, clearly mentioning their intention to end the
                    agreement to the either Party. In the event of termination
                    and abandonment thereof, this Agreement shall become void
                    and shall have no effect, without any liability on the part
                    of any of the parties or their directors, officers, or
                    shareholders in respect of this Agreement.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>22. </Text>
                  <Text>
                    In the event of any dispute, the difference of opinion
                    whatever may at any time arise between the parties in
                    respect of anything contained in this agreement or as to the
                    use, rights, and liabilities, and entitlement or to the
                    interpretation of any terms of this agreement, the same
                    shall be referred to the arbitration of person(s) acceptable
                    to both the parties and the decision shall be final and
                    binding on both the parties.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>23. </Text>
                  <Text>INDEMNITY CLAUSE:</Text>
                </View>
                <View style={{ marginHorizontal: 5 }}>
                  <View style={styles.listItem}>
                    <Text>1. </Text>
                    <Text>
                      The Second Party hereby agrees that any liability arising
                      due to any default or negligence in providing or
                      performing the Medical services shall be borne exclusively
                      by the Second Party who alone shall be responsible for the
                      defect and/or deficiencies in rendering such Medical
                      services.
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
                      The Second Party shall at all times, indemnify and keep
                      indemnified The First Party its present and former
                      officers, directors, employees, agents and affiliates
                      against all actions, suits, claims and demands brought or
                      made against it in respect of anything done or purported
                      to be done by the Second Party in connection with the
                      responsibilities or services under these Terms and against
                      any loss or damage caused to The First Party in
                      consequence of any action or suit being brought against
                      The First Party, along with the Second Party or otherwise,
                      for anything done or purported to be done in the course of
                      the performance of services under these Terms.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/mou-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <View style={{ marginHorizontal: 5 }}>
                <View style={styles.listItem}>
                  <Text>4. </Text>
                  <Text>
                    The First Party shall have the right to participate as a
                    party, along with the Second Party or otherwise, in all
                    actions, suits, claims and demands brought or made against
                    it in respect of anything done or purported to be done by
                    the Second Party in connection with any of the services
                    under these Terms.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>5. </Text>
                  <Text>
                    The Second Party shall at all times abide by the statutory
                    and/or regulatory requirements prevalent in India and shall
                    keep free and indemnify The First Party from all demands or
                    responsibilities arising from accidents or loss of life, the
                    cause or result of which is negligence or misconduct on the
                    part of the Second Party.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>6. </Text>
                  <Text>
                    The Second Party shall pay all indemnities arising from the
                    above-stated incidents without any extra cost to The First
                    Party and shall not hold The First Party responsible or
                    obligated for the same.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>7. </Text>
                  <Text>
                    The Second Party shall be solely responsible for the Medical
                    services to be rendered to the Customer/member of The First
                    Party, The First Party shall not be liable in any manner
                    whatsoever for the standards of quality, accuracy, or rates
                    charged by the Second Party and/or any other aspect of any
                    service provided to any Customer/member of The First Party
                    by the Second Party. The Second Party hereby agrees to
                    indemnify, defend and hold harmless The First Party, its
                    present and former officers, directors, employees, agents,
                    and affiliates from and against any losses, claims, damages,
                    liabilities, costs, or expenses (including reasonable
                    attorney's fees and expenses of investigation) incurred by
                    The First Party in relation to the Medical services provided
                    by the Second Party to any Customer/member of the First
                    Party Member.
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text>8. </Text>
                  <Text>
                    In case of any disputes or non-payment of dues or any such
                    event between the parties, the second party will not deny
                    holding any reports of the members/customers of the first
                    party in case the appointment is given andthe service is
                    done. However, the second party has the freedom to deny
                    appointments raised by the first party forits
                    members/customers for services rendered by the second party.
                  </Text>
                </View>
              </View>
              <View style={{ marginVertical: 15 }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.headingUnderline}>SCHEDULE 1</Text>
                </View>
                <View style={{ alignItems: "flex-start", gap: 10 }}>
                  <Text style={{ borderBottom: "2px solid black" }}>
                    Services to be given by the Second Party:
                  </Text>
                  <Text>
                    All Health Packages, services and consultation should be
                    given on agreed rates by First Party and Second Party
                  </Text>
                </View>
              </View>
              <View style={{ marginVertical: 15 }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.headingUnderline}>SCHEDULE 2</Text>
                </View>
                <View style={{ alignItems: "flex-start", gap: 10 }}>
                  <Text style={{ borderBottom: "2px solid black" }}>
                    AGREED FOR VARIOUS SERVICES
                  </Text>
                  <Text>
                    Second Party agrees to pay ______________________ of any
                    service provided per patient to the first party as SERVICE
                    CHARGE.
                  </Text>
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <View style={{ alignItems: "flex-start", gap: 5 }}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ borderBottom: "2px solid black" }}>
                      Appointments:
                    </Text>
                  </View>
                  <Text>
                    Appointments for the services can be fixed through email or
                    through the user interface provided by the first party to
                    the Second Party and the same being duly validated by the
                    First Party or any other agency appointed by the First Party
                    for the purpose: Appointment shall be given by the Second
                    Party within 24 hours of the request for an appointment.
                  </Text>
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <View style={{ alignItems: "flex-start", gap: 5 }}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ borderBottom: "2px solid black" }}>
                      Duration of Consultation
                    </Text>
                  </View>
                  <Text>
                    As per the requirement and based on the actual situation
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Image src="/mou-pdf-bg.png" style={styles.backgroundImage} />
            <View style={styles.content}>
              <View style={{ marginVertical: 10 }}>
                <View style={{ alignItems: "flex-start", gap: 5 }}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ borderBottom: "2px solid black" }}>
                      Place of Consultation
                    </Text>
                  </View>
                  <Text>All branches of service providers across India</Text>
                  <Text>
                    IN WITNESS WHEREOF, both the parties have executed this
                    agreement by affixing their signatures on the day, month,
                    and year first above mentioned in the presence of the
                    following witnesses at Bangalore.
                  </Text>
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <View style={{ alignItems: "flex-start" }}>
                  <Text style={styles.headingUnderline}>WITNESSES:</Text>
                </View>
                <View style={styles.listItem}>
                  <Text>1. </Text>
                  <Text>FIRST PARTY:</Text>
                </View>
                <View style={{ ...styles.listItem, marginTop: 60 }}>
                  <Text>1. </Text>
                  <Text>SECOND PARTY:</Text>
                </View>
              </View>
              <Text style={{ textAlign: "right" }}>
                CONTACT NUMBER: {client?.mobile}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    // </PDFViewer>
  );
}
export default ContractMou;

<Page style={styles.page}>
  <View style={styles.section}>
    <Image src="/mou-pdf-bg.png" style={styles.backgroundImage} />
    <View style={styles.content}></View>
  </View>
</Page>;
