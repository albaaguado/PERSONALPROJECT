import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useDatabase } from "../context/DatabaseContext";
import "./SeatingChartModal.css";

// Zonas de precios
const ZONE_PRICES = {
  red: 120,    // Más cercanas al escenario
  blue: 90,    // En el medio
  green: 60    // Más lejanas
};

// Generar estructura de asientos según la maqueta
// Bloque izquierdo: 10 filas x 8 columnas
// Bloque centro: 10 filas x 16 columnas (con pasillos)
// Bloque derecho: 10 filas x 8 columnas
const generateSeats = () => {
  const seats = [];
  
  // Filas numeradas del 1 al 10 (de más lejanas a más cercanas al escenario)
  const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  
  // Bloque izquierdo - 10 filas x 8 columnas
  rowLabels.forEach((row) => {
    for (let i = 1; i <= 8; i++) {
      seats.push({
        id: `LEFT-${row}-${i}`,
        row: row,
        number: i,
        zone: 'green',
        section: 'left',
        available: true
      });
    }
  });

  // Bloque centro - 10 filas x 16 columnas
  // Estructura: bloque izquierdo (1-6), pasillo, bloque medio (7-10), pasillo, bloque derecho (11-16)
  rowLabels.forEach((row) => {
    // Bloque izquierdo: 1-6
    for (let i = 1; i <= 6; i++) {
      seats.push({
        id: `CENTER-${row}-${i}`,
        row: row,
        number: i,
        zone: 'green',
        section: 'center',
        available: true
      });
    }
    // Bloque medio: 7-10
    for (let i = 7; i <= 10; i++) {
      seats.push({
        id: `CENTER-${row}-${i}`,
        row: row,
        number: i,
        zone: 'green',
        section: 'center',
        available: true
      });
    }
    // Bloque derecho: 11-16
    for (let i = 11; i <= 16; i++) {
      seats.push({
        id: `CENTER-${row}-${i}`,
        row: row,
        number: i,
        zone: 'green',
        section: 'center',
        available: true
      });
    }
  });

  // Bloque derecho - 10 filas x 8 columnas
  rowLabels.forEach((row) => {
    for (let i = 1; i <= 8; i++) {
      seats.push({
        id: `RIGHT-${row}-${i}`,
        row: row,
        number: i,
        zone: 'green',
        section: 'right',
        available: true
      });
    }
  });

  return seats;
};

