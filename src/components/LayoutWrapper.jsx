// components/LayoutWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Add all routes where you want to hide Header/Footer
   const hideLayoutRoutes = ['/signup', '/login','/login-account','/otp','/admin','/admin/components','/admin/pages','/admin/dashboard','/admin/roles','/admin/admin-add/add-roles','/admin/staff','/admin/add-staff','/admin/customer','/admin/create','/admin/lead','/admin/edit','/admin/print-leads','/admin/franchises','/admin/franchises-edit','/admin/print-franchises','/admin/franchises-user','/admin/edit-franchise','/admin/admin-add/add-franchise','/admin/categories','/admin/admin-add/add-categories','/admin/edit-category','/admin/sub-categories','/admin/admin-add/add-subcategory','/admin/edit-subcategory','/admin/services','/admin/admin-add/add-services','/admin/edit-services','/admin/manage-media','/admin/service_specification','/admin/admin-add/add-specification','/admin/service_faq','/admin/admin-add/add-service_faq','/admin/ambassador','/admin/admin-add/add-ambassador','/admin/best-service','/admin/admin-add/add-bestservice','/admin/edit-bestservice','/admin/slider','/admin/admin-add/add-slider'
    ,'/admin/package','/admin/admin-add/add-package','/admin/manage-media-package','/admin/edit-package','/admin/orders','/admin/order-view','/admin/unallocated-order','/admin/offer','/admin/franchise-orders-details','/admin/unallocated-order-view','/admin/assign-franchise','/admin/admin-add/add-offer','/admin/edit-offer','/admin/best-offer','/admin/admin-add/add-best-offer','/admin/edit-best-offer','/admin/gift','/admin/send-gift','/admin/edit-gift','/admin/service-rating','/admin/admin-add/add-service-rating','/admin/edit-service-rating','/admin/testimonial','/admin/admin-add/add-testimonial','/admin/edit-testimonal','/admin/income','/admin/franchise_fees','/admin/franchise_outstanding','/admin/payments','/admin/admin-add/add-payment','/admin/edit-payment','/admin/credit-plan','/admin/admin-add/add-credit-paln','/admin/edit-credit-plan','/admin/custome-plan','/admin/news-latter','/admin/admin-add/add-newsletter','/admin/referral-program','/admin/request','/admin/followup','/admin/admin-about',
    '/admin/admin-add/add-about','/admin/edit-about','/admin/admin-blog','/admin/admin-add/add-blog','/admin/edit-blog',"/admin/admin-contact","/admin/general-settings-logo",'/admin/edit-slider','/admin/admin-add/add-gift','/admin/edit-role','/admin/select-city','/admin/delete_accounts','/admin/local_page','/admin/forgot-password','/admin/change-password'
   ]; 

   const hideLayout = hideLayoutRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
