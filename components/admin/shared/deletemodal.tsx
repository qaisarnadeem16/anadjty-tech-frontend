import { Button } from '@heroui/react'
import React from 'react'

type DeleteModalProps = {
    cancelDelete: () => void;
    confirmDelete: () => void;
    label:string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({cancelDelete, confirmDelete,label}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Confirm Deletion
                </h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this {label}? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <Button
                        color="default"
                        variant="flat"
                        size="sm"
                        onPress={cancelDelete}
                        className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        variant="solid"
                        size="sm"
                        onPress={confirmDelete}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
