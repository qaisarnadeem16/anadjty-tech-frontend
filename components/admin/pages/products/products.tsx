"use client";

import React, { useState, useEffect } from "react";
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
import { PencilIcon, Plus, TrashIcon, Search } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { getProducts, deleteProduct, Product } from "@/lib/api/products";
import PaginationShadcn from "../../shared/pagination-shadcn";
import DeleteModal from "../../shared/deletemodal";
import { useDebounce } from "@/lib/hooks/useDebounce";

const Products = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [data, setData] = useState<{ items: Product[]; total: number; limit: number; currentPage: number }>({
    items: [],
    total: 0,
    limit: 10,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, debouncedSearchQuery, statusFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      
      if (debouncedSearchQuery.trim()) {
        params.search = debouncedSearchQuery.trim();
      }
      
      if (statusFilter) {
        params.status = statusFilter;
      }
      
      const response = await getProducts(params);
      setData({
        items: response.items || [],
        total: response.total || 0,
        limit: response.limit || 10,
        currentPage: response.page || 1,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: any) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    const deleteToast = toast.loading("Deleting product...");
    try {
      await deleteProduct(productToDelete);
      toast.success("Product deleted successfully!", { id: deleteToast });
      // Refresh the list
      await fetchProducts();
    } catch (err: any) {
      console.error("Error deleting product:", err);
      toast.error(err.message || "Failed to delete product", { id: deleteToast });
    } finally {
      setShowConfirm(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  // Function to truncate feature text if too long
  const truncateFeature = (feature: string, maxLength: number = 12) => {
    if (feature.length <= maxLength) return feature;
    return feature.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full bg-gray-50 p-3 sm:p-6">

      {/* Confirmation Modal */}
      {showConfirm && (
        <DeleteModal label="Product" cancelDelete={cancelDelete} confirmDelete={confirmDelete} />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Products
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Link
            href="/admin/products/create"
            className="bg-blue-900 hover:bg-blue-950 text-white flex items-center justify-center gap-2 rounded-xl p-3 whitespace-nowrap"
          >
            <Plus /> Add Product
          </Link>
        </div>
      </div>
      <div className="mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
        <div className="relative overflow-x-auto max-w-full w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Table
            aria-label="Products table"
            className="xl:min-w-[1200px] min-w-[1500px] w-full rounded-xl border border-gray-200"
            classNames={{
              wrapper: "shadow-sm rounded-xl overflow-hidden bg-white",
              th: "bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wide border-b border-gray-200 text-left px-4 sm:px-6 py-3 align-middle",
              td: "px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 align-middle border-b border-gray-100",
            }}
          >
            <TableHeader>
              <TableColumn className="min-w-[120px]">Name</TableColumn>
              <TableColumn className="min-w-[150px] whitespace-nowrap">Category</TableColumn>
              <TableColumn className="min-w-[200px] max-w-[250px]">Description</TableColumn>
              <TableColumn className="min-w-[80px] text-center">Quantity</TableColumn>
              <TableColumn className="min-w-[80px] text-center">Status</TableColumn>
              <TableColumn className="min-w-[100px] text-center">Features</TableColumn>
              <TableColumn className="min-w-[100px] text-center">Actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent={loading ? "Loading..." : "No products found"}>
              {data.items.map((product: any) => (
                <TableRow
                  key={product._id || product.id}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  {/* Name */}
                  <TableCell className="font-medium text-gray-900">
                    {product.name}
                  </TableCell>

                  {/* Category + Subcategory */}
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {product.category?.name && (
                        <Chip
                          color="default"
                          variant="solid"
                          size="sm"
                          className="bg-orange-200 text-orange-800"
                        >
                          {product.category.name.trim()}
                        </Chip>
                      )}
                      {product.subcategorie?.name && (
                        <Chip
                          color="default"
                          variant="solid"
                          size="sm"
                          className="bg-blue-200 text-blue-800"
                        >
                          {product.subcategorie.name.trim()}
                        </Chip>
                      )}
                    </div>
                  </TableCell>

                  {/* Description */}
                  <TableCell className="text-gray-600 truncate max-w-[250px]">
                    {product.description}
                  </TableCell>

                 

                  {/* Quantity */}
                  <TableCell className="text-center">
                    {product.quantity || product.stock || 0}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <Chip
                      color="default"
                      variant="solid"
                      className={`capitalize font-medium text-white ${product.status === "active" ? "bg-green-600" : "bg-red-600"
                        }`}
                    >
                      {product.status}
                    </Chip>
                  </TableCell>

                  {/* Features */}
                  <TableCell className="text-center">
                    <div className="flex justify-center flex-wrap gap-1">
                      {(product.tags?.length > 0 || product.specs?.length > 0) ? (
                        <>
                          {/* Show first 3 features from tags or specs */}
                          {(product.tags || product.specs || []).slice(0, 3).map((feature: any, index: any) => (
                            <Chip
                              key={index}
                              size="sm"
                              color="default"
                              variant="solid"
                              className="text-xs p-0.5 bg-gray-200 text-gray-800 max-w-[80px] truncate"
                              title={feature} // Show full text on hover
                            >
                              {truncateFeature(feature)}
                            </Chip>
                          ))}
                          {/* Show +X indicator if there are more than 3 features */}
                          {(product.tags?.length || product.specs?.length || 0) > 3 && (
                            <Chip
                              size="sm"
                              color="default"
                              variant="solid"
                              className="text-xs p-0.5 bg-blue-200 text-blue-800"
                              title={`Additional features: ${(product.tags || product.specs || []).slice(3).join(', ')}`}
                            >
                              +{(product.tags?.length || product.specs?.length || 0) - 3}
                            </Chip>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </div>
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
                        onPress={() => handleEdit(product._id || product.id)}
                        aria-label={`Edit ${product.name}`}
                      >
                        <PencilIcon className="text-lg text-blue-600" />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="flat"
                        size="sm"
                        className="transition-transform hover:scale-110"
                        onPress={() => handleDelete(product._id || product.id)}
                        aria-label={`Delete ${product.name}`}
                        disabled={productToDelete === (product._id || product.id)}
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

        {data.total > 0 && (
          <div className="mt-6 sm:mt-8 flex justify-center">
            <PaginationShadcn
              totalItems={data.total}
              itemsPerPage={data.limit}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;