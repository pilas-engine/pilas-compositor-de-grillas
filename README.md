# Pilas Compositor De Grillas

Esta es una aplicación super sencilla pensada para probar
grillas de gráficos orientadas a pilas-engine.

## ¿En qué consiste?

Pilas usa un sistema de animación muy sencillo basado
en grillas de imágenes.

Las grillas generalmente se generan usando [un plugin
de gimp](http://losersjuegos.com.ar/software/gimp), pero una vez que se generan es algo difícil
de probar y corregir.

Esta aplicación permite previsualizar y corregir las grillas
directamente generadas:

[[]]

Además, la aplicación visualiza cambios en la grilla en tiempo real, así que se puede editar el archivo de la grilla desde un editor externo y no hace falta reiniciar la aplicación para ver la nueva versión de la grilla.


[[]]

## ¿Cómo usar la aplicación?

Si sos desarrollador, la mejor forma de iniciar la aplicación
es ejecutando estos comandos:


```
npm install
bower install
ember electron
```

(tal vez necesites ejecutar `npm install -g bower` y `npm install -g electron-cli` antes)
