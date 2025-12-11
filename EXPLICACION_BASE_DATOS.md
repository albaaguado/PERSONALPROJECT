# 📚 Explicación: Sistema de Base de Datos y Compra

## 🎯 Objetivo
Crear un sistema que:
1. Almacene el stock de productos
2. Almacene qué asientos están ocupados
3. Permita comprar productos y entradas
4. Actualice automáticamente el stock y la disponibilidad de asientos

---

## 🏗️ Arquitectura de la Solución

### **Opción 1: Base de Datos Local (localStorage) - RECOMENDADA PARA EMPEZAR**
**Ventajas:**
- ✅ Fácil de implementar
- ✅ No requiere servidor
- ✅ Funciona inmediatamente
- ✅ Perfecto para desarrollo y pruebas

**Desventajas:**
- ❌ Solo funciona en el navegador del usuario
- ❌ No se sincroniza entre dispositivos
- ❌ Se pierde si se borra el caché

**Cuándo usar:** Para proyectos pequeños, prototipos, o cuando no necesitas sincronización entre usuarios.

---

### **Opción 2: Base de Datos Real (Firebase, MongoDB, etc.)**
**Ventajas:**
- ✅ Persistencia real
- ✅ Sincronización entre usuarios
- ✅ Escalable

**Desventajas:**
- ❌ Requiere configuración de servidor
- ❌ Más complejo de implementar
- ❌ Puede tener costos

**Cuándo usar:** Para producción real con múltiples usuarios.

---

## 📋 Estructura de Datos

### **1. Stock de Productos**
```javascript
{
  productId: 1,
  stock: 50  // Cantidad disponible
}
```

### **2. Asientos Ocupados**
```javascript
{
  seatId: "CENTER-5-12",
  musicalName: "Lion King",
  date: "2025-12-30",
  purchased: true
}
```

---

## 🔄 Flujo de Compra

### **Paso 1: Usuario hace clic en "COMPRAR"**
```
Usuario → Clic en botón → Función handlePurchase()
```

### **Paso 2: Validar Stock**
```
Para cada producto en el carrito:
  - Verificar si hay suficiente stock
  - Si NO hay stock → Mostrar error
  - Si SÍ hay stock → Continuar
```

### **Paso 3: Procesar Compra**
```
Para productos normales:
  - Restar cantidad del stock
  - Guardar en base de datos

Para entradas:
  - Marcar asientos como ocupados
  - Guardar en base de datos
```

### **Paso 4: Limpiar Carrito**
```
Vaciar el carrito después de la compra exitosa
```

---

## 🛠️ Implementación Paso a Paso

### **1. Crear Contexto de Base de Datos**
- Archivo: `src/context/DatabaseContext.jsx`
- Función: Gestionar stock y asientos ocupados
- Almacenamiento: localStorage (fácil de cambiar después)

### **2. Agregar Stock a Productos**
- Modificar: `src/data/bd_articles.js`
- Agregar campo `stock` a cada producto

### **3. Crear Función de Compra**
- Archivo: `src/context/CartContext.jsx`
- Función: `handlePurchase()`
- Validar stock → Procesar → Limpiar carrito

### **4. Actualizar Modal de Asientos**
- Archivo: `src/components/SeatingChartModal.jsx`
- Leer asientos ocupados de la base de datos
- Mostrar en rojo los asientos ocupados

### **5. Agregar Botón de Compra**
- Archivo: `src/components/CartDropdown.jsx`
- Botón: "COMPRAR"
- Conectar con función de compra

---

## 📝 Estructura de Archivos

```
src/
├── context/
│   ├── CartContext.jsx          (Ya existe - agregar función compra)
│   └── DatabaseContext.jsx       (NUEVO - gestionar BD)
├── data/
│   └── bd_articles.js            (Modificar - agregar stock)
├── components/
│   ├── CartDropdown.jsx          (Modificar - agregar botón compra)
│   └── SeatingChartModal.jsx     (Modificar - leer asientos ocupados)
```

---

## 🔍 Detalles Técnicos

### **Cómo Funciona localStorage**
```javascript
// Guardar datos
localStorage.setItem('key', JSON.stringify(data));

// Leer datos
const data = JSON.parse(localStorage.getItem('key'));

// Eliminar datos
localStorage.removeItem('key');
```

### **Estructura de la Base de Datos en localStorage**
```javascript
{
  "productsStock": {
    "1": 50,  // Producto ID 1 tiene 50 unidades
    "2": 30,
    ...
  },
  "occupiedSeats": [
    {
      "seatId": "CENTER-5-12",
      "musicalName": "Lion King",
      "date": "2025-12-30"
    },
    ...
  ]
}
```

---

## 🚀 Próximos Pasos (Opcional - Para Producción)

1. **Migrar a Firebase**
   - Crear proyecto en Firebase
   - Configurar Firestore
   - Reemplazar localStorage con Firebase

2. **Agregar Autenticación**
   - Login de usuarios
   - Historial de compras

3. **Panel de Administración**
   - Gestionar stock
   - Ver ventas
   - Gestionar asientos

---

## ✅ Resumen

1. **Base de datos local** usando localStorage (fácil y rápido)
2. **Stock de productos** almacenado y actualizado
3. **Asientos ocupados** marcados y guardados
4. **Botón de compra** que procesa todo automáticamente
5. **Fácil migración** a base de datos real cuando sea necesario
