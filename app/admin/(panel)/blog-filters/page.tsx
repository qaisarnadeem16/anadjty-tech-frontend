import Categories from '@/components/admin/pages/categories/categories';
import BlogFilters from '@/components/admin/pages/filters/blog-filters';
import ProductFilters from '@/components/admin/pages/filters/product-filters';
import React, { Suspense } from 'react';

interface pageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const Page = async ({ searchParams }: pageProps) => {

  const { page, limit } = await searchParams;

  // Convert string to number safely
  const pageParam = await page ? Number(page) : 1;
  const limitParam = await limit ? Number(limit) : 10;

  // const res = await getCategories(pageParam, limitParam);

  return (
    <div>
      <BlogFilters
      // data={res?.data} 
      />
    </div>
  );
};

export default Page;
