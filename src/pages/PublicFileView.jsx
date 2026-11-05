import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import axios from "axios";
import {apiEndpoints} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import {Copy, Download, File, Info, Share2} from "lucide-react";
import LinkShareModal from "../components/LinkShareModal.jsx";

const PublicFileView = () => {
    
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [shareModal, setShareModal] = useState({
        isOpen: false,
        link: ""
    });

    const {getToken} = useAuth();
    const {fileId} = useParams();

    useEffect(() => {
        const getFile = async () => {
            setIsLoading(true);
            try {
                // re-added token fetching and authorization header
                const res = await axios.get(
                    apiEndpoints.PUBLIC_FILE_VIEW(fileId)
                );

                setFile(res.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching file: ", error);
                setError("Could not retrieve file. The link may be invalid or the file may have been removed.");
            } finally {
                setIsLoading(false);
            }
        };
        getFile();
    }, [fileId, getToken]);

    const handleDownload = async () => {
        try {
            // This endpoint might also require a token depending on the backend setup
            const response = await axios.get(apiEndpoints.DOWNLOAD_FILE(fileId), {
                responseType: "blob",
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.name); // Use the actual file name
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url); // Clean up the object URL
        } catch(error) {
            console.error("Download failed: ", error);
            toast.error("Sorry the file could not be downloadeed. Please try again later.");
        }
    };

    const openShareModal = () => {
        setShareModal({
            isOpen: true,
            link: window.location.href,
        });
    };

    const closeShareModal = () => {
        setShareModal({
            isOpen: true,
            link: "",
        });
    };

    if(isLoading){
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-gray-600">
                    Loading File ...
                </p>
            </div>
        );
    }

    if(error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-red-600">Error</h2>

                    <p className="text-gray-600 mt-2">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if(!file) {
        return null;
    }
    
    return (
        
    )
}


export default PublicFileView;