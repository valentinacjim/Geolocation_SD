# Una aplicación para las personas a quién les gusta dormir durante los viajes en autobús o tren.

## Variables globales
Como varibles globales se usan las siguientes:
* 'mapa' : Mapa de OpenStreetMap.
* 'posicion_usuario' : Posición del usuario en el mapa.
* 'destino' : Marcador del punto destino del usuario.
* 'circulo_cercano' : Círculo que indica que el usuario está cerca de su destino (500m).
* 'circulo_lejano' : Círculo que indica que el usuario está relativamente cerca de su destino (750m).
* 'tiempo_actualización' : Tiempo en segundos que tarda en actualizarse la posición del usuario.

## Funciones

### PosicionInicial()
Esta función se encarga de pedir permiso al usuario para acceder a su posición y de mostrarla en el mapa. Además, centra el mapa en la posición del usuario.

### conseguirPosicionActual()
Esta función se encarga de actualizar la posición del usuario en el mapa. Para ello, se usa la función 'navigator.geolocation.getCurrentPosition()' que devuelve la posición del usuario en un objeto 'position'. A partir de este objeto, se obtiene la latitud y longitud del usuario y se actualiza la posición del marcador 'posicion_usuario' en el mapa.

### formulaHaversine(latitud1, longitud1, latitud2, longitud2)
Esta función se encarga de calcular la distancia entre dos puntos en la Tierra. Para ello, se usa la fórmula de Haversine. Esta fórmula se basa en el teorema de Pitágoras para esferas.

### deg2rad(deg)
Esta función se encarga de convertir grados a radianes.

### vibracionLejana()
Esta función se encarga de vibrar el dispositivo cuando el usuario está relativamente cerca de su destino (750m). Con un patrón de vibración de 1s de vibración y 2s de pausa.

### vibracionCercana()
Esta función se encarga de vibrar el dispositivo cuando el usuario está cerca de su destino (500m). Con un patrón de vibración de 2s de vibración y 1s de pausa.

### calculoDistancia()
Esta función se encarga de calcular la distancia entre la posición del usuario y el destino. Para ello, se usa la función 'formulaHaversine()' y en función de la distancia, se ejecuta un patrón de vibración u otro.

## Eventos

### Evento 'click'
Este evento se ejecuta cuando el usuario hace click en el mapa. Se encarga de añadir un marcador en el punto donde se ha hecho click y de calcular la distancia entre el usuario y el punto donde se ha hecho click. Además, se encarga de actualizar la posición del marcador 'destino' en el mapa.