"use client";

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Folder,
  FileText,
  Users,
  Plus,
  Edit,
  List,
  Settings
} from 'lucide-react';
import { getProducts } from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';
import { getBlogs } from '@/lib/api/blogs';
import { getSubscribers } from '@/lib/api/subscribers';

const Home = () => {
  const [statsData, setStatsData] = useState({
    products: {
      total: 0,
      change: 0,
      active: 0,
      inactive: 0,
      featured: 0
    },
    categories: {
      total: 0,
      change: 0,
      mainCategories: 0,
      subCategories: 0
    },
    blogs: {
      total: 0,
      change: 0,
      published: 0,
      draft: 0
    },
    subscribers: {
      total: 0,
      change: 0,
      active: 0,
      inactive: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all stats in parallel
      const [productsRes, categoriesRes, blogsRes, subscribersRes] = await Promise.all([
        getProducts({ limit: 1 }),
        getCategories(),
        getBlogs({ limit: 1 }),
        getSubscribers({ limit: 1 }),
      ]);

      // Get detailed product stats
      const [activeProducts, inactiveProducts, featuredProducts] = await Promise.all([
        getProducts({ status: 'active', limit: 1 }),
        getProducts({ status: 'inactive', limit: 1 }),
        getProducts({ featured: true, limit: 1 }),
      ]);

      // Get blog stats
      const [publishedBlogs, draftBlogs] = await Promise.all([
        getBlogs({ published: true, limit: 1 }),
        getBlogs({ published: false, limit: 1 }),
      ]);

      // Get subscriber stats
      const [activeSubscribers, inactiveSubscribers] = await Promise.all([
        getSubscribers({ subscribed: true, limit: 1 }),
        getSubscribers({ subscribed: false, limit: 1 }),
      ]);

      setStatsData({
        products: {
          total: productsRes.total || 0,
          change: 0, // You can calculate this based on previous data
          active: activeProducts.total || 0,
          inactive: inactiveProducts.total || 0,
          featured: featuredProducts.total || 0,
        },
        categories: {
          total: categoriesRes.categories?.length || 0,
          change: 0,
          mainCategories: categoriesRes.categories?.filter((c: any) => !c.parentCategory)?.length || 0,
          subCategories: categoriesRes.categories?.filter((c: any) => c.parentCategory)?.length || 0,
        },
        blogs: {
          total: blogsRes.total || 0,
          change: 0,
          published: publishedBlogs.total || 0,
          draft: draftBlogs.total || 0,
        },
        subscribers: {
          total: subscribersRes.total || 0,
          change: 0,
          active: activeSubscribers.total || 0,
          inactive: inactiveSubscribers.total || 0,
        },
      });
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your platform summary.</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Products Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${statsData.products.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {statsData.products.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(statsData.products.change)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(statsData.products.total)}
            </h3>
            <p className="text-gray-600 text-sm mb-4">Total Products</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Active</span>
                <span className="font-medium">{formatNumber(statsData.products.active)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Inactive</span>
                <span className="font-medium">{formatNumber(statsData.products.inactive)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Featured</span>
                <span className="font-medium">{statsData.products.featured}</span>
              </div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Folder className="w-6 h-6 text-green-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${statsData.categories.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {statsData.categories.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(statsData.categories.change)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(statsData.categories.total)}
            </h3>
            <p className="text-gray-600 text-sm mb-4">Total Categories</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Main Categories</span>
                <span className="font-medium">{statsData.categories.mainCategories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sub Categories</span>
                <span className="font-medium">{statsData.categories.subCategories}</span>
              </div>
            </div>
          </div>

          {/* Blogs Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${statsData.blogs.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {statsData.blogs.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(statsData.blogs.change)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(statsData.blogs.total)}
            </h3>
            <p className="text-gray-600 text-sm mb-4">Total Blog Posts</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Published</span>
                <span className="font-medium">{formatNumber(statsData.blogs.published)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Draft</span>
                <span className="font-medium">{statsData.blogs.draft}</span>
              </div>
            </div>
          </div>

          {/* Subscribers Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${statsData.subscribers.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {statsData.subscribers.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(statsData.subscribers.change)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(statsData.subscribers.total)}
            </h3>
            <p className="text-gray-600 text-sm mb-4">Total Subscribers</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Active</span>
                <span className="font-medium">{formatNumber(statsData.subscribers.active)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Inactive</span>
                <span className="font-medium">{formatNumber(statsData.subscribers.inactive)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Add Product</span>
            </button>
            <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
              <Folder className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Categories</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Write Blog</span>
            </button>
            <button className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors text-center">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">View Subscribers</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus size={16} className="text-blue-600" />
                </div>
                <span className="text-gray-700">New product added: "Wireless Headphones"</span>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText size={16} className="text-green-600" />
                </div>
                <span className="text-gray-700">Blog post published: "Getting Started Guide"</span>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users size={16} className="text-orange-600" />
                </div>
                <span className="text-gray-700">25 new subscribers joined</span>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;