export default function SeatingChartModal({ open, selectedDate, onClose, onConfirm, musicalName }) {
  const backdropRef = useRef(null);
  const { addToCart, cart } = useCart();
  const { getOccupiedSeatIdsForEvent, occupiedSeats } = useDatabase();
  const [seats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Obtener asientos que ya están en el carrito para este musical y fecha
  const getSeatsInCart = () => {
    const seatsInCart = new Set();
    
    cart.forEach(item => {
      // Verificar si es un ticket del mismo musical y fecha
      if (item.type === 'ticket' && 
          item.tag === musicalName && 
          item.date === selectedDate &&
          item.seats) {
        // Agregar cada asiento al Set usando su ID
        item.seats.forEach(seatInfo => {
          // Buscar el ID del asiento basado en row y number
          const seatId = seats.find(s => 
            s.row === seatInfo.row && 
            s.number === seatInfo.number &&
            s.section === seatInfo.section
          )?.id;
          if (seatId) {
            seatsInCart.add(seatId);
          }
        });
      }
    });
    
    return seatsInCart;
  };

  // Obtener asientos ocupados de la base de datos (comprados anteriormente)
  const getOccupiedSeatsFromDB = () => {
    if (!musicalName || !selectedDate) {
      console.log('No hay musicalName o selectedDate:', { musicalName, selectedDate });
      return new Set();
    }
    console.log('Buscando asientos ocupados para:', { musicalName, selectedDate });
    const occupied = getOccupiedSeatIdsForEvent(musicalName, selectedDate);
    // Debug: mostrar asientos ocupados encontrados
    console.log('Asientos ocupados encontrados:', Array.from(occupied));
    console.log('Tamaño del Set:', occupied.size);
    return occupied;
  };

  // Forzar actualización cuando cambien los asientos ocupados o se abra el modal
  useEffect(() => {
    if (open) {
      // Resetear selección cuando se abre el modal
      setSelectedSeats([]);
    }
  }, [open, occupiedSeats]);

  // Recalcular asientos no disponibles cuando cambien los datos
  const seatsInCart = getSeatsInCart();
  const occupiedSeatsFromDB = getOccupiedSeatsFromDB();
  
  // Combinar asientos en carrito y asientos ocupados de BD
  // Recalcular cada vez que cambien los asientos ocupados o el carrito
  const unavailableSeats = React.useMemo(() => {
    const combined = new Set([...seatsInCart, ...occupiedSeatsFromDB]);
    if (open && combined.size > 0) {
      console.log('Asientos no disponibles (recalculado):', Array.from(combined));
      console.log('  - En carrito:', Array.from(seatsInCart));
      console.log('  - Ocupados en BD:', Array.from(occupiedSeatsFromDB));
    }
    return combined;
  }, [cart, occupiedSeats, open, musicalName, selectedDate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const getSeatZone = (seat) => {
    return seat.zone;
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + (ZONE_PRICES[seat?.zone] || 0);
    }, 0);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!open) return null;

  // Agrupar asientos por sección y fila
  const leftSeats = seats.filter(s => s.section === 'left');
  const centerSeats = seats.filter(s => s.section === 'center');
  const rightSeats = seats.filter(s => s.section === 'right');

  // Agrupar por filas
  const groupByRow = (seatList) => {
    const grouped = {};
    seatList.forEach(seat => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    return grouped;
  };

  // Ordenar filas: del 1 al 10 (1 es más lejano, 10 más cercano)
  const sortRows = (rows) => {
    return Object.keys(rows).sort((a, b) => {
      return parseInt(a) - parseInt(b); // Orden numérico ascendente
    });
  };

  const leftRows = groupByRow(leftSeats);
  const centerRows = groupByRow(centerSeats);
  const rightRows = groupByRow(rightSeats);

  // Función para dividir asientos en bloques (para mostrar pasillos)
  const groupSeatsIntoBlocks = (seatList, section) => {
    const sorted = [...seatList].sort((a, b) => a.number - b.number);
    
    if (section === 'center') {
      // Para el centro: bloque izquierdo (1-6), medio (7-10), derecho (11-16)
      // Siempre devolver 3 bloques aunque estén vacíos para mantener la estructura
      const leftBlock = sorted.filter(s => s.number >= 1 && s.number <= 6);
      const middleBlock = sorted.filter(s => s.number >= 7 && s.number <= 10);
      const rightBlock = sorted.filter(s => s.number >= 11 && s.number <= 16);
      return [leftBlock, middleBlock, rightBlock];
    } else {
      // Para laterales: todos los asientos en un bloque
      return [sorted];
    }
  };

  return (
    <div
      className="seating-backdrop"
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="seating-content" onClick={(e) => e.stopPropagation()}>
        {/* Navigation Steps */}
        <div className="seating-steps">
          <div className="step completed">
            <span className="step-check">✓</span>
            <span>Seats</span>
          </div>
          <div className="step completed">
            <span className="step-check">✓</span>
            <span>Selling order</span>
          </div>
          <div className="step active">
            <span className="step-number">3</span>
            <span>Tickets</span>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <span>Final review</span>
          </div>
        </div>

        {/* Seating Chart */}
        <div className="seating-chart-container">
          <div className="seating-chart">
            {/* Fila superior con las tres secciones */}
            <div className="seating-top-row">
              {/* Left Section */}
              <div className="seating-section left">
                {sortRows(leftRows).map(row => {
                  const blocks = groupSeatsIntoBlocks(leftRows[row], 'left');
                  return (
                    <div key={row} className="seat-row">
                      <span className="row-label">{row}</span>
                      <div className="seats-in-row">
                        {blocks.map((block, blockIndex) => (
                          <React.Fragment key={blockIndex}>
                            {block.map(seat => {
                              const isUnavailable = unavailableSeats.has(seat.id);
                              const isInCart = seatsInCart.has(seat.id);
                              const isOccupied = occupiedSeatsFromDB.has(seat.id);
                              
                              // Debug para asientos específicos
                              if (seat.id === 'CENTER-10-14' || seat.id === 'CENTER-10-15' || seat.id === 'CENTER-10-16') {
                                console.log(`Asiento ${seat.id}:`, {
                                  isUnavailable,
                                  isInCart,
                                  isOccupied,
                                  inUnavailableSet: unavailableSeats.has(seat.id),
                                  inOccupiedSet: occupiedSeatsFromDB.has(seat.id)
                                });
                              }
                              
                              // Construir className con orden correcto (unavailable al final para prioridad)
                              const seatClasses = [
                                'seat',
                                `seat-${getSeatZone(seat)}`,
                                selectedSeats.includes(seat.id) ? 'selected' : '',
                                isInCart ? 'in-cart' : '',
                                (!seat.available || isUnavailable) ? 'unavailable' : ''
                              ].filter(Boolean).join(' ');
                              
                              return (
                                <button
                                  key={seat.id}
                                  className={seatClasses}
                                  onClick={() => seat.available && !isUnavailable && toggleSeat(seat.id)}
                                  disabled={!seat.available || isUnavailable}
                                  title={`${seat.row}${seat.number} - ${ZONE_PRICES[seat.zone]}€${isInCart ? ' (En carrito)' : isOccupied ? ' (Ocupado)' : ''}`}
                                >
                                  {seat.number}
                                </button>
                              );
                            })}
                            {blockIndex < blocks.length - 1 && <span className="aisle-spacer"></span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Section */}
              <div className="seating-section center">
                {sortRows(centerRows).map(row => {
                  const blocks = groupSeatsIntoBlocks(centerRows[row], 'center');
                  return (
                    <div key={row} className="seat-row">
                      <span className="row-label">{row}</span>
                      <div className="seats-in-row">
                        {blocks.map((block, blockIndex) => (
                          <React.Fragment key={blockIndex}>
                            {block.map(seat => {
                              const isUnavailable = unavailableSeats.has(seat.id);
                              const isInCart = seatsInCart.has(seat.id);
                              const isOccupied = occupiedSeatsFromDB.has(seat.id);
                              
                              // Debug para asientos específicos
                              if (seat.id === 'CENTER-10-14' || seat.id === 'CENTER-10-15' || seat.id === 'CENTER-10-16') {
                                console.log(`Asiento ${seat.id}:`, {
                                  isUnavailable,
                                  isInCart,
                                  isOccupied,
                                  inUnavailableSet: unavailableSeats.has(seat.id),
                                  inOccupiedSet: occupiedSeatsFromDB.has(seat.id)
                                });
                              }
                              
                              // Construir className con orden correcto (unavailable al final para prioridad)
                              const seatClasses = [
                                'seat',
                                `seat-${getSeatZone(seat)}`,
                                selectedSeats.includes(seat.id) ? 'selected' : '',
                                isInCart ? 'in-cart' : '',
                                (!seat.available || isUnavailable) ? 'unavailable' : ''
                              ].filter(Boolean).join(' ');
                              
                              return (
                                <button
                                  key={seat.id}
                                  className={seatClasses}
                                  onClick={() => seat.available && !isUnavailable && toggleSeat(seat.id)}
                                  disabled={!seat.available || isUnavailable}
                                  title={`${seat.row}${seat.number} - ${ZONE_PRICES[seat.zone]}€${isInCart ? ' (En carrito)' : isOccupied ? ' (Ocupado)' : ''}`}
                                >
                                  {seat.number}
                                </button>
                              );
                            })}
                            {blockIndex < blocks.length - 1 && <span className="aisle-spacer"></span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Section */}
              <div className="seating-section right">
                {sortRows(rightRows).map(row => {
                  const blocks = groupSeatsIntoBlocks(rightRows[row], 'right');
                  return (
                    <div key={row} className="seat-row">
                      <span className="row-label">{row}</span>
                      <div className="seats-in-row">
                        {blocks.map((block, blockIndex) => (
                          <React.Fragment key={blockIndex}>
                            {block.map(seat => {
                              const isUnavailable = unavailableSeats.has(seat.id);
                              const isInCart = seatsInCart.has(seat.id);
                              const isOccupied = occupiedSeatsFromDB.has(seat.id);
                              
                              // Debug para asientos específicos
                              if (seat.id === 'CENTER-10-14' || seat.id === 'CENTER-10-15' || seat.id === 'CENTER-10-16') {
                                console.log(`Asiento ${seat.id}:`, {
                                  isUnavailable,
                                  isInCart,
                                  isOccupied,
                                  inUnavailableSet: unavailableSeats.has(seat.id),
                                  inOccupiedSet: occupiedSeatsFromDB.has(seat.id)
                                });
                              }
                              
                              // Construir className con orden correcto (unavailable al final para prioridad)
                              const seatClasses = [
                                'seat',
                                `seat-${getSeatZone(seat)}`,
                                selectedSeats.includes(seat.id) ? 'selected' : '',
                                isInCart ? 'in-cart' : '',
                                (!seat.available || isUnavailable) ? 'unavailable' : ''
                              ].filter(Boolean).join(' ');
                              
                              return (
                                <button
                                  key={seat.id}
                                  className={seatClasses}
                                  onClick={() => seat.available && !isUnavailable && toggleSeat(seat.id)}
                                  disabled={!seat.available || isUnavailable}
                                  title={`${seat.row}${seat.number} - ${ZONE_PRICES[seat.zone]}€${isInCart ? ' (En carrito)' : isOccupied ? ' (Ocupado)' : ''}`}
                                >
                                  {seat.number}
                                </button>
                              );
                            })}
                            {blockIndex < blocks.length - 1 && <span className="aisle-spacer"></span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage */}
            <div className="stage">
              <div className="stage-label">Stage</div>
            </div>
          </div>
        </div>

        {/* Legend and Info */}
        <div className="seating-info">
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color red"></div>
              <span>Ocupado / reservado</span>
            </div>
            <div className="legend-item">
              <div className="legend-color blue"></div>
              <span>Seleccionado</span>
            </div>
            <div className="legend-item">
              <div className="legend-color green"></div>
              <span>Disponible</span>
            </div>
          </div>
          <div className="selected-info">
            <div className="selected-date">
              <strong>Date:</strong> {formatDate(selectedDate)}
            </div>
            <div className="selected-seats">
              <strong>Selected:</strong> {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''}
            </div>
            <div className="total-price">
              <strong>Total:</strong> {getTotalPrice()}€
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="seating-actions">
          <button className="seating-btn ghost" onClick={onClose}>Cancel</button>
          <button
            className="seating-btn primary"
            onClick={() => {
              // Crear un solo item con todas las entradas agrupadas
              const totalTickets = selectedSeats.length;
              const seatsInfo = selectedSeats.map(seatId => {
                const seat = seats.find(s => s.id === seatId);
                return seat ? `${seat.row}${seat.number}` : '';
              }).filter(Boolean).join(', ');
              
              // Calcular precio promedio por entrada (o usar el precio total dividido)
              const averagePrice = getTotalPrice() / totalTickets;
              
              const ticketItem = {
                id: `tickets-${musicalName || 'Musical'}-${selectedDate}-${Date.now()}`,
                name: `${totalTickets} Ticket${totalTickets !== 1 ? 's' : ''} ${musicalName || 'Musical'} - ${seatsInfo}`,
                img: '', // No hay imagen para tickets
                price: averagePrice,
                tag: musicalName || 'Ticket',
                seats: selectedSeats.map(seatId => {
                  const seat = seats.find(s => s.id === seatId);
                  return seat ? {
                    row: seat.row,
                    number: seat.number,
                    zone: seat.zone,
                    section: seat.section
                  } : null;
                }).filter(Boolean),
                date: selectedDate,
                type: 'ticket',
                quantity: totalTickets // Establecer la cantidad inicial
              };
              
              // Añadir al carrito con la cantidad correcta
              addToCart(ticketItem);
              
              onConfirm(selectedSeats, getTotalPrice());
              onClose();
            }}
            disabled={selectedSeats.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

