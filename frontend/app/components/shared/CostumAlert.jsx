import {Modal, Pressable, Text, View} from "react-native";

const colorMap = {
    default: {
        bg: "bg-white dark:bg-zinc-900",
        text: "text-gray-600 dark:text-gray-300",
        title: "text-primary",
        button: "bg-primary",
    },
    success: {
        bg: "bg-green-100 dark:bg-green-800",
        text: "text-green-800 dark:text-green-100",
        title: "text-green-900 dark:text-green-200",
        button: "bg-green-600",
    },
    error: {
        bg: "bg-red-100 dark:bg-red-800",
        text: "text-red-800 dark:text-red-100",
        title: "text-red-900 dark:text-red-200",
        button: "bg-red-600",
    },
    warning: {
        bg: "bg-yellow-100 dark:bg-yellow-700",
        text: "text-yellow-800 dark:text-yellow-100",
        title: "text-yellow-900 dark:text-yellow-200",
        button: "bg-yellow-500",
    },
    info: {
        bg: "bg-blue-100 dark:bg-blue-800",
        text: "text-blue-800 dark:text-blue-100",
        title: "text-blue-900 dark:text-blue-200",
        button: "bg-blue-600",
    },
};

export default function CustomAlert({
                                        visible,
                                        title = "Notice",
                                        message,
                                        onClose,
                                        type = "default", // 'success', 'error', 'warning', 'info'
                                    }) {
    const palette = colorMap[type] || colorMap.default;

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View className="flex-1 items-center justify-center bg-black/50">
                <View className={`w-11/12 rounded-2xl p-6 shadow-xl ${palette.bg}`}>
                    <Text className={`text-xl font-bold ${palette.title}`}>{title}</Text>
                    <Text className={`mt-2 ${palette.text}`}>{message}</Text>

                    {onClose && (
                        <Pressable
                            onPress={onClose}
                            className={`mt-4 px-4 py-2 rounded-lg self-end ${palette.button}`}
                        >
                            <Text className="text-white font-semibold">OK</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Modal>
    );
}
