// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_sejuegasgo: 'http://localhost:8080/futbolsantiago',
  // Va a esta ruta xq el routing de gestionComplejos esta definido asi, sino se actualiza la url y se pierde el token q se envia
  // si aqui pongo el # tengo que usar en la otra app el useHash = true
  url_gestionComplejos: 'http://localhost:4500/#',
  url_reservaCancha: 'http://localhost:4600/#',
  url_registro: 'http://localhost:5500/#',
  url_recuperarClave: 'http://localhost:5500/#/registro/recuperarClave',
  // VARIABLES DE SEGURIDAD
  url_oauth_spring: 'http://localhost:8080/futbolsantiago/oauth/token',
  token_name: 'access_token', // VA ASI POR DEFECTO, ES EL NOMBRE DEL TOKEN EN EL JSON Q DEVUELVE EL BACK
  client_id: 'sejuegasantiago', // SE CORRESPONDE CON LO DEFINIDO EN EL PROPERTIES EN SPRING
  client_secret: 'sejuega2020', // SE CORRESPONDE CON LO DEFINIDO EN EL PROPERTIES EN SPRING
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
