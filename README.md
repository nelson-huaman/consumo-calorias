# React + TypeScript
Este proyecto utiliza:

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario de manera declarativa y basada en componentes.
- **TypeScript**: Un superconjunto de JavaScript que añade tipado estático, mejorando la calidad del código y la experiencia de desarrollo.
- **Tailwind CSS**: Un framework de CSS utilitario que permite diseñar interfaces de usuario rápidamente con clases predefinidas.

### Hooks y características de React
- **useReducer**: Un hook para manejar estados complejos mediante un patrón de reducer similar a Redux.
- **Props**: Mecanismo para pasar datos entre componentes de React.
- **useState**: Un hook para manejar estados locales en componentes funcionales.
- **useEffect**: Un hook para manejar efectos secundarios como llamadas a APIs o suscripciones.
- **useMemo**: Un hook para memorizar valores calculados y optimizar el rendimiento.
- **localStorage**: Una API del navegador para almacenar datos de manera persistente en el cliente.

### Dependencias
- **uuid**: Una biblioteca para generar identificadores únicos universales (UUID).
- **heroicons/react**: Un conjunto de íconos SVG optimizados para React, diseñados para ser fáciles de usar.

### Componentes
- **ActivityList**: Componente encargado de mostrar una lista de actividades registradas, incluyendo sus respectivas calorías consumidas o quemadas. Permite visualizar de manera organizada las actividades realizadas por el usuario.

- **CalorieDisplay**: Componente que muestra un resumen visual del balance calórico actual, indicando las calorías consumidas, quemadas y el total restante.

- **CalorieTracker**: Componente principal que actúa como contenedor para los demás componentes. Gestiona el estado global de la aplicación y coordina la interacción entre los diferentes elementos.

- **Form**: Componente utilizado para registrar nuevas actividades. Permite al usuario ingresar detalles como el nombre de la actividad, las calorías asociadas y si fueron consumidas o quemadas.

Estas herramientas y configuraciones están diseñadas para ofrecer una experiencia de desarrollo eficiente y moderna.

[Visitar App](https://nelson-consumo-calorias.netlify.app)