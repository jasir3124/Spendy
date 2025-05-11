import {Stack} from "expo-router";
import {UserDataProvider} from "../context/UserDataContext";


export default function RootLayout() {
  return (
      <UserDataProvider>
          <Stack>
              <Stack.Screen name={"index"} options={{headerShown: false}}/>
              <Stack.Screen name="(auth)" options={{headerShown: false}}/>
              <Stack.Screen name={"(tabs)"} options={{headerShown: false}}/>
          </Stack>
      </UserDataProvider>
  );
}
