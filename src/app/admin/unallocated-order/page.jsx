  'use client';
  import { useState, useEffect, useRef } from 'react';
  import Layout from '../pages/page';
  import styles from '../styles/order.module.css';
  import { FaEye, FaBuilding, FaTasks } from 'react-icons/fa';
  import { useRouter } from 'next/navigation';

  // Mock data
  const MOCK_ORDERS = [
    { id: 1, user_name: 'John Doe', order_number: 'ORD001', services: 'Split AC Check', total_quantity: 2, total_amount: 500, city: 'Jamnagar', status: 'pending' },
    { id: 2, user_name: 'Jane Smith', order_number: 'ORD002', services: 'Split AC Chemical Wash', total_quantity: 1, total_amount: 300, city: 'Ahmedabad', status: 'completed' },
    { id: 3, user_name: 'Alice Johnson', order_number: 'ORD003', services: 'Window AC Service', total_quantity: 1, total_amount: 450, city: 'Surat', status: 'pending' },
  ];

  export default function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const router = useRouter();
    const rowRefs = useRef([]);

    // Load mock data
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setOrders(MOCK_ORDERS);
        setLoading(false);
      }, 500);
    }, []);

    // Click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = e => {
        if (!rowRefs.current.some(ref => ref && ref.contains(e.target))) {
          setOpenDropdownIndex(null);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Filtered orders
    const filteredOrders = orders.filter(o =>
      (!statusFilter || o.status === statusFilter) &&
      (!cityFilter || o.city === cityFilter) &&
      (!serviceFilter || o.services.includes(serviceFilter)) &&
      (o.user_name.toLowerCase().includes(search.toLowerCase()) ||
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.services.toLowerCase().includes(search.toLowerCase()))
    );

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, filteredOrders.length);
    const currentOrders = filteredOrders.slice(startIndex, endIndex);

    // Print and PDF handlers
    const handlePrintClick = () => {
      const tableElement = document.getElementById("orders-table");
      if (!tableElement) return alert("No orders table found to print.");
      const printContent = tableElement.outerHTML;
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html>
          <head>
            <title>Orders</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f4f4f4; }
            </style>
          </head>
          <body>
            <h2>Orders</h2>
            ${printContent}
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.focus();
      newWindow.print();
      newWindow.onafterprint = () => newWindow.close();
    };

    const handlePdfClick = async () => {
      const { jsPDF: JsPDF } = await import("jspdf");
      await import("jspdf-autotable");
      const doc = new JsPDF();
      doc.text("Orders (Current Page)", 14, 20);
      const tableColumn = ["ID", "User Name", "Order Number", "Services", "Quantity", "Amount", "City", "Status"];
      const tableBody = currentOrders.map(order => [
        order.id, order.user_name, order.order_number, order.services,
        order.total_quantity, order.total_amount, order.city, order.status
      ]);
      doc.autoTable({ head: [tableColumn], body: tableBody, startY: 30, styles: { fontSize: 8 }, headStyles: { fillColor: [22, 160, 133] } });
      doc.save("orders.pdf");
    };

    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <div>
            <span className={styles.breadcrumb}>Unallocated Orders View</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Unallocated Orders View</span>
          </div>
