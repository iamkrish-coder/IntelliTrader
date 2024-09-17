import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
/// Css
import './../index.css'
import './../chart.css'
import './../step.css'

/// Layout
import Nav from './../layouts/nav'
import Footer from './../layouts/Footer'
import { ThemeContext } from "../../context/ThemeContext";
//Scroll To Top
import ScrollToTop from './../layouts/ScrollToTop';

/// Dashboard
import Home from "./../pages/dashboard/Home";
import DashboardDark from "./../pages/dashboard/DashboardDark";
import Market from "./../pages/dashboard/Market";
import CoinDetails from "./../pages/dashboard/CoinDetails";
import Portofolio from "./../pages/dashboard/Portofolio";

import EmptyPage from "./../pages/dashboard/EmptyPage";

//trading
import TradingMarket from "../pages/trading/TradingMarket";
import IcoListing from "../pages/trading/IcoListing";
import P2P from "../pages/trading/P2P";
import FutureTrading from "../pages/trading/FutureTrading";

//Crypto
import MarketWatch from "../pages/crypto/MarketWatch";
import Exchange from "../pages/crypto/Exchange";
import Banking from "../pages/crypto/Banking";

//Reports
import History from "../pages/report/History";
import Orders from "../pages/report/Orders";
import Reports from "../pages/report/Reports";
import User from "../pages/report/User";

/// App
import AppProfile from './../pages/apps/AppProfile'
import PostDetails from './../pages/apps/PostDetails'
import EditProfile from "../pages/apps/EditProfile";
import Calendar from './../pages/apps/Calendar/Calendar'
import Compose from './../pages/email/Compose/Compose'
import Inbox from './../pages/email/Inbox/Inbox'
import Read from './../pages/email/Read'

//CMS
import Content from './../pages/cms/Content';
import Menu from './../pages/cms/Menu';
import EmailTemplate from './../pages/cms/EmailTemplate';
import CmsBlog from './../pages/cms/Blog';
import ContentAdd from './../pages/cms/ContentAdd';
import AddMail from './../pages/cms/AddMail';
import AddBlog from './../pages/cms/AddBlog';
import BlogCategory from './../pages/cms/BlogCategory';

/// Product List
import ProductGrid from './../pages/ecommerce/ProductGrid/ProductGrid'
import ProductList from './../pages/ecommerce/ProductList/ProductList'
import ProductDetail from './../pages/ecommerce/ProductGrid/ProductDetail'
import Checkout from './../pages/ecommerce/Checkout'
import EcomCustomers from './../pages/ecommerce/Customers'
import Invoice from './../pages/ecommerce/Invoice'
import ProductOrder from './../pages/ecommerce/ProductOrder'

/// Charts
import RechartJs from './../pages/charts/rechart'
import ChartJs from './../pages/charts/Chartjs'
import SparklineChart from './../pages/charts/Sparkline'
import ApexChart from './../pages/charts/apexcharts'

/// Bootstrap
import UiAlert from "./../pages/bootstrap/Alert";
import UiAccordion from "./../pages/bootstrap/Accordion";
import UiBadge from "./../pages/bootstrap/Badge";
import UiButton from "./../pages/bootstrap/Button";
import UiModal from "./../pages/bootstrap/Modal";
import UiButtonGroup from "./../pages/bootstrap/ButtonGroup";
import UiListGroup from "./../pages/bootstrap/ListGroup";
import MediaObject from "./../pages/bootstrap/MediaObject";
import UiCards from "./../pages/bootstrap/Cards";
import UiCarousel from "./../pages/bootstrap/Carousel";
import UiDropDown from "./../pages/bootstrap/DropDown";
import UiPopOver from "./../pages/bootstrap/PopOver";
import UiProgressBar from "./../pages/bootstrap/ProgressBar";
import UiTab from "./../pages/bootstrap/Tab";
import UiPagination from "./../pages/bootstrap/Pagination";
import UiGrid from "./../pages/bootstrap/Grid";
import UiTypography from "./../pages/bootstrap/Typography";

/// Plugins
import Select2 from "./../pages/plugins/Select2/Select2";
import MainSweetAlert from "./../pages/plugins/SweetAlert";
import Toastr from "./../pages/plugins/Toastr";
import Lightgallery from "./../pages/plugins/Lightgallery";


/// Widget
import WidgetCard from "./../pages/widget/WidgetCard";
import WidgetChart from "./../pages/widget/WidgetChart";
import WidgetList from "./../pages/widget/WidgetList";


/// Table
import DataTable from './../pages/table/DataTable'
import BootstrapTable from './../pages/table/BootstrapTable'
import SortingTable from "./../pages/table/SortingTable/SortingTable";
import FilteringTable from "./../pages/table/FilteringTable/FilteringTable";


