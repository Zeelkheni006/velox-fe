"use client";

import Layout from "../../pages/page";
import { useState } from "react";
import { FaLayerGroup, FaNetworkWired, FaCogs, FaList,FaProjectDiagram,FaStore,
  FaGift,FaTags,FaChartBar,FaCreditCard,FaStar,FaImage,FaGlobe,FaUserCog
 } from "react-icons/fa";
import styles from "../../styles/roles.module.css";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { addRole } from "../../../api/manage_users/role";
export default function ServiceDashboard() {
  const [expanded, setExpanded] = useState("categories");
  const [roleName, setRoleName] = useState("");
  const router = useRouter();
  // ===== Category lists =====
  const [categories, setCategories] = useState([
    { name: "Category", enabled: false, key:"category_get" },
    { name: "Add", enabled: false , key: "category_create"},
    { name: "Edit", enabled: false,key:"category_update" },
    { name: "Delete", enabled: false,key:"category_delete" },
    { name: "Status", enabled: false, key:"category_update_status"},
  ]);
 const [expandedPanel, setExpandedPanel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggle = (name) => {
    const updated = categories.map((c) =>
      c.name === name ? { ...c, enabled: !c.enabled } : c
    );
    setCategories(updated);

    if (name === "Add") {
      setExpandedPanel("categories");
    } else {
      setExpandedPanel(null);
    }
  };

 const submitRole = async () => {
  if (!roleName.trim()) {
    alert("Please enter role name!");
    return;
  }

const mapPermissions = (items, prefix) =>
  items.filter(item => item.enabled && item.key)
       .map(item => item.key);

  let permissions = [
    ...mapPermissions(categories, "category"),
    ...mapPermissions(subCategories, "sub_category"),
    ...mapPermissions(services, "service"),
    ...mapPermissions(bestServices, "best_service"),
    ...mapPermissions(serviceSpecs, "service_spec"),
    ...mapPermissions(serviceFaq, "service_faq"),
    ...mapPermissions(packages, "package"),
    ...mapPermissions(Leads, "leads"),
    ...mapPermissions(Franchises, "franchise"),
    ...mapPermissions(Franchisesuser, "franchise_user"),
    ...mapPermissions(offers, "offers"),
    ...mapPermissions(bestoffers, "best_offers"),
    ...mapPermissions(gifts, "gifts"),
    ...mapPermissions(orders, "orders"),
    ...mapPermissions(unallocatedorders, "unallocated_orders"),
    ...mapPermissions(Accounts, "accounts"),
    ...mapPermissions(Payments, "payments"),
    ...mapPermissions(CreditPlans, "credit_plans"),
    ...mapPermissions(CustomePlans, "custome_plans"),
    ...mapPermissions(ServiceRatings, "service_ratings"),
    ...mapPermissions(PackageRatings, "package_ratings"),
    ...mapPermissions(OrderReview, "order_review"),
    ...mapPermissions(Testimonial, "testimonial"),
    ...mapPermissions(Slider, "slider_image"),
    ...mapPermissions(AboutUs, "about_us"),
    ...mapPermissions(Blog, "blog"),
    ...mapPermissions(NewsLetter, "news_letter"),
    ...mapPermissions(ReferralProgram, "referral_program"),
    ...mapPermissions(RequestQuotes, "request_quotes"),
    ...mapPermissions(Followups, "followups"),
    ...mapPermissions(Contact, "contact"),
    ...mapPermissions(FranchiseService, "franchise_service"),
    ...mapPermissions(FranchiseOrders, "franchise_orders"),
    ...mapPermissions(FranchiseTiming, "franchise_timing"),
    ...mapPermissions(FranchiseWorker, "franchise_worker"),
    ...mapPermissions(ManageCredit, "manage_credit"),
    ...mapPermissions(Request, "request"),
    ...mapPermissions(FranchiseProfile, "franchise_profile"),
    ...mapPermissions(Account, "account"),
  ];

    const payload = {
    name: roleName.trim(),
    permissions,
  };

   const token = localStorage.getItem("access_token");  // 👈 fetch here

  if (!token) {
    alert("Session expired, login again!");
    return;
  }

  try {
    const res = await addRole(payload, token);
    if (res?.success) {
      alert("Role created successfully!");
    } else {
      alert(res?.message || "Failed to create role.");
    }
  } catch (err) {
    console.error("Add role API error:", err);
    alert("Something went wrong!");
  }
};


  const [subCategories, setSubCategories] = useState([
    { name: "Sub Category", enabled: false ,key:"sub_category_get" },
    { name: "Add", enabled: false ,key:"sub_category_create"},
    { name: "Edit", enabled: false ,key:"sub_category_update"},
    { name: "Delete", enabled: false,key:"sub_category_delete" },
    { name: "Status", enabled: false,key:"sub_category_update_status" },
  ]);

  const [services, setServices] = useState([
    { name: "Service", enabled: false ,key:"service_get"},
    { name: "Add", enabled: false ,key:"service_create"},
    { name: "Edit", enabled: false ,key:"service_update"},
    { name: "Delete", enabled: false ,key:"service_delete"},
    { name: "Status", enabled: false ,key:"service_update_status"},
    { name: "Manage Media", enabled: false },
  ]);

  const [bestServices, setBestServices] = useState([
    { name: "Best Service", enabled: false, key:"best_service_get" },
    { name: "Add", enabled: false,key:"best_service_create"},
    { name: "Edit", enabled: false,key:"best_update" },
    { name: "Delete", enabled: false,key:"best_delete" },
    { name: "Status", enabled: false,key:"best_service_status" },
  ]);

  const [serviceSpecs, setServiceSpecs] = useState([
    { name: "Service Specification", enabled: false ,key:"service_specs_get"},
    { name: "Add", enabled: false,key:"service_specs_create" },
    { name: "Edit", enabled: false ,key:"service_specs_update"},
    { name: "Delete", enabled: false,key:"service_specs_delete" },
    { name: "Status", enabled: false,key:"service_specs_status" },
  ]);

  const [serviceFaq, setServiceFaq] = useState([
    { name: "Service FAQ", enabled: false,key:"service_faq_get" },
    { name: "Add", enabled: false, key:"service_faq_create"},
    { name: "Edit", enabled: false ,key:"service_faq_update"},
    { name: "Delete", enabled: false,key:"service_faq_delete" },
    { name: "Status", enabled: false,key:"service_faq_status" },
  ]);

 const [packages, setPackages] = useState([
  { name: "Package", enabled: false, key: "package_get" },
  { name: "Add", enabled: false, key: "package_create" },
  { name: "Edit", enabled: false, key: "package_update" },
  { name: "Delete", enabled: false, key: "package_delete" },
  { name: "Status", enabled: false, key: "package_update_status" },
  { name: "Manage Media", enabled: false, key: "package_manage_media" },
]);

const [Leads,setleads]=useState([
  {name:"leads",enabled:false,key:"leads_get"},
  {name:"Add",enabled:false,key:"leads_create"},
  {name:"Edit",enabled:false,key:"leads_update"},
  {name:"Delete",enabled:false,key:"leads_delete"},
  {name:"Status",enabled:false,key:"leads_update_status"},
  {name:"Adduser",enabled:false},
]);

const [Franchises, setFranchises] = useState([
  { name: "franchises", enabled: false, key: "franchise_get" },
  { name: "Add", enabled: false, key: "franchise_create" },
  { name: "Edit", enabled: false, key: "franchise_update" },
  { name: "Delete", enabled: false, key: "franchise_delete" },
  { name: "Status", enabled: false, key: "franchise_update_status" },
]);

const [Franchisesuser, setFranchisesuser] = useState([
  { name: "Franchises User", enabled: false, key: "franchise_user_get" },
  { name: "Edit", enabled: false, key: "franchise_user_update" },
  { name: "Delete", enabled: false, key: "franchise_user_delete" },
]);
const [offers, setoffers] = useState([
  { name: "offers", enabled: false, key: "offers_get" },
  { name: "Add", enabled: false, key: "offers_create" },
  { name: "Edit", enabled: false, key: "offers_update" },
  { name: "Delete", enabled: false, key: "offers_delete" },
  { name: "Status", enabled: false, key: "offers_update_status" },
]);

const [bestoffers, setbestoffers] = useState([
  { name: "Best offers", enabled: false, key: "best_offers_get" },
  { name: "Add", enabled: false, key: "best_offers_create" },
  { name: "Edit", enabled: false, key: "best_offers_update" },
  { name: "Delete", enabled: false, key: "best_offers_delete" },
  { name: "Status", enabled: false, key: "best_offers_update_status" },
]);

const [gifts, setgifts] = useState([
  { name: "Gifts", enabled: false, key: "gifts_get" },
  { name: "Add", enabled: false, key: "gifts_create" },
  { name: "Edit", enabled: false, key: "gifts_update" },
  { name: "Delete", enabled: false, key: "gifts_delete" },
  { name: "Status", enabled: false, key: "gifts_update_status" },
  { name: "Send Gift", enabled: false, key: "gifts_send" },
]);

const [orders, setorders] = useState([
  { name: "Orders", enabled: false, key: "orders_get" },
  { name: "View", enabled: false, key: "orders_view" },
  { name: "Delete", enabled: false, key: "orders_delete" },
  { name: "Status", enabled: false, key: "orders_update_status" },
  { name: "Invoice", enabled: false, key: "orders_invoice" },
  { name: "Franchise Assigned", enabled: false, key: "orders_franchise_assign" },
]);

const [unallocatedorders, setunallocatedorders] = useState([
  { name: "Unallocated Orders", enabled: false, key: "unallocated_orders_get" },
  { name: "View", enabled: false, key: "unallocated_orders_view" },
  { name: "Delete", enabled: false, key: "unallocated_orders_delete" },
  { name: "Status", enabled: false, key: "unallocated_orders_update_status" },
  { name: "Franchise Assigned", enabled: false, key: "unallocated_orders_franchise_assign" },
]);

const [Accounts, setAccounts] = useState([
  { name: "Accounts", enabled: false, key: "accounts_get" },
  { name: "Income", enabled: false, key: "accounts_income" },
  { name: "Franchise Fees", enabled: false, key: "accounts_franchise_fees" },
  { name: "Franchise Outstandings", enabled: false, key: "accounts_franchise_outstandings" },
]);


const [Payments,setPayments]=useState([
  {name:"Payment",enabled:false,key:"payment_get"},
 {name:"Add",enabled:false ,key:"payment_create"},
  {name:"Edit",enabled:false,key:"payment_update"},
  {name:"Delete",enabled:false,key:"payment_delete"},
]);

const [CreditPlans,setCreditPlans]=useState([
 {name:"Credit Plans",enabled:false,key:"create_plans_get"},
 {name:"Add",enabled:false,key:"create_plans_create"},
  {name:"Edit",enabled:false,key:"create_plans_update"},
  {name:"Delete",enabled:false,key:"create_plans_delete"},
  {name:"Status",enabled:false,key:"create_plans_status"},
  {name:"Edit Credit Price",enabled:false,key:"create_plans_price"},
]);

const [CustomePlans,setCustomePlans]=useState([
 {name:"Custome Plans",enabled:false,key:"custome_plans_get"},
]);

const [ServiceRatings,setServiceRatings]=useState([
 {name:"Service Ratings",enabled:false,key:"service_rating_get"},
 {name:"Add",enabled:false,key:"service_rating_create"},
  {name:"Edit",enabled:false,key:"service_rating_update"},
  {name:"Delete",enabled:false,key:"service_rating_delete"},
  {name:"Status",enabled:false,key:"service_rating_status"},
]);

const [PackageRatings,setPackageRatings]=useState([
 {name:"Package Ratings",enabled:false,key:"package_rating_get"},
 {name:"Add",enabled:false,key:"package_rating_create"},
  {name:"Edit",enabled:false,key:"package_rating_update"},
  {name:"Delete",enabled:false,key:"package_rating_delete"},
  {name:"Status",enabled:false,key:"package_rating_status"},
]);

const [OrderReview,setOrderReview]=useState([
 {name:"Order Review",enabled:false,key:"order_review_get"},
]);

const [Testimonial,setTestimonial]=useState([
 {name:"Testimonial",enabled:false,key:"testimonial_get"},
 {name:"Add",enabled:false,key:"testimonial_create"},
  {name:"Edit",enabled:false,key:"testimonial_update"},
  {name:"Status",enabled:false,key:"testimonial_status"},
]);

const [Slider,setSlider]=useState([
 {name:"Slider",enabled:false,key:"slide_image_get"},
 {name:"Add",enabled:false,key:"slide_image_add"},
  {name:"Edit",enabled:false,key:"slide_image_update"},
  {name:"Delete",enabled:false,key:"slide_image_delete"},
  {name:"Status",enabled:false,key:"slide_image_update_status"},
]);

const [AboutUs,setAboutUs]=useState([
 {name:"About Us",enabled:false,key:"about_us_get"},
 {name:"Add",enabled:false,key:"about_us_create"},
  {name:"Edit",enabled:false,key:"about_us_update"},
  {name:"Delete",enabled:false,key:"about_us_delete"},
]);

const [Blog,setBlog]=useState([
 {name:"Blog",enabled:false,key:"blog_get"},
 {name:"Add",enabled:false,key:"blog_create"},
  {name:"Edit",enabled:false,key:"blog_update"},
  {name:"Delete",enabled:false,key:"blog_delete"},
  {name:"Status",enabled:false,key:"blog_status"},
]);

const [NewsLetter,setNewsLetter]=useState([
 {name:"News Letter",enabled:false,key:"newsletter_get"},
 {name:"Send News Letter",enabled:false,key:"newsletter_send"},
  {name:"Delete",enabled:false,key:"newsletter_delete"},
]);

const [ReferralProgram,setReferralProgram]=useState([
 {name:"ReferralProgram",enabled:false,key:"referral_program_get"},
]);

const [RequestQuotes,setRequestQuotes]=useState([
 {name:"Request Quotes",enabled:false,key:"request_quotes_get"},
  {name:"Delete",enabled:false, key:"request_quotes_delete"},
  {name:"Status",enabled:false,key:"request_quotes_status"},
]);

const [Followups,setFollowups]=useState([
 {name:"Followups  ",enabled:false,key:"followups_get"},
  {name:"Delete",enabled:false, key:"followups_delete"},
  {name:"Status",enabled:false,key:"folloeups_status"},
]);

const [Contact,setContact]=useState([
 {name:"Contact",enabled:false,key:"contact_get"},
  {name:"Delete",enabled:false,key:"contact_delete"},
  {name:"Status",enabled:false,key:"contact_status"},
]);

const [FranchiseService, setFranchiseService] = useState([
  { name: "Franchise Service", enabled: false,key:"franchise_service_get" },
  { name: "Edit", enabled: false ,key:"franchise_service_update"},
]);

const [FranchiseOrders, setFranchiseOrders] = useState([
  { name: "Franchise Orders", enabled: false,key:"franchise_orders_get" },
  { name: "View", enabled: false, key:"franchise_orders_view"},
  { name: "Status", enabled: false,key:"franchise_orders_status" },
  { name: "Invoice", enabled: false,key:"franchise_orders_invoice" },
]);

const [FranchiseTiming, setFranchiseTiming] = useState([
  { name: "Franchise Timing", enabled: false,key:"franchise_timing_get" },
  { name: "Add", enabled: false,key:"franchise_timing_create"},
  { name: "Edit", enabled: false ,key:"franchise_timing_update"},
  { name: "Delete", enabled: false,key:"franchise_timing_delete"},
]);

const [FranchiseWorker, setFranchiseWorker] = useState([
  { name: "Franchise Worker", enabled: false ,key:"franchise_worker_get"},
  { name: "Add", enabled: false ,key:"franchise_worker_create"},
  { name: "Edit", enabled: false ,key:"franchise_worker_update"},
  { name: "Delete", enabled: false,key:"franchise_worker_delete" },
  { name: "Status", enabled: false,key:"franchise_worker_status" },
]);

const [ManageCredit, setManageCredit] = useState([
  { name: "Manage Credit", enabled: false ,key:"manage_credit_get"},
  { name: "Add", enabled: false,key:"manage_credit_create" },
]);

const [Request, setRequest] = useState([
  { name: "Request", enabled: false ,key:"request_get"},
  { name: "Delete", enabled: false ,key:"request_delete"},
  { name: "Status", enabled: false,key:"request_status" },
]);

const [FranchiseProfile, setFranchiseProfile] = useState([
  { name: "Franchise Profile", enabled: false ,key:"franchise_profile_get"},
]);

const [Account, setAccount] = useState([
  { name: "Account", enabled: false ,key:"account_get"},
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
   <button className={styles.btncreate}  onClick={submitRole} disabled={loading}>   {loading ? "Saving..." : "Create Role"}</button>
        </div>
      </div>
    </Layout>
  );
}
