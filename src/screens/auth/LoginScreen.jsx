import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Image,Platform, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authService';
import  Icon from 'react-native-vector-icons/MaterialIcons';
import { insertSession, clearSessions } from '../../db';


const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

    /*useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al iniciar sesión", result)
        }else if(result.status==="fulfilled"){
            console.log("Usuario logueado con éxito")
            dispatch(setUser(result.data))
        }
    },[result])*/

    useEffect(() => {
        //result?.isSuccess
        //console.log("Remember me: ", rememberMe)
        if (result.isSuccess) {
          //console.log("Usuario logueado con éxito")
          const { email, localId, idToken } = result.data;

          //console.log("Datos de la sesión antes de insertar:", { email, userId: localId, token: idToken });

          //console.log(result.data)
          dispatch(setUser({ email, userId: localId, token: idToken }));;
          //dispatch(setUser(result.data))
          
          if (rememberMe) {
            clearSessions().then(() => console.log("sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
            //console.log("result data:", result.data)
            insertSession({
                email,
                userId: localId,    
                token: idToken
            })
              //.then(res => console.log("Usuario insertado con éxito",res))
              .catch(error => console.log("Error al insertar usuario",error))
          }
    
        }
      }, [result,rememberMe])


    const onsubmit = ()=>{
        //console.log(email,password)       
        triggerLogin({email,password})
    }

    return (
        <LinearGradient
            colors={['#1C77C3', '#1C77C3']}
            start={{ x: 0, y: 0 }} // esquina superior izquierda
            end={{ x: 1, y: 1 }}   // esquina inferior derecha
            style={styles.gradient}
        >
            <View style={styles.Imagecontainer}>
            <Image
                source={require('../../../assets/images/logotumejorprecio.png')} // Ajusta la ruta según la ubicación de tu imagen
                style={styles.image}
            />  
            </View>
          
            <Text style={styles.title}>Tu Mejor Precio</Text>
            <Text style={styles.subTitle}>Ingresa</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#C6C6C6"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#C6C6C6"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />

            </View>
            <View style={styles.rememberMeContainer}>
                <Text style={styles.whiteText}>Mantener sesión iniciada</Text>
                {
                    rememberMe
                    ?
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.verdeNeon} /></Pressable>
                    :
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={colors.grisClaro} /></Pressable>
                }
            </View>            
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={()=>dispatch(setUser({email:"demo@mundogeek.com",token:"demo"}))}>
                  <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
        </LinearGradient>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.blanco,
        fontFamily: "Montserrat-Black",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.blanco,
        fontWeight: '500',
        letterSpacing: 1
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.blanco,
        width: textInputWidth,
        color: colors.negro,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.naranjamamey,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 200, // Ajusta el tamaño según tus necesidades
        height: 200,
        resizeMode: 'contain', // Puedes cambiarlo a 'cover' o 'stretch' según lo que necesites
      },
      rememberMeContainer: {
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 8,
        }
})