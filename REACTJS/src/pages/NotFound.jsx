import { Fragment } from "react";
import NotFoundImage from '../assets/images/not-found.jpg';
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <Fragment>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Link to="/" className="text-blue-500 hover:text-blue-700">
                    Go back to home
                </Link>
            <img src={NotFoundImage} alt="Not Found" className="max-w-full h-auto max-h-screen" />

              
            </div>
        </Fragment>
    );
}
