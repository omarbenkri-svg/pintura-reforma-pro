export const spaces=['pared','suelo','bano','fachada'];
export const goals=['color','textura','continuidad'];

export function getGuide(space,goal){
  if(!spaces.includes(space)||!goals.includes(goal))return null;
  if(space==='fachada')return {
    title:'Pintura y reparación exterior para valorar',
    why:'Fuera, la exposición al sol y la lluvia pesa más que el efecto de una foto. Primero hay que ver el estado del revestimiento.',
    check:'Fisuras, humedad, partes sueltas, acceso y orientación de la fachada.',
    caveat:'El sistema y el alcance se concretan después de revisar el soporte.',
    service:'exterior',detail:'/caso-fachada'};
  if(space==='suelo')return {
    title:'Un revestimiento continuo para valorar',
    why:'Si buscas continuidad en el suelo, podemos estudiar un acabado como el microcemento según el uso y la base existente.',
    check:'Estado del soporte, juntas, tránsito, escalones y encuentros con otros pavimentos.',
    caveat:'No todos los suelos admiten el mismo sistema ni la misma preparación.',
    service:'microcemento',detail:'/microcemento'};
  if(space==='bano'){
    const color=goal==='color';
    const texture=goal==='textura';
    return {
      title:color?'Pintura en zonas secas del baño':texture?'Estuco en una pared fuera del agua':'Continuidad en el baño para valorar',
      why:color?'Para cambiar el color de una pared seca puede bastar una pintura adecuada.':texture?'Una pared seca puede admitir un acabado decorativo trabajado a mano.':'Podemos estudiar un revestimiento continuo según el soporte, la zona y el uso.',
      check:'Dónde llega el agua, impermeabilización, pendientes, ventilación y encuentros.',
      caveat:'Ningún acabado decorativo sustituye por sí solo la impermeabilización de una ducha.',
      service:color?'pintura-vivienda':texture?'decorativa':'microcemento',
      detail:color?'/pintura-viviendas':texture?'/decorativa-estucos':'/microcemento'};
  }
  if(goal==='color')return {
    title:'Pintura para renovar la pared',
    why:'Si buscas otro color, la pintura permite renovar la estancia sin añadir una textura decorativa.',
    check:'Grietas, manchas, capas anteriores, humedad y preparación del paramento.',
    caveat:'El producto y la preparación dependen del estado real de la pared.',
    service:'pintura-vivienda',detail:'/pintura-viviendas'};
  if(goal==='textura')return {
    title:'Estuco para dar carácter a la pared',
    why:'Veneciano, marmolizado y Portland ofrecen aspectos distintos. Elegimos el efecto y el tono con la luz de la estancia en mente.',
    check:'Planeidad, absorción y estado del soporte; referencia de textura y brillo.',
    caveat:'La técnica concreta se decide después de ver la pared y el acabado que buscas.',
    service:'decorativa',detail:'/decorativa-estucos'};
  return {
    title:'Un acabado continuo para valorar',
    why:'Si quieres una pared de aspecto continuo, podemos estudiar el microcemento y comparar el efecto con otras opciones.',
    check:'Soporte, juntas, encuentros, exposición al agua y mantenimiento esperado.',
    caveat:'La continuidad visual no elimina la necesidad de preparar bien la base.',
    service:'microcemento',detail:'/microcemento'};
}
