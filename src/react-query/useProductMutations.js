import { useQueryClient,useMutation } from "@tanstack/react-query";
import { createProduct,updateProducts,deleteProduct } from "../API/products";

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:updateProducts,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['products']})
        },
    })
}

export function useCreateProduct(onSuccess) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createProduct,
        onSuccess:(...args)=>{
            queryClient.invalidateQueries({queryKey:['products']});
            if(onSuccess) onSuccess(...args);
        },
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteProduct,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['products']})
            queryClient.invalidateQueries({queryKey:['products']})
        }
    })
}