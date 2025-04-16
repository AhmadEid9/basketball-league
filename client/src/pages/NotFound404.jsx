import { AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"
import darkTheme from "../themes/dark.js";
const NotFound404 = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center p-6">
      <div className={'w-5/6 h-3/4 bg-gradient-to-r flex justify-center items-center py-6' + darkTheme.orangeGradient}>
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center border-gray-300 border py-4 rounded-2xl bg-[#1d1d1d] p-12 ">
          <AlertTriangle className="w-16 h-16 text-orange-500 mb-4" />
          <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
          <p className="text-lg mb-6">Sorry, we couldn't find the page you were looking for.</p>
          <Link to="/" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound404