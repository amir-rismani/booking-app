import { useEffect } from "react";

export default function useOutsideClick(ref, exceptionId, callback) {
    useEffect(() => {
        const handleMouseDown = (ev) => {
            if (ref.current && !ref.current.contains(ev.target) && ev.target.id !== exceptionId) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [ref, exceptionId, callback])
}