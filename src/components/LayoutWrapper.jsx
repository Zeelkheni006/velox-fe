// components/LayoutWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Add all routes where you want to hide Header/Footer
   const hideLayoutRoutes = ['/signup', '/login','/login-account','/otp','/admin/login','/admin/components','/admin/pages','/admin/dashboard','/admin/roles','/admin/add-roles','/admin/staff','/admin/add-staff','/admin/customer','/admin/create','/admin/lead','/admin/edit','/admin/print-leads','/admin/franchises','/admin/franchises-edit','/admin/print-franchises','/admin/franchises-user','/admin/edit-franchise','/admin/add-franchise','/admin/categories','/admin/add-categories','/admin/edit-category','/admin/sub-categories','/admin/add-subcategory','/admin/edit-subcategory','/admin/services','/admin/add-services','/admin/edit-services','/admin/manage-media','/admin/service_specification','/admin/add-specification','/admin/service_faq','/admin/add-service_faq','/admin/ambassador','/admin/add-ambassador','/admin/best-service','/admin/add-bestservice','/admin/edit-bestservice','/admin/slider','/admin/add-slider']; 

  const hideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
