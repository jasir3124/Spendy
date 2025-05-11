import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {Controller, useForm} from "react-hook-form"
import {Ionicons} from "@expo/vector-icons";

import { useUserData } from '../../context/UserDataContext';

import Wave from '@/assets/svg/wave.svg'

import {supabase} from '../../lib/supabase'
import {useRouter} from "expo-router";

export default function SignUp() {
    const router = useRouter()
    const { setUserData } = useUserData();

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(data) {
        const {email, password, name} = data
        const {data: signUpData, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: name,
                },
            }
        })

        if (error) {
            console.log("sign up error: " + error)
            alert(error.message)
        }if (error) {
            console.log("sign up error: " + error);
            alert(error.message);
        } else if (!signUpData.session) {
            // User is not confirmed, show an appropriate message
            if (signUpData.user && signUpData.user.confirmation_sent_at) {
                // If the email confirmation was already sent
                alert("This email is already registered. Please check your inbox to confirm your account.");
            } else {
                // If the email is new and confirmation email is sent
                alert("Check your email to confirm your account.");
            }
            setUserData({ email: email });
            router.push('/ConfirmEmail'); // Redirect to confirmation screen
        } else {
            // User has been successfully signed up and logged in
            console.log("sign up success: " + JSON.stringify(signUpData));
            alert("Sign up successful!");
            router.navigate("(tabs)/Home");
        }
    }

    const handleGoogleSignUp = async () => {
        console.log("Google Sign-Up button pressed")

        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

        if (error) {
            console.error("OAuth error:", error)
        } else {
            console.log("OAuth success:", data)
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <View style={styles.container}>

            <View>
                <View style={[styles.headerContainer, {backgroundColor: '#AF47E8'}]} className={""}>
                    <Text
                        style={[styles.welcomeText, {fontFamily: 'Comfortaa-Bold'}]}
                        className={"text-6xl text-white text-center mt-5"}
                    >
                        Sign Up
                    </Text>
                </View>
                <Wave height={310} style={styles.WaveBackground}/>
            </View>

            <View className={"flex-1 mt-20 m-5"}>
                <View className={"m-5"}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            maxLength: {
                                value: 40,
                                message: "Name can't be longer than 40 characters.",
                            }
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <View
                                className={errors.name ? `flex-row items-center border-b border-red-600 rounded-md` : `flex-row items-center border-b rounded-md`}>
                                <Ionicons name="person" size={24} color="gray" className="mr-2"/>
                                <TextInput
                                    className="flex-1 text-lg"
                                    placeholder="Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                        )}
                        name="name"
                    />
                    {errors.name ? (
                        <Text className="text-red-600">
                            {errors.name.message || 'Name is required.'}
                        </Text>
                    ) : null}
                </View>

                <View className={"m-5"}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // standard email regex
                                message: 'Please enter a valid email address',
                            },
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <View
                                className={errors.email ? `flex-row items-center border-b border-red-600 rounded-md` : `flex-row items-center border-b rounded-md`}>
                                <Ionicons name="mail" size={24} color="gray" className="mr-2"/>
                                <TextInput
                                    className="flex-1 text-lg"
                                    placeholder="Email"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                        )}
                        name="email"
                    />
                    {errors.email ? (
                        <Text className="text-red-600">
                            {errors.email.message || 'Email is required.'}
                        </Text>
                    ) : null}
                </View>

                <View className={"m-5"}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,}$/,
                                message: 'Password must include uppercase, lowercase, number, special character and be at least 8 characters.',
                            },
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <View
                                className={errors.password ? `flex-row items-center border-b border-red-600 rounded-md` : `flex-row items-center border-b rounded-md`}>
                                <Ionicons name="lock-closed" size={24} color="gray" className="mr-2"/>
                                <TextInput
                                    className="flex-1 text-lg"
                                    placeholder="Password"
                                    secureTextEntry={!showPassword}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                <Ionicons onPress={togglePasswordVisibility} name={showPassword ? `eye-off` : "eye"}
                                          size={24} color="gray" className="mr-2"/>
                            </View>
                        )}
                        name="password"
                    />
                    {errors.password ? (
                        <Text className="text-red-600">
                            {errors.password.message || 'Password is required.'}
                        </Text>
                    ) : null}
                </View>


                <TouchableOpacity className={"w-11/12 self-center bg-accent p-5 rounded-xl mt-7"}
                                  onPress={handleSubmit(onSubmit)}>
                    <Text className={"text-white text-xl text-center"} style={{fontFamily: "Comfortaa-Bold"}}>Sign
                        Up</Text>
                </TouchableOpacity>

                <Text className={"text-2xl text-center mt-7 text-gray-500"}>or</Text>


                <TouchableOpacity
                    onPress={handleGoogleSignUp}
                    style={{
                        backgroundColor: '#fff',
                        padding: 12,
                        borderRadius: 10,
                        marginTop: 20,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Ionicons name="logo-google" size={30} color="#DB4437" style={{marginRight: 10}}/>
                    <Text className={"text-xl"} style={{fontFamily: "Comfortaa-Bold"}}>Sign up with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    WaveBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    welcomeText: {
        textShadowColor: 'rgba(255, 255, 255, 0.6)',
        textShadowOffset: {width: 13, height: 13},    // Adjust offset for spread (no blur)
        textShadowRadius: 0,
    }
})
