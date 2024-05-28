import { useEffect, useRef } from "react";

export const useKeydown = (keyId, callback) => {
    const ref = useRef(null);

    useEffect(() => {
        const handKeydown = (event) => {
            if (event.key === keyId) {
                if (callback) callback(ref.current);
            }
        };

        window.addEventListener("keydown", handKeydown);

        return () => {
            window.removeEventListener("keydown", handKeydown);
        };
    }, []);

    return ref;
};