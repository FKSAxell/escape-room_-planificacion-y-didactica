export const gameData = {
  narrative: {
    introTitle: "Operación: Mapa Maestro",
    introText: "Estimado maestrante, el 'Mapa Maestro de la Educación Superior del Ecuador' ha sufrido un bloqueo crítico. Este mapa contiene las coordenadas estructurales, normativas y filosóficas que guían el quehacer universitario. Como futuro especialista en Planificación y Didáctica, ha sido convocado por el Consejo Académico para restaurar el sistema. Deberá demostrar su dominio sobre los fundamentos del sistema educativo superando cuatro cámaras de conocimiento progresivas. El futuro de la gestión académica está en sus manos. Proceda con rigor.",
    introButton: "Iniciar Recuperación",
    victoryTitle: "¡Sistema Restaurado!",
    victoryText: "¡Misión Académica Cumplida! Ha restaurado exitosamente el Mapa Maestro. Su desempeño evidencia una sólida apropiación de la contextualización de la Educación Superior en el Ecuador. Comprender sus principios, sus funciones sustantivas, su normativa y la cultura de calidad no es solo un requisito académico, es la base ineludible para el diseño de estrategias didácticas transformadoras. Está listo para liderar las aulas universitarias del mañana.",
    victoryCode: "EDUSUP-MAESTR3X-2026"
  },
  challenges: [
    {
      id: 1,
      title: "El Código de la Pertinencia (Cámara de los Principios)",
      description: "Caso de Análisis: Una universidad ubicada en una zona predominantemente agrícola decide cerrar abruptamente su Facultad de Agronomía para abrir una Escuela de Arte Clásico Europeo, argumentando el uso de su 'libertad académica'. \n\nPara estabilizar el núcleo, inyecte el principio fundamental del Sistema de Educación Superior que se está vulnerando.",
      options: [
        { id: "autonomia", title: "Autonomía", text: "La universidad debe consultar al Estado antes de cerrar y abrir nuevas carreras." },
        { id: "calidad", title: "Calidad", text: "El arte clásico europeo no cuenta con estándares de evaluación en el contexto local." },
        { id: "pertinencia", title: "Pertinencia", text: "La oferta académica se ha desvinculado de las necesidades, potencialidades y el contexto socio-productivo de su entorno." }
      ],
      correctId: "pertinencia",
      successMsg: "Acceso autorizado. Efectivamente, la pertinencia exige que la educación superior responda activamente a las expectativas y necesidades de la sociedad local y nacional, no solo a decisiones aisladas.",
      errorMsg: "Análisis incorrecto. Reflexione: ¿qué principio obliga a la universidad a ser un actor resolutivo frente a las problemáticas y matriz productiva de su entorno directo?"
    },
    {
      id: 2,
      title: "Sinergia Sustantiva (Circuito de Funciones)",
      description: "Proyecto Integrador: Un equipo universitario diseña un filtro de agua de bajo costo (Fase 1). Luego, capacita a una comunidad rural vulnerable para fabricarlo y usarlo (Fase 2). Finalmente, los estudiantes elaboran sus tesis sobre el impacto social del filtro bajo la guía de sus profesores (Fase 3). \n\nConecte cada fase del proyecto con su función sustantiva predominante en el circuito.",
      definitions: [
        { id: "d1", text: "Fase 1: Diseño y validación científica del filtro de agua frente a problemas reales." },
        { id: "d2", text: "Fase 2: Capacitación y transferencia tecnológica bidireccional con la comunidad rural." },
        { id: "d3", text: "Fase 3: Elaboración de tesis y acompañamiento docente para la titulación académica." }
      ],
      options: [
        { id: "inv", text: "Investigación" },
        { id: "vin", text: "Vinculación" },
        { id: "doc", text: "Docencia" }
      ],
      correctPairs: { d1: "inv", d2: "vin", d3: "doc" },
      successMsg: "Sincronización perfecta. Ha comprendido que las funciones sustantivas no operan en el vacío; se retroalimentan y enriquecen constantemente en proyectos de impacto real.",
      errorMsg: "Desconexión detectada. Las vías del conocimiento están cruzadas. Diferencie claramente entre la creación de conocimiento nuevo, el intercambio con sectores vulnerables y el proceso formal de formación estudiantil."
    },
    {
      id: 3,
      title: "Arquitectura del Sílabo (Archivo del Régimen)",
      description: "Como docente, está rediseñando el componente práctico de la materia de 'Didáctica'. Según el Reglamento de Régimen Académico, el crédito valora el esfuerzo integral del estudiante. \n\nActive en el panel TRES actividades de su planificación que evidencien una correcta distribución equitativa de la organización de los aprendizajes.",
      options: [
        { id: "o1", title: "Contacto Docente", text: "Cátedra magistral participativa, debates sincrónicos en el aula y tutorías." },
        { id: "o2", title: "Transmisión Pasiva", text: "Repetición de conceptos teóricos y transcripción de diapositivas en silencio durante la clase." },
        { id: "o3", title: "Práctico-Experimental", text: "Simulación de clases, diseño de material didáctico y rol de juegos en un laboratorio pedagógico." },
        { id: "o4", title: "Carga Irregular", text: "Exámenes sorpresa sin retroalimentación ni matriz de evaluación estructurada." },
        { id: "o5", title: "Trabajo Autónomo", text: "Lectura crítica de artículos científicos, investigación bibliográfica y elaboración de un ensayo personal." }
      ],
      correctAnswers: ["o1", "o3", "o5"],
      successMsg: "Archivo desencriptado con éxito. Un docente estratégico sabe que el aprendizaje no es solo 'dar clases', sino orquestar el acompañamiento directo, la experimentación y el esfuerzo independiente.",
      errorMsg: "Secuencia invalidada. Revise su diseño microcurricular. Identifique las tres modalidades válidas: la presencia guiada, la aplicación empírica o experimental, y el esfuerzo investigativo solitario del maestrante."
    },
    {
      id: 4,
      title: "El Ciclo de la Excelencia (Sala de Calidad)",
      description: "Caso de Análisis Crítico: La Universidad 'Sigma' nota un declive drástico en el desempeño profesional de sus egresados. Para frenar la crisis y 'asegurar la calidad', el nuevo Rector propone intervenir y solicitar inmediatamente la acreditación del CACES para mejorar su imagen. \n\nComo experto pedagogo sabe que esto es erróneo. Organice los módulos de aseguramiento de la calidad en la secuencia cronológica y procedimental correcta para resolver la crisis.",
      options: [
        { id: "step1", text: "Evaluación Externa (CACES)" },
        { id: "step2", text: "Autoevaluación Diagnóstica" },
        { id: "step3", text: "Plan de Mejora Continua" }
      ],
      correctSequence: ["step2", "step3", "step1"],
      successMsg: "Diagnóstico magistral. La calidad no se decreta ni es impuesta desde afuera de forma inmediata; nace de la reflexión crítica institucional transparente, accionada a través de mejoras antes del escrutinio externo.",
      errorMsg: "Secuencia rechazada. Invierta la lógica estratégica: las organizaciones académicas serias primero se miran a sí mismas, corrigen sus debilidades en casa, y posteriormente buscan el reconocimiento y certificación externa."
    }
  ]
};
