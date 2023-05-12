import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
  Font,
} from "@react-pdf/renderer";

// Font.register({ family: "Times-New-Roman", src: "/fonts/times.ttf" });

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  section: {
    margin: 40,
    padding: 10,
    flexGrow: 1,
    fontSize: "12px",
    fontFamily: "Times-Roman",
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
  list: {
    margin: "5px 10px",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    // margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    // margin: "auto",
    // marginTop: 5,
    fontSize: 10,
    padding: 5,
  },
  tableHead: {
    fontSize: "13px",
  },
  captilaze: {
    textTransform: "capitalize",
  },
});

function ContractPharmacy({ client, contract }) {
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text
                style={{
                  margin: "5px",
                  textAlign: "center",
                  borderBottom: "2px solid black",
                }}
              >
                SERVICE AGREEMENT
              </Text>
            </View>
            <Text>
              This Agreement was entered into on the{" "}
              {" " + new Date().toDateString()}, by and between:
            </Text>
            <Text style={styles.margin}>
              <Text style={styles.highlight}>
                Welmonde HealthCare Private Limited,{" "}
              </Text>
              a Private Limited Company having its registered office at, 71-72,
              Jyoti Nivas College Road, 5th Block, Koramangala,
              Bangalore-560034. Represented by Laxmi , Director In International
              Business and hereinafter referred to as the First Party:
            </Text>
            <Text style={{ ...styles.center, ...styles.margin }}>And</Text>
            <Text>
              <Text style={styles.captilaze}>{client?.businessName}</Text>, is
              located at
              <Text style={styles.captilaze}>
                {" " + contract?.agreement?.clientAddress}
              </Text>
              , Represented by
              <Text style={styles.captilaze}>
                {" " + contract?.agreement?.representativeName}
              </Text>
              , Authorized Signatory and hereinafter referred to as second
              party:
            </Text>

            <Text style={{ marginTop: "15px" }}>
              Welmonde HealthCare Private Limited is an online Medicine Delivery
              Platform on the website located at the URL www.welmonde.health,
              mobile application (collectively referred to as "Platform") which
              acts as an online platform facilitating different to sell their
              products and/or services and enables different buyers to purchase
              the products and/or services offered by sellers Seller is desirous
              of using the Platform to offer and sell various products of the
              Seller to the users of the Platform& nbsp
            </Text>
            <Text style={{ marginTop: "15px" }}>
              NOW THEREFORE THE PARTIES HERE TO AGREE AS FOLLOWS:
            </Text>
            <View style={styles.list}>
              <Text>1. </Text>
              <Text>
                Definitions: Unless repugnant to the context or meaning thereof,
                the capitalized terms defined herein shall have the following
                meaning:
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.1 </Text>
              <Text>
                "Applicable Law" mean any and all: (a) laws, statutes,
                constitutions, treaties, rules, regulations, ordinances, codes,
                guidance, and common law; and (b) all judicial, executive,
                legislative, administrative, or military orders, directives,
                decrees, injunctions, judgements, permits, agreements, and other
                legal requirements, in each case, of, with, or adopted or
                imposed by any governmental authority, now or hereafter in
                effect and, in each case, as amended from time to time.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.2 </Text>
              <Text>
                "Buyer"/"Customer" shall mean any user of the Platform who
                purchases any products and/or Services of the Seller through the
                Platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.3 </Text>
              <Text>
                "Catalogue" shall mean details relevant to the sale/purchase of
                the products, including the selling price, an informative
                description of each Product and its contents, by way of text
                descriptions, graphics, or pictures or videos as provided by the
                Seller. The seller is supposed to share the information required
                by the platform for cataloging and shall verify the same on
                platform whenever the listing is live.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.4 </Text>
              <Text>
                "Confidential Information" shall mean any information shared
                between the platform and seller and not available to the public
                otherwise
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.5 </Text>
              <Text>
                "Courier Fees" shall mean the fees payable to the platform for
                the avail of the courier services through the Platform's Courier
                Partner(s) and shall mean the courier fees as may be provided
                from time to time
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.6 </Text>
              <Text>
                "Courier Partner" shall mean the courier platform with whom the
                platform have partnered, to enable the sellers to avail their
                logistic services for couriering/delivering the products
                purchased by the customers through the platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.7 </Text>
              <Text>
                "Force Majeure Event" means an event which that is beyond the
                reasonable control of a seller,and which makes a Seller's
                performance of its obligation hereunder impossible or so
                impractical as reasonable to be considered impossible in the
                circumstances, and includes, but is not limited to, war,
                terrorist activities, riots, civil disorder, earthquake, fire,
                explosion, storm, flood, or other adverse weather conditions,
                strikes, lockouts, or other industrial action, confiscation or
                other action by government agencies. Force majeure shall not
                include: (i) any event which is caused by the negligence or
                intentional action of a seller or such seller's subcontractors,
                consultants, agents, or employees,
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page} size="A4">
          <View style={styles.section}>
            <Text>
              nor (ii) any event which a diligent seller could reasonably have
              been expected to both (a) take into account at the time this
              Agreement was entered into; and (b) avoid or overcome in the
              carrying out of its obligations under this Agreement.
              Insufficiency of funds or failure to make payments due under this
              agreement for any reason whatsoever shall not be considered a
              Force Majeure Event.
            </Text>
            <View style={styles.list}>
              <Text>1.8 </Text>
              <Text>
                "Intellectual Property Rights" or "IPR" include (i) all rights,
                title, and interest under any statute or under Applicable Law
                including patent rights; copyrights including moral rights; and
                any similar rights in respect of Intellectual Property, anywhere
                in the world, whether negotiable or not; (ii) any licenses,
                permissions, and grants in connection therewith; (iii)
                applications for any of the foregoing and the right to apply for
                them in any part of the world; (iv) right to obtain and hold
                appropriate registrations in Intellectual Property anywhere in
                the world; (v) all extensions and renewals thereof; and (vi)
                causes of action in the past, present or future, related thereto
                including the rights to damages and profits, due or accrued,
                arising out of past, present or future infringements or
                violations thereof and the right to sue for and recover the
                same.{" "}
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.9 </Text>
              <Text>
                "Invoice" shall mean the invoice as may be raised by the Seller
                on the purchase of a Seller's Product and/or Services by a
                Buyer, through the Platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.10 </Text>
              <Text>
                "List Price" shall mean the price of a Product in INR at which a
                Product is listed at the platform by the seller
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.11 </Text>
              <Text>
                “Malpractice" shall mean and include but are not limited to
                selling and delivering wrong fake, duplicate, spurious,
                counterfeit, damaged, defective, refurbished Products by the
                Seller to users/buyers
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.12 </Text>
              <Text>
                “Marketplace Fee" shall mean the total charges that WELMONDE
                charge the seller for any sale in the platform. This shall
                include but not limited to payment gateway charges, commission,
                logistics fee, service taxes, etc.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.13 </Text>
              <Text>
                "Order" shall mean the order placed by the buyer to the Seller
                through the platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.14 </Text>
              <Text>
                "Packaging Material" shall mean the packaging materials as
                provided by WELMONDE for the purpose of secondary packaging of
                the order that are received.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.15 </Text>
              <Text>
                "Welmonde Policies" means the various policies which Welmonde
                may issue and make applicable on the Seller from time to time
                including Terms of use of the Platform which are applicable to
                the Seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.16 </Text>
              <Text>
                "Product(s)/Service(s)" shall mean the Product(s) and/or
                Service(s), made available by the seller for sale on the
                Platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.17 </Text>
              <Text>
                Prohibited item(s) are the products and services prohibited by
                any Applicable Law for the time being in force.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.18 </Text>
              <Text>
                "Shipment SLA" shall mean SLA for dispatch mentioned on each
                Product page, and it is the Seller's responsibility to honor
                Shipment SLA.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.19 </Text>
              <Text>
                "Transaction" shall mean a bipartite transaction for the sale by
                the Seller and Customer for the purchase of the Products and/or
                Services, to be sold through the Platform
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.20 </Text>
              <Text>
                "Margin" is defined as the agreed value that the platform will
                payout the seller for any successful delivered order to the
                customer.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>1.21 </Text>
              <Text>
                "Seller Cancellation Fee" is defined as the penalty on account
                of not fulfilling the order after receiving an order for a
                product or service. If an order is not processed within 24 hours
                after receiving the order, then the order will be marked as
                Seller cancellation.
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page} size="A4">
          <View style={styles.section}>
            <Text style={{ margin: "0 0 20px 0" }}>2. SELLER REGISTRATION</Text>
            <View style={styles.list}>
              <Text>2.1 </Text>
              <Text>
                Sale in the platform shall be made by sellers who enter into a
                legally binding contract and have completed the seller
                registration process as required by the Companies which is true
                and correct as of date.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>2.2 </Text>
              <Text>
                After successful seller registration, commercials will be sent
                to the registered email ID as provided and the same shall be
                agreed upon by the seller before the commencement of operations.
                Welmonde reserve the right to amend the commercials from time to
                time and will be intimatedto the seller's registered email ID.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>2.3 </Text>
              <Text>
                The Companies reserve the right to determine the sellers who may
                sell on the Platform and to suspend access to registered Sellers
                to the Platform or to terminate the same, only in accordance
                with this Agreement without assigning any reasons thereto. The
                Companies also reserve the right to select/delist the Products
                displayed/offered for sale or to be displayed/offered for sale
                on the Platform
              </Text>
            </View>
            <Text style={{ margin: "10px 0" }}>3. SELLER OBLIGATIONS</Text>
            <Text style={{ margin: "0px 0" }}>
              A. FOR SALE AND DELIVERY OF THE PRODUCT
            </Text>
            <View style={styles.list}>
              <Text>3.1 </Text>
              <Text>
                The Seller shall share with Platform appropriate information
                including but not limited to the category of the Product, MRP,
                list Price, description, how to use, precaution, prescription
                requirement etc., and confirms and acknowledges that such
                Catalogue details shall be in compliance with all Applicable
                Laws and shall be liable for any violation in this regard
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.2 </Text>
              <Text>
                The Seller shall not sell any prohibited products in case of
                doing so Welmonde shall be entitled to block all such products
                and shall also have the right to suspend or terminate the
                Products from the Platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.3 </Text>
              <Text>
                The order shall be placed by the Customer directly to the Seller
                through the Platform and the product shall be
                dispatched/delivered by the seller to the customer.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.4 </Text>
              <Text>
                The terms such as guarantees, warranties, and after-sales
                services related to the Productsand/or the Services shall be
                between the Seller and the Buyer alone
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.5 </Text>
              <Text>
                The Seller shall sell its product to the customer; the platform
                shall just act as an enabler for the same
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.6 </Text>
              <Text>
                The Seller shall sell its product to the customer; the platform
                shall just act as an enabler for the same
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.7 </Text>
              <Text>
                All commercial/contractual terms in respect of the Product
                services that are offered on the Platform shall be agreed upon
                between the Platform and the Seller. The commercial/contractual
                terms in respect of Product/services shall include only to the
                extent of price, shipping costs, payment methods and terms,
                date, period, and mode of delivery.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.8 </Text>
              <Text>
                Other terms such after-sales services related to the
                service/delivery will be taken care of by platform whereas the
                service related to product will be taken care of by seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.9 </Text>
              <Text>
                The Seller shall at all times ensure full compliance with the
                applicable provisions of the laws. including but not limited to
                drugs and cosmetics Act; Ayush; Information Technology Act;
                Legal Metrology Act; FSSAI, the Drugs, and Magic Remedies
                (Objectionable Advertisements) Act, etc.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.10 </Text>
              <Text>
                Seller hereby acknowledges, agrees and undertakes that he/it
                will never obliterate, smudge or alter the Maximum Retail Price
                (MRP) indicated by the manufacturer or packer, or importer. If
                there is any change in MRP arising due to a change in batch of
                the product or whatsoever be the reason, the seller shall raise
                with the platform to get the necessary changes done. In case of
                violation, the Platform at its sole discretion may recover GMV
                of the concerned product (s), indemnify itself of all losses,
                damages, legal risks/costs may decide to impose a penalty as in
                the agreement and the Platform may further decide to suspend
                Seller for the further business till he/it pays the imposed
                penalty and or damages and the Platform may also terminate the
                Agreement in the event of finding second and subsequent such
                violations on the part of Seller.
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page} size="A4">
          <View style={styles.section}>
            <View style={styles.list}>
              <Text>3.11 </Text>
              <Text>
                1 Marketplace Model - The seller will be taking care of
                warehousing and packaging. The platform shall support packaging
                material, pick-up logistics, and delivery.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.12 </Text>
              <Text>
                Seller undertakes and confirms that while listing the inventory
                of the Product, the Seller has physical possession and owns such
                quantity of product as listed on the platform and further
                undertakes to fulfill the orders placed by the buyer promptly.
                In the event of delay in shipment/delivery of Product or seller
                cancellation of orders due to non-availability of Product, the
                seller acknowledges that Welmonde shall charge the seller
                cancellation fee to the seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.13 </Text>
              <Text>
                In accordance with the GST laws, the Seller shall be solely
                responsible to issue documents such as way E-waybills, delivery
                challans etc. as required for transportation of Products from
                one place to another and neither the Platform nor the Courier
                Partners with whom the Platform as a marketplace has tied up,
                shall be responsible for any loss arising due to confiscation of
                goods by governmental agencies on account of lack of proper
                documentation, misdeclaration etc
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.14 </Text>
              <Text>
                The payments to sellers will be basis the commercials agreed
                between Welmonde and the seller.
              </Text>
            </View>
            <Text style={{ margin: "10px 0" }}>
              B. NON-DELIVERY OR RETURN OF PRODUCTS
            </Text>
            <View style={styles.list}>
              <Text>3.15</Text>
              <Text style={{ textDecoration: "underline" }}>
                Return of the Product due to fault of the Seller:
              </Text>
            </View>
            <View style={styles.list}>
              <Text>a. </Text>
              <Text>
                Where the Product has been returned due to any reason/fault
                attributable to Seller, then the Platform shall on behalf of the
                Seller refund to the Buyer the Selling Price and delivery
                charges if any paid by the customer to purchase the Product and
                Seller shall be liable to pay the Platform reverse shipping
                charges as in the commercials.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>b. </Text>
              <Text>
                Returns due to unsuccessful delivery to Customer or Customer
                cancellations prior to delivery completion is not charged. The
                Marketplace fee if any charged shall be returned. These returns
                are commonly termed as RTO.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>c. </Text>
              <Text>
                Seller agrees and acknowledges that the Platform shall be
                entitled to recover/adjust any outstanding amount due and
                payable by the Seller to the Platform under this Agreement from
                any Seller Proceeds payable to Seller and Seller undertakes not
                to object to such recovery/adjustment.
              </Text>
            </View>
            <Text style={{ margin: "10px 0" }}>
              C. GENERAL OBLIGATIONS OF THE SELLER
            </Text>
            <View style={styles.list}>
              <Text>3.16</Text>
              <Text>
                During the Term, the Seller shall appoint a representative, who
                shall be the Platform's point of contact for any and all matters
                related to this Agreement, including but not limited to all
                sales and delivery-related matters
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.17</Text>
              <Text>
                Seller shall comply with all applicable laws and obtain all
                necessary licenses and permits applicable to them.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.18</Text>
              <Text>
                The Seller shall be solely responsible and liable for any
                complaints and queries of the Buyers with respect to the
                Products in terms of the details of the same, quality and
                packaging etc. The same will be communicated to the
                representative as stated in the clause above
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.19</Text>
              <Text>
                The Seller shall be solely responsible for making any
                representations or warranties with respect to the quality of the
                Product to the Buyer, including all relevant Product warranties.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.20</Text>
              <Text>
                The Seller Agrees and ensures that the seller shall have
                appropriate infrastructure to substantiate the
                genuineness/authenticity of packing the order and when any
                claims/dispute arise in case of any third-party complaints the
                platforms shall ask for such proof from the sellers. The sellers
                shall protect and preserve such proofs for at least 30 days from
                the date of receiving an order.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.21</Text>
              <Text>
                Seller shall maintain records of all the products purchased by
                the buyers through the platform, all returns, refunds, etc. as
                may be required for audit and regulatory purposes and for the
                platform's customer service purposes
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <View style={styles.list}>
              <Text>3.22</Text>
              <Text>
                The Seller undertakes and agrees that product Catalogue listing
                details on the Platform shall be true, correct, and duly
                authorized. If the Seller is found to be involved in any such
                misrepresentation or illegal activity or malpractices, the
                Seller acknowledges that the Platform reserves the right to
                blacklist the seller from selling on Welmonde. Dispatching of
                products by the Seller not as desired by the Customers shall
                amount to Malpractice under this agreement.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.23</Text>
              <Text>
                If any information is not provided but required to better
                represent the Product on the Platform, the Platform shall
                intimate the Seller about the same and it shall be provided 15
                daysfrom the date of such request made by the Platform
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.24</Text>
              <Text>
                The Seller undertakes and agrees to dispatch and deliver only
                those genuine and original products that were ordered by the
                Platform or its channel partner and not to dispatch any other
                product of lesser value or any other material which is not
                ordered. The seller agrees and acknowledges that all costs
                including attorney's fee etc for any claim/dispute arising out
                of this agreement not limited to malpractice initiated by the
                customer/platform/any third party shall be borne the Seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.25</Text>
              <Text>
                Platform shall be eligible to change the language of the content
                as required and shall make sure the meaning of the content shall
                not change in such case
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.26</Text>
              <Text>
                The Seller acknowledges that the Platform have the right to cap
                the maximum quantity of Product to be sold and listed on the
                Platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>3.27</Text>
              <Text>
                The seller agrees and undertakes that the seller shall not, at
                any time, purchase more than 25% of your inventory (in terms of
                annualized value in a financial year), purported to be sold on
                the Platform or its Group Companies. Group Company shall have
                the meaning as per the extant Foreign Direct Investment Policy
                of India. We may require you to provide certification (including
                auditors certificate) to confirm compliance with this
                requirement. The Platform does not mandate that any of your
                Products should be sold exclusively on the platform. Any written
                or oral arrangements to the contrary, shall stand unilaterally
                waived
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4. </Text>
              <Text>PAYMENT TERMS</Text>
            </View>
            <View style={styles.list}>
              <Text>4.1 </Text>
              <Text>
                Registration on the Platform is free. Welmonde does not charge
                any fee for browsing/registering on the Platform. However,
                before you list a product or service for sale through the
                Platform, we request you to review our fee policy, which is
                hereby incorporated by reference into this agreement and shall
                be communicated to you through an email from seller
                support@welmonde.health. Welmonde reserves the right to change
                its fee policy from time to time. In particular, Welmonde may,
                at its sole discretion, introduce new services and modify some
                or all of the existing services offered on the Platform. In such
                an event, Welmonde reserves the right to introduce fees for the
                new services offered or amend/introduce fees for existing
                services, as the case may be. Changes to the fee policy shall be
                communicated to you and such changes shall automatically become
                effective immediately from the date of the communication. Unless
                otherwise stated, all fees shall be quoted in Indian Rupees
                (INR) and payable to Welmonde. You shall be solely responsible
                for compliance with all applicable laws for making payments to
                Welmonde.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.2 </Text>
              <Text>
                The Seller shall receive the payment for the products within 15
                business days from the date of dispatch from the seller for the
                products shipped to the customer on the below agreed terms:
                payment shall be done for all orders processed in a week,
                deductible with cancelled/returned orders or anything for which
                payment is to be recovered from the seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.3 </Text>
              <Text>
                The Seller will be responsible for payment of all applicable
                taxes from time to time as notified by the statutory governing
                authorities including GST, local levies, or other charges levied
                by Central/State/local authorities, etc.as per prevailing
                government rates. For the purpose of this Agreement, GST shall
                include the Central Goods and Services Tax (CGST), the State
                Goods and Services Tax (SGST), Union Territory Goods and
                Services Tax (UTGST), and/or the Integrated Goods and Services
                Tax (IGST), compensation cess or any other indirect taxes
                including cess as may be applicable. The Seller hereby agrees to
                provide the Platform with the respective GST TIN Numbers on
                which the Platform shall raise the invoices.
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <View style={styles.list}>
              <Text>4.4 </Text>
              <Text>
                The Seller agrees and acknowledges that the Platform retains the
                right to deduct tax collected at source "TCS" as per GST law or
                any other taxes (at the rates prescribed under the Applicable
                Law), for the Seller with respect to physical goods at net value
                exclusive of taxes and with respect to services at gross value
                inclusive of taxes. The Seller shall be responsible for the
                reconciliation of Tax Collected at Source (TCS) with the
                Platform statements, within the timelines specified by the
                Platform, or by law, from time to time. In due compliance with
                its obligations, the Platform may remit, the TCS from the
                Seller, to the respective Central and State Government/Union
                Territory. Such remittance is in full discharge of obligations
                on the part of the Platform. Upon the fulfilment of such
                obligations, the Platform shall not be responsible for any
                inability on the part of the Seller, to claim a tax credit of
                the applicable tax collected from it by the platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.5 </Text>
              <Text>
                The Seller may be eligible to collect TCS credit basis returns
                filed by the Seller with the applicable governmental authority.
                The Platform shall not be responsible for the denial of TCS
                credit to the seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.6 </Text>
              <Text>
                Seller agrees that the Platform shall, at all times, have the
                right and option to deduct/adjust any payments due to, or from,
                Seller in one transaction, against any payments due to, or from
                Seller in other or previous transactions.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.7 </Text>
              <Text>
                It is the responsibility of the Seller to provide the correct
                Harmonized System Nomenclature Code/Service Accounting Code to
                the Platform, at the time of listing its Products on the
                Platform
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.8 </Text>
              <Text>
                Invoice generation: A seller expressly agrees that issuing
                correct and complete invoice is the sole and primary
                responsibility of a seller. We will assist you with this process
                by generating an invoice on your behalf. The invoice shall then
                be generated and sent to the seller. The seller shall be
                required to physically sign the invoice, print the invoice, and
                affix the same on the consignment. The invoice generated by
                Welmonde shall be affixed by the seller on the consignment.
                Notwithstanding anything else contained in these terms of use,
                the seller shall be solely liable for any liability which may be
                imposed by taxation authorities for any discrepancy in the
                invoices
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.9</Text>
              <Text>
                Any seller initiated/sponsored promotion will be recovered from
                the seller. The same can be deducted from payments to seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>4.10</Text>
              <Text>
                The Seller agrees that the transaction price paid by the
                customer will be remitted to the seller contingent upon the
                following events:
              </Text>
            </View>
            <View style={styles.list}>
              <Text>a) </Text>
              <Text>
                Buyer confirms the delivery of products and/or services in the
                transaction;
              </Text>
            </View>
            <View style={styles.list}>
              <Text>b) </Text>
              <Text>
                Buyer does not take any action on payment facility to confirm
                delivery within such a time period as provided in the policies
                despite confirmation of dispatch of products and/or services by
                a seller to the customer;
              </Text>
            </View>
            <View style={styles.list}>
              <Text>c) </Text>
              <Text>
                Buyer refund claim is rejected by the Platform due to any breach
                of the agreement, policies, and any applicable law;
              </Text>
            </View>
            <View style={styles.list}>
              <Text>d) </Text>
              <Text>
                Remittances to a seller for successful transactions under the
                payment facility, excluding COD transactions, would be in
                compliance with directions issued by the Reserve Bank of India
                (RBI) for opening and operation of accounts and settlement of
                payments for electronic payment transactions involving
                intermediaries vide its notification
                RBI/200910/231DPSS.CO.PD.No.1102/ 02.14.08/200910 dated November
                24, 2009 ('RBI Intermediary Guidelines"). As per the RBI
                Intermediary Guidelines, payments to sellers which do not
                involve the transfer of funds to nodal banks shall be effected
                within a maximum of T+2 settlement cycle (where T is defined as
                the day of intimation regarding the completion of transaction)
                ("Master Settlement Date"). Completion of the transaction shall
                be defined as
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Particulars</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Thresholds</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    Order date to dispatch date
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>24 hrs</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    Dispatch date to delivered date
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>24 hrs</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Return policy</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>48 hrs</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    Return request date to return completed date
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>7 days</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    Completion of the transaction (T)
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>7 days</Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.list, marginTop: "20px" }}>
              <Text>5. </Text>
              <Text>
                TRANSFER OF OWNERSHIP OF PRODUCT, LOGISTICS, AND CONSUMER RIGHTS
              </Text>
            </View>
            <View style={styles.list}>
              <Text>5.1 </Text>
              <Text>
                The Seller will offer standard Manufacturer's or Seller's
                warranty actually associated with the Products. However, the
                Seller agrees that repair, replacement or 100% (one hundred
                percent) refund of Money will be given to the customer against
                any manufacturing defect or damage reported by the customer. The
                Seller shall be solely responsible to issue a suitable, duly
                stamped, manufacturer's warranty card to the Buyer with the
                product at the time of dispatch of the product, if applicable.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>5.2 </Text>
              <Text>
                The Seller undertakes to bear all logistics costs with respect
                to return/reverse orders due to fault in terms of Product
                attribute.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>5.3 </Text>
              <Text>
                In case the Platform cancels their order for any reason
                whatsoever before the shipment of order, the platform will
                inform seller to stop the delivery of the said order
              </Text>
            </View>
            <View style={styles.list}>
              <Text>5.4 </Text>
              <Text>
                The Platform shall provide the packaging materials to the Seller
                and the same shall be utilized by the Seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>5.5 </Text>
              <Text>
                The Seller shall furnish to the Platform Proof of Delivery ("
                POD") Dispatch of order within 24 hours of such request by the
                Platform. The seller shall protect and preserve the POD for a
                periodof 1 year and submit it to the platform whenever asked.
                The validity of this agreement shall be for a period of 3 years
                from the date of signing extending to the last day of that
                calendar month either party will have the right to terminate the
                agreement by giving at least 30 days' notice in writing.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>5.6 </Text>
              <Text>
                The Platform will ensure that our products are not sold above
                MRP and the pricing is not limited to discounts/offers will be
                at the discretion of the seller
              </Text>
            </View>
            <View style={styles.list}>
              <Text>5.7 </Text>
              <Text>
                The Platform shall run schemes for the purpose of improving
                their operational efficiency. The said scheme shall be announced
                by the platform from time to time. Participation in these
                schemes is at the discretion of the sellers. The said schemes
                shall be informed to the seller's prior to the supply/sale of
                goods and only on acceptance the scheme will be applicable
              </Text>
            </View>
            <View style={styles.list}>
              <Text>6. </Text>
              <Text>REPRESENTATIONS AND WARRANTIES</Text>
            </View>
            <Text style={{ marginLeft: "20px" }}>
              The Parties hereby represent and warrant to each other as under
            </Text>
            <View style={styles.list}>
              <Text>6.1 </Text>
              <Text>The Seller represents and warrants that</Text>
            </View>
            <View style={styles.list}>
              <Text>a. </Text>
              <Text>
                The Seller has and shall maintain all licenses and registrations
                required for selling the Products online or otherwise during the
                Term.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>b. </Text>
              <Text>
                The Seller shall not describe himself/itself as an agent or
                representative of the Platform or make any representations to
                any Buyer or any third party or give any warranties.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>c. </Text>
              <Text>
                In no case, the Seller shall issue pamphlets or contact the
                Buyers directly in connection with the order through the
                Platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>d. </Text>
              <Text>
                The Seller agrees to attend to, and resolve, the Buyer's queries
                with regard to the quantity and quality of the products within 3
                days from the date of receipt of such queries
              </Text>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <View style={styles.list}>
              <Text>e. </Text>
              <Text>
                The Seller agrees, acknowledges, and understands that: The
                permission granted by the Platform to use the Platform as an
                online marketplace is on a non-exclusive basis; The Platform
                reserves the right to deny access to, or revoke such permission
                to use the Platform at any time and shall have the right to
                remove the listing of any Product being offered for sale by
                Seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>f. </Text>
              <Text>
                Seller hereby provides his consent allowing various banks,
                payment instrument provider offers cash back on usage of their
                payment instrument to the buyers for payment of
                Product/Services.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>6.2 </Text>
              <Text>
                The data of the Buyers shall be the exclusive property of the
                Platform, and Seller will not use the same for Seller's own
                purpose or distribute or sale or use such data in any form or
                means except for the purpose of this Agreement. The Seller also
                represents that the Seller shall not purchase any Platform's
                metatags on the Internet without the prior written consent of
                the Platform.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>7. </Text>
              <Text>INTELLECTUAL PROPERTY RIGHTS</Text>
            </View>
            <View style={styles.list}>
              <Text>7.1 </Text>
              <Text>
                All parties agree that all Intellectual Property Rights,
                belonging to each party as of the effective Date, are the
                exclusive property of the respective party and cannot in any
                circumstances be used, copied, or altered in any manner which is
                identical/ similar to brands/logos/trademarks of the other party
                without being specifically authorized in writing by that other
                party.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>7.2 </Text>
              <Text>
                The Seller recognizes and confirms that the Platform has the
                exclusive right to supervise, allow and reject the contents of
                the Platform. The Platform shall be liable for contents and
                images shared, uploaded or displayed on the Platform, provided
                by the Seller regarding the Seller's Products and all consequent
                liability will be borne by the Seller only
              </Text>
            </View>
            <View style={styles.list}>
              <Text>7.3 </Text>
              <Text>
                The Seller hereby grants to the Platform the right to
                display/delist the Products (as updated or to be updated by
                Seller on the Seller Panel at any/all times) along with the
                related logo and/or trademark and/or brand name, etc. Of the
                Products for marketing/selling through the Platform. Itcan also
                use the same on various digital or physical copies to improve
                the business
              </Text>
            </View>
            <View style={styles.list}>
              <Text>7.4 </Text>
              <Text>
                As per the Terms and Conditions of Welmonde.health, the
                Website/App grants access to Users/Customers to view the content
                solely for visiting, ordering, and communicating only. All
                materials in this Website/App, including, but not limited to,
                images, illustrations, text, logos, and page headers, that are
                part of this Website/App are copyrights and/or other
                intellectual properties owned by Welmonde Healthcare Private
                Limited. All other trademarks not owned by Welmonde that appear
                on this Website/App are the property of their respective owners,
                who may or may not be affiliated with, connected to, or
                sponsored by Welmonde health.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>7.5 </Text>
              <Text>
                You hereby agree that you will not reproduce, duplicate or copy
                the content of Welmonde.health for any purpose, unless you have
                been specifically permitted to do so in aseparate agreement with
                this Website/App.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>7.6 </Text>
              <Text>
                The Seller acknowledges that the Platform are merely an
                intermediary with respect to the Products listed on the
                Platform. However, on receiving written notification of any
                alleged infringement of third-party intellectual property rights
                due to display or sale of any Products/third-party trademark or
                copyrighted matter on the Platform (including availability or
                sale of counterfeit goods on the Platform), the Platform may, at
                their own discretion, remove/ delist the allegedly infringing
                Products/content from the Platform, with or without prior notice
                to Seller.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>7.7 </Text>
              <Text>Trademark complaint</Text>
            </View>
            <Text>
              The Platform respects the intellectual property of others. In case
              you feel that your trademark has been infringed, you can write to
              Platform at <Link>trademark@welmonde.health</Link>
            </Text>
            <View style={styles.list}>
              <Text>7.8 </Text>
              <Text> Copyright complaint</Text>
            </View>
            <Text>
              The platform respects the intellectual property of others. In case
              you feel that your work has been copied in any way that
              constitutes copyright infringement you can write to the platform
              at copyright@welmonde.health
            </Text>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <View style={styles.list}>
              <Text>7.9 </Text>
              <Text>Trademark, Copyright, and Restriction</Text>
            </View>
            <Text>
              The Website is controlled and operated by Welmonde and products
              are sold by respective registered sellers. All material on the
              Platform, including images, illustrations, audio clips, and video
              clips, is protected by copyrights, trademarks, and other
              intellectual property rights. You must not copy, reproduce,
              republish, upload, post, transmit, or distribute Welmonde's or
              other sellers' material in any way, including by email or other
              electronic means and whether, directly or indirectly, you must not
              assist any other person to do so. Without the prior written
              consent of the owner, modification or use of the material on any
              other website/networked computer environment or for any purpose
              other than personal, non-commercial use is a violation of the
              copyrights, trademarks, and other proprietary rights are
              prohibited. Any use for which you receive any remuneration,
              whether money or otherwise, is a commercial use for the purposes
              of this clause.
            </Text>
            <View style={styles.list}>
              <Text>8.</Text>
              <Text>TERM, TERMINATION, AND CONSEQUENCES OF TERMINATION</Text>
            </View>
            <Text style={{ marginTop: "15px" }}>
              Notwithstanding anything contained under this Agreement, any party
              may terminate the Agreement for convenience
            </Text>
            <Text style={{ marginTop: "15px" }}>
              On termination of this Agreement:
            </Text>
            <View style={styles.list}>
              <Text>a. </Text>
              <Text>
                The Platform with immediate effect blocks Seller's access to the
                Platform and consequently, Seller shall not be able to offer any
                Products to the Buyers thereafter and shall not have the right
                to re-register himself/itself as a Seller on the Platform at any
                time after such termination, unless the Platform, in its
                discretion, permits such re-registration.
              </Text>
            </View>
            <View style={styles.list}>
              <Text>b. </Text>
              <Text>
                Each party shall return to the other party/ies all the
                confidential information of the disclosing party and all other
                properties and materials belonging to such disclosing party.
                Where the Confidential Information cannot be returned in
                material form, the receiving party shall destroy allof the
                disclosing party's confidential information and shall provide
                the disclosing party with acertificate of destruction with
                respect to the same
              </Text>
            </View>
            <View style={styles.list}>
              <Text>9.1 </Text>
              <Text>
                It is agreed that such provisions and obligations, by their very
                nature, survive thetermination of this Agreement and shall
                continue to be binding on the Parties
              </Text>
            </View>
            <View style={styles.list}>
              <Text>9.2 </Text>
              <Text>
                On the termination of the Agreement, the Seller will be entitled
                to only the Seller Proceeds which have become due to Seller on
                account of any purchase of the Products, made prior to the date
                of termination of this Agreement. The Platform shall be entitled
                to adjust any monies due from Seller to them till the date of
                termination, from the Seller Proceeds payable to Seller upon
                termination
              </Text>
            </View>
            <View style={styles.list}>
              <Text>9.3 </Text>
              <Text>
                Without prejudice to the foregoing, the termination of this
                Agreement pursuant to any of the provisions contained herein
                above shall not limit or otherwise affect any other
                remedy(including a claim for damages), which either party may
                have, arising out of the event which gave rise to the right of
                termination
              </Text>
            </View>
            <View style={styles.list}>
              <Text>10.1 </Text>
              <Text>ARBITRATION</Text>
            </View>
            <Text style={{ margin: "10px" }}>
              In the event that any dispute or difference arises, in connection
              with the interpretation or implementation or validity or otherwise
              arising out of or relating to this Agreement, between the Parties,
              such dispute shall be referred to arbitration and a sole
              arbitrator shall be appointed by the Platform such arbitration
              shall be held in accordance with the provisions of the Arbitration
              and Conciliation Act, 1996 or any re-enactment or modification
              thereof then in force. The arbitration shall be held in Bangalore,
              India and the award of the arbitral tribunal shall be final,
              conclusive, and binding upon the Parties.
            </Text>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.2 </Text>
                <Text>
                  DISPUTE RESOLUTION, GOVERNING LAW, AND JURISDICTION:
                </Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                This Agreement and any disputes arising hereunder shall be
                determined in accordance with the laws of India. If any dispute
                arises between the Parties here to during the subsistence of
                this Agreement or thereafter, in connection with, or arising out
                of, this Agreement, the courts of Bangalore, India, shall have
                exclusive jurisdiction in connection with this Agreement
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.3 </Text>
                <Text>CONFIDENTIALITY:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                The Parties shall not at any time divulge, or allow to be
                divulged to any person, any Confidential Information unless the
                said information comes in the public domain without breach by
                either party, however, no party shall be precluded from
                disclosing any information to the extent required in the legal
                proceedings. The Parties agree that they shall not use the
                Confidential Information for any purpose, other than as may be
                reasonably necessary for the performance of their duties
                pursuant to this Agreement, without the other party /ies prior
                written consent. The obligations under this Clause shall survive
                the termination of this Agreement.
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.4 </Text>
                <Text>COMPLIANCE WITH LAWS:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                The seller shall comply with all applicable laws, including but
                notlimited to Food Safety and Standard Authority of India
                (FSSAI) and obtain all necessary licenses and permits applicable
                to them.
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.5 </Text>
                <Text>RELATIONSHIP:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                Principal to Principal basis and shall not be construed or
                deemed to create any association, partnership or joint venture
                or employer-employee relationship in any manner.
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.6 </Text>
                <Text> ENTIRE AGREEMENT:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                This Agreement, including Annexures, Welmonde Privacy Policy,
                Terms & Conditions and Commercials added from time to time,
                shall constitute the entire and the final agreement between the
                Seller and the Platform with respect to the subject matter
                covered herein.
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.7 </Text>
                <Text>SURVIVAL:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                Any and all obligations under this Agreement which, by their
                very nature should reasonably survive the termination or
                expiration of this Agreement, will so survive.
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.8 </Text>
                <Text>SEVERABILITY:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                If any part or any provision of this Agreement is or becomes
                illegal, invalid, or unenforceable, that part or provision of
                the agreement will not affect the validity or enforceability of
                the remaining provisions of this Agreement
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.9 </Text>
                <Text>RECORDS:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                The Seller agrees that at all times during the term of this
                Agreement, shall maintain appropriate records relating to
                transactions covered under this agreement and shall allow the
                Platform to examine, inspect, audit, and review all such records
                and any sourcedocument pertaining to the transaction covered
                under this Agreement upon written notice to the Seller at least
                5(five) business days prior notice
              </Text>
            </View>
            <View style={{ marginTop: "5px" }}>
              <View style={styles.list}>
                <Text>10.10 </Text>
                <Text>COMMUNICATION:</Text>
              </View>
              <Text style={{ marginLeft: "10px" }}>
                Seller gives explicit consent and allows the Platform to send
                the messages/communication on email or mobile from time to time.
              </Text>
            </View>
            <Text style={{ marginTop: "10px" }}>
              IN WITNESS WHEREOF, both the parties have executed this agreement
              by affixing their signatures on the day, month, and year first
              above mentioned in the presence of the following witnesses at
              Bangalore
            </Text>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text
              style={{
                marginTop: "25px",
                marginBottom: "25px",
                alignSelf: "flex-start",
                borderBottom: "2px solid black",
              }}
            >
              WITNESSES:
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>1.</Text>
              <Text>FIRST PARTY</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <Text>2.</Text>
              <Text>SECOND PARTY</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: "30px",
              }}
            >
              <Text>CONTACT NUMBER : </Text>
              <Text>{client?.mobile}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ContractPharmacy;
