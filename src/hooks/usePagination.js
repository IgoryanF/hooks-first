import {useMemo} from "react";

export const usePagination = (totalPages) => {
    return useMemo(() => {
        let array = [];
        for (let i = 0; i < totalPages; i++) {
            array.push(i + 1)
        }
        return array;
    }, [totalPages])
}