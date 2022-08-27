
export const endPoint = "http://localhost:4000/";

export const graphQlQuery = 
     `
    {
        categories
        {products
            {name,category,id,gallery,inStock,description, 
                attributes{id,name,type,items{value}},prices{currency{label,symbol},amount}}}
            }            `



