"use client";

import Layout from "../../pages/page";
import { useState } from "react";
import { FaLayerGroup, FaNetworkWired, FaCogs, FaList,FaProjectDiagram,FaStore,
  FaGift,FaTags,FaChartBar,FaCreditCard,FaStar,FaImage,FaGlobe,FaUserCog
 } from "react-icons/fa";
import styles from "../../styles/roles.module.css";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
export default function ServiceDashboard() {
  const [expanded, setExpanded] = useState("categories");
  const [roleName, setRoleName] = useState("");
  const router = useRouter();
  // ===== Category lists =====
  const [categories, setCategories] = useState([
    { name: "Category", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [subCategories, setSubCategories] = useState([
    { name: "Sub Category", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [services, setServices] = useState([
    { name: "Service", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
    { name: "Manage Media", enabled: false },
  ]);

  const [bestServices, setBestServices] = useState([
    { name: "Best Service", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [serviceSpecs, setServiceSpecs] = useState([
    { name: "Service Specification", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [serviceFaq, setServiceFaq] = useState([
    { name: "Service FAQ", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [packages, setPackages] = useState([
  { name: "Package", enabled: false },
  { name: "Add", enabled: false },
  { name: "Edit", enabled: false },
  { name: "Delete", enabled: false },
  { name: "Status", enabled: false },
  { name: "Manage Media", enabled: false },
]);

const [Leads,setleads]=useState([
  {name:"leads",enabled:false},
  {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
  {name:"Adduser",enabled:false},
]);

const [Franchises,setFranchises]=useState([
  {name:"franchises",enabled:false},
  {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [Franchisesuser,setFranchisesuser]=useState([
  {name:"Franchises User",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
]);

const [offers,setoffers]=useState([
 {name:"offers",enabled:false},
  {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [bestoffers,setbestoffers]=useState([
 {name:"Best offers",enabled:false},
  {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [gifts,setgifts]=useState([
 {name:"Gifts",enabled:false},
  {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
  {name:"Send Gift",enabled:false},
]);

const [orders,setorders]=useState([
 {name:"Orders",enabled:false},
  {name:"View ",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
  {name:"Invoice ",enabled:false},
    {name:"Franchise Assigned  ",enabled:false},
]);

const [unallocatedorders,setunallocatedorders]=useState([
 {name:"unallocated Orders",enabled:false},
  {name:"View ",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
    {name:"Franchise Assigned  ",enabled:false},
]);

const [Accounts,setAccounts]=useState([
 {name:"Accounts",enabled:false},
  {name:"Income ",enabled:false},
  {name:"Franchise Fees",enabled:false},
  {name:"Franchise Outstandings ",enabled:false},
]);

const [Payments,setPayments]=useState([
  {name:"Payment",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
]);

const [CreditPlans,setCreditPlans]=useState([
 {name:"Credit Plans",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
  {name:"Edit Credit Price",enabled:false},
]);

const [CustomePlans,setCustomePlans]=useState([
 {name:"Custome Plans",enabled:false},
]);

const [ServiceRatings,setServiceRatings]=useState([
 {name:"Service Ratings",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [PackageRatings,setPackageRatings]=useState([
 {name:"Package Ratings",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [OrderReview,setOrderReview]=useState([
 {name:"Order Review",enabled:false},
]);

const [Testimonial,setTestimonial]=useState([
 {name:"Testimonial",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Status",enabled:false},
]);

const [Slider,setSlider]=useState([
 {name:"Slider",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [AboutUs,setAboutUs]=useState([
 {name:"About Us",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
]);

const [Blog,setBlog]=useState([
 {name:"Blog",enabled:false},
 {name:"Add",enabled:false},
  {name:"Edit",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [NewsLetter,setNewsLetter]=useState([
 {name:"News Letter",enabled:false},
 {name:"Send News Letter",enabled:false},
  {name:"Delete",enabled:false},
]);

const [ReferralProgram,setReferralProgram]=useState([
 {name:"ReferralProgram",enabled:false},
]);

const [RequestQuotes,setRequestQuotes]=useState([
 {name:"Request Quotes",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [Followups,setFollowups]=useState([
 {name:"Followups  ",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [Contact,setContact]=useState([
 {name:"Contact",enabled:false},
  {name:"Delete",enabled:false},
  {name:"Status",enabled:false},
]);

const [FranchiseService, setFranchiseService] = useState([
  { name: "Franchise Service", enabled: false },
  { name: "Edit", enabled: false },
]);

const [FranchiseOrders, setFranchiseOrders] = useState([
  { name: "Franchise Orders", enabled: false },
  { name: "View", enabled: false },
  { name: "Status", enabled: false },
  { name: "Invoice", enabled: false },
]);

const [FranchiseTiming, setFranchiseTiming] = useState([
  { name: "Franchise Timing", enabled: false },
  { name: "Add", enabled: false },
  { name: "Edit", enabled: false },
  { name: "Delete", enabled: false },
]);

const [FranchiseWorker, setFranchiseWorker] = useState([
  { name: "Franchise Worker", enabled: false },
  { name: "Add", enabled: false },
  { name: "Edit", enabled: false },
  { name: "Delete", enabled: false },
  { name: "Status", enabled: false },
]);

const [ManageCredit, setManageCredit] = useState([
  { name: "Manage Credit", enabled: false },
  { name: "Add", enabled: false },
]);

const [Request, setRequest] = useState([
  { name: "Request", enabled: false },
  { name: "Delete", enabled: false },
  { name: "Status", enabled: false },
]);

const [FranchiseProfile, setFranchiseProfile] = useState([
  { name: "Franchise Profile", enabled: false },
]);

const [Account, setAccount] = useState([
  { name: "Account", enabled: false },
]);
  // ===== Toggle Functions =====
  const toggleItem = (index, type) => {
    let data;
    if (type === "categories") data = [...categories];
    else if (type === "subcategories") data = [...subCategories];
    else if (type === "services") data = [...services];
    else if (type === "bestservices") data = [...bestServices];
    else if (type === "serviceSpecs") data = [...serviceSpecs];
    else if (type === "serviceFaq") data = [...serviceFaq];
    else if (type === "packages") data = [...packages];
    else if(type === "Leads")data=[...Leads];
    else if(type === "Franchises")data=[...Franchises];
    else if(type === "Franchisesuser")data=[...Franchisesuser];
    else if(type === "offers")data=[...offers];
    else if(type === "bestoffers")data=[...bestoffers];
    else if(type === "gifts")data=[...gifts];
    else if(type === "orders")data=[...orders];
    else if(type === "unallocatedorders")data=[...unallocatedorders];
    else if(type === "Accounts")data=[...Accounts];
    else if(type === "Payments")data=[...Payments];
    else if(type === "CreditPlans")data=[...CreditPlans];
     else if(type === "CustomePlans")data=[...CustomePlans];
     else if(type === "ServiceRatings")data=[...ServiceRatings];
     else if(type === "PackageRatings")data=[...PackageRatings ];
     else if(type === "OrderReview")data=[...OrderReview];
     else if(type === "Testimonial")data=[...Testimonial ];
     else if(type === "Slider")data=[...Slider ];
     else if(type === "AboutUs")data=[...AboutUs ];
    else if(type === "Blog")data=[...Blog  ];
     else if(type === "NewsLetter")data=[...NewsLetter];
     else if(type === "ReferralProgram")data=[...ReferralProgram ];
     else if(type === "RequestQuotes")data=[...RequestQuotes];
     else if(type === "Followups")data=[...Followups];
    else if(type === "Contact")data=[...Contact];
     else if(type === "FranchiseService")data=[...FranchiseService];
     else if(type === "FranchiseOrders")data=[...FranchiseOrders];
     else if(type === "FranchiseTiming")data=[...FranchiseTiming];
     else if(type === "FranchiseWorker")data=[...FranchiseWorker];
     else if(type === "ManageCredit")data=[...ManageCredit];
     else if(type === "Request")data=[...Request   ];
     else if(type === "FranchiseProfile")data=[...FranchiseProfile];
     else if(type === "Account")data=[...Account    ];

    data[index].enabled = !data[index].enabled;

    // Child ON → enable parent
    if (index > 0 && data[index].enabled) data[0].enabled = true;

    // All children OFF → disable parent
    if (index > 0 && !data.slice(1).some((item) => item.enabled)) data[0].enabled = false;

    // Parent OFF → disable all
    if (index === 0 && !data[0].enabled) data.forEach((item) => (item.enabled = false));

    if (type === "categories") setCategories(data);
    else if (type === "subcategories") setSubCategories(data);
    else if (type === "services") setServices(data);
    else if (type === "bestservices") setBestServices(data);
    else if (type === "serviceSpecs") setServiceSpecs(data);
    else if (type === "serviceFaq") setServiceFaq(data);
    else if (type === "packages") setPackages(data);
    else if(type === "Leads")setleads(data);
    else if(type === "Franchises")setFranchises(data);
    else if(type === "Franchisesuser")setFranchisesuser(data);
    else if(type === "offers")setoffers(data);
    else if(type === "bestoffers")setbestoffers(data);
    else if(type === "gifts")setgifts(data);
    else if(type === "orders")setorders(data);
    else if(type === "unallocatedorders")setunallocatedorders(data);
    else if(type === "Accounts")setAccounts(data);
    else if(type === "Payments")setPayments(data);
    else if(type === "CreditPlans")setCreditPlans(data);
    else if(type === "CustomePlans")setCustomePlans(data);
    else if(type === "ServiceRatings ")setServiceRatings (data);
    else if(type === "PackageRatings ")setPackageRatings (data);
    else if(type === "OrderReview")setOrderReview(data);
    else if(type === "Testimonial ")setTestimonial (data);
    else if(type === "Slider")setSlider (data);
    else if(type === "AboutUs")setAboutUs  (data);
    else if(type === "Blog")setBlog(data);
    else if(type === "NewsLetter")setNewsLetter (data);
    else if(type === "ReferralProgram")setReferralProgram (data);
    else if(type === "RequestQuotes")setRequestQuotes  (data);
    else if(type === "Followups")setFollowups (data);
    else if(type === "Contact")setContact  (data);
    else if(type === "FranchiseService")setFranchiseService (data);
    else if(type === "FranchiseOrders")setFranchiseOrders  (data);
    else if(type === "FranchiseTiming")setFranchiseTiming  (data);
    else if(type === "FranchiseWorker")setFranchiseWorker  (data);
    else if(type === "ManageCredit")setManageCredit  (data);
    else if(type === "Request")setRequest   (data);
    else if(type === "FranchiseProfile")setFranchiseProfile   (data);
    else if(type === "Account")setAccount  (data);
         
    else setServiceFaq(data);
  };

  const toggleAll = (checked, type) => {
    let updated;
      if (type === "categories") updated = categories.map((c) => ({ ...c, enabled: checked }));
else if (type === "subcategories") updated = subCategories.map((c) => ({ ...c, enabled: checked }));
else if (type === "services") updated = services.map((c) => ({ ...c, enabled: checked }));
else if (type === "bestservices") updated = bestServices.map((c) => ({ ...c, enabled: checked }));
else if (type === "serviceSpecs") updated = serviceSpecs.map((c) => ({ ...c, enabled: checked }));
else if (type === "serviceFaq") updated = serviceFaq.map((c) => ({ ...c, enabled: checked }));
else if (type === "packages") updated = packages.map((c) => ({ ...c, enabled: checked }));
else if (type === "Leads")updated=Leads.map((c)=>({...c, enabled:checked}));
else if (type ==="Franchises")updated=Franchises.map((c)=>({...c,enabled:checked}));
else if(type ==="Franchisesuser")updated=Franchisesuser.map((c)=>({...c,enabled:checked}));
else if(type === "offers")updated=offers.map((c)=>({...c,enabled:checked}));
else if(type === "bestoffers")updated=bestoffers.map((c)=>({...c,enabled:checked}));
else if(type === "gifts")updated=gifts.map((c)=>({...c,enabled:checked})); 
else if(type === "orders")updated=orders.map((c)=>({...c,enabled:checked})); 
else if(type === "unallocatedorders")updated=unallocatedorders.map((c)=>({...c,enabled:checked})); 
else if(type === "Payments")updated=Payments.map((c)=>({...c, enabled:checked}));
else if(type === "CreditPlans")updated=CreditPlans.map((c)=>({...c, enabled:checked}));
else if(type === "CustomePlans")updated=CustomePlans.map((c)=>({...c, enabled:checked}));
else if(type === "ServiceRatings ")updated=ServiceRatings .map((c)=>({...c, enabled:checked}));
else if(type === "PackageRatings ")updated=PackageRatings .map((c)=>({...c, enabled:checked}));
else if(type === "OrderReview")updated=OrderReview.map((c)=>({...c, enabled:checked}));
else if(type === "Testimonial")updated=Testimonial .map((c)=>({...c, enabled:checked}));
else if(type === "Slider")updated=Slider .map((c)=>({...c, enabled:checked}));
else if(type === "AboutUs ")updated=AboutUs  .map((c)=>({...c, enabled:checked}));
else if(type === "Blog ")updated=Blog  .map((c)=>({...c, enabled:checked}));
else if(type === "NewsLetter")updated=NewsLetter .map((c)=>({...c, enabled:checked}));
else if(type === "ReferralProgram")updated=ReferralProgram .map((c)=>({...c, enabled:checked}));
else if(type === "RequestQuotes")updated=RequestQuotes .map((c)=>({...c, enabled:checked}));
else if(type === "Followups")updated=Followups  .map((c)=>({...c, enabled:checked}));
else if(type === "Contact")updated=Contact  .map((c)=>({...c, enabled:checked}));
else if(type === "FranchiseService")updated=FranchiseService  .map((c)=>({...c, enabled:checked}));
else if(type === "FranchiseOrders")updated=FranchiseOrders  .map((c)=>({...c, enabled:checked}));
else if(type === "FranchiseTiming")updated=FranchiseTiming .map((c)=>({...c, enabled:checked}));
else if(type === "FranchiseWorker")updated=FranchiseWorker  .map((c)=>({...c, enabled:checked}));
else if(type === "ManageCredit")updated=ManageCredit  .map((c)=>({...c, enabled:checked}));
else if(type === "Request")updated=Request  .map((c)=>({...c, enabled:checked}));
else if(type === "FranchiseProfile")updated=FranchiseProfile  .map((c)=>({...c, enabled:checked}));
else if(type === "Account")updated=Account   .map((c)=>({...c, enabled:checked}));




   
if (type === "categories") setCategories(updated);
    else if (type === "subcategories") setSubCategories(updated);
    else if (type === "services") setServices(updated);
    else if (type === "bestservices") setBestServices(updated);
    else if (type === "serviceSpecs") setServiceSpecs(updated);
    else if (type === "serviceFaq") setServiceFaq(updated);
    else if (type === "packages") setPackages(updated);
    else if(type==="Leads")setleads(updated);
    else if(type === "Franchises")setFranchises(updated);
    else if(type === "Franchisesuser")setFranchisesuser(updated);
    else if(type === "offers")setoffers(updated);
    else if(type === "bestoffers")setbestoffers(updated);
    else if(type === "gifts")setgifts(updated);
    else if(type === "orders")setorders(updated);
    else if(type === "unallocatedorders")setunallocatedorders(updated);
    else if(type === "Accounts")setAccounts(updated);
    else if(type === "Payments")setPayments(updated);
    else if(type === "CreditPlans")setCreditPlans(updated);
    else if(type === "CustomePlans")setCustomePlans(updated);
    else if(type === "ServiceRatings")setServiceRatings(updated);
    else if(type === "PackageRatings")setPackageRatings(updated);
    else if(type === "OrderReview")setOrderReview(updated);
    else if(type === "Testimonial")setTestimonial(updated);
    else if(type === "Slider")setSlider(updated);
    else if(type === "AboutUs")setAboutUs (updated);
    else if(type === "Blog")setBlog (updated);
    else if(type === "NewsLetter")setNewsLetter(updated);
    else if(type === "ReferralProgram")setReferralProgram(updated);
    else if(type === "RequestQuotes")setRequestQuotes(updated);
    else if(type === "Followups")setFollowups(updated);
    else if(type === "Contact")setContact (updated);
    else if(type === "FranchiseService")setFranchiseService (updated);
    else if(type === "FranchiseOrders")setFranchiseOrders (updated);
    else if(type === "FranchiseTiming")setFranchiseTiming (updated);
    else if(type === "FranchiseWorker")setFranchiseWorker (updated);
    else if(type === "ManageCredit")setManageCredit (updated);
    else if(type === "Request")setRequest (updated);
    else if(type === "FranchiseProfile")setFranchiseProfile (updated);
    else if(type === "Account")setAccount (updated);


  };

  // ===== Panels =====
  const panels = [
    {id: "categories", title: "Categories", icon: <FaLayerGroup /> },
    {id: "subcategories", title: "Sub Categories", icon: <FaNetworkWired /> },
    {id: "services", title: "Services", icon: <FaCogs /> },
    {id: "packages", title: "Packages", icon: <FaList /> },
    {id:"Leads",title:"Leads",icon:<FaProjectDiagram/>},
    {id:"Franchises",title:"Franchises",icon:<FaStore/>},
    {id:"offers",title:"Offers",icon:<FaGift/>},
    {id:"gifts",title:"Gifts",icon:<FaGift/>},
    {id:"orders",title:"Orders",icon:<FaTags/>},
    {id:"Accounts",title:"Accounts",icon:<FaChartBar/>},
    {id:"Payments",title:"Payments",icon:<FaCreditCard/>},
    {id:"Ratings",title:"Ratings",icon:<FaStar/>},
    {id:"Slider",title:"Slider",icon:<FaImage/>},
     {id:"Manage Pages",title:"Manage Pages",icon:<FaGlobe/>},
    {id: "franchiseOnly", title: "Franchise (Only For Franchise Role)", icon: <FaUserCog />}
  ];

  // ===== Render panel body =====
  const renderPanelBody = (items, type) => (
    <div className={styles.panelBody}>
      <div className={styles.actionsRow}>
        <label className={styles.selectAll}>
          <input type="checkbox" onChange={(e) => toggleAll(e.target.checked, type)} />
          Select All {type}
        </label>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.categoryItem}>
            <label className={styles.categoryLabel}>{item.name}</label>
            <label className={styles.switch}>
              <input type="checkbox" checked={item.enabled} onChange={() => toggleItem(i, type)} />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
       const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };

    const goToRoles = () => {
    router.push("/admin/roles"); // roles page
  };
  // ===== Render page =====
  return (
    <Layout>
      <div className={styles.rols}>
        <div className={styles.header}>
         <div className={styles.breadcrumb}>
              <span style={{ cursor: "pointer"}}
        onClick={goToRoles}
      >
        Roles
      </span>
              <span className={styles.separator}> | </span>
              <SlHome
                style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                onClick={goToDashboard}
                title="Go to Dashboard"
              />
              <span> &gt; </span>
              <span className={styles.active}>Edit Roles</span>
            </div>
        </div>

        <div className={styles.card1}>
          <h2 className={styles.name}>NAME *</h2>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter role name"
            className={styles.input}
          />

          <h2 className={styles.cardTitle1}>Permissions</h2>

          {panels.map((panel) => (
            <div key={panel.id} className={styles.panelBox}>
              <div
                className={`${styles.panelHeader} ${expanded === panel.id ? styles.panelHeaderActive : ""}`}
                onClick={() => setExpanded(expanded === panel.id ? null : panel.id)}
              >
                <div className={styles.panelTitle}>
                  {panel.icon} {panel.title}
                </div>
                <span className={styles.arrow}>{expanded === panel.id ? "▴" : "▾"}</span>
              </div>

              {expanded === panel.id && panel.id === "categories" && renderPanelBody(categories, "categories")}
              {expanded === panel.id && panel.id === "subcategories" && renderPanelBody(subCategories, "subcategories")}
              {expanded === panel.id && panel.id === "services" && (
                <div>
                 
                  {renderPanelBody(services, "services")}

                  <hr className={styles.divider} />

                  
                  {renderPanelBody(bestServices, "bestservices")}

                  <hr className={styles.divider} />

                  
                  {renderPanelBody(serviceSpecs, "serviceSpecs")}

                  <hr className={styles.divider} />

                 
                  {renderPanelBody(serviceFaq, "serviceFaq")}
                </div>
              )}

              {expanded === panel.id && panel.id === "packages" && (
                 <div>
                  {renderPanelBody(packages, "packages")}
                </div>
             
             )}
             {expanded === panel.id && panel.id === "Leads"&&(
              <div>
                {renderPanelBody(Leads,"Leads")}
              </div>
             )}
               {expanded === panel.id && panel.id === "Franchises"&&(
              <div>
                {renderPanelBody(Franchises,"Franchises")}
                 <hr className={styles.divider} />
                 {renderPanelBody(Franchisesuser,"Franchisesuser")}
              </div>
             )}
             {expanded === panel.id&& panel.id === "offers"&&(
              <div>
                {renderPanelBody(offers,"offers")}
                <hr className={styles.divider} />
                {renderPanelBody(bestoffers,"bestoffers")}
              </div>
             )}
             {expanded === panel.id&& panel.id === "gifts"&&(
              <div>
                {renderPanelBody(gifts,"gifts")}
              </div>
             )}
             {expanded === panel.id&& panel.id === "orders"&&(
              <div>
                {renderPanelBody(orders,"orders")}
                <hr className={styles.divider} />
                {renderPanelBody(unallocatedorders,"unallocatedorders")}
              </div>
             )}
             {expanded === panel.id&& panel.id === "Accounts"&&(
              <div>
                {renderPanelBody(Accounts,"Accounts")}
              </div>
             )}
                  {expanded === panel.id&& panel.id === "Payments"&&(
              <div>
                {renderPanelBody(Payments,"Payments")}
                  <hr className={styles.divider} />
                  {renderPanelBody(CreditPlans,"CreditPlans")}
                   <hr className={styles.divider} />
                    {renderPanelBody(CustomePlans,"CustomePlans")}
              </div>
             )}
                    {expanded === panel.id&& panel.id === "Ratings"&&(
              <div>
                {renderPanelBody(ServiceRatings,"ServiceRatings")}
                  <hr className={styles.divider} />
                  {renderPanelBody(PackageRatings,"PackageRatings")}
                   <hr className={styles.divider} />
                    {renderPanelBody(OrderReview,"OrderReview")}
                     <hr className={styles.divider} />
                    {renderPanelBody(Testimonial ,"Testimonial ")}
              </div>
             )}
                  {expanded === panel.id&& panel.id === "Slider"&&(
              <div>
                {renderPanelBody(Slider,"Slider")}
            
              </div>
             )}
                       {expanded === panel.id&& panel.id === "Manage Pages"&&(
              <div>
                {renderPanelBody(AboutUs,"AboutUs")}
                  <hr className={styles.divider} />
                  {renderPanelBody(Blog ,"Blog ")}
                   <hr className={styles.divider} />
                    {renderPanelBody(NewsLetter,"NewsLetter")}
                     <hr className={styles.divider} />
                    {renderPanelBody(ReferralProgram,"ReferralProgram")}
                     <hr className={styles.divider} />
                    {renderPanelBody(RequestQuotes,"RequestQuotes")}
                        <hr className={styles.divider} />
                    {renderPanelBody(Followups,"Followups")}
                        <hr className={styles.divider} />
                    {renderPanelBody(Contact,"Contact")}
              </div>
             )}
            {expanded === panel.id && panel.id === "franchiseOnly" && (
  <div>
    {renderPanelBody(FranchiseService, "FranchiseService")}
    <hr className={styles.divider} />
    {renderPanelBody(FranchiseOrders, "FranchiseOrders")}
    <hr className={styles.divider} />
    {renderPanelBody(FranchiseTiming, "FranchiseTiming")}
    <hr className={styles.divider} />
    {renderPanelBody(FranchiseWorker, "FranchiseWorker")}
    <hr className={styles.divider} />
    {renderPanelBody(ManageCredit, "ManageCredit")}
    <hr className={styles.divider} />
    {renderPanelBody(Request, "Request")}
    <hr className={styles.divider} />
    {renderPanelBody(FranchiseProfile, "FranchiseProfile")}
    <hr className={styles.divider} />
    {renderPanelBody(Account, "Account")}
  </div>
)}
            </div>
          ))}
   <button className={styles.btncreate}>Create Role</button>
        </div>
      </div>
    </Layout>
  );
}
