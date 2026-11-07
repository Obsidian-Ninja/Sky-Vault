import { ArrowUpFromLine, FileIcon, Loader2, Upload, X } from "lucide-react";

const DashboardUpload = () => {
    
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFiles = Array.from(e.dataTransfer.files);
        if(droppedFiles.length > 0) {
            const mockEvent = {
                target: {
                    files: droppedFiles
                }
            };
            onFileChange(mockEvent);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const formatFileSize = (bytes) => {
        if(bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / 1048576).toFixed(2) + ' MB';
    };
    
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-2">
                    <ArrowUpFromLine className="text-purple-500" size={18} />
                    <h2 className="text-base font-medium">Upload Files</h2>
                </div>

                <div className="text-xs text-gray-500">
                    {remainingUpload} of 5 files remaining
                </div>
            </div>

        <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center bg-white cursor-pointer hover:border-purple-500 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
        >
            <div className="flex flex-col items-center justify-center">
                <div className="p-2 rounded-full bg-purple-50 mb-3">
                    <ArrowUpFromLine size={20} className="text-purple-500" />
                </div>

                <p className="text-gray-700 text-sm mb-1">Drag and Drop files here</p>
                <p className="text-gray-500 text-xs">or click to browse</p>
                <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    multiple
                    onChange={onFileChange}
                    accept="*/*"
                    max={5}
                />
            </div>
        </div>

        {fileInputRef.length > 0 && (
            <div className="mt-4">
                <h3 className="text-xs font-medium mb-2">Selected Files ({files.length})</h3>
                <div className="bg-white rounded-lg border border-gray-200 overlow-hidden">
                    {files.map((file, index) => (
                        <div className="flex items-center justify-between p-2 border-b last:border-b-0 hover:bg-gray-50">
                            <div className="flex items-center gap-2">
                                <FileIcon size={16} className="text-purple-500" />
                                <div>
                                    <p className="text-xs font-medium text-gray-800 truncate max-w-[150px]">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                            </div>

                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFile(index);
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                disabled={uploading}
                            >
                                <X size={16}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {file.length > 0 && (
            <div className="mt-3">
                <button 
                    onClick={onUpload}
                    className="w-full py-2 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                >
                    {uploading ? (
                        <>
                            <Loader2 size={16}
                            className="animate-spin" />
                            <span>Uploading ...</span>
                        </>
                    ) : (
                        <span>Upload {files.length} File(s)</span>
                    )}

                </button>
            </div>
        )}
    
    </div>
    )
}

export default DashboardUpload;