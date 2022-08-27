export const GET_ALL_PRODUCTS =`
{
    categories
    {products
        {name,category,id,gallery,inStock,description, 
            attributes{id,name,type,items{value}},prices{currency{label,symbol},amount}}}
        }
        `

