import { createContext, useContext, useState, useEffect } from "react";

const DatabaseContext = createContext(null);

export function DatabaseProvider({ children }) {
  // Inicializar stock de productos desde localStorage o valores por defecto
  const initializeProductsStock = () => {
    const stored = localStorage.getItem("productsStock");
    const initialStock = stored ? JSON.parse(stored) : {};
    let needsUpdate = false;
    
    // Asegurar que todos los productos del 1 al 30 tengan stock
    for (let i = 1; i <= 30; i++) {
      // Si no existe o tiene stock 0 o menor, inicializar con 50
      if (!initialStock[i] || initialStock[i] <= 0) {
        initialStock[i] = 50; // Stock inicial de 50 unidades
        needsUpdate = true;
      }
    }
    
    // Asegurar que el live tenga stock si no existe
    if (!initialStock["live-lion-king"]) {
      initialStock["live-lion-king"] = 30;
      needsUpdate = true;
    }
    
    // Si se hicieron cambios, guardar en localStorage
    if (needsUpdate) {
      localStorage.setItem("productsStock", JSON.stringify(initialStock));
    }
    
    return initialStock;
  };

  const [productsStock, setProductsStock] = useState(() => initializeProductsStock());

  // Efecto para asegurar que todos los productos tengan stock correcto al montar
  useEffect(() => {
    const updated = initializeProductsStock();
    setProductsStock(updated);
  }, []); // Solo ejecutar una vez al montar
  const [occupiedSeats, setOccupiedSeats] = useState(() => {
    const stored = localStorage.getItem("occupiedSeats");
    return stored ? JSON.parse(stored) : [];
  });

  // Sincronizar con localStorage cuando cambie el stock
  useEffect(() => {
    localStorage.setItem("productsStock", JSON.stringify(productsStock));
  }, [productsStock]);

  // Sincronizar con localStorage cuando cambien los asientos ocupados
  useEffect(() => {
    localStorage.setItem("occupiedSeats", JSON.stringify(occupiedSeats));
  }, [occupiedSeats]);

  // Obtener stock de un producto
  const getProductStock = (productId) => {
    return productsStock[productId] || 0;
  };

  // Disminuir stock de un producto
  const decreaseProductStock = (productId, quantity) => {
    setProductsStock(prev => {
      const newStock = { ...prev };
      const currentStock = newStock[productId] || 0;
      newStock[productId] = Math.max(0, currentStock - quantity);
      return newStock;
    });
  };

  // Aumentar stock de un producto (útil para administración)
  const increaseProductStock = (productId, quantity) => {
    setProductsStock(prev => {
      const newStock = { ...prev };
      const currentStock = newStock[productId] || 0;
      newStock[productId] = currentStock + quantity;
      return newStock;
    });
  };

  // Función auxiliar para normalizar fechas (comparar solo la fecha, sin hora)
  const normalizeDate = (date) => {
    if (!date) return null;
    // Si es un objeto Date, convertir a string ISO y tomar solo la parte de fecha
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    // Si es un string, intentar parsearlo
    if (typeof date === 'string') {
      try {
        return new Date(date).toISOString().split('T')[0];
      } catch (e) {
        return date;
      }
    }
    return date;
  };

  // Marcar asientos como ocupados
  const markSeatsAsOccupied = (seats, musicalName, date) => {
    // Normalizar la fecha antes de guardarla
    const normalizedDate = normalizeDate(date);
    
    const newOccupiedSeats = seats.map(seat => {
      // Asegurar que el seatId use el formato correcto con mayúsculas (LEFT-1-1, CENTER-1-1, RIGHT-1-1)
      let seatId = seat.id;
      if (!seatId) {
        // Construir el ID con la sección en mayúsculas
        const sectionUpper = seat.section ? seat.section.toUpperCase() : 'CENTER';
        seatId = `${sectionUpper}-${seat.row}-${seat.number}`;
      }
      
      return {
        seatId: seatId,
        musicalName: musicalName,
        date: normalizedDate, // Guardar fecha normalizada
        row: seat.row,
        number: seat.number,
        section: seat.section
      };
    });

    console.log('Marcando asientos como ocupados:', newOccupiedSeats.map(s => s.seatId));
    console.log('Fecha normalizada:', normalizedDate);
    setOccupiedSeats(prev => {
      const updated = [...prev, ...newOccupiedSeats];
      console.log('Total asientos ocupados:', updated.length);
      return updated;
    });
  };

  // Verificar si un asiento está ocupado
  const isSeatOccupied = (seatId, musicalName, date) => {
    const normalizedDate = normalizeDate(date);
    return occupiedSeats.some(
      seat => 
        seat.seatId === seatId && 
        seat.musicalName === musicalName && 
        normalizeDate(seat.date) === normalizedDate
    );
  };

  // Obtener todos los asientos ocupados para un musical y fecha específicos
  const getOccupiedSeatsForEvent = (musicalName, date) => {
    const normalizedSearchDate = normalizeDate(date);
    console.log('Buscando en BD:', { 
      musicalName, 
      date, 
      normalizedDate: normalizedSearchDate,
      totalSeats: occupiedSeats.length 
    });
    
    const filtered = occupiedSeats.filter(
      seat => {
        const nameMatch = seat.musicalName === musicalName;
        const normalizedSeatDate = normalizeDate(seat.date);
        const dateMatch = normalizedSeatDate === normalizedSearchDate;
        
        if (!nameMatch || !dateMatch) {
          console.log('No coincide:', { 
            seatMusical: seat.musicalName, 
            seatDate: seat.date,
            normalizedSeatDate,
            searchMusical: musicalName, 
            searchDate: date,
            normalizedSearchDate,
            nameMatch,
            dateMatch
          });
        }
        return nameMatch && dateMatch;
      }
    );
    console.log('Asientos filtrados encontrados:', filtered.length);
    filtered.forEach(seat => console.log('  -', seat.seatId));
    return filtered;
  };

  // Obtener todos los IDs de asientos ocupados para un evento
  const getOccupiedSeatIdsForEvent = (musicalName, date) => {
    const occupied = getOccupiedSeatsForEvent(musicalName, date);
    const seatIds = occupied.map(seat => seat.seatId);
    console.log('IDs de asientos ocupados:', seatIds);
    return new Set(seatIds);
  };

  return (
    <DatabaseContext.Provider
      value={{
        productsStock,
        occupiedSeats,
        getProductStock,
        decreaseProductStock,
        increaseProductStock,
        markSeatsAsOccupied,
        isSeatOccupied,
        getOccupiedSeatsForEvent,
        getOccupiedSeatIdsForEvent,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error("useDatabase must be used within DatabaseProvider");
  return ctx;
}