/// Form
import Element from "./../pages/forms/Element/Element";
import Wizard from "./../pages/forms/Wizard/Wizard";
import Pickers from "./../pages/forms/Pickers/Pickers";
import CkEditor from './../pages/forms/CkEditor/CkEditor';
import FormValidation from './../pages/forms/FormValidation/FormValidation';

/// Pages
import LockScreen from './../pages/error/LockScreen'
import Error400 from './../pages/error/Error400'
import Error403 from './../pages/error/Error403'
import Error404 from './../pages/error/Error404'
import Error500 from './../pages/error/Error500'
import Error503 from './../pages/error/Error503'
import RightWalletBar from "../layouts/nav/RightWalletBar";


const Markup = () => {
  const allroutes = [
    { url: "market", component: <Market /> },
    { url: "coin-details", component: <CoinDetails /> },
    { url: "portofolio", component: <Portofolio /> },

    //Trading
    { url: "trading-market", component: <TradingMarket /> },
    { url: "ico-listing", component: <IcoListing /> },
    { url: "p2p", component: <P2P /> },
    { url: "future", component: <FutureTrading /> },

    //Cryoti
    { url: "market-watch", component: <MarketWatch /> },
    { url: "exchange", component: <Exchange /> },
    { url: "banking", component: <Banking /> },

    //Reports
    { url: "history", component: <History /> },
    { url: "orders", component: <Orders /> },
    { url: "reports", component: <Reports /> },
    { url: "user", component: <User /> },

    /// Apps
    { url: "app-profile", component: <AppProfile /> },
    { url: "post-details", component: <PostDetails /> },
    { url: "edit-profile", component: <EditProfile /> },
    { url: "email-compose", component: <Compose /> },
    { url: "email-inbox", component: <Inbox /> },
    { url: "email-read", component: <Read /> },
    { url: "app-calender", component: <Calendar /> },
    /// Shop
    { url: "ecom-product-grid", component: <ProductGrid /> },
    { url: "ecom-product-list", component: <ProductList /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-product-order", component: <ProductOrder /> },
    { url: "ecom-checkout", component: <Checkout /> },
    { url: "ecom-invoice", component: <Invoice /> },
    { url: "ecom-customers", component: <EcomCustomers /> },

    ///Cms
    { url: 'content', component: <Content /> },
    { url: 'menu', component: <Menu /> },
    { url: 'email-template', component: <EmailTemplate /> },
    { url: 'blog', component: <CmsBlog /> },
    { url: 'content-add', component: <ContentAdd /> },
    { url: 'add-email', component: <AddMail /> },
    { url: 'add-blog', component: <AddBlog /> },
    { url: 'blog-category', component: <BlogCategory /> },

    /// Chart
    { url: "chart-sparkline", component: <SparklineChart /> },
    { url: "chart-chartjs", component: <ChartJs /> },
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },

    /// Bootstrap
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-media-object", component: <MediaObject /> },
    { url: "ui-card", component: <UiCards /> },
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },

    /// Plugin
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },
    { url: "uc-lightgallery", component: <Lightgallery /> },

    /// Widget
    { url: "widget-card", component: <WidgetCard /> },
    { url: "widget-chart", component: <WidgetChart /> },
    { url: "widget-list", component: <WidgetList /> },

    // Form
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-pickers", component: <Pickers /> },
    { url: "form-validation", component: <FormValidation /> },


    /// table	
    { url: "table-datatable-basic", component: <DataTable /> },
    { url: 'table-filtering', component: <FilteringTable /> },
    { url: 'table-sorting', component: <SortingTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },

    /// pages    
    { url: "empty-page", component: <EmptyPage /> },
  ]


  return (
    <>
      <Routes>
        <Route path='/page-lock-screen' element={<LockScreen />} />
        <Route path='/page-error-400' element={<Error400 />} />
        <Route path='/page-error-403' element={<Error403 />} />
        <Route path='/page-error-404' element={<Error404 />} />
        <Route path='/page-error-500' element={<Error500 />} />
        <Route path='/page-error-503' element={<Error503 />} />
        <Route element={<MainLayout />} >
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/index-2' element={<DashboardDark />} />
        </Route>
        <Route element={<MainLayout2 />} >
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  )
}

function MainLayout() {
  const { sidebariconHover, headWallet } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);

  return (
    <>
      <div id="main-wrapper"
        className={`show wallet-open ${headWallet ? "" : 'active'} ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}
      >
        <Nav />
        <RightWalletBar />
        <div className="content-body" >
          <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
};
function MainLayout2() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);
  return (
    <>
      <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
        <Nav />
        <div className="content-body" >
          <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
};

export default Markup;