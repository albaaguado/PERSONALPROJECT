import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header";
import Home from "./pages/home";
import Programming from "./pages/program";
import { CartProvider } from "./context/CartContext";
import { DatabaseProvider } from "./context/DatabaseContext";

// PÁGINAS DE TICKETS
import InfoLesMiserables from "./pages/info/info_miserables";
import InfoLionKing from "./pages/info/info_lionking";
import InfoVictor from "./pages/info/info_victorvictoria";
import InfoWicked from "./pages/info/info_wicked";
import InfoWss from "./pages/info/info_westsidestory";
import InfoAladdin from "./pages/info/info_aladdin";
import InfoCabaret from "./pages/info/info_cabaret";
import InfoGrease from "./pages/info/info_grease";
import InfoMammaMia from "./pages/info/info_mammamia";
import InfoOz from "./pages/info/info_oz";
import InfoKinki from "./pages/info/info_kinki";
import InfoMoulin from "./pages/info/info_moulin";
import InfoPoppins from "./pages/info/info_poppins";
import InfoHamilton from "./pages/info/info_hamilton";
import InfoChicago from "./pages/info/info_chicago";
import InfoRain from "./pages/info/info_singingrain";
import InfoPhantom from "./pages/info/info_phantomopera";

// NAVIDAD
import InfoChrCarol from "./pages/info/chr/info_christmascarol";
import InfoElf from "./pages/info/chr/info_elf";
import InfoGrinch from "./pages/info/chr/info_grinch";
import InfoHoliday from "./pages/info/chr/info_holidayinn";
import InfoWhiteChristmas from "./pages/info/chr/info_whitechristmas";

// ESTRENOS
import Info_boop from "./pages/info/pr/info_boop";
import Info_Justintime from "./pages/info/pr/info_justintime"; 
import Info_Pirates from "./pages/info/pr/info_pirates";
import Info_5years from "./pages/info/pr/info_5years";
import Info_Queen from "./pages/info/pr/info_queen"; 


import History from "./pages/history";  
import Shop from "./pages/shop";
import Footer from "./components/footer";
import ProductDetail from "./pages/shop/productdetails"; 


function App() {
  return (
    <DatabaseProvider>
      <CartProvider>
        <BrowserRouter>
        <Header /> 
        <ScrollToTop offset={0} behavior="auto" />

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Programming />} />
        <Route path="/info/info_lesmiserables" element={<InfoLesMiserables />} />
        <Route path="/info/info_lionking" element={<InfoLionKing />} />
        <Route path="/info/info_victorvictoria" element={<InfoVictor />} />
        <Route path="/info/info_wicked" element={<InfoWicked />} />
        <Route path="/info/info_westsidestory" element={<InfoWss />} />
        <Route path="/info/info_aladdin" element={<InfoAladdin />} />
        <Route path="/info/info_cabaret" element={<InfoCabaret />} />
        <Route path="/info/info_grease" element={<InfoGrease />} />
        <Route path="/info/info_mammamia" element={<InfoMammaMia />} />
        <Route path="/info/info_oz" element={<InfoOz />} />
        <Route path="/info/info_kinki" element={<InfoKinki />} />
        <Route path="/info/info_moulin" element={<InfoMoulin />} />
        <Route path="/info/info_poppins" element={<InfoPoppins />} />
        <Route path="/info/info_hamilton" element={<InfoHamilton />} />
        <Route path="/info/info_chicago" element={<InfoChicago />} />
        <Route path="/info/info_singingrain" element={<InfoRain />} />
        <Route path="/info/info_phantomopera" element={<InfoPhantom />} />
        <Route path="/info/chr/info_christmascarol" element={<InfoChrCarol />} />
        <Route path="/info/chr/info_grinch" element={<InfoGrinch />} />
        <Route path="/info/chr/info_elf" element={<InfoElf />} />
        <Route path="/info/chr/info_holidayinn" element={<InfoHoliday />} />
        <Route path="/info/chr/info_whitechristmas" element={<InfoWhiteChristmas />} />
        <Route path="/info/pr/info_boop" element={<Info_boop />} />
        <Route path="/info/pr/info_justintime" element={<Info_Justintime />} />
        <Route path="/info/pr/info_pirates" element={<Info_Pirates />} />
        <Route path="/info/pr/info_5years" element={<Info_5years />} />
        <Route path="/info/pr/info_queen" element={<Info_Queen />} />
        <Route path="/history" element={<History />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productName" element={<ProductDetail />} />      
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
    </DatabaseProvider>
  );
}

export default App;
