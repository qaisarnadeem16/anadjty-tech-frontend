'use client'
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
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { getCategories, deleteCategory, Category } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import PaginationShadcn from "../../shared/pagination-shadcn";
import { formatDate } from "@/lib/utils";
import DeleteModal from "../../shared/deletemodal";
import { useDebounce } from "@/lib/hooks/useDebounce";

const Categories = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [data, setData] = useState<{ items: (Category & { productCount?: number })[]; total: number; limit: number; page: number }>({
    items: [],
    total: 0,
    limit: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, [currentPage, debouncedSearchQuery]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      
      if (debouncedSearchQuery.trim()) {
        params.search = debouncedSearchQuery.trim();
      }
      
      const response = await getCategories(params);
      
      // Use items array for paginated response, fallback to categories for backward compatibility
      const categories = response.items || response.categories || [];
      
      // Get product count for each category (only for current page items)
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          try {
            const productsResponse = await getProducts({ category: category.slug, limit: 1 });
            return { ...category, productCount: productsResponse.total || 0 };
          } catch {
            return { ...category, productCount: 0 };
          }
        })
      );

      setData({
        items: categoriesWithCounts,
        total: response.total ?? (response.categories?.length ?? 0),
        limit: response.limit ?? 10,
        page: response.page ?? currentPage,
      });
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      toast.error(error.message || "Failed to fetch categories");
      setData({
        items: [],
        total: 0,
        limit: 10,
        page: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: any) => {
    router.push(`/admin/categories/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    const deleteToast = toast.loading("Deleting Category...");
    try {
      await deleteCategory(categoryToDelete);
      toast.success("Category deleted successfully!", { id: deleteToast });
      // Refresh the list
      await fetchCategories();
    } catch (err: any) {
      console.error("Error deleting category:", err);
      toast.error(err.message || "Failed to delete Category", { id: deleteToast });
    } finally {
      setShowConfirm(false);
      setCategoryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="w-full bg-gray-50 p-3 sm:p-6">

      {/* Confirmation Modal */}
      {showConfirm && (
        <DeleteModal cancelDelete={cancelDelete} label="Category" confirmDelete={confirmDelete} />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Categories
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link
            href="/admin/categories/create"
            className="bg-blue-900 hover:bg-blue-950 text-white flex items-center justify-center gap-2 rounded-xl p-3 whitespace-nowrap"
          >
            <Plus /> Add Category
          </Link>
        </div>
      </div>
      <div className="mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
        <div className="relative overflow-x-auto max-w-full w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Table
            aria-label="Category table"
            className="xl:min-w-[1200px] min-w-[1500px] w-full rounded-xl border border-gray-200"
            classNames={{
              wrapper: "shadow-sm rounded-xl overflow-hidden bg-white",
              th: "bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wide border-b border-gray-200 text-left px-4 sm:px-6 py-3 align-middle",
              td: "px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 align-middle border-b border-gray-100",
            }}
          >
            <TableHeader>
              <TableColumn className="min-w-[120px]">Name</TableColumn>
              <TableColumn className="min-w-[200px] max-w-[250px]">Products</TableColumn>
              <TableColumn className="min-w-[200px] max-w-[250px]">Date</TableColumn>
              <TableColumn className="min-w-[100px] text-center">Actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent={loading ? "Loading..." : "No categories found"}>
              {data.items.map((category: any) => (
                <TableRow
                  key={category._id || category.id}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  {/* Name */}
                  <TableCell className="font-medium text-gray-900">
                    {category.name}
                  </TableCell>

                  {/* categories */}
                  <TableCell className="font-medium text-gray-900">
                    {category.productCount || 0}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="font-medium text-gray-900">
                    {formatDate(category.createdAt || new Date().toISOString())}
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
                        onPress={() => handleEdit(category._id || category.id)}
                        aria-label={`Edit ${category.name}`}
                      >
                        <HiOutlinePencil className="text-lg text-blue-600" />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="flat"
                        size="sm"
                        className="transition-transform hover:scale-110"
                        onPress={() => handleDelete(category._id || category.id)}
                        aria-label={`Delete ${category.name}`}
                        disabled={categoryToDelete === (category._id || category.id)}
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

export default Categories;
