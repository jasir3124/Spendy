import React, {useEffect, useState} from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import {Link, useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form"
import {Ionicons} from "@expo/vector-icons";

import {supabase} from '../../lib/supabase'

import {useUserData} from '../../context/UserDataContext';

import Wave from '@/assets/svg/wave.svg'
import CostumAlert from "../components/shared/CostumAlert"

export default function LogIn() {
    const router = useRouter()
    const {updateUserData} = useUserData();

    const [ServerError, setServerError] = useState("")
    const [ShowAlertModal, setShowAlertModal] = useState(false)
    const [AlertModalData, setAlertModalData] = useState({
        title: "",
        message: "",
        type: ""
    })
    const [SignInLoading, setSignInLoading] = useState(false)

    const {
        control, handleSubmit, watch, formState: {errors},
    } = useForm({
        defaultValues: {
            email: "", password: "",
        },
        mode: 'onBlur'
    })

    async function onSubmit(data) {
        setSignInLoading(true);
        const { email, password } = data;

        const { data: signInData, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log("Sign in error:", error);
            setServerError(error.message);

            if (error.message === "Email not confirmed") {
                setAlertModalData({
                    title: "Confirm Your Email",
                    message: "Check your inbox to confirm your account.",
                    type: "info",
                });
                setShowAlertModal(true);
                updateUserData({ email });

                await supabase.auth.resend({
                    type: 'signup',
                    email
                });


                setTimeout(() => {
                    router.navigate("/ConfirmEmail");
                }, 1500);
            }

            setSignInLoading(false);
            return;
        }

        // Success: signed in
        console.log("Sign in success:", signInData);
        setAlertModalData({
            title: "You're In!",
            message: "Welcome back! You're now logged in.",
            type: "success",
        });
        setShowAlertModal(true);
        setSignInLoading(false);

        setTimeout(() => {
            router.navigate("/(tabs)/Home");
        }, 1500);
    }



    const handleGoogleSignIn = async () => {
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

    const emailWatch = watch('email')
    useEffect(() => {
        setServerError("")
    }, [emailWatch]);


    const MemoizedWave = React.memo(() => <Wave height={340} style={styles.WaveBackground}/>);
    const buttonClass = `w-11/12 self-center p-5 rounded-xl mt-10 ${
        SignInLoading ? "bg-gray-400" : "bg-accent"
    }`;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <ScrollView>
                <CostumAlert title={AlertModalData.title} message={AlertModalData.message} type={AlertModalData.type} visible={ShowAlertModal}/>
                <View>
                    <View style={{backgroundColor: '#AF47E8', height: 150}} className={"justify-center items-center"}>
                        <Text
                            style={{fontFamily: 'Comfortaa-Bold'}}
                            className={"text-6xl text-white text-center mt-14"}
                        >
                            Log In
                        </Text>
                    </View>
                    <MemoizedWave/>
                </View>

                <View className={"flex-1 mt-20 m-5"}>
                    <View className={"m-5"}>
                        <Controller
                            control={control}
                            rules={{
                                required: true, pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // standard email regex
                                    message: 'Please enter a valid email address',
                                },
                            }}
                            render={({field: {onChange, onBlur, value}}) => (<View
                                className={errors.email ? `flex-row items-center border-b border-red-600 rounded-md` : `flex-row items-center border-b rounded-md`}>
                                <Ionicons name="mail" size={24} color="gray" className="mr-2"/>
                                <TextInput
                                    className="flex-1 text-lg"
                                    placeholder="Email"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>)}
                            name="email"
                        />
                        {errors.email ? (<Text className="text-red-600">
                            {errors.email.message || 'Email is required.'}
                        </Text>) : null}
                    </View>

                    <View className={"m-5"}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({field: {onChange, onBlur, value}}) => (<View
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
                            </View>)}
                            name="password"
                        />
                        {errors.password ? (<Text className="text-red-600">
                            {errors.password.message || 'Password is required.'}
                        </Text>) : null}
                    </View>

                    <View className={"ps-5"}>
                        {ServerError && Object.keys(errors).length === 0 && (
                            <Text className="text-red-600">{ServerError}!</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        className={buttonClass}
                        disabled={SignInLoading}
                        onPress={handleSubmit(onSubmit)}
                    >
                        {SignInLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className="text-white text-xl text-center" style={{ fontFamily: "Comfortaa-Bold" }}>
                                Log In
                            </Text>
                        )}
                    </TouchableOpacity>


                    <Text className={"text-2xl text-center mt-4 text-gray-500"}>or</Text>

                    <TouchableOpacity
                        className={"w-11/12 self-center mt-5 mb-10"}
                        onPress={handleGoogleSignIn}
                        style={{
                            backgroundColor: '#fff',
                            padding: 12,
                            borderRadius: 10,
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

                    <Text className={"text-lg capitalize text-center"}>already have account? <Link
                        href={"/(auth)/SignUp"}><Text
                        className={"text-accent"}>Sign Up</Text></Link></Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    WaveBackground: {
        position: 'absolute', top: 0, left: 0, right: 0,
    }
})
