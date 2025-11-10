
import Products from '@/components/admin/pages/products/products';
import React, { Suspense } from 'react';

interface PageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
    }>;
}

const Page = async ({ searchParams }: PageProps) => {

    const { page, limit } = await searchParams;

    // Convert string to number safely
    const pageParam = await page ? Number(page) : 1;
    const limitParam = await limit ? Number(limit) : 10;

    // const res = await getProducts(pageParam, limitParam);

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Products
                // data={res?.data} 
                />
            </Suspense>
        </div>
    );
};

export default Page;
