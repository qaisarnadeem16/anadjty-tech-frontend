
import Products from '@/components/admin/pages/products/products';
import React from 'react';


const Page = () => {

    return (
        <div>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
                <Products
                // data={res?.data} 
                />
            {/* </Suspense> */}
        </div>
    );
};

export default Page;
