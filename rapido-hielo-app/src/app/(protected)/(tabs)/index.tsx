import { ConfirmBottomSheet } from "@/components/ui/ConfirmBottomSheet";
import { Link } from "expo-router";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const sheetRef = useRef<any>(null);

  const deleteItem = () => {
    console.log("Eliminado");

    sheetRef.current?.close();
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 p-6 ">
          <Text className="mb-4 text-3xl font-bold">Index</Text>

          {/* Modal */}
          <Link asChild push href="/modal">
            <Button>Abrir modal</Button>
          </Link>

          <Button onPress={() => sheetRef.current?.childFunction()}>
            Snap To 25%
          </Button>
        </View>

        <ConfirmBottomSheet
          title="Eliminar item"
          message="Estas seguro que deseas eliminar item?"
          onConfirm={deleteItem}
          ref={sheetRef}
        />
      </SafeAreaView>
    </>
  );
}
