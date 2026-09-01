const VALUES = [
  "Innovación",
  "Tecnología",
  "Producción",
  "Desarrollo",
  "Vinculación empresarial",
  "Economía del conocimiento",
];

export function AboutContent() {
  return (
    <div className="space-y-10">
      <div className="space-y-4 text-muted-foreground">
        <p>
          ExpoJuy es la feria multisectorial más importante del norte argentino,
          organizada por la Cámara de Comercio Exterior de Jujuy (CAMCOMEX). En su
          17ª edición, ExpoJuy 2026 se realiza del 9 al 12 de octubre en Ciudad
          Cultural, San Salvador de Jujuy, bajo el lema{" "}
          <strong className="text-foreground">
            &ldquo;Conectando países – creando oportunidades&rdquo;
          </strong>
          , con eje en el Corredor Bioceánico y el comercio internacional con
          Chile, Paraguay y Brasil.
        </p>
        <p>
          El evento reúne empresas, cooperativas, industrias, organismos públicos
          y delegaciones nacionales e internacionales en un espacio para generar
          inversión, intercambio comercial y promover el potencial productivo de
          la provincia.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Valores del evento</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {VALUES.map((value) => (
            <li
              key={value}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground"
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
