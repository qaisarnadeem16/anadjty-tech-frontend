'use client'
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { HiOutlineTrash } from "react-icons/hi";
import { Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getSubscribers, deleteSubscriber, Subscriber } from "@/lib/api/subscribers";
import PaginationShadcn from "../../shared/pagination-shadcn";
import { formatDate } from "@/lib/utils";
import DeleteModal from "../../shared/deletemodal";
import { useDebounce } from "@/lib/hooks/useDebounce";

const Subscribers = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [showConfirm, setShowConfirm] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [staticData, setStaticData] = useState<{ items: Subscriber[]; total: number; limit: number; page: number }>({
    items: [],
    total: 0,
    limit: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage, debouncedSearchQuery]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      
      if (debouncedSearchQuery.trim()) {
        params.search = debouncedSearchQuery.trim();
      }
      
      const response = await getSubscribers(params);
      setStaticData({
        items: response.items || [],
        total: response.total || 0,
        limit: response.limit || 10,
        page: response.page || 1,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setSubscriberToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!subscriberToDelete) return;

    const deleteToast = toast.loading("Deleting Subscriber...");
    try {
      await deleteSubscriber(subscriberToDelete);
      toast.success("Subscriber deleted successfully!", { id: deleteToast });
      // Refresh the list
      await fetchSubscribers();
    } catch (err: any) {
      console.error("Error deleting subscriber:", err);
      toast.error(err.message || "Failed to delete Subscriber", { id: deleteToast });
    } finally {
      setShowConfirm(false);
      setSubscriberToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSubscriberToDelete(null);
  };

  return (
    <div className="w-full bg-gray-50 p-4 sm:p-8">

      {/* Confirmation Modal */}
      {showConfirm && (
        <DeleteModal cancelDelete={cancelDelete} label="Subscriber" confirmDelete={confirmDelete} />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Subscribers
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search subscribers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="font-medium text-gray-600 flex items-center">
            Total: {staticData.total} subscribers
          </div>
        </div>
      </div>
      <div className="mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
        <div className="relative overflow-x-auto max-w-full w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Table
            aria-label="Subscribers table"
            className="w-full rounded-xl border border-gray-200"
            classNames={{
              wrapper: "shadow-sm rounded-xl overflow-hidden bg-white",
              th: "bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wide border-b border-gray-200 text-left px-4 sm:px-6 py-3 align-middle",
              td: "px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 align-middle border-b border-gray-100",
            }}
          >
            <TableHeader>
              <TableColumn className="min-w-[200px]">Email</TableColumn>
              <TableColumn className="min-w-[150px]">Subscription Date</TableColumn>
              <TableColumn className="min-w-[100px]">Status</TableColumn>
              <TableColumn className="min-w-[100px] text-center">Actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent={loading ? "Loading..." : "No subscribers found"}>
              {staticData.items.map((subscriber: any) => (
                <TableRow
                  key={subscriber._id || subscriber.id}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  {/* Email */}
                  <TableCell className="font-medium text-gray-900">
                    {subscriber.email}
                  </TableCell>

                  {/* Subscription Date */}
                  <TableCell className="text-gray-600">
                    {formatDate(subscriber.subscribedAt || subscriber.createdAt || new Date().toISOString())}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subscriber.subscribed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {subscriber.subscribed ? "Active" : "Inactive"}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Button
                        isIconOnly
                        color="danger"
                        variant="flat"
                        size="sm"
                        className="transition-transform hover:scale-110"
                        onPress={() => handleDelete(subscriber._id || subscriber.id)}
                        aria-label={`Delete ${subscriber.email}`}
                        disabled={subscriberToDelete === (subscriber._id || subscriber.id)}
                      >
                        <HiOutlineTrash className="text-lg text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {staticData.total > 0 && (
          <div className="mt-6 sm:mt-8 flex justify-center">
            <PaginationShadcn
              totalItems={staticData.total}
              itemsPerPage={staticData.limit}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscribers;