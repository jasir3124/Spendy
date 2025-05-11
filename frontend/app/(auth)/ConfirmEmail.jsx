import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'

import { useUserData } from '../../context/UserDataContext';

export default function ConfirmEmail() {
    const router = useRouter()
    const { userData, updateUser } = useUserData();

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    // Handle resend confirmation email
    const handleResendEmail = async () => {
        setLoading(true)
        const { error } = await supabase.auth.resend({ email })
        setLoading(false)
        if (error) {
            alert("Failed to resend confirmation email: " + error.message)
        } else {
            alert("Confirmation email has been resent. Please check your inbox!")
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-light p-5">
            <Text className="text-2xl font-bold text-center mb-6 text-primary">Check Your Inbox</Text>
            <Text className="text-base text-center mb-6 text-dark">
                We sent a confirmation email to {email}. Please check your inbox and click the link to confirm your account.
            </Text>

            <TouchableOpacity
                onPress={() => router.push('/login')}
                className="bg-primary p-4 rounded-xl mb-6 w-4/5"
            >
                <Text className="text-light text-lg text-center font-semibold">Back to Login</Text>
            </TouchableOpacity>

            <Text className="text-sm text-center text-dark mb-3">Didn't receive the email?</Text>

            <TouchableOpacity
                onPress={handleResendEmail}
                className="bg-accent p-4 rounded-xl w-4/5"
                disabled={loading}
            >
                <Text className="text-light text-lg text-center font-semibold">
                    {loading ? 'Resending...' : 'Resend Confirmation Email'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
