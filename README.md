# Tetonor

Tetonor es un juego de lógica matemática basado en combinaciones de suma y producto.  
El objetivo es completar una fila de números de manera que, al agruparlos en pares, cada par genere **exactamente una suma y un producto** que coincidan con los valores objetivo mostrados.

El juego pone el foco en el razonamiento lógico, la deducción y la verificación de combinaciones posibles, más que en el cálculo mecánico.

---

## 🧩 Reglas del juego

- Hay **16 números objetivo** (targets), visibles para el jugador.
- Hay una **fila de 16 números** (ordenados de forma no decreciente):
  - Algunos valores están visibles.
  - Otros están ocultos y deben ser completados por el jugador.
- Los números de la fila:
  - Son enteros entre **1 y 50**.
  - Pueden repetirse una vez.
- La fila debe dividirse en **8 pares disjuntos**.
- Cada par `(a, b)` debe generar:
  - una **suma**: `a + b`
  - un **producto**: `a × b`
- El conjunto de todas las sumas y productos debe coincidir **exactamente** con los 16 números objetivo.
- Se gana cuando todos los números de la fila han sido usados correctamente y se obtienen todos los números objetivo.


---

## 🖥️ Interfaz

- Los **targets** se muestran en un mosaico de 4×4.
- Debajo de cada target, el jugador puede probar combinaciones `(A + B)` o `(A × B)`.
- Cuando un target queda correctamente completo, el mosaico cambia visualmente para indicar progreso.
- La fila inferior muestra los 16 números:
  - Los valores fijos no pueden modificarse.
  - Los valores ocultos pueden completarse manualmente.
![Tetonor – Vista del juego](assets/interfaz.png)

---

## ⚙️ Tecnologías utilizadas

- **React** – interfaz de usuario
- **TypeScript** – tipado estático y robustez
- **Ant Design** – librería de componentes UI
- **Tauri** – empaquetado como aplicación de escritorio (Windows / Linux)

El motor lógico del juego (generación y validación de puzzles) está implementado en TypeScript.

---

## 📦 Descargas

Se puede usar Tetonor como aplicación de escritorio:

👉 **Descargar aplicaciones (Windows / Linux)**  
🔗 https://drive.google.com/drive/folders/19WYFKCFZCx9dBFjGWNVIwrVWU34bg5Dn?usp=sharing

---

## 🚀 Ejecución en modo desarrollo

Si quieres descargar el repo y ejecutar la app sigue los prerequisitos de Tauri
🔗 https://tauri.app/start/prerequisites/
Una vez listo clona el ropositorio, en una terminal muevete a la dirección Tetonor/app y ejecuta:
```bash
npm install
npm run dev
```
Puedes usar otro runtime de tu preferencia en lugar de Node.js.
