import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
//import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'
import { useEffect, useState } from 'react'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService'

const CategoriesScreen = ({ navigation }) => {
    
    const { width, height } = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)
    //console.log(width,height)
    //console.log(navigation)

    //const categories = useSelector(state => state.shopReducer.value.categories)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    //console.log("Categories: ", categories)

    const dispatch = useDispatch()

    useEffect(() => {
        if (width > height) {
            setIsPortrait(false)
        } else {
            setIsPortrait(true)
        }
    },
        [width, height])

    //console.log(isPortrait)

    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.title))//item.title es el action.payload
                navigation.navigate('Productos')/*category*/
            }}>
                <FlatCard style={
                    index % 2 == 0
                        ?
                        { ...styles.categoryItemContainer, ...styles.row }
                        :
                        { ...styles.categoryItemContainer, ...styles.rowReverse }
                }>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={width > 400 ? styles.categoryTitle : stylesSmall.categoryTitle}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        )
    }


    return (
        <>
            {
                isLoading
                ?
                <ActivityIndicator size="large" color={colors.verdeNeon} />
                :
                error
                ?
                <Text>Error al cargar las categorías</Text>
                :
                <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderCategoryItem}
            />
            }
        </>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categoryItemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    categoryTitleSmall: {
        fontSize: 12,
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 80
    },
    row: {
        flexDirection: 'row-center'
    },
    rowReverse: {
        flexDirection: 'row-center'
    },
    /* fixedExample:{
        width: 100,
        height:100,
        backgroundColor: colors.azulCobalto,
        position: 'absolute',
        zIndex:999,
        bottom:10,
        right: 10
    } */
})


const stylesSmall = StyleSheet.create({
    categoryTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
})
