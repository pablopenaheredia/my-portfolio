interface SectionDividerProps {
  label: string;
}

/**
 * Componente reutilizable para dividir secciones
 */
export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="section-divider-wrapper">
      <div className="section-divider-line-left">
        <span className="section-divider-dot"></span>
      </div>
      <div className="section-divider" aria-hidden="true">{label}</div>
      <div className="section-divider-line-right">
        <span className="section-divider-dot"></span>
      </div>
    </div>
  )
}
