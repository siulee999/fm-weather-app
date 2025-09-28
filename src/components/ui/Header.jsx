import { ReactSVG } from "react-svg";
import UnitDropdown from "./UnitDropdown";

export const Header = ({ selectedUnits, setSelectedUnits, className }) => {
  return (
    <header className={`flex items-center justify-between ${className}`}>
      <ReactSVG src="assets/logo.svg" className="flex items-center gap-3"  />
      <UnitDropdown selectedUnits={selectedUnits} setSelectedUnits={setSelectedUnits}/>
    </header>
  )
}
