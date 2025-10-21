interface SectionDividerProps {
  label: string;
}

/**
 * Componente reutilizable para dividir secciones
 */
export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="section-divider-wrapper">
      <div className="section-divider" aria-hidden="true">{label}</div>
    </div>
  )
}
