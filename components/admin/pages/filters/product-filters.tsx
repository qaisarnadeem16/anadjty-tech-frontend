"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";
import { PencilIcon, Plus, TrashIcon } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "../../shared/pagination";
import DeleteModal from "../../shared/deletemodal";

// Dummy data for filters
const dummyFilters = [
  {
    id: "1",
    name: "Price Range",
    category: "Pricing",
    createdDate: "2024-01-15",
    status: "active"
  },
  {
    id: "2",
    name: "Brand Selection",
    category: "Brand",
    createdDate: "2024-01-20",
    status: "active"
  },
  {
    id: "3",
    name: "Color Variants",
    category: "Appearance",
    createdDate: "2024-02-05",
    status: "active"
  },
  {
    id: "4",
    name: "Size Options",
    category: "Specifications",
    createdDate: "2024-02-10",
    status: "inactive"
  },
  {
    id: "5",
    name: "Customer Ratings",
    category: "Reviews",
    createdDate: "2024-02-18",
    status: "active"
  },
  {
    id: "6",
    name: "Availability Filter",
    category: "Inventory",
    createdDate: "2024-03-01",
    status: "active"
  },
  {
    id: "7",
    name: "Material Type",
    category: "Specifications",
    createdDate: "2024-03-12",
    status: "inactive"
  },
  {
    id: "8",
    name: "Shipping Options",
    category: "Delivery",
    createdDate: "2024-03-20",
    status: "active"
  }
];

// Dummy data structure to match your expected format
const dummyData = {
  items: dummyFilters,
  total: dummyFilters.length,
  limit: 10,
  currentPage: 1
};

const ProductFilters = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [filterToDelete, setFilterToDelete] = useState<string | null>(null);
  const [data, setData] = useState(dummyData);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/filters/${id}`);
  };

  const handleDelete = (id: string) => {
    setFilterToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!filterToDelete) return;

    const deleteToast = toast.loading("Deleting filter...");
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove the filter from dummy data
      setData(prevData => ({
        ...prevData,
        items: prevData.items.filter(filter => filter.id !== filterToDelete),
        total: prevData.total - 1
      }));
      
      toast.success("Filter deleted successfully!", { id: deleteToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete filter", { id: deleteToast });
    } finally {
      setShowConfirm(false);
      setFilterToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setFilterToDelete(null);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Pricing': 'bg-purple-100 text-purple-800',
      'Brand': 'bg-blue-100 text-blue-800',
      'Appearance': 'bg-pink-100 text-pink-800',
      'Specifications': 'bg-orange-100 text-orange-800',
      'Reviews': 'bg-green-100 text-green-800',
      'Inventory': 'bg-red-100 text-red-800',
      'Delivery': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full bg-gray-50 p-4 sm:p-8">
      <Toaster position="top-right" />

      {/* Confirmation Modal */}
      {showConfirm && (
        <DeleteModal 
          label="Filter" 
          cancelDelete={cancelDelete} 
          confirmDelete={confirmDelete} 
        />
      )}

      <div className="flex items-center justify-between w-full mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold  text-gray-800 tracking-tight">
          Product Filters
        </h1>
        <Link
          href="/admin/product-filters/create"
          className="bg-blue-900 hover:bg-blue-950 text-white flex items-center gap-2 rounded-xl p-3"
        >
          <Plus /> Add Filter
        </Link>
      </div>
      
      <div className="mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
        <div className="relative overflow-x-auto max-w-full w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Table
            aria-label="Product filters table"
            className="xl:min-w-[1000px] min-w-[1200px] w-full rounded-xl border border-gray-200"
            classNames={{
              wrapper: "shadow-sm rounded-xl overflow-hidden bg-white",
              th: "bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wide border-b border-gray-200 text-left px-4 sm:px-6 py-3 align-middle",
              td: "px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 align-middle border-b border-gray-100",
            }}
          >
            <TableHeader>
              <TableColumn className="min-w-[200px]">Filter Name</TableColumn>
              <TableColumn className="min-w-[150px]">Category</TableColumn>
              <TableColumn className="min-w-[120px]">Created Date</TableColumn>
              <TableColumn className="min-w-[100px] text-center">Status</TableColumn>
              <TableColumn className="min-w-[120px] text-center">Actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent="No filters found">
              {data.items.map((filter: any) => (
                <TableRow
                  key={filter.id}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  {/* Filter Name */}
                  <TableCell className="font-medium text-gray-900">
                    {filter.name}
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Chip
                      color="default"
                      variant="solid"
                      size="sm"
                      className={`capitalize ${getCategoryColor(filter.category)}`}
                    >
                      {filter.category}
                    </Chip>
                  </TableCell>

                  {/* Created Date */}
                  <TableCell className="text-gray-600">
                    {formatDate(filter.createdDate)}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <Chip
                      color="default"
                      variant="solid"
                      className={`capitalize font-medium text-white ${
                        filter.status === "active" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {filter.status}
                    </Chip>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        isIconOnly
                        color="warning"
                        variant="flat"
                        size="sm"
                        className="transition-transform hover:scale-110"
                        onPress={() => handleEdit(filter.id)}
                        aria-label={`Edit ${filter.name}`}
                      >
                        <PencilIcon className="text-lg text-blue-600" />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="flat"
                        size="sm"
                        className="transition-transform hover:scale-110"
                        onPress={() => handleDelete(filter.id)}
                        aria-label={`Delete ${filter.name}`}
                        disabled={filterToDelete === filter.id}
                      >
                        <TrashIcon className="text-lg text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 sm:mt-8 flex justify-end">
          <Pagination
            totalItems={data.total}
            itemsPerPage={data.limit}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;