</div>
          <div className={styles.card}>
            <h2>Unallocated Orders View</h2>

            {/* Filters */}
            <div className={styles.filters}>
              <div className={styles.filtersTop}>
                <input type="date" placeholder="Date From" />
                <input type="date" placeholder="Date To" />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                  <option value="completed">Completed</option>
                </select>
                <select>
                  <option value="">Select Franchise</option>
                  <option value="Franchise 1">Franchise 1</option>
                  <option value="Franchise 2">Franchise 2</option>
                </select>
                <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
                  <option value="">Select City</option>
                  <option value="Jamnagar">Jamnagar</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
                <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}>
                  <option value="">Select Service</option>
                  <option value="Split AC Check">Split AC Check</option>
                  <option value="Split AC Chemical Wash">Split AC Chemical Wash</option>
                </select>
              </div>
            <div className={styles.filtersBottom}> <div className={styles.leftControls}> <div className={styles.leftButtons}> <button onClick={handlePdfClick}>PDF</button> <button onClick={handlePrintClick}>Print</button> </div> <div className={styles.showEntriesBelow}> Show{" "} <select value={entriesPerPage} onChange={e => setEntriesPerPage(Number(e.target.value))}> <option value={10}>10</option> <option value={25}>25</option> <option value={50}>50</option> </select>{" "} entries </div> </div> <div className={styles.rightControls}> <label>Search:</label> <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className={styles.search} /> </div> </div> </div>

            {/* Table */}
            {loading ? <div className={styles.spinnerWrapper}>Loading...</div> : (
              <>
                <table id="orders-table" className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User Name</th>
                      <th>Order Number</th>
                      <th>Services</th>
                      <th>Total Quantity</th>
                      <th>Total Amount</th>
                      <th>City</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order, index) => (
                      <tr key={order.id} ref={el => rowRefs.current[index] = el}>
                        <td>{order.id}</td>
                        <td>{order.user_name}</td>
                        <td>{order.order_number}</td>
                        <td>{order.services}</td>
                        <td>{order.total_quantity}</td>
                        <td>{order.total_amount}</td>
                        <td>{order.city}</td>
                        <td>{order.status}</td>
                        <td className={styles.action}>
                        <div
      className={styles.dropdownTrigger}
      onClick={e => {
        e.stopPropagation();
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
      }}
      ref={el => rowRefs.current[index] = el}
    >
      ⋮
    </div>
                      {openDropdownIndex === index && (
      <div
        className={styles.dropdownMenu}
        style={{
          position: "absolute",
          zIndex: 1000,
          top: (() => {
            const rect = rowRefs.current[index]?.getBoundingClientRect();
            const dropdownHeight = 100; // approximate dropdown height
            const spaceBelow = window.innerHeight - rect.bottom;
            return spaceBelow < dropdownHeight
              ? `${-dropdownHeight}px` // show above
              : `${rect.height}px`; // show below
          })(),
          left: 0,
        }}
      >
        <ul>
        
        <li onClick={() => {
    setSelectedOrderId(order.id);
    setOpenStatusModal(true);
    setOpenDropdownIndex(null); // close dropdown
  }}>
    <FaTasks style={{ marginRight: 5 }} /> Manage Status
  </li>
  <li
    onClick={() =>
     router.push(
  `/admin/unallocated-order-view?id=${order.id}&user_name=${encodeURIComponent(order.user_name)}&order_number=${order.order_number}&services=${encodeURIComponent(order.services)}&total_quantity=${order.total_quantity}&total_amount=${order.total_amount}&city=${order.city}&status=${order.status}`
)

    }
  >
    <FaEye style={{ marginRight: 5 }} /> View
  </li>
             <li
  onClick={() =>
router.push(
  `/admin/assign-franchise?id=${order.id}?services=${encodeURIComponent(order.services)}&total_amount=${order.total_amount}`
)

  }
  style={{ cursor: "pointer" }}
>
  <FaBuilding style={{ marginRight: 5 }} /> Assign To Franchise
</li>
        </ul>
      </div>
    )}
  </td> 
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Footer */}
              <div className={styles.pagination}>
              <span>
                {filteredOrders.length === 0 ? (
                  "No entries found"
                ) : (
                  `Showing ${startIndex + 1} to ${endIndex} of ${filteredOrders.length} entries`
                )}
              </span>

              <div className={styles.paginationControls}>
                <button
                  className={styles.paginationButton}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span className={styles.pageNumber}>{currentPage}</span>

                <button
                  className={styles.paginationButton}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
        {openStatusModal && (
    <div className={styles.modalOverlay} onClick={() => setOpenStatusModal(false)}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={() => setOpenStatusModal(false)}>×</button>
        <h3>What you want to do?</h3>
        <p>Click below button to manage order</p>
        <div className={styles.modalButtons}>
          <button className={styles.processingBtn} onClick={() => alert(`Processing order ${selectedOrderId}`)}>Processing</button>
          <button className={styles.declinedBtn} onClick={() => alert(`Declined order ${selectedOrderId}`)}>Declined</button>
        </div>
      </div>
    </div>
  )}
      </Layout>
      
    );
  }
