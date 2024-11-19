import { StyleSheet, Text, FlatList, View, ActivityIndicator } from 'react-native';
import { useGetReceiptsQuery } from '../services/receiptsService';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux'

const ReceiptsScreen = () => {
  const userId = useSelector(state => state.authReducer.value.userId); // Obtén el UID del estado global

  const { data: receipts, error, isLoading } = useGetReceiptsQuery();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.grisOscuro} />
        <Text>Cargando recibos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Ocurrió un error al cargar los recibos.</Text>
      </View>
    );
  }

  
   const receiptsArray = Object.values(receipts || {}).filter(receipt => receipt.userId === userId);

  const renderReceiptItem = ({ item }) => {
    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return (
      <FlatCard style={styles.receiptContainer}>
        <Text style={styles.title}>Recibo ID: {item.id}</Text>
        <Text style={styles.date}>
          Fecha: {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)}
        </Text>
        <Text style={styles.total}>Total: {item.total.toFixed(2)} </Text>
        <Text style={styles.productsHeader}>Productos:</Text>
        <FlatList
          data={item.cart}
          keyExtractor={(product, index) => `${product.id}-${index}`}
          renderItem={({ item: product }) => (
            <Text style={styles.productItem}>
              {product.title} (x{product.quantity}): {product.price.toFixed(2)}
            </Text>
          )}
        />
        <Icon name="visibility" size={24} color={colors.grisOscuro} style={styles.viewIcon} />
      </FlatCard>
    );
  };

  return (
    <FlatList
      data={receiptsArray}
      keyExtractor={(item, index) => `${item.createdAt}-${index}`}
      renderItem={renderReceiptItem}
    />
  );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 20,
    justifyContent: 'flex-start',
    margin: 16,
    gap: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: colors.grisOscuro,
  },
  total: {
    fontSize: 14,
    fontWeight: '600',
  },
  productsHeader: {
    marginTop: 10,
    fontWeight: '700',
  },
  productItem: {
    fontSize: 12,
    color: colors.grisOscuro,
  },
  viewIcon: {
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
