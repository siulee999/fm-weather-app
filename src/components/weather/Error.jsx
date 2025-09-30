import { ReactSVG } from "react-svg";


const Error = ({ className, refetch }) => {
  return (
    <div className={`flex flex-col justify-center items-center gap-6 ${className}`}>
      <ReactSVG src="assets/icon-error.svg" className="text-n-300 size-11" />
      <p className="text-p-2">Something went wrong</p>
      <p className="text-p-5m text-n-200">We couldn't connect to the server (API error). Please try again in a few moments.</p>
      <button
        onClick={refetch}
        className="bg-[#262540] rounded-lg px-4 py-3 flex gap-2.5"
      >
        <ReactSVG src="icon-retry.svg" className="size-4" />
        <span className="text-p-7">Retry</span>
      </button>
    </div>
  )
}

export default Error