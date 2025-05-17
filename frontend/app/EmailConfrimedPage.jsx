import React from "react";
import { View, Text } from 'react-native';

export default function EmailConfirmedPage() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1D201F' }}>
            <Text style={{ color: '#AF47E8', fontSize: 20 }}>
                This page is only available on web.
            </Text>
        </View>
    );
}