import React, { useState } from 'react';
import CalendarModal from "../../../components/CalendarModal";
import SeatingChartModal from "../../../components/SeatingChartModal";
import "../info_shared.css"; // desde .../info/chr => ../info_shared.css

// Ejemplo de ruta si tu imagen está en src/img/musicales/portadas/
import image from "../../../img/musicales/fotos 'actuaciones'/whitechristmas.jpg";

const CoverImage = "uploaded:imagen.png-5433566a-5cfd-4258-82bd-b92f6849e717";

// --- ICON COMPONENTS (SVG provided by user) ---
// Se mantienen los atributos width y height para asegurar el tamaño correcto.

const StarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
        <path fill="currentColor" d="M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z"/>
    </svg>
);

const ClockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
        <path fill="currentColor" d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm5,10c0-.553-.447-1-1-1h-3V6c0-.553-.448-1-1-1s-1,.447-1,1v6c0,.553,.448,1,1,1h4c.553,0,1-.447,1-1Z"/>
    </svg>
);

const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
        <g id="_01_align_center" data-name="01 align center">
            <path fill="currentColor" d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z"/>
            <path fill="currentColor" d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z"/>
        </g>
    </svg>
);

const MapPinIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" {...props}>
        <g id="_01_align_center">
            <path fill="currentColor" d="M255.104,512.171l-14.871-12.747C219.732,482.258,40.725,327.661,40.725,214.577c0-118.398,95.981-214.379,214.379-214.379s214.379,95.981,214.379,214.379c0,113.085-179.007,267.682-199.423,284.932L255.104,512.171z M255.104,46.553c-92.753,0.105-167.918,75.27-168.023,168.023c0,71.042,110.132,184.53,168.023,236.473c57.892-51.964,168.023-165.517,168.023-236.473C423.022,121.823,347.858,46.659,255.104,46.553z"/>
            <path fill="currentColor" d="M255.104,299.555c-46.932,0-84.978-38.046-84.978-84.978s38.046-84.978,84.978-84.978s84.978,38.046,84.978,84.978S302.037,299.555,255.104,299.555z M255.104,172.087c-23.466,0-42.489,19.023-42.489,42.489s19.023,42.489,42.489,42.489s42.489-19.023,42.489-42.489S278.571,172.087,255.104,172.087z"/>
        </g>
    </svg>
);


const TABS = ['About', 'Venue', 'Tickets', 'Reviews'];

