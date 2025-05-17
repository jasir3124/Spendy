// app/_layout.web.tsx
import { useEffect } from 'react';
import { Slot } from 'expo-router';

export default function WebLayout() {
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            window.location.pathname !== '/EmailConfrimedPage'
        ) {
            window.location.href = '/EmailConfrimedPage';
        }
    }, []);

    return <Slot />;
}
