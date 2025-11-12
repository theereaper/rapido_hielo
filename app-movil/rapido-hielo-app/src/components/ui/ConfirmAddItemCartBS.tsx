import { Colors } from "@/constants/Colors";
import { useProducts } from "@/store/useProducts";
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
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconButton, Portal } from "react-native-paper";
import CustomButton from "./design/CustomButton";
import CustomTextInput from "./design/CustomTextInput";
import { useCartStore } from "@/store/useCarts";
import { CartItem } from "@/types/Cart";

type ChildFunction = (id?: Product["id"]) => void;

export interface ConfirmAddItemCartBSRef {
  childFunction: ChildFunction;
}

interface ConfirmAddItemCartBSProps {
  onConfirm: () => void;
}

export const ConfirmAddItemCartBS = forwardRef<
  ConfirmAddItemCartBSRef,
  ConfirmAddItemCartBSProps
>((props, ref) => {
  const { products } = useProducts();
  const { add_item } = useCartStore();

  const [quantity, set_quantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);

  const sheetRef = useRef<BottomSheet>(null);

  const { onConfirm } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const childFunction: ChildFunction = (id) => {
    if (!id) return;

    const found = products.find((p) => p.id === id) || null;
    setProduct(found);
    setIsOpen(true);
    sheetRef.current?.snapToIndex(0);
  };

  // dentro del componente

  const handle_increase = () => {
    set_quantity((prev) => Math.min(prev + 1, 99));
  };

  const handle_decrease = () => {
    set_quantity((prev) => Math.max(prev - 1, 1));
  };

  const handle_quantity_change = (text: string) => {
    const num = text.replace(/[^0-9]/g, "");
    if (num.length > 2) return;
    set_quantity(num === "" ? 0 : parseInt(num, 10));
  };

  const handleConfirm = useCallback(() => {
    if (!product) return;

    const item: CartItem = {
      id: crypto.randomUUID(),
      fk_cart_id: product.id, // o id del carrito si ya existe
      fk_product_id: product.id,
      name_product: product.name,
      price_product: product.price * quantity,
      quantity,
      status: "active", // ✅ tipo literal correcto
    };

    add_item(item);
    onConfirm();
    close();
  }, [product, quantity, add_item, onConfirm]);

  const close = () => {
    sheetRef.current?.close();
  };

  // expone funciones al padre
  useImperativeHandle(ref, () => ({
    childFunction,
    close,
  }));

  const snapPoints = useMemo(() => ["40%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleSheetClose = useCallback(() => {
    setIsOpen(false); // también al cerrar por swipe
  }, []);

  // 👇 Backdrop que solo aparece en el índice 0 (25%)
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
            onChange={handleSheetChange}
            onClose={handleSheetClose}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop} // 👈 usa la función personalizada
          >
            <View className="flex-1 justify-between p-6">
              <View className="flex flex-row justify-between">
                <Text className="text-2xl font-bold mb-2">{product.name}</Text>
                {
                  <Text className="text-xl font-semibold text-text-secondary">
                    ${product.price} C/U
                  </Text>
                }
              </View>

              <View className="flex flex-row items-center justify-center gap-2">
                <IconButton
                  icon={() => (
                    <Ionicons name="remove-circle" size={28} color="black" />
                  )}
                  onPress={handle_decrease}
                />
                <CustomTextInput
                  value={quantity.toString()}
                  onChangeText={handle_quantity_change}
                  keyboardType="numeric"
                  maxLength={2}
                  style={{ textAlign: "center", width: 60 }}
                />
                <IconButton
                  icon={() => (
                    <Ionicons name="add-circle" size={28} color="black" />
                  )}
                  onPress={handle_increase}
                />
              </View>

              <View className="flex-col justify-end gap-4">
                <CustomButton
                  style={{ backgroundColor: Colors.primary }}
                  onPress={handleConfirm}
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
    position: "absolute",
    paddingTop: 200,
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
