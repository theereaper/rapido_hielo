import { Colors } from "@/constants/Colors";
import { useAuthUser } from "@/store/useAuthUser";
import { useCartStore } from "@/store/useCarts";
import { useProducts } from "@/store/useProducts";
import { CartItem } from "@/types/Cart";
import { Product } from "@/types/Product";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconButton, Portal } from "react-native-paper";
import CustomButton from "./design/CustomButton";
import CustomTextInput from "./design/CustomTextInput";
import { axiosInstance } from "@/axios/axiosInstance";

type ChildFunction = (id?: Product["id"]) => void;

export interface ConfirmAddItemCartBSRef {
  childFunction: ChildFunction;
}

interface ConfirmAddItemCartBSProps {}

export const ConfirmAddItemCartBS = forwardRef<
  ConfirmAddItemCartBSRef,
  ConfirmAddItemCartBSProps
>((props, ref) => {
  const { userLogged } = useAuthUser();
  const { products } = useProducts();

  const [quantity, set_quantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);

  const sheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const childFunction: ChildFunction = (id) => {
    if (!id) return;

    const found = products.find((p) => p.id === id) || null;
    setProduct(found);
    setIsOpen(true);
    sheetRef.current?.snapToIndex(0);
  };

  useImperativeHandle(ref, () => ({
    childFunction,
    close,
  }));

  // comportamiento bottomsheet
  const snapPoints = useMemo(() => ["40%"], []);

  const handleSheetClose = useCallback(() => {
    setIsOpen(false); // también al cerrar por swipe
  }, []);

  // 👇 Backdrop que solo aparece en el índice 0
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // aparece cuando el sheet está en snapPoint 0 (25%)
        disappearsOnIndex={-1} // desaparece cuando se cierra
        opacity={0.5} // opacidad del fondo
      />
    ),
    []
  );

  const close = () => {
    sheetRef.current?.close();
    setProduct(null);
    set_quantity(1); // ← reinicia cantidad
  };

  // Funciones carro
  const handleIncrease = () => {
    set_quantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrease = () => {
    set_quantity((prev) => Math.max(prev - 1, 1));
  };

  const handleQuantityChange = (text: string) => {
    const num = text.replace(/[^0-9]/g, "");
    if (num.length > 2) return;
    const parsed = num === "" ? 1 : parseInt(num, 10);
    set_quantity(parsed < 1 ? 1 : parsed);
  };

  const handleConfirm = useCallback(async () => {
    if (!product) return;

    try {
      const payload = {
        client_id: userLogged.id,
        quantity,
      };

      const response = await axiosInstance.post(
        `/api/carts/${product.id}`,
        payload
      );

      // si la respuesta es correcta, actualizar contador
      if (response.status === 200) {
        const { fetchCartItemCount } = useCartStore.getState();
        await fetchCartItemCount(userLogged.id);
      }

      Alert.alert("Éxito", "Producto agregado al carrito.");
    } catch (error: any) {
      console.error("Error al agregar producto:", error);
      Alert.alert("Error", "No se pudo agregar el producto al carrito.");
    }
    close();
  }, [product, quantity]);

  return (
    <Portal>
      {isOpen && (
        <GestureHandlerRootView
          style={[styles.container, !isOpen && { pointerEvents: "none" }]}
        >
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            onClose={handleSheetClose}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop} // 👈 usa la función personalizada
          >
            <View className="flex-1 justify-between p-6">
              <View className="flex flex-row justify-between">
                <Text className="text-2xl font-bold mb-2">{product?.name}</Text>
                {
                  <Text className="text-xl font-semibold text-text-secondary">
                    ${product?.price} C/U
                  </Text>
                }
              </View>

              <View className="flex flex-row items-center justify-center gap-2">
                <IconButton
                  icon={() => (
                    <Ionicons name="remove-circle" size={28} color="black" />
                  )}
                  onPress={handleDecrease}
                />
                <CustomTextInput
                  value={quantity.toString()}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                  maxLength={2}
                  style={{ textAlign: "center", width: 60 }}
                />
                <IconButton
                  icon={() => (
                    <Ionicons name="add-circle" size={28} color="black" />
                  )}
                  onPress={handleIncrease}
                />
              </View>

              <View className="flex-col justify-end gap-4">
                <CustomButton
                  style={{ backgroundColor: Colors.primary }}
                  onPress={() => handleConfirm()}
                >
                  Agregar al carro
                </CustomButton>
                <CustomButton
                  style={{
                    backgroundColor: Colors.redError,
                  }}
                  onPress={close}
                >
                  Cancelar
                </CustomButton>
              </View>
            </View>
          </BottomSheet>
        </GestureHandlerRootView>
      )}
    </Portal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    inset: 0,
    zIndex: 9999,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});
