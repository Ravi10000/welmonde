import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

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
              {client?.businessName}, is located at
              {" " + contract?.agreement?.clientAddress}, Represented by
              {" " + contract?.agreement?.representativeName}, Authorized
              Signatory and hereinafter referred to as second party:
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
            {" "}
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
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ContractPharmacy;
