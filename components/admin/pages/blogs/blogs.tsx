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
  Image,
  Chip,
} from "@heroui/react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { getBlogs, deleteBlog, Blog } from "@/lib/api/blogs";
import PaginationShadcn from "../../shared/pagination-shadcn";
import { formatDate } from "@/lib/utils";
import DeleteModal from "../../shared/deletemodal";
import { useDebounce } from "@/lib/hooks/useDebounce";

const Blogs = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [staticData, setStaticData] = useState<{ items: Blog[]; total: number; limit: number; page: number }>({
    items: [],
    total: 0,
    limit: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, debouncedSearchQuery, statusFilter]);

  const fetchBlogs = async () => {
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
        params.published = statusFilter === "published";
      }
      
      const response = await getBlogs(params);
      setStaticData({
        items: response.items || [],
        total: response.total || 0,
        limit: response.limit || 10,
        page: response.page || 1,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: any) => {
    router.push(`/admin/blogs/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setBlogToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    const deleteToast = toast.loading("Deleting Blog...");
    try {
      await deleteBlog(blogToDelete);
      toast.success("Blog deleted successfully!", { id: deleteToast });
      // Refresh the list
      await fetchBlogs();
    } catch (err: any) {
      console.error("Error deleting blog:", err);
      toast.error(err.message || "Failed to delete Blog", { id: deleteToast });
    } finally {
      setShowConfirm(false);
      setBlogToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setBlogToDelete(null);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'published':
        return "bg-green-200 text-green-800";
      case 'draft':
        return "bg-orange-200 text-orange-800";
      case 'archived':
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const truncateDescription = (description: string, maxLength: number = 80) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full bg-gray-50 p-4 sm:p-8">

      {/* Confirmation Modal */}
      {showConfirm && (
        <DeleteModal cancelDelete={cancelDelete} label="Blog" confirmDelete={confirmDelete} />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 w-full gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Blogs
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search blogs..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <Link
            href="/admin/blogs/create"
            className="bg-blue-900 hover:bg-blue-950 text-white flex items-center justify-center gap-2 rounded-xl p-3 whitespace-nowrap"
          >
            <Plus /> Add Blog
          </Link>
        </div>
      </div>
      <div className="mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
        <div className="relative overflow-x-auto max-w-full w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Table
            aria-label="Blog table"
            className="xl:min-w-[1200px] min-w-[1500px] w-full rounded-xl border border-gray-200"
            classNames={{
              wrapper: "shadow-sm rounded-xl overflow-hidden bg-white",
              th: "bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wide border-b border-gray-200 text-left px-4 sm:px-6 py-3 align-middle",
              td: "px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 align-middle border-b border-gray-100",
            }}
          >
            <TableHeader>
              <TableColumn className="min-w-[150px]">Title</TableColumn>
              <TableColumn className="min-w-[200px] max-w-[300px]">Description</TableColumn>
              <TableColumn className="min-w-[100px]">Hero Image</TableColumn>
              <TableColumn className="min-w-[100px]">Status</TableColumn>
              <TableColumn className="min-w-[150px]">Created Date</TableColumn>
              <TableColumn className="min-w-[120px] text-center">Actions</TableColumn>
            </TableHeader>

            <TableBody emptyContent={loading ? "Loading..." : "No blogs found"}>
              {staticData.items.map((blog: any) => (
                <TableRow
                  key={blog._id || blog.id}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  {/* Title */}
                  <TableCell className="font-medium text-gray-900">
                    {blog.title}
                  </TableCell>

                  {/* Description */}
                  <TableCell className="text-gray-600">
                    {truncateDescription(blog.excerpt || blog.description || "")}
                  </TableCell>

                  {/* Hero Image */}
                  <TableCell>
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={blog.hero || blog.thumbnail || blog.image || "/images/hero-banner.jpeg"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        width={64}
                        height={48}
                      />
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      color="default"
                      variant="solid"
                      size="sm"
                      className={getStatusStyles(blog.published ? "published" : "draft")}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </Chip>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-600">
                    {formatDate(blog.createdAt || blog.publishedAt || new Date().toISOString())}
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
                        onPress={() => handleEdit(blog._id || blog.id)}
                        aria-label={`Edit ${blog.title}`}
                      >
                        <HiOutlinePencil className="text-lg text-blue-600" />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="flat"
                        size="sm"
                        className="transition-transform hover:scale-110"
                        onPress={() => handleDelete(blog._id || blog.id)}
                        aria-label={`Delete ${blog.title}`}
                        disabled={blogToDelete === (blog._id || blog.id)}
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

export default Blogs;