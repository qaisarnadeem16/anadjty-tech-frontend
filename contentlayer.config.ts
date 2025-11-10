import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/*.mdx`,
    contentType: 'mdx',
    fields: {
        id: { type: 'number', required: true },
        title: { type: 'string', required: true },
        excerpt: { type: 'string', required: true },
        author: { type: 'string', required: true, default: 'AnadjyTech Editorial' },
        date: { type: 'date', required: true },
        readTime: { type: 'string', required: true },
        category: { type: 'string', required: true },
        difficulty: { type: 'string', required: true, default: 'Beginner' },
        badges: { type: 'list', of: { type: 'string' }, required: true },
        hero: { type: 'string', required: true },
        thumbnail: { type: 'string', required: true },
        published: { type: 'boolean', required: true, default: true },
        featured: { type: 'boolean', required: true, default: false },
        hidden: { type: 'boolean', required: true, default: false },
        publishedAt: { type: 'date', required: true },
        readMins: { type: 'number', required: true },
        image: { type: 'string', required: true },
        tags: { type: 'list', of: { type: 'string' }, required: true },
        specs: {
            type: 'json',
            required: false,
            default: {
                PriceRange: '',
                Category: '',
                ProductsTested: '',
                TestingPeriod: ''
            }
        },
        keyTakeaways: { type: 'list', of: { type: 'string' }, required: true },
        pros: { type: 'list', of: { type: 'string' }, required: true },
        cons: { type: 'list', of: { type: 'string' }, required: true },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ''),
        },
        url: {
            type: 'string',
            resolve: (post) => `/blog/${post._raw.sourceFileName.replace(/\.mdx$/, '')}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
})




// import { defineDocumentType, makeSource } from 'contentlayer/source-files'

// export const Post = defineDocumentType(() => ({
//     name: 'Post',
//     filePathPattern: `posts/*.mdx`,
//     contentType: 'mdx',
//     fields: {
//         title: { type: 'string', required: true },
//         date: { type: 'date', required: true },
//         excerpt: { type: 'string', required: true },
//         hero: { type: 'string', required: false },
//     },
//     computedFields: {
//         slug: {
//             type: 'string',
//             resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ''),
//         },
//     },
// }))

// export default makeSource({
//     contentDirPath: 'content',
//     documentTypes: [Post],
// })
