import {useQuery} from '@tanstack/react-query'
import { getProducts } from '../API/products'

export function useProducts() {
    return useQuery({
        queryKey:['products'],
        queryFn:getProducts,
        staleTime: 5*60*1000,
    })
}
