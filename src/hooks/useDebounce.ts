import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // delay 시간 후에 value를 업데이트
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // 컴포넌트가 언마운트되거나 value가 변경되면 타이머를 취소
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce; 