// Main Component is now named InfoLesMiserables
const   Info_Whitechristmas = () => {
    const [activeTab, setActiveTab] = useState('About');

    const TabItem = ({ name }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`tab-item ${activeTab === name ? 'active' : ''}`}
        >
            {name}
        </button>
    );

    // --- PriceCard using react-datepicker ---
    const PriceCard = () => {
        const [showCalendar, setShowCalendar] = useState(false);
        const [selectedDate, setSelectedDate] = useState(null);

        const openCalendar = () => setShowCalendar(true);
        const closeCalendar = () => setShowCalendar(false);
        const [showSeating, setShowSeating] = useState(false);
        const confirmDate = (date) => {
            setSelectedDate(date);
            closeCalendar();
            setShowSeating(true);
        };

        const closeSeating = () => setShowSeating(false);
        const confirmSeats = (selectedSeats, totalPrice) => {
            console.log("Asientos seleccionados:", selectedSeats);
            console.log("Precio total:", totalPrice);
            console.log("Fecha:", selectedDate);
            closeSeating();
        };

        return (
            <>
                <div className="price-card">
                    <span className="from-text">from</span>
                    <span className="price-value">80€</span>
                    <button className="price-button" onClick={openCalendar}>
                        <span>check availability</span>
                    </button>
                </div>

                <CalendarModal
                  open={showCalendar}
                  selectedDate={selectedDate}
                  onChange={setSelectedDate}
                  onClose={closeCalendar}
                  onConfirm={confirmDate}
                />

                <SeatingChartModal
                  open={showSeating}
                  selectedDate={selectedDate}
                  onClose={closeSeating}
                  onConfirm={confirmSeats}
                  musicalName="White Christmas"
                />
            </>
        );
    };

    return (
        <>
            <div className="info-container">
                
                {/* --- HEADER AREA --- */}
                <header className="header-area">
                    
                    {/* Cover Image */}
                    <img 
                        className="poster-image" 
                        src= {image}
                        alt="Les Miserables Poster"
                        // Fallback to a plain dark background if the image fails to load
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/147x232/222/FFFFFF?text=Poster+No+Cargado"; }}
                    />

                    {/* Content Container (Responsive positioning) */}
                    <div className="content-container">
                        
                        {/* Rating */}
                        <div className="rating">
                            <StarIcon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} />
                            <span>4.6</span>
                        </div>

                        {/* Title */}
                        <h1 className="title">
                            White Christmas
                        </h1>

                        {/* Venue */}
                        <div className="venue">
                            <MapPinIcon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                            <span>Teatro Blablabla</span>
                        </div>
                    </div>
                </header>

                <main className="main-content">
                    
                    {/* --- INFO TAGS (DURATION + AGE) --- */}
                    <div className="info-tags">
                        
                        {/* Duration Tag */}
                        <div className="info-tag-item">
                            <div className="tag-icon-circle">
                                <ClockIcon style={{ width: '1.5rem', height: '1.5rem', color: '#1f2937' }} />
                            </div>
                            <div className="tag-details">
                                <span className="label">Duration</span>
                                <span className="value">2h 30min</span>
                            </div>
                        </div>

                        {/* Age Limit Tag */}
                        <div className="info-tag-item">
                            <div className="tag-icon-circle">
                                <UserIcon style={{ width: '1.5rem', height: '1.5rem', color: '#1f2937' }} />
                            </div>
                            <div className="tag-details">
                                <span className="label">Age Limit</span>
                                <span className="value">Suitable for 6+</span>
                            </div>
                        </div>
                    </div>

                    {/* --- INDEX: ABOUT / VENUE / TICKETS / REVIEWS --- */}
                    <nav className="nav-tabs">
                        {TABS.map(tab => <TabItem key={tab} name={tab} />)}
                    </nav>

                    {/* --- TEXT + PRICE SECTION --- */}
                    <section className="content-section">
                        
                        {/* --- TEXT CONTENT --- */}
                        <div className="text-content">
                            <p>
                                Lorem ipsum dolor sit, amet consectetur. Nam porttitor blandit est, dui magnis habitasse eros felis elementum ultrices. Pellentesque sit amet erat justo. Bibendum morbi malesuada convallis dictum semper erat, ultrices placerat pretium blandit ligula elementum, sagittis ultrices rhoncus, porttitor nec, nam, morbi viverra. Curabitur vel ornare turpis. Cras nullam vel fringilla nullam quisque, lacus nulla lacus.
                            </p>
                            <p>
                                Dui magnis habitasse eros felis elementum ultrices habitant penatibus posuere, commodo euismod leo mauris massa ad dignissim vivamus. Consequat at lacus suscipit placerat in cum pharetra hendrerit, eget. Commodo leo mauris massa ad dignissim vivamus.
                            </p>
                            <p>
                                Pulvinar faucibus vivamus nascetur non lacus cubilia hac, aptent a viverra sapien condimentum mus conubia, commodo luctus lobortis risus, suscipit cubilia nostra, cursus fringilla velit cum sociis aliquam. Erat blandit sed molestie interdum ultricies tempus curabitur ultrices ante in, lacus suscipit lacus ad nibh condimentum nostra volutpat diam.
                            </p>
                            <p>
                                Pulvinar faucibus vivamus nascetur non lacus cubilia hac, aptent a viverra sapien condimentum mus conubia, commodo luctus lobortis risus, suscipit cubilia nostra, cursus fringilla velit cum sociis aliquam. Erat blandit sed molestie interdum ultricies tempus curabitur ultrices ante in.
                            </p>
                        </div>

                        {/* --- PRICE & BUTTON (Sidebar) --- */}
                        <div className="price-sidebar">
                            <PriceCard />
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default   Info_Whitechristmas;