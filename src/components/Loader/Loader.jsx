import { LoaderIcon } from "react-hot-toast"
import "./Loader.css"
function Loader() {
    return (
        <div className="loader">
            <span>Loading data...</span>
            <LoaderIcon className="loader__icon" />
        </div>
    )
}

export default Loader