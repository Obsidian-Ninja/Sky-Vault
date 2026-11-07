import { ArrowUpFromLine, X, FileIcon, Loader2 } from 'lucide-react';
import { useRef } from 'react';

const UploadBox = ({files, onFileChange, onUpload, uploading, onRemoveFile, remainingCredits, isUploadDisables}) => {

    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropogation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropogation();

        const droppedFiles = Array.from(e.dataTransfer.files);
        if(droppedFiles.length > 0) {
            // create a new event-like object with the files
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
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <ArrowUpFromLine className='text-blue-600' size={20} />
                    <h2 className="text-lg font-medium">Upload Files</h2>
                </div>
                <div className="text-sm text-gray-500">
                    {remainingCredits} credits remaining
                </div>
            </div>

            <div 
                className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center bg-white cursor-pointer hover:border-blur-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="p-3 rounded-full bg-blue-50 mb-4">
                        <ArrowUpFromLine size={24} className='text-blue-600' />
                    </div>
                    <p className="text-gray-700 mb-1">Drag and Drop files here</p>
                    <p className="text-gray-500 text-sm mb-2">
                        or click to browse ({remainingCredits} credits remaining) 
                    </p>

                    <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef}
                        multiple
                        onChange={onFileChange}
                        accept='*/*'
                        max={5}
                    />
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Selected Files ({files.length})</h3>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0 hoverLbg-gray-50">
                                <div className="flex items-center gap-3"><FileIcon size={18} className='text-blue-600' />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                            </div>

                            <button 
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                disabled={uploading}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFile(index);
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div> 
                        ))}
                    </div>
                </div>
            )}

            {file.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={onUpload}
                        disabled={uploading || isUploadDisabled}
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={18} className='animate-spin' />
                                <span>Uploading ...</span>
                            </>
                        ) : (
                            <span>Upload</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}

export default UploadBox;