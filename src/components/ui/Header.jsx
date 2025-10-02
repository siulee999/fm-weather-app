import { ReactSVG } from "react-svg";
import UnitDropdown from "./UnitDropdown";

export const Header = ({
  tempUnit, windSpeedUnit, preciUnit, setTempUnit, setWindSpeedUnit, setPreciUnit, className
}) => {
  return (
    <header className={`flex items-center justify-between ${className}`}>
      <ReactSVG
        src="assets/logo.svg"
        className="flex items-center gap-3"
        aria-label="Weather Now Logo"
        beforeInjection={(svg) => {
          svg.setAttribute('aria-hidden', 'true');
        }} />
      <UnitDropdown tempUnit={tempUnit} windSpeedUnit={windSpeedUnit} preciUnit={preciUnit} setTempUnit={setTempUnit} setWindSpeedUnit={setWindSpeedUnit} setPreciUnit={setPreciUnit} />
    </header>
  )